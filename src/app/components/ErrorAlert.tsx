import { memo } from 'react';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert = memo(({ message }: ErrorAlertProps) => (
  <div
    role='alert'
    className='text-red-500 bg-red-100 border border-red-300 p-3 rounded-md mb-4'
  >
    {message}
  </div>
));
