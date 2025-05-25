import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { imageCacheAtom } from '../store/atoms'

export function useImageCache(url: string) {
  const [cache, setCache] = useAtom(imageCacheAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if image is already cached
  const cachedUrl = cache[url]

  useEffect(() => {
    // If image is already cached, no need to load again
    if (cachedUrl) {
      return
    }

    setIsLoading(true)
    setError(null)

    // Create a new image element to preload
    const img = new Image()

    img.onload = () => {
      // Convert image to blob URL for caching
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (ctx) {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        canvas.toBlob(blob => {
          if (blob) {
            const blobUrl = URL.createObjectURL(blob)
            setCache(prev => ({ ...prev, [url]: blobUrl }))
          }
          setIsLoading(false)
        })
      } else {
        // Fallback: just cache the original URL
        setCache(prev => ({ ...prev, [url]: url }))
        setIsLoading(false)
      }
    }

    img.onerror = () => {
      setError('Failed to load image')
      setIsLoading(false)
    }

    img.crossOrigin = 'anonymous'
    img.src = url
  }, [url, cachedUrl, setCache])

  return {
    src: cachedUrl || url,
    isLoading: !cachedUrl && isLoading,
    error,
    isCached: !!cachedUrl,
  }
}
