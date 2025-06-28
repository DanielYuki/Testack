import { WifiOff, Wifi } from 'lucide-react'
import { usePWA } from '@/hooks/usePWA'

export default function OfflineIndicator() {
  const { isOnline, offlineReady } = usePWA()

  if (isOnline) {
    return null
  }

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-2 shadow-lg">
        <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-200">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">
            {offlineReady ? 'App ready for offline use' : 'You are offline'}
          </span>
          {offlineReady && <Wifi className="h-4 w-4 text-green-600" />}
        </div>
      </div>
    </div>
  )
} 