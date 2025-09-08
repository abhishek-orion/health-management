import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/Typography/Text';

interface GenericErrorProps {
  title?: string;
  message: string;
  statusCode?: number;
  showRetryButton?: boolean;
  showHomeButton?: boolean;
  onRetry?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GenericError = ({
  title = "Something went wrong",
  message,
  statusCode,
  showRetryButton = true,
  showHomeButton = false,
  onRetry,
  className,
  size = 'md'
}: GenericErrorProps) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    navigate('/dashboard');
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
          <AlertCircle className={classes.icon} />
        </div>
        <Text type="h3" className={cn("font-semibold text-foreground mb-2", classes.title)}>
          {title}
        </Text>
        <Text type="p" className={cn("text-muted-foreground", classes.message)}>
          {message}
        </Text>
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
        
        {showHomeButton && (
          <Button 
            variant="neutral"
            onClick={handleGoHome}
            className="flex-1"
            size="default"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        )}
      </div>

      {statusCode && (
        <div className="mt-4 text-xs text-muted-foreground">
          {statusCode > 0 ? `Error Code: ${statusCode}` : 'System Error'}
        </div>
      )}
    </div>
  );
};