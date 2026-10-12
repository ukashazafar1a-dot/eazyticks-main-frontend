'use client';
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='flex min-h-[50vh] items-center justify-center flex-col'>
      <h2 className='h3 mb-5'>Something went wrong!</h2>
      <button
        className='btn btn--primary'
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}