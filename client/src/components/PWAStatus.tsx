import { Download, Smartphone, Wifi, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePWA } from '@/hooks/usePWA'

export default function PWAStatus() {
  const { 
    isOnline, 
    isInstallable, 
    isInstalled, 
    installApp, 
    offlineReady 
  } = usePWA()

  return (
    <div className="flex items-center space-x-2">
      {/* Online/Offline Status */}
      <div className="flex items-center space-x-1">
        {isOnline ? (
          <div title="Online">
            <Wifi className="h-4 w-4 text-green-500" />
          </div>
        ) : (
          <div title={offlineReady ? "Offline Ready" : "Offline"}>
            <WifiOff className="h-4 w-4 text-amber-500" />
          </div>
        )}
        {!isOnline && offlineReady && (
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Offline Ready
          </span>
        )}
      </div>

      {/* Install Button */}
      {isInstallable && (
        <Button
          variant="outline"
          size="sm"
          onClick={installApp}
          className="hidden sm:flex"
        >
          <Download className="h-4 w-4 mr-1" />
          Install
        </Button>
      )}

      {/* Mobile Install Button */}
      {isInstallable && (
        <Button
          variant="outline"
          size="icon"
          onClick={installApp}
          className="sm:hidden h-8 w-8"
          title="Install App"
        >
          <Smartphone className="h-4 w-4" />
        </Button>
      )}

      {/* Installed Indicator */}
      {isInstalled && (
        <div className="hidden sm:flex items-center space-x-1 text-green-600">
          <Smartphone className="h-4 w-4" />
          <span className="text-xs">Installed</span>
        </div>
      )}
    </div>
  )
} 