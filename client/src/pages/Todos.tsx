import { useAtom } from 'jotai'
import { todosAtom, themeAtom, completedTodosCountAtom } from '../store/atoms'
import { useState } from 'react'

export default function Todos() {
  const [todos, setTodos] = useAtom(todosAtom)
  const [theme] = useAtom(themeAtom)
  const [completedCount] = useAtom(completedTodosCountAtom)
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = Math.max(...todos.map(t => t.id), 0) + 1
      setTodos([...todos, { id: newId, text: newTodo.trim(), completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div
      className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      <div className='container mx-auto max-w-3xl'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4'>Todo List</h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Demonstrating complex state management with Jotai atoms
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className='flex space-x-4 mb-4'>
            <input
              type='text'
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Add a new todo...'
              className={`flex-1 px-4 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              onClick={addTodo}
              className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold'
            >
              Add Todo
            </button>
          </div>

          <div className='flex justify-between items-center text-sm text-gray-600 dark:text-gray-300'>
            <span>Total: {todos.length} todos</span>
            <span>Completed: {completedCount} todos</span>
          </div>
        </div>

        <div className='space-y-3'>
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`p-4 rounded-lg shadow-md flex items-center space-x-4 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } ${todo.completed ? 'opacity-75' : ''}`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  todo.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : theme === 'dark'
                      ? 'border-gray-600 hover:border-green-500'
                      : 'border-gray-300 hover:border-green-500'
                } transition-colors`}
              >
                {todo.completed && '✓'}
              </button>

              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm'
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <div
            className={`text-center p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}
          >
            <p className='text-gray-500 text-lg'>No todos yet. Add one above!</p>
          </div>
        )}

        <div
          className={`mt-8 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}
        >
          <h3 className='font-semibold mb-2'>💡 Jotai Features Demonstrated:</h3>
          <ul className='text-sm space-y-1 text-gray-600 dark:text-gray-300'>
            <li>• Complex state management with arrays</li>
            <li>• Derived atoms (completedTodosCountAtom)</li>
            <li>• State mutations and updates</li>
            <li>• Real-time UI updates based on state changes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
