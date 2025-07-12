// src/utils/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    console.error('Caught in ErrorBoundary:', err, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-6 text-center">Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
