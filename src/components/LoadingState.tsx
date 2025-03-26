
import React from "react";

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
      </div>
      <p className="mt-4 text-muted-foreground">{message}</p>
    </div>
  );
};

export default LoadingState;
