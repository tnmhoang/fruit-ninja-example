import { useRouteError } from 'react-router-dom';

const ErrorBoundaryError = () => {
  const error = useRouteError();
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : JSON.stringify(error);

  return (
    <div className="h-screen bg-white p-4">
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>{errorMessage}</code>
      </blockquote>
    </div>
  );
};

export default ErrorBoundaryError;
