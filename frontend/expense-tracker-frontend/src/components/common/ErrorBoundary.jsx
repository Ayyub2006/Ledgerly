import { Component } from 'react';
import ServerError from '../../pages/error/ServerError';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ServerError onRetry={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
