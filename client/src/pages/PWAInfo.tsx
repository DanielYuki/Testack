import {
  Smartphone,
  Download,
  Wifi,
  WifiOff,
  RefreshCw,
  Shield,
  Zap,
  HardDrive,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePWA } from '@/hooks/usePWA'

export default function PWAInfo() {
  const { isOnline, isInstallable, isInstalled, needRefresh, offlineReady, installApp, updateApp } =
    usePWA()

  const features = [
    {
      icon: <Zap className='h-6 w-6' />,
      title: 'Fast Loading',
      description: 'Service worker caches resources for lightning-fast load times',
    },
    {
      icon: <WifiOff className='h-6 w-6' />,
      title: 'Offline Support',
      description: "Continue using the app even when you're offline",
    },
    {
      icon: <Smartphone className='h-6 w-6' />,
      title: 'App-like Experience',
      description: 'Install on your device for a native app feel',
    },
    {
      icon: <RefreshCw className='h-6 w-6' />,
      title: 'Auto Updates',
      description: 'Automatic updates ensure you always have the latest version',
    },
    {
      icon: <Shield className='h-6 w-6' />,
      title: 'Secure',
      description: 'HTTPS and service worker security for safe browsing',
    },
    {
      icon: <HardDrive className='h-6 w-6' />,
      title: 'Smart Caching',
      description: 'Intelligent caching of images and API responses',
    },
  ]

  return (
    <div className='container mx-auto max-w-4xl'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold mb-4'>Progressive Web App</h1>
        <p className='text-muted-foreground'>
          TeStack is a fully-featured PWA with offline support, installability, and more
        </p>
      </div>

      {/* PWA Status Card */}
      <div className='bg-card border border-border rounded-lg p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>PWA Status</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
          {/* Connection Status */}
          <div className='flex items-center space-x-3 p-4 bg-background rounded-lg'>
            {isOnline ? (
              <Wifi className='h-8 w-8 text-green-500' />
            ) : (
              <WifiOff className='h-8 w-8 text-amber-500' />
            )}
            <div>
              <h3 className='font-medium'>Connection</h3>
              <p className='text-sm text-muted-foreground'>{isOnline ? 'Online' : 'Offline'}</p>
            </div>
          </div>

          {/* Install Status */}
          <div className='flex items-center space-x-3 p-4 bg-background rounded-lg'>
            <Smartphone
              className={`h-8 w-8 ${isInstalled ? 'text-green-500' : 'text-muted-foreground'}`}
            />
            <div>
              <h3 className='font-medium'>Installation</h3>
              <p className='text-sm text-muted-foreground'>
                {isInstalled ? 'Installed' : isInstallable ? 'Available' : 'Not Available'}
              </p>
            </div>
          </div>

          {/* Offline Ready Status */}
          <div className='flex items-center space-x-3 p-4 bg-background rounded-lg'>
            <HardDrive
              className={`h-8 w-8 ${offlineReady ? 'text-green-500' : 'text-muted-foreground'}`}
            />
            <div>
              <h3 className='font-medium'>Offline Ready</h3>
              <p className='text-sm text-muted-foreground'>{offlineReady ? 'Yes' : 'Caching...'}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap gap-4'>
          {isInstallable && (
            <Button onClick={installApp}>
              <Download className='h-4 w-4 mr-2' />
              Install App
            </Button>
          )}

          {needRefresh && (
            <Button onClick={updateApp} variant='outline'>
              <RefreshCw className='h-4 w-4 mr-2' />
              Update Available
            </Button>
          )}

          {isInstalled && (
            <div className='flex items-center text-green-600'>
              <Smartphone className='h-4 w-4 mr-2' />
              App is installed!
            </div>
          )}
        </div>
      </div>

      {/* PWA Features */}
      <div className='bg-card border border-border rounded-lg p-6'>
        <h2 className='text-2xl font-semibold mb-6'>PWA Features</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <div key={index} className='flex items-start space-x-3'>
              <div className='p-2 bg-primary/10 rounded-lg text-primary'>{feature.icon}</div>
              <div>
                <h3 className='font-medium mb-2'>{feature.title}</h3>
                <p className='text-sm text-muted-foreground'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Details */}
      <div className='bg-card border border-border rounded-lg p-6 mt-8'>
        <h2 className='text-2xl font-semibold mb-4'>Technical Details</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h3 className='font-medium mb-2'>Service Worker</h3>
            <p className='text-sm text-muted-foreground mb-4'>
              Handles caching, offline functionality, and background sync.
            </p>

            <h3 className='font-medium mb-2'>Web App Manifest</h3>
            <p className='text-sm text-muted-foreground mb-4'>
              Provides metadata for installation and app-like behavior.
            </p>
          </div>

          <div>
            <h3 className='font-medium mb-2'>Caching Strategy</h3>
            <ul className='text-sm text-muted-foreground space-y-1'>
              <li>• Network First: API calls</li>
              <li>• Cache First: Images</li>
              <li>• Stale While Revalidate: App shell</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
