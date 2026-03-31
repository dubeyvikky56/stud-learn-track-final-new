import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await login(formData.email, formData.password);
      toast.success('Access granted!');
      navigate(result.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
      toast.error('Access denied');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    if (role === 'admin') setFormData({ email: 'admin@test.com', password: 'admin123' });
    else setFormData({ email: 'student@test.com', password: 'student123' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', display: 'flex', color: '#1a202c', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --cyan: #0ea5e9; --pink: #ec4899; --green: #10b981; --purple: #8b5cf6; --orange: #f97316; --blue: #3b82f6; }
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,20px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,30px)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes borderRotate { from{background-position:0% 50%} to{background-position:200% 50%} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes glitch {
          0%,100%{clip-path:inset(0 0 98% 0);transform:translate(-2px,0)}
          33%{clip-path:inset(30% 0 50% 0);transform:translate(2px,0)}
          66%{clip-path:inset(70% 0 10% 0);transform:translate(-1px,0)}
        }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        .cyber-input {
          width: 100%;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 16px 16px 48px;
          color: #1a202c;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
          transition: all 0.3s;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .cyber-input::placeholder { color: #94a3b8; }
        .cyber-input:focus {
          border-color: var(--cyan);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .cyber-input:focus + .input-glow { opacity: 1; }

        .cyber-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--cyan), var(--blue));
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 0.5px;
          padding: 16px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 10px 15px -3px rgba(14, 165, 233, 0.3);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .cyber-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .cyber-btn:hover::after { left: 100%; }
        .cyber-btn:hover { box-shadow: 0 20px 25px -5px rgba(14, 165, 233, 0.4); transform: translateY(-2px); }
        .cyber-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .demo-btn {
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px 16px;
          color: #64748b;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          flex: 1;
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .demo-btn:hover { border-color: var(--cyan); color: var(--cyan); background: #f0f9ff; box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.1); }

        .holo-panel {
          background: linear-gradient(135deg, rgba(0,245,255,0.03), rgba(255,0,110,0.03));
          border: 1px solid rgba(0,245,255,0.1);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }
        .holo-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          opacity: 0.6;
        }
      `}</style>

      {/* Floating shapes */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--pink), var(--purple))', opacity: 0.1, animation: 'float1 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '60%', right: '10%', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--green), var(--cyan))', opacity: 0.1, animation: 'float2 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '15%', width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--orange), var(--pink))', opacity: 0.1, animation: 'float1 12s ease-in-out infinite' }} />
      </div>

      {/* LEFT PANEL — Branding */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', position: 'relative', borderRight: '1px solid #e2e8f0', overflow: 'hidden', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
        {/* BG glows */}
        <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1), transparent 60%)', animation: 'float1 10s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent 60%)', animation: 'float2 14s ease-in-out infinite', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, animation: 'fadeSlideUp 0.8s ease forwards' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '60px' }}>
            <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, var(--cyan), var(--blue))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 15px -3px rgba(14, 165, 233, 0.3)' }}>
              <span style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '18px', color: '#ffffff' }}>E</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '18px', letterSpacing: '3px', color: '#1a202c' }}>EDU<span style={{ color: 'var(--cyan)' }}>TRACK</span></div>
              <div style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Student Learning Platform</div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '2px', marginBottom: '24px', color: '#1a202c' }}>
            STUDENT<br />
            <span style={{ background: 'linear-gradient(135deg, var(--cyan), var(--purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LEARNING</span><br />
            TRACKER
          </div>
          <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.8, maxWidth: '380px', marginBottom: '48px' }}>
            Next-generation platform for tracking academic outcomes. Authenticate to access your personalized dashboard.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '32px' }}>
            {[['2.5K+', 'Students'], ['15K+', 'Assessments'], ['92%', 'Pass Rate']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '22px', background: 'linear-gradient(135deg, var(--cyan), var(--purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{num}</div>
                <div style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — Login Form */}
      <div style={{ width: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', position: 'relative', background: '#ffffff' }}>
        <div style={{ width: '100%', maxWidth: '400px', animation: 'fadeSlideUp 0.8s ease 0.1s both' }}>

          {/* Form header */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ fontFamily: 'DM Sans', fontSize: '14px', color: 'var(--pink)', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Secure Login
            </div>
            <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '32px', letterSpacing: '1px', color: '#1a202c' }}>Welcome<br /><span style={{ background: 'linear-gradient(135deg, var(--cyan), var(--purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Back</span></div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '14px', fontFamily: 'DM Sans' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontFamily: 'DM Sans', fontSize: '14px', color: '#374151', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@edutrack.com"
                  className="cyber-input"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ fontFamily: 'DM Sans', fontSize: '14px', color: '#374151', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••"
                  className="cyber-input"
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: '44px' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 0 }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="cyber-btn" disabled={loading}>
              {loading ? (
                <><span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Signing In...</>
              ) : (
                <><Zap size={16} /> Sign In</>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            <span style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Demo Access</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          </div>

          {/* Demo buttons */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
            <button className="demo-btn" onClick={() => fillDemo('admin')}>⚡ Admin Demo</button>
            <button className="demo-btn" onClick={() => fillDemo('student')}>👤 Student Demo</button>
          </div>

          {/* Register link */}
          <div style={{ textAlign: 'center', fontFamily: 'DM Sans', fontSize: '14px', color: '#64748b' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--cyan)', textDecoration: 'none', fontWeight: 600 }}>
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;