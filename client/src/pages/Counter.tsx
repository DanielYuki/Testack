import { useAtom } from 'jotai'
import { counterAtom, themeAtom } from '../store/atoms'

export default function Counter() {
  const [count, setCount] = useAtom(counterAtom)
  const [theme] = useAtom(themeAtom)

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)

  return (
    <div
      className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      <div className='container mx-auto max-w-2xl'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4'>Jotai Counter</h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Demonstrating global state management with Jotai atoms
          </p>
        </div>

        <div
          className={`p-8 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className='text-center mb-8'>
            <div className='text-8xl font-bold text-blue-500 mb-4'>{count}</div>
            <p className='text-gray-600 dark:text-gray-300'>
              Current count value stored in Jotai atom
            </p>
          </div>

          <div className='flex justify-center space-x-4 mb-8'>
            <button
              onClick={decrement}
              className='px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold'
            >
              - Decrement
            </button>
            <button
              onClick={reset}
              className='px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold'
            >
              Reset
            </button>
            <button
              onClick={increment}
              className='px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold'
            >
              + Increment
            </button>
          </div>

          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className='font-semibold mb-2'>💡 Jotai Features Demonstrated:</h3>
            <ul className='text-sm space-y-1 text-gray-600 dark:text-gray-300'>
              <li>• Global state management with atoms</li>
              <li>• Automatic re-rendering when atom values change</li>
              <li>• Simple and intuitive API with useAtom hook</li>
              <li>• State persists across page navigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
