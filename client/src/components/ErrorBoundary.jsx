import { Component } from 'react';

/**
 * Top-level Error Boundary.
 *
 * Prevents React from unmounting to a blank white screen if an unexpected
 * error occurs in any child component during rendering.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAFDF7',
          padding: '2rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#172117',
        }}>
          <div style={{
            maxWidth: '36rem',
            width: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid #DDE8D8',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 10px 30px rgba(46,93,59,0.08)',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '4rem',
              height: '4rem',
              borderRadius: '9999px',
              backgroundColor: '#FFF4B8',
              color: '#2E5D3B',
              fontSize: '1.75rem',
              marginBottom: '1.25rem',
            }}>
              ⚠️
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#2E5D3B',
              marginBottom: '0.75rem',
            }}>
              Something went wrong
            </h1>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: '1.6',
              color: '#425846',
              marginBottom: '1.75rem',
            }}>
              An unexpected error occurred while rendering the page. You can reload the page or check the console for more details.
            </p>
            {import.meta.env.DEV && this.state.error?.message ? (
              <pre style={{
                textAlign: 'left',
                padding: '1rem',
                backgroundColor: '#FFF9D6',
                border: '1px solid #F2E8A5',
                borderRadius: '12px',
                fontSize: '0.8125rem',
                color: '#2E5D3B',
                overflowX: 'auto',
                marginBottom: '1.75rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {this.state.error.message}
              </pre>
            ) : null}
            <button
              type="button"
              onClick={this.handleReload}
              style={{
                backgroundColor: '#2E5D3B',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.75rem 2rem',
                fontSize: '0.9375rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
