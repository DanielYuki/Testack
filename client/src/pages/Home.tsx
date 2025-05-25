import { useAtom } from 'jotai'
import { themeAtom, completedTodosCountAtom } from '../store/atoms'

export default function Home() {
  const [theme] = useAtom(themeAtom)
  const [completedCount] = useAtom(completedTodosCountAtom)

  const techStack = [
    { name: 'Vite', description: 'Fast build tool and dev server', icon: '⚡' },
    { name: 'React', description: 'UI library with hooks and components', icon: '⚛️' },
    { name: 'TailwindCSS', description: 'Utility-first CSS framework', icon: '🎨' },
    { name: 'Jotai', description: 'Primitive and flexible state management', icon: '🔄' },
    { name: 'React Router', description: 'Declarative routing for React', icon: '🛣️' },
    { name: 'Image Caching', description: 'Smart image caching with Jotai atoms', icon: '🖼️' },
    { name: 'Theme System', description: 'Advanced theming with system detection', icon: '🎨' },
  ]

  return (
    <div
      className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      <div className='container mx-auto max-w-4xl'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>
            Tech Stack Template
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            A modern React template with Vite, TailwindCSS, Jotai, and React Router
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {techStack.map(tech => (
            <div
              key={tech.name}
              className={`p-6 rounded-lg shadow-md transition-transform hover:scale-105 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className='text-3xl mb-3'>{tech.icon}</div>
              <h3 className='text-xl font-semibold mb-2'>{tech.name}</h3>
              <p className='text-gray-600 dark:text-gray-300'>{tech.description}</p>
            </div>
          ))}
        </div>

        <div
          className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}
        >
          <h2 className='text-2xl font-bold mb-4'>Quick Stats</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-blue-500'>{completedCount}</div>
              <div className='text-sm text-gray-600 dark:text-gray-300'>Completed Tasks</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-green-500'>7</div>
              <div className='text-sm text-gray-600 dark:text-gray-300'>Technologies</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-purple-500'>6</div>
              <div className='text-sm text-gray-600 dark:text-gray-300'>Pages</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-orange-500'>∞</div>
              <div className='text-sm text-gray-600 dark:text-gray-300'>Possibilities</div>
            </div>
          </div>
        </div>

        <div className='mt-8 text-center'>
          <p className='text-gray-600 dark:text-gray-300'>
            Navigate through the pages to see each technology in action!
          </p>
        </div>
      </div>
    </div>
  )
}
