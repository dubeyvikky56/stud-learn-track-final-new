import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import DebugPage from './components/DebugPage';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const Spinner = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03000a' }}>
    <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    <div style={{ width: '40px', height: '40px', border: '2px solid rgba(0,245,255,0.1)', borderTop: '2px solid #00f5ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
  </div>
);

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'} replace />;
  }
  return children;
};

const App = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <Spinner />;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { 
            background: '#0a0a1a', 
            color: '#fff', 
            border: '1px solid rgba(0,245,255,0.2)', 
            fontFamily: 'Share Tech Mono, monospace', 
            fontSize: '12px' 
          },
          success: { iconTheme: { primary: '#06ffa5', secondary: '#000' } },
          error: { iconTheme: { primary: '#ff006e', secondary: '#fff' } },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'} replace /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'} replace /> : <RegisterPage />} />

        {/* Debug Routes - Temporary */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requiredRole="ADMIN">
            <DebugPage title="Admin Dashboard" />
          </ProtectedRoute>
        } />
        <Route path="/admin/students" element={
          <ProtectedRoute requiredRole="ADMIN">
            <DebugPage title="Student Management" />
          </ProtectedRoute>
        } />
        <Route path="/admin/courses" element={
          <ProtectedRoute requiredRole="ADMIN">
            <DebugPage title="Course Management" />
          </ProtectedRoute>
        } />
        <Route path="/admin/assessments" element={
          <ProtectedRoute requiredRole="ADMIN">
            <DebugPage title="Assessment Management" />
          </ProtectedRoute>
        } />
        <Route path="/admin/results" element={
          <ProtectedRoute requiredRole="ADMIN">
            <DebugPage title="Result Management" />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute requiredRole="ADMIN">
            <DebugPage title="Reports" />
          </ProtectedRoute>
        } />

        <Route path="/student/dashboard" element={
          <ProtectedRoute requiredRole="STUDENT">
            <DebugPage title="Student Dashboard" />
          </ProtectedRoute>
        } />
        <Route path="/student/courses" element={
          <ProtectedRoute requiredRole="STUDENT">
            <DebugPage title="My Courses" />
          </ProtectedRoute>
        } />
        <Route path="/student/results" element={
          <ProtectedRoute requiredRole="STUDENT">
            <DebugPage title="My Results" />
          </ProtectedRoute>
        } />
        <Route path="/student/progress" element={
          <ProtectedRoute requiredRole="STUDENT">
            <DebugPage title="Progress Analytics" />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;