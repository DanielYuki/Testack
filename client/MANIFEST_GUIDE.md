# PWA Manifest Configuration Guide

This guide explains all the properties you can configure in your PWA manifest within `vite.config.ts`.

## 📍 Where to Edit

Edit the manifest in your `vite.config.ts` file:

```typescript
VitePWA({
  manifest: {
    // All your manifest properties go here
  },
})
```

## 🏷️ Required Properties

### Basic Identity

```typescript
name: 'Your App Name',              // Full name (up to 45 characters)
short_name: 'AppName',             // Short name for home screen (up to 12 characters)
description: 'App description',     // What your app does
```

### Icons (Required for Installation)

```typescript
icons: [
  {
    src: '/icon-192.png',
    sizes: '192x192',
    type: 'image/png',
  },
  {
    src: '/icon-512.png', // Required for installation
    sizes: '512x512',
    type: 'image/png',
  },
  {
    src: '/icon-512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'any maskable', // Android adaptive icons
  },
]
```

## 🎨 Visual & Display Properties

### Colors

```typescript
theme_color: '#3b82f6',            // Browser UI color (address bar, etc.)
background_color: '#ffffff',      // Splash screen background color
```

### Display Modes

```typescript
display: 'standalone',            // How the app appears when launched
```

**Display Options:**

- `'fullscreen'` - Full screen, no browser UI
- `'standalone'` - Looks like native app (recommended)
- `'minimal-ui'` - Minimal browser controls
- `'browser'` - Regular browser tab

### Orientation

```typescript
orientation: 'portrait',          // Preferred orientation
```

**Orientation Options:**

- `'portrait'` - Vertical orientation
- `'landscape'` - Horizontal orientation
- `'any'` - Any orientation
- `'natural'` - Device's natural orientation
- `'portrait-primary'` - Primary portrait
- `'landscape-primary'` - Primary landscape

## 🧭 Navigation Properties

```typescript
start_url: '/',                   // URL to open when app launches
scope: '/',                       // Which URLs are part of your app
```

**Scope Examples:**

- `'/'` - Entire domain
- `'/app/'` - Only URLs starting with /app/
- `'/myapp/'` - Only URLs starting with /myapp/

## 🌍 Localization

```typescript
lang: 'en-US',                    // Primary language (ISO language code)
dir: 'ltr',                       // Text direction
```

**Direction Options:**

- `'ltr'` - Left to right
- `'rtl'` - Right to left (Arabic, Hebrew)
- `'auto'` - Automatic

## 📱 App Store & Discovery

### Categories

```typescript
categories: ['productivity', 'utilities', 'business'],
```

**Popular Categories:**

- `'business'`, `'education'`, `'entertainment'`
- `'finance'`, `'fitness'`, `'food'`, `'games'`
- `'government'`, `'health'`, `'lifestyle'`, `'medical'`
- `'music'`, `'navigation'`, `'news'`, `'personalization'`
- `'photo'`, `'productivity'`, `'security'`, `'shopping'`
- `'social'`, `'sports'`, `'travel'`, `'utilities'`, `'weather'`

### Screenshots (for app stores)

```typescript
screenshots: [
  {
    src: '/screenshots/desktop.png',
    sizes: '1280x720',
    type: 'image/png',
    form_factor: 'wide', // Desktop/tablet
    label: 'Desktop view',
  },
  {
    src: '/screenshots/mobile.png',
    sizes: '414x896',
    type: 'image/png',
    form_factor: 'narrow', // Mobile
    label: 'Mobile view',
  },
]
```

## 🚀 App Shortcuts

Add shortcuts to your app's context menu:

```typescript
shortcuts: [
  {
    name: 'New Document',
    short_name: 'New',
    description: 'Create a new document',
    url: '/new',
    icons: [{ src: '/icons/new.png', sizes: '192x192' }],
  },
  {
    name: 'Settings',
    short_name: 'Settings',
    description: 'App settings',
    url: '/settings',
    icons: [{ src: '/icons/settings.png', sizes: '192x192' }],
  },
]
```

## 🔗 Advanced Integration

### Share Target (Receive shared content)

```typescript
share_target: {
  action: '/share',
  method: 'POST',
  params: {
    title: 'title',
    text: 'text',
    url: 'url'
  }
}
```

### Protocol Handlers

```typescript
protocol_handlers: [
  {
    protocol: 'mailto',
    url: '/mail?to=%s',
  },
  {
    protocol: 'web+myapp',
    url: '/handle?data=%s',
  },
]
```

### File Handlers

```typescript
file_handlers: [
  {
    action: '/open-file',
    accept: {
      'application/json': ['.json'],
      'text/plain': ['.txt', '.md'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
  },
]
```

### Launch Handler

```typescript
launch_handler: {
  client_mode: 'focus-existing' // What to do when app is launched again
}
```

**Client Mode Options:**

- `'auto'` - Browser decides
- `'focus-existing'` - Focus existing window
- `'navigate-new'` - Open new window
- `'navigate-existing'` - Navigate existing window

## 🔧 Platform-Specific Features

### Related Native Apps

```typescript
prefer_related_applications: false,  // Prefer PWA over native app
related_applications: [
  {
    platform: 'play',
    url: 'https://play.google.com/store/apps/details?id=com.example.app',
    id: 'com.example.app'
  },
  {
    platform: 'itunes',
    url: 'https://apps.apple.com/app/example/id123456789'
  }
]
```

### Content Rating

```typescript
iarc_rating_id: 'e84b072d-71b3-4d3e-86ae-31a8ce4e53b7' // Content rating ID
```

### Edge Sidebar (Microsoft Edge)

```typescript
edge_side_panel: {
  preferred_width: 400
}
```

## 📊 Common Examples

### Basic App

```typescript
manifest: {
  name: 'My Awesome App',
  short_name: 'AwesomeApp',
  description: 'An awesome progressive web app',
  theme_color: '#2196F3',
  background_color: '#ffffff',
  display: 'standalone',
  start_url: '/',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
  ]
}
```

### Business App

```typescript
manifest: {
  name: 'Business Dashboard',
  short_name: 'Dashboard',
  description: 'Manage your business operations',
  theme_color: '#1976D2',
  background_color: '#f5f5f5',
  display: 'standalone',
  orientation: 'any',
  categories: ['business', 'productivity'],
  shortcuts: [
    {
      name: 'Analytics',
      url: '/analytics',
      icons: [{ src: '/icons/analytics.png', sizes: '192x192' }]
    }
  ]
}
```

### Media App

```typescript
manifest: {
  name: 'Photo Gallery',
  short_name: 'Gallery',
  description: 'View and organize your photos',
  theme_color: '#E91E63',
  background_color: '#000000',
  display: 'fullscreen',
  orientation: 'any',
  categories: ['photo', 'entertainment'],
  file_handlers: [
    {
      action: '/view',
      accept: {
        'image/*': ['.jpg', '.png', '.gif', '.webp']
      }
    }
  ]
}
```

## 🧪 Testing Your Manifest

1. **Chrome DevTools**: Application tab → Manifest
2. **Lighthouse**: Run PWA audit
3. **PWA Builder**: https://www.pwabuilder.com/
4. **Manifest Validator**: https://manifest-validator.appspot.com/

## 📝 Best Practices

1. **Keep names short** - `short_name` should be ≤12 characters
2. **Provide multiple icon sizes** - 192px and 512px minimum
3. **Use high contrast colors** - Ensure accessibility
4. **Test on multiple devices** - Different screen sizes and orientations
5. **Optimize screenshots** - High quality, representative of app features
6. **Use meaningful descriptions** - Help users understand your app's purpose

## 🔄 Dynamic Manifest

You can also generate the manifest dynamically:

```typescript
VitePWA({
  manifest: {
    name: process.env.VITE_APP_NAME || 'Default App Name',
    theme_color: process.env.VITE_THEME_COLOR || '#3b82f6',
    // ... other properties
  },
})
```

---

This guide covers all major manifest properties. Choose the ones that make sense for your app!
