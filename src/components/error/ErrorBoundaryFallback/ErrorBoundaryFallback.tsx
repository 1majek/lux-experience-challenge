import React from 'react';
import './ErrorBoundaryFallback.scss';

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-boundary-fallback" role="alert">
      <h2>Oops! Something went wrong.</h2>
      <p>We've encountered an unexpected error. Please try again.</p>
      {process.env.NODE_ENV === 'development' && (
        <pre className="error-details">
          {error.name}: {error.message}
          {error.stack && `\n${error.stack}`}
        </pre>
      )}
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorBoundaryFallback;
