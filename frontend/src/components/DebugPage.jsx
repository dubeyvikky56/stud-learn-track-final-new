import React from 'react';

const DebugPage = ({ title }) => {
  return (
    <div style={{ 
      padding: '40px', 
      background: '#03000a', 
      minHeight: '100vh', 
      color: '#fff',
      fontFamily: 'Share Tech Mono, monospace'
    }}>
      <h1 style={{ color: '#00f5ff', marginBottom: '20px' }}>
        🔧 DEBUG: {title}
      </h1>
      <div style={{ 
        background: 'rgba(0,245,255,0.1)', 
        border: '1px solid rgba(0,245,255,0.3)',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <p>✅ This page is loading correctly!</p>
        <p>✅ React routing is working</p>
        <p>✅ Components are rendering</p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#06ffa5', marginBottom: '15px' }}>Debug Info:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}>📍 Current Page: {title}</li>
          <li style={{ marginBottom: '8px' }}>🕒 Time: {new Date().toLocaleTimeString()}</li>
          <li style={{ marginBottom: '8px' }}>🌐 URL: {window.location.pathname}</li>
        </ul>
      </div>

      <div style={{ 
        marginTop: '30px',
        padding: '15px',
        background: 'rgba(255,190,11,0.1)',
        border: '1px solid rgba(255,190,11,0.3)',
        borderRadius: '8px'
      }}>
        <p style={{ color: '#ffbe0b', margin: 0 }}>
          If you see this page, the routing is working. The original component might have an error.
        </p>
      </div>
    </div>
  );
};

export default DebugPage;