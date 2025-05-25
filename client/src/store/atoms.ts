import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Counter atom for demonstrating state management
export const counterAtom = atom(0)

// User atom for demonstrating more complex state
export const userAtom = atom({
  name: 'Guest',
  email: '',
  isLoggedIn: false,
})

// Theme preference atom with persistence
export const themePreferenceAtom = atomWithStorage<'light' | 'dark' | 'system'>(
  'theme-preference',
  'system'
)

// System theme detection atom
export const systemThemeAtom = atom<'light' | 'dark'>('light')

// Computed theme atom that resolves the actual theme
export const themeAtom = atom(get => {
  const preference = get(themePreferenceAtom)
  const systemTheme = get(systemThemeAtom)

  if (preference === 'system') {
    return systemTheme
  }
  return preference
})

// Todo list atom for demonstrating array state management
export const todosAtom = atom([
  { id: 1, text: 'Learn Vite', completed: true },
  { id: 2, text: 'Learn TailwindCSS', completed: true },
  { id: 3, text: 'Learn Jotai', completed: false },
  { id: 4, text: 'Learn React Router', completed: false },
])

// Derived atom for completed todos count
export const completedTodosCountAtom = atom(get => {
  const todos = get(todosAtom)
  return todos.filter(todo => todo.completed).length
})

// Image cache atom for storing loaded images
export const imageCacheAtom = atom<Record<string, string>>({})

// Gallery images atom with sample data
export const galleryImagesAtom = atom([
  {
    id: 1,
    title: 'Mountain Landscape',
    description: 'Beautiful mountain scenery with snow-capped peaks',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'Ocean Sunset',
    description: 'Stunning sunset over the ocean with vibrant colors',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'Forest Path',
    description: 'Peaceful forest trail surrounded by tall trees',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
  },
  {
    id: 4,
    title: 'City Skyline',
    description: 'Modern city skyline at night with illuminated buildings',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop',
  },
  {
    id: 5,
    title: 'Desert Dunes',
    description: 'Golden sand dunes in the desert under clear blue sky',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=200&fit=crop',
  },
  {
    id: 6,
    title: 'Waterfall',
    description: 'Majestic waterfall cascading down rocky cliffs',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
  },
])

// Selected image atom for detail view
export const selectedImageAtom = atom<number | null>(null)
