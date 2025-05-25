# Tech Stack Template with Design System

A modern React template showcasing the integration of:

- ⚡ **Vite** - Fast build tool and development server
- ⚛️ **React 19** - Latest React with modern hooks
- 🎨 **TailwindCSS v4** - Utility-first CSS framework with custom variables
- 🔄 **Jotai** - Primitive and flexible state management
- 🛣️ **React Router v7** - Declarative routing for React
- 🎯 **Design System** - Comprehensive CSS variables and design tokens

## Features

### Core Features

- 🌙 **Advanced Theme System** - Smart dark/light/system theme with real-time detection
- 📱 **Responsive Design** - Mobile-first responsive layouts
- 🎯 **State Management Examples** - Counter, todos, user profile, and theme state
- 🧭 **Navigation** - Clean navigation with active route highlighting
- 💡 **Educational** - Each page demonstrates specific library features
- 🎨 **Code Formatting** - Prettier integration with ESLint compatibility
- ⚙️ **VS Code Integration** - Auto-format on save configuration

### Design System Features

- 🎨 **Custom CSS Variables** - Comprehensive color system with semantic naming
- 🔧 **Design Tokens** - Type-safe access to design variables in TypeScript
- 🌈 **Dynamic Theming** - Runtime color customization capabilities
- 📊 **Component Library** - Pre-built components using design tokens
- 🎭 **Status Colors** - Success, warning, error, and info color variants
- 📐 **Layout Variables** - Consistent spacing and border radius system
- 🖼️ **Image Caching** - Advanced canvas-based image caching system
- 🔍 **Interactive Demo** - Live design system showcase page

## Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start development server:**

   ```bash
   pnpm dev
   ```

3. **Build for production:**

   ```bash
   pnpm build
   ```

4. **Format code with Prettier:**

   ```bash
   pnpm format
   ```

5. **Check code formatting:**

   ```bash
   pnpm format:check
   ```

6. **Lint and fix code:**
   ```bash
   pnpm lint:fix
   ```

## Project Structure

```
src/
├── components/              # Reusable components
│   ├── Navigation.tsx       # Main navigation component
│   ├── ThemeToggle.tsx      # Theme switching component
│   └── CachedImage.tsx      # Image caching component
├── pages/                   # Route components
│   ├── Home.tsx            # Landing page with tech stack overview
│   ├── Counter.tsx         # Jotai counter example
│   ├── Todos.tsx           # Complex state management example
│   ├── Profile.tsx         # User state management example
│   ├── Gallery.tsx         # Image gallery with caching
│   ├── ImageDetail.tsx     # Individual image view
│   ├── ThemeSettings.tsx   # Advanced theme management
│   └── DesignSystem.tsx    # Design system showcase
├── providers/               # Context providers
│   └── ThemeProvider.tsx   # Theme system provider
├── hooks/                   # Custom hooks
│   ├── useTheme.ts         # Theme management hook
│   └── useImageCache.ts    # Image caching hook
├── store/                   # Jotai atoms
│   └── atoms.ts            # Global state definitions
├── lib/                     # Utilities
│   └── design-tokens.ts    # Design system utilities
├── App.tsx                 # Main app with routing
├── main.tsx                # App entry point
└── index.css               # CSS variables and TailwindCSS
```

## Design System & CSS Variables

### Available CSS Variables

Our design system includes comprehensive CSS variables organized into categories:

#### Core Colors

```css
--color-background
--color-foreground
--color-card
--color-card-foreground
```

#### Brand Colors

```css
--color-primary
--color-primary-foreground
--color-secondary
--color-secondary-foreground
--color-accent
--color-accent-foreground
```

#### Status Colors

```css
--color-success / --color-success-foreground
--color-warning / --color-warning-foreground
--color-destructive / --color-destructive-foreground
--color-info / --color-info-foreground
```

#### UI Colors

```css
--color-muted / --color-muted-foreground
--color-border
--color-input
--color-ring
```

### Usage Examples

#### 1. TailwindCSS Classes

```tsx
<div className='bg-primary text-primary-foreground'>Primary colored element</div>
```

#### 2. Custom Utility Classes

```tsx
<div className="bg-brand-primary text-white">
  Brand colored element
</div>
<div className="bg-status-success text-white">
  Success message
</div>
```

#### 3. JavaScript Integration

```tsx
import { cssVars, createColorStyle } from './lib/design-tokens'

// Direct variable access
<div style={{ backgroundColor: cssVars.primary }}>
  Direct CSS variable
</div>

// Helper function
<div style={createColorStyle('primary')}>
  Generated style object
</div>
```

#### 4. Component Style Presets

```tsx
import { componentStyles } from './lib/design-tokens'
;<button className={componentStyles.button.primary}>Primary Button</button>
```

### Dynamic Theming

The system supports runtime color customization:

```tsx
import { setCSSVar } from './lib/design-tokens'

// Change primary color at runtime
setCSSVar('--primary', 'oklch(0.7 0.2 180)')
```

## State Management with Jotai

This template demonstrates various Jotai patterns:

- **Simple atoms** - Counter state
- **Object atoms** - User profile data
- **Array atoms** - Todo list management
- **Derived atoms** - Computed values (completed todos count)
- **Persistent atoms** - Theme preferences with localStorage
- **Computed atoms** - System theme detection and intelligent fallbacks

## Advanced Theme System

Our theme system includes:

- **Three modes**: Light, Dark, System
- **System detection** - Automatically follows OS preference
- **Real-time updates** - Responds to system theme changes
- **Persistence** - Remembers user preference
- **Mobile support** - Updates theme-color meta tag
- **Type safety** - Full TypeScript integration

## Image Caching System

Advanced image caching features:

- **Canvas-based caching** - Prevents duplicate downloads
- **Performance monitoring** - Tracks cache hit rates
- **Blob URL management** - Efficient memory usage
- **Loading states** - Smooth user experience
- **Cache status indicators** - Visual feedback for development

## Styling with TailwindCSS v4

- **CSS Variables integration** - Native support for custom properties
- **Utility-first approach** - Atomic CSS methodology
- **Responsive design patterns** - Mobile-first breakpoints
- **Dark mode support** - Automatic theme switching
- **Component composition** - Reusable style patterns
- **Hover and transition effects** - Smooth interactions
- **Custom utility classes** - Extended with design tokens

## Routing with React Router v7

- **Declarative route definitions** - Clean route structure
- **Active link highlighting** - Visual navigation feedback
- **Navigation state management** - Smooth transitions
- **Clean URL structure** - SEO-friendly paths
- **Nested routing** - Gallery with image details

## Pages Overview

1. **Home** (`/`) - Tech stack overview and statistics
2. **Counter** (`/counter`) - Simple state management example
3. **Todos** (`/todos`) - Complex array state management
4. **Profile** (`/profile`) - Object state management
5. **Gallery** (`/gallery`) - Image caching and display
6. **Image Detail** (`/gallery/:id`) - Individual image view
7. **Theme Settings** (`/theme`) - Advanced theme management
8. **Design System** (`/design-system`) - Complete design system showcase

## Technologies

- **Vite 6.3.5** - Build tool
- **React 19.1.0** - UI library
- **TailwindCSS 4.1.7** - CSS framework with CSS variables
- **Jotai 2.12.4** - State management
- **React Router 7.6.0** - Routing
- **TypeScript 5.8.3** - Type safety
- **Prettier 3.5.3** - Code formatting
- **ESLint 9.25.0** - Code linting

## Browser Support

- **Modern browsers** - Chrome, Firefox, Safari, Edge
- **CSS Variables** - Full support for custom properties
- **OKLCH colors** - Modern color space support
- **System theme detection** - `prefers-color-scheme` media query

## Performance Features

- **Vite HMR** - Hot module replacement for fast development
- **Image caching** - Prevents duplicate network requests
- **CSS variables** - Efficient theme switching
- **Code splitting** - Optimized bundle sizes
- **Tree shaking** - Dead code elimination

## Development Tips

1. **Use the Design System page** - Test colors and components
2. **Leverage design tokens** - Import from `lib/design-tokens.ts`
3. **Follow naming conventions** - Use semantic color names
4. **Test theme switching** - Verify components in both themes
5. **Use TypeScript** - Take advantage of type safety

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Test in both light and dark themes
5. Update documentation as needed

## License

MIT
