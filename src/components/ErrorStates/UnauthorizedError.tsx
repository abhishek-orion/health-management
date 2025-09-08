import { AlertTriangle, LogIn, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button/button';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/Typography/Text';
import { useNavigate } from 'react-router-dom';

interface UnauthorizedErrorProps {
  title?: string;
  message?: string;
  showLoginButton?: boolean;
  showRetryButton?: boolean;
  onRetry?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UnauthorizedError = ({
  title = "Authentication Required",
  message = "You need to be logged in to access this resource. Please sign in to continue.",
  showLoginButton = true,
  showRetryButton = false,
  onRetry,
  className,
  size = 'md'
}: UnauthorizedErrorProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogin = () => {
    logout();
    navigate('/login');
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      navigate('/login');
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
          "mx-auto mb-3 flex items-center justify-center rounded-full bg-warning/10 text-warning",
          classes.icon
        )}>
          <AlertTriangle className={classes.icon} />
        </div>
        <Text type="h3" className={cn("font-semibold text-foreground mb-2", classes.title)}>
          {title}
        </Text>
        <Text type="p" className={cn("text-muted-foreground", classes.message)}>
          {message}
        </Text>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {showLoginButton && (
          <Button 
            onClick={handleLogin}
            className="flex-1"
            size="default"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
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
        Error Code: 401 - Unauthorized
      </div>
    </div>
  );
};