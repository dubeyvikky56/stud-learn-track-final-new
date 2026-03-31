import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: '#03000a', 
          color: '#fff', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px',
          fontFamily: 'Share Tech Mono, monospace'
        }}>
          <div style={{ 
            background: 'rgba(255,0,110,0.1)', 
            border: '1px solid rgba(255,0,110,0.3)', 
            borderRadius: '8px', 
            padding: '20px', 
            maxWidth: '600px',
            width: '100%'
          }}>
            <h2 style={{ color: '#ff006e', marginBottom: '16px' }}>⚠️ APPLICATION ERROR</h2>
            <p style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.7)' }}>
              Something went wrong. Please check the console for details.
            </p>
            {this.state.error && (
              <details style={{ marginBottom: '16px' }}>
                <summary style={{ cursor: 'pointer', color: '#00f5ff' }}>Error Details</summary>
                <pre style={{ 
                  background: 'rgba(0,0,0,0.5)', 
                  padding: '10px', 
                  borderRadius: '4px', 
                  fontSize: '12px',
                  overflow: 'auto',
                  marginTop: '8px',
                  color: '#ff6b9d'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button 
              onClick={() => window.location.reload()} 
              style={{
                background: 'linear-gradient(135deg, #00f5ff, #0099aa)',
                color: '#000',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'Share Tech Mono',
                fontSize: '12px',
                letterSpacing: '1px'
              }}
            >
              RELOAD PAGE
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;