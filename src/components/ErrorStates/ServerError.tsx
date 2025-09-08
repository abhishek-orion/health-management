import { Server, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button/button';
import { cn } from '@/lib/utils';

interface ServerErrorProps {
  title?: string;
  message?: string;
  showRetryButton?: boolean;
  onRetry?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ServerError = ({
  title = "Server Error",
  message = "Something went wrong on our end. Our team has been notified and is working to fix the issue.",
  showRetryButton = true,
  onRetry,
  className,
  size = 'md'
}: ServerErrorProps) => {
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

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg",
      classes.container,
      className
    )}>
      <div className="mb-4">
        <div className={cn(
          "mx-auto mb-3 flex items-center justify-center rounded-full bg-error/10 text-error",
          classes.icon
        )}>
          <Server className={classes.icon} />
        </div>
        <h3 className={cn("font-semibold text-foreground mb-2", classes.title)}>
          {title}
        </h3>
        <p className={cn("text-muted-foreground", classes.message)}>
          {message}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {showRetryButton && (
          <Button 
            onClick={handleRetry}
            className="flex-1"
            size="default"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>

      <div className="mt-4 space-y-1 text-xs text-muted-foreground">
        <div>Error Code: 500 - Internal Server Error</div>
        <div>If this persists, please contact support</div>
      </div>
    </div>
  );
};