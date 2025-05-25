import { useAtom } from 'jotai'
import { Link } from 'react-router-dom'
import { galleryImagesAtom, selectedImageAtom, themeAtom } from '../store/atoms'
import CachedImage from '../components/CachedImage'

export default function Gallery() {
  const [images] = useAtom(galleryImagesAtom)
  const [, setSelectedImage] = useAtom(selectedImageAtom)
  const [theme] = useAtom(themeAtom)

  const handleImageClick = (imageId: number) => {
    setSelectedImage(imageId)
  }

  return (
    <div
      className={`min-h-screen p-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4'>Image Gallery</h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Demonstrating image caching with Jotai - images won't reload when navigating to detail
            view
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {images.map(image => (
            <Link
              key={image.id}
              to={`/gallery/${image.id}`}
              onClick={() => handleImageClick(image.id)}
              className={`block rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className='relative'>
                <CachedImage
                  src={image.thumbnail}
                  alt={image.title}
                  className='w-full h-48 object-cover'
                  showCacheStatus={true}
                />
              </div>
              <div className='p-4'>
                <h3 className='text-lg font-semibold mb-2'>{image.title}</h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm line-clamp-2'>
                  {image.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div
          className={`mt-8 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-md`}
        >
          <h3 className='font-semibold mb-2'>💡 Image Caching Features Demonstrated:</h3>
          <ul className='text-sm space-y-1 text-gray-600 dark:text-gray-300'>
            <li>• Images are cached in Jotai state after first load</li>
            <li>• Green "✓ Cached" badge appears when image is cached</li>
            <li>• Navigating to detail view reuses cached images</li>
            <li>• No duplicate network requests for the same image</li>
            <li>• Loading states and error handling included</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
