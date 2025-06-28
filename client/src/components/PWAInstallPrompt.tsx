import { useState } from 'react'
import { X, Download, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePWA } from '@/hooks/usePWA'

export default function PWAInstallPrompt() {
  const { isInstallable, installApp } = usePWA()
  const [isVisible, setIsVisible] = useState(true)

  if (!isInstallable || !isVisible) {
    return null
  }

  const handleInstall = async () => {
    await installApp()
    setIsVisible(false)
  }

  const handleDismiss = () => {
    setIsVisible(false)
  }

  return (
    <div className='fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50'>
      <div className='bg-card border border-border rounded-lg shadow-lg p-4'>
        <div className='flex items-start justify-between mb-3'>
          <div className='flex items-center space-x-2'>
            <div className='p-2 bg-primary rounded-lg'>
              <Smartphone className='h-4 w-4 text-primary-foreground' />
            </div>
            <div>
              <h3 className='font-semibold text-sm text-foreground'>Install TeStack</h3>
              <p className='text-xs text-muted-foreground'>Get the full app experience</p>
            </div>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleDismiss}
            className='h-6 w-6 -mt-1 -mr-1'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>

        <div className='text-xs text-muted-foreground mb-4'>
          Install TeStack for faster loading, offline access, and a native app experience.
        </div>

        <div className='flex space-x-2'>
          <Button onClick={handleInstall} size='sm' className='flex-1'>
            <Download className='h-4 w-4 mr-2' />
            Install
          </Button>
          <Button variant='outline' size='sm' onClick={handleDismiss}>
            Later
          </Button>
        </div>
      </div>
    </div>
  )
}
