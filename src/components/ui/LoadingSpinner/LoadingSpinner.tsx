import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  style?: React.CSSProperties;
}

const LoadingSpinner = ({ size = "md", className, text = "Loading...", style = {} }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div
          className={cn(
            "animate-spin rounded-full border-2 border-border border-t-primary mx-auto mb-4",
            sizeClasses[size],
            className
          )}
          role="status"
          aria-label="Loading"
          style={style}
        />
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;