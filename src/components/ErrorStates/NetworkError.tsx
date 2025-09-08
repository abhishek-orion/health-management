import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button/button';
import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/Typography/Text';

interface NetworkErrorProps {
  title?: string;
  message?: string;
  type?: 'network' | 'timeout';
  showRetryButton?: boolean;
  onRetry?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const NetworkError = ({
  title,
  message,
  type = 'network',
  showRetryButton = true,
  onRetry,
  className,
  size = 'md'
}: NetworkErrorProps) => {
  const defaultTitles = {
    network: "Connection Problem",
    timeout: "Request Timeout"
  };

  const defaultMessages = {
    network: "Unable to connect to the server. Please check your internet connection and try again.",
    timeout: "The request took too long to complete. Please try again."
  };

  const finalTitle = title || defaultTitles[type];
  const finalMessage = message || defaultMessages[type];

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const sizeClasses = {
    sm: {
      container: "p-4 max-w-sm",
      icon: "h-8 w-8",
      title: "text-lg",
      message: "text-sm"
    },
    md: {
      container: "p-6 max-w-md",
      icon: "h-12 w-12",
      title: "text-xl",
      message: "text-base"
    },
    lg: {
      container: "p-8 max-w-lg",
      icon: "h-16 w-16",
      title: "text-2xl",
      message: "text-lg"
    }
  };

  const classes = sizeClasses[size];
  const IconComponent = type === 'network' ? WifiOff : Wifi;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg",
      classes.container,
      className
    )}>
      <div className="mb-4">
        <div className={cn(
          "mx-auto mb-3 flex items-center justify-center rounded-full bg-warning/10 text-warning",
          classes.icon
        )}>
          <IconComponent className={classes.icon} />
        </div>
        <Text type="h3" className={cn("font-semibold text-foreground mb-2", classes.title)}>
          {finalTitle}
        </Text>
        <Text type="p" className={cn("text-muted-foreground", classes.message)}>
          {finalMessage}
        </Text>
      </div>

      {showRetryButton && (
        <div className="flex flex-col w-full">
          <Button 
            onClick={handleRetry}
            className="w-full mb-3"
            size="default"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <div className="text-xs text-muted-foreground">
            • Check your internet connection
            <br />
            • Try refreshing the page
            <br />
            • Contact support if the problem persists
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-muted-foreground">
        Error Type: {type === 'network' ? 'Network Error' : 'Timeout Error'}
      </div>
    </div>
  );
};