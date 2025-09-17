import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
    resetErrorBoundary()
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
        </p>
        
        {import.meta.env.DEV && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Error Details:</h3>
            <pre className="text-xs text-red-700 overflow-auto max-h-32">
              {error?.message || 'Unknown error occurred'}
            </pre>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={resetErrorBoundary}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <button
            onClick={handleGoHome}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </div>
        
        <button
          onClick={handleRefresh}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          Or refresh the page
        </button>
      </div>
    </div>
  )
}

export default ErrorFallback