import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/counter', label: 'Counter' },
    { path: '/todos', label: 'Todos' },
    { path: '/profile', label: 'Profile' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/theme', label: 'Theme' },
    { path: '/design-system', label: 'Design System' },
  ]

  return (
    <nav className={`p-4 shadow-md bg-background text-foreground`}>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex space-x-6'>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md transition-colors ${
                location.pathname === item.path ? 'bg-primary text-white' : 'hover:bg-primary/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <ThemeToggle showLabel={true} />
      </div>
    </nav>
  )
}
