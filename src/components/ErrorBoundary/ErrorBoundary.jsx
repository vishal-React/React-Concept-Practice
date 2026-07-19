import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Runs when a child throws an error.
  // Updates state so React can render fallback UI.
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Runs after an error is caught.
  // Used for logging, reporting, or side effects.
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    const { hasError } = this.state;
    const { fallback } = this.props;

    if (hasError) return fallback || <h2>Something went wrong.</h2>;

    return this.props.children;
  }
}

export default ErrorBoundary;
