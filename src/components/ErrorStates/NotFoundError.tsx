import { Search, Home, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/Typography/Text';

interface NotFoundErrorProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  showRetryButton?: boolean;
  onRetry?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  context?: string;
}

export const NotFoundError = ({
  title,
  message,
  showHomeButton = true,
  showBackButton = true,
  showRetryButton = false,
  onRetry,
  className,
  size = 'md',
  context = 'resource'
}: NotFoundErrorProps) => {
  const navigate = useNavigate();

  const contextTitles = {
    page: "Page Not Found",
    resource: "Resource Not Found",
    data: "Data Not Found",
    patient: "Patient Not Found",
    record: "Record Not Found"
  };

  const contextMessages = {
    page: "The page you're looking for doesn't exist or may have been moved.",
    resource: "The requested resource could not be found.",
    data: "The data you're looking for is not available.",
    patient: "The patient record you're looking for could not be found.",
    record: "The medical record you requested is not available."
  };

  const finalTitle = title || contextTitles[context as keyof typeof contextTitles] || contextTitles.resource;
  const finalMessage = message || contextMessages[context as keyof typeof contextMessages] || contextMessages.resource;

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

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
          "mx-auto mb-3 flex items-center justify-center rounded-full bg-muted text-muted-foreground",
          classes.icon
        )}>
          <Search className={classes.icon} />
        </div>
        <Text type="h3" className={cn("font-semibold text-foreground mb-2", classes.title)}>
          {finalTitle}
        </Text>
        <Text type="p" className={cn("text-muted-foreground", classes.message)}>
          {finalMessage}
        </Text>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {showHomeButton && (
          <Button 
            onClick={handleGoHome}
            variant="neutral"
            className="flex-1"
            size="default"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        )}
        
        {showBackButton && (
          <Button 
            variant="neutral"
            onClick={handleGoBack}
            className="flex-1"
            size="default"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        )}
      </div>

      {showRetryButton && (
        <Button 
          variant="neutral"
          onClick={handleRetry}
          className="mt-3 w-full"
          size="default"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}

      <div className="mt-4 text-xs text-muted-foreground">
        Error Code: 404 - Not Found
      </div>
    </div>
  );
};