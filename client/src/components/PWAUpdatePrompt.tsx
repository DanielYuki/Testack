import { RefreshCw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePWA } from '@/hooks/usePWA'

export default function PWAUpdatePrompt() {
  const { needRefresh, updateApp, dismissUpdate } = usePWA()

  if (!needRefresh) {
    return null
  }

  const handleUpdate = async () => {
    await updateApp()
  }

  return (
    <div className='fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50'>
      <div className='bg-card border border-border rounded-lg shadow-lg p-4'>
        <div className='flex items-start justify-between mb-3'>
          <div className='flex items-center space-x-2'>
            <div className='p-2 bg-blue-500 rounded-lg'>
              <RefreshCw className='h-4 w-4 text-white' />
            </div>
            <div>
              <h3 className='font-semibold text-sm text-foreground'>Update Available</h3>
              <p className='text-xs text-muted-foreground'>A new version is ready</p>
            </div>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={dismissUpdate}
            className='h-6 w-6 -mt-1 -mr-1'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>

        <div className='text-xs text-muted-foreground mb-4'>
          A new version of TeStack is available. Update now to get the latest features and
          improvements.
        </div>

        <div className='flex space-x-2'>
          <Button onClick={handleUpdate} size='sm' className='flex-1'>
            <RefreshCw className='h-4 w-4 mr-2' />
            Update Now
          </Button>
          <Button variant='outline' size='sm' onClick={dismissUpdate}>
            Later
          </Button>
        </div>
      </div>
    </div>
  )
}
