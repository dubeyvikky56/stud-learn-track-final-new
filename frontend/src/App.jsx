import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';

// Layouts
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import CourseManagement from './pages/admin/CourseManagement';
import AssessmentManagement from './pages/admin/AssessmentManagement';
import ResultManagement from './pages/admin/ResultManagement';
import ReportsPage from './pages/admin/ReportsPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import MyResults from './pages/student/MyResults';
import ProgressAnalytics from './pages/student/ProgressAnalytics';

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
  if (requiredRole && user.role !== requiredRole) return <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'} replace />;
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
          style: { background: '#0a0a1a', color: '#fff', border: '1px solid rgba(0,245,255,0.2)', fontFamily: 'Share Tech Mono, monospace', fontSize: '12px', letterSpacing: '1px' },
          success: { iconTheme: { primary: '#06ffa5', secondary: '#000' } },
          error: { iconTheme: { primary: '#ff006e', secondary: '#fff' } },
        }}
      />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'} replace /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'} replace /> : <RegisterPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="assessments" element={<AssessmentManagement />} />
          <Route path="results" element={<ResultManagement />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<ProtectedRoute requiredRole="STUDENT"><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="results" element={<MyResults />} />
          <Route path="progress" element={<ProgressAnalytics />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;