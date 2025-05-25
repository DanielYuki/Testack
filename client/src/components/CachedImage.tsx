import { useImageCache } from '../hooks/useImageCache'

interface CachedImageProps {
  src: string
  alt: string
  className?: string
  showLoadingState?: boolean
  showCacheStatus?: boolean
}

export default function CachedImage({
  src,
  alt,
  className = '',
  showLoadingState = true,
  showCacheStatus = false,
}: CachedImageProps) {
  const { src: cachedSrc, isLoading, error, isCached } = useImageCache(src)

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-background ${className}`}>
        <div className='text-center p-4'>
          <div className='text-red-500 mb-2'>❌</div>
          <p className='text-sm text-muted-foreground'>Failed to load image</p>
        </div>
      </div>
    )
  }

  if (isLoading && showLoadingState) {
    return (
      <div className={`flex items-center justify-center bg-background animate-pulse ${className}`}>
        <div className='text-center p-4'>
          <div className='text-2xl mb-2'>🔄</div>
          <p className='text-sm text-muted-foreground'>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='relative'>
      <img src={cachedSrc} alt={alt} className={className} />
      {showCacheStatus && (
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
            isCached ? 'bg-status-success text-white' : 'bg-status-warning text-black'
          }`}
        >
          {isCached ? '✓ Cached' : 'Loading'}
        </div>
      )}
    </div>
  )
}
