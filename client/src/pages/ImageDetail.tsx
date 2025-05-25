import { useAtom } from 'jotai'
import { Link, useParams, Navigate } from 'react-router-dom'
import { galleryImagesAtom, selectedImageAtom, themeAtom } from '../store/atoms'
import CachedImage from '../components/CachedImage'

export default function ImageDetail() {
  const { id } = useParams<{ id: string }>()
  const [images] = useAtom(galleryImagesAtom)
  const [selectedImageId] = useAtom(selectedImageAtom)
  const [theme] = useAtom(themeAtom)

  const imageId = id ? parseInt(id, 10) : selectedImageId
  const image = images.find(img => img.id === imageId)

  if (!image) {
    return <Navigate to='/gallery' replace />
  }

  const currentIndex = images.findIndex(img => img.id === imageId)
  const prevImage = currentIndex > 0 ? images[currentIndex - 1] : null
  const nextImage = currentIndex < images.length - 1 ? images[currentIndex + 1] : null

  return (
    <div
      className={`min-h-screen p-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className='container mx-auto max-w-4xl'>
        {/* Navigation */}
        <div className='flex items-center justify-between mb-6'>
          <Link
            to='/gallery'
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-900'
            } shadow-md`}
          >
            <span>←</span>
            <span>Back to Gallery</span>
          </Link>

          <div className='flex space-x-2'>
            {prevImage && (
              <Link
                to={`/gallery/${prevImage.id}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-900'
                } shadow-md`}
              >
                ← Previous
              </Link>
            )}
            {nextImage && (
              <Link
                to={`/gallery/${nextImage.id}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-900'
                } shadow-md`}
              >
                Next →
              </Link>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`rounded-lg overflow-hidden shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {/* Large Image */}
          <div className='relative'>
            <CachedImage
              src={image.url}
              alt={image.title}
              className='w-full h-96 md:h-[500px] object-cover'
              showCacheStatus={true}
            />
          </div>

          {/* Image Info */}
          <div className='p-6'>
            <h1 className='text-3xl font-bold mb-4'>{image.title}</h1>
            <p className='text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6'>
              {image.description}
            </p>

            {/* Thumbnail Preview */}
            <div className='border-t pt-6'>
              <h3 className='text-lg font-semibold mb-3'>Thumbnail (also cached)</h3>
              <div className='relative inline-block'>
                <CachedImage
                  src={image.thumbnail}
                  alt={`${image.title} thumbnail`}
                  className='w-32 h-24 object-cover rounded-lg'
                  showCacheStatus={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cache Info */}
        <div
          className={`mt-8 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-md`}
        >
          <h3 className='font-semibold mb-2'>🚀 Performance Benefits:</h3>
          <ul className='text-sm space-y-1 text-gray-600 dark:text-gray-300'>
            <li>• This full-size image was cached when you viewed the gallery</li>
            <li>• No additional network request was made when navigating here</li>
            <li>• Both thumbnail and full-size images are cached independently</li>
            <li>• Navigate back and forth to see instant loading</li>
            <li>• Check browser DevTools Network tab to verify no duplicate requests</li>
          </ul>
        </div>

        {/* Related Images */}
        {(prevImage || nextImage) && (
          <div
            className={`mt-8 p-6 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-md`}
          >
            <h3 className='text-lg font-semibold mb-4'>Related Images</h3>
            <div className='flex space-x-4'>
              {prevImage && (
                <Link to={`/gallery/${prevImage.id}`} className='flex-1 group'>
                  <div className='relative overflow-hidden rounded-lg'>
                    <CachedImage
                      src={prevImage.thumbnail}
                      alt={prevImage.title}
                      className='w-full h-24 object-cover group-hover:scale-105 transition-transform'
                      showCacheStatus={true}
                    />
                  </div>
                  <p className='text-sm mt-2 text-center'>{prevImage.title}</p>
                </Link>
              )}
              {nextImage && (
                <Link to={`/gallery/${nextImage.id}`} className='flex-1 group'>
                  <div className='relative overflow-hidden rounded-lg'>
                    <CachedImage
                      src={nextImage.thumbnail}
                      alt={nextImage.title}
                      className='w-full h-24 object-cover group-hover:scale-105 transition-transform'
                      showCacheStatus={true}
                    />
                  </div>
                  <p className='text-sm mt-2 text-center'>{nextImage.title}</p>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
