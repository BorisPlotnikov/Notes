// components/ErrorBoundary.jsx

import React from 'react';
import errorHandler from '../utils/errorHandler';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        errorHandler(error, errorInfo);
    }

    render() {
        if (this.state?.hasError) {
            return (
                <div className="error-fallback">
                  <h2>Something went wrong</h2>
                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <pre>{this.state.error.toString()}</pre>
                  )}
                </div>
              );              
        }
        return this.props.children;
    }
}

export default ErrorBoundary;