
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { usePerformanceMetrics } from './hooks/usePerformanceMetrics';
import ErrorBoundary from './components/ErrorBoundary';

// Performance monitoring wrapper
const PerformanceMonitor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const metrics = usePerformanceMetrics();
  
  // Log metrics to console when they change
  React.useEffect(() => {
    if (metrics.lcp && metrics.fcp && metrics.cls !== null) {
      console.log('Core Web Vitals metrics:', metrics);
      
      // You could send these metrics to an analytics service here
    }
  }, [metrics]);
  
  return <>{children}</>;
};

// Enhanced error boundary for production
class RootErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Application error:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-lightGray p-4">
          <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-playfair text-darkGray mb-4">Something went wrong</h2>
            <p className="text-darkGray/80 mb-4">The application encountered a critical error. Please try refreshing the page.</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40 mb-4">
              {this.state.error?.toString()}
            </pre>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-roseGold text-white px-4 py-2 rounded hover:bg-roseGold/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Make sure the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Cannot find root element! Make sure the HTML has a div with id="root"');
  document.body.innerHTML = '<div style="padding: 20px; text-align: center;">Error: Root element not found. Please check your HTML structure.</div>';
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <RootErrorBoundary>
          <Router>
            <PerformanceMonitor>
              <App />
            </PerformanceMonitor>
          </Router>
        </RootErrorBoundary>
      </React.StrictMode>,
    );
    console.log('React app successfully mounted');
  } catch (error) {
    console.error('Failed to render React application:', error);
    rootElement.innerHTML = '<div style="padding: 20px; text-align: center;">Error rendering application. Please check the console for details.</div>';
  }
}
