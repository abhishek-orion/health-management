import { Shield, Home, RefreshCw, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ForbiddenErrorProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showRetryButton?: boolean;
  showContactButton?: boolean;
  onRetry?: () => void;
  contactEmail?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ForbiddenError = ({
  title = "Access Forbidden",
  message = "You don't have permission to access this resource. Please contact your administrator if you believe this is an error.",
  showHomeButton = true,
  showRetryButton = false,
  onRetry,
  className,
  size = 'md'
}: ForbiddenErrorProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
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
          "mx-auto mb-3 flex items-center justify-center rounded-full bg-error/10 text-error",
          classes.icon
        )}>
          <Shield className={classes.icon} />
        </div>
        <h3 className={cn("font-semibold text-foreground mb-2", classes.title)}>
          {title}
        </h3>
        <p className={cn("text-muted-foreground", classes.message)}>
          {message}
        </p>
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
            Go to Dashboard
          </Button>
        )}
        
        {showRetryButton && (
          <Button 
            variant="neutral"
            onClick={handleRetry}
            className="flex-1"
            size="default"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
      <div className="mt-4 text-xs text-muted-foreground">
        Error Code: 403 - Forbidden
      </div>
    </div>
  );
};