import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Hash, BookOpen, Layers, AlertCircle, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'student', rollNumber: '', department: '', semester: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      const result = await register(formData);
      toast.success('Account created successfully!');
      navigate(result.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Chemical', 'MBA', 'MCA'];

  return (
    <div style={{ minHeight: '100vh', background: '#03000a', display: 'flex', color: '#fff', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --cyan: #00f5ff; --pink: #ff006e; --green: #06ffa5; --yellow: #ffbe0b; }
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,20px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,30px)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes borderRotate { from{background-position:0% 50%} to{background-position:200% 50%} }

        .cyber-input {
          width: 100%;
          background: rgba(0,245,255,0.04);
          border: 1px solid rgba(0,245,255,0.15);
          border-radius: 6px;
          padding: 12px 16px 12px 40px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
        }
        .cyber-input::placeholder { color: rgba(255,255,255,0.2); }
        .cyber-input:focus { border-color: var(--cyan); background: rgba(0,245,255,0.07); box-shadow: 0 0 15px rgba(0,245,255,0.1); }

        .cyber-select {
          width: 100%;
          background: rgba(0,245,255,0.04);
          border: 1px solid rgba(0,245,255,0.15);
          border-radius: 6px;
          padding: 12px 16px 12px 40px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
          cursor: pointer;
          appearance: none;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
        }
        .cyber-select:focus { border-color: var(--cyan); background: rgba(0,245,255,0.07); box-shadow: 0 0 15px rgba(0,245,255,0.1); }
        .cyber-select option { background: #0a0a1a; color: #fff; }

        .cyber-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--cyan), #0099aa);
          color: #000;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 2px;
          padding: 15px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-transform: uppercase;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: all 0.3s;
          box-shadow: 0 0 20px rgba(0,245,255,0.4);
          position: relative;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .cyber-btn::after { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition:left 0.5s; }
        .cyber-btn:hover::after { left: 100%; }
        .cyber-btn:hover { box-shadow: 0 0 40px rgba(0,245,255,0.8); transform: translateY(-1px); }
        .cyber-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .role-btn {
          flex: 1;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 12px 8px;
          color: rgba(255,255,255,0.4);
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          text-align: center;
        }
        .role-btn.active {
          border-color: var(--cyan);
          color: var(--cyan);
          background: rgba(0,245,255,0.08);
          box-shadow: 0 0 15px rgba(0,245,255,0.2);
        }
        .role-btn:hover:not(.active) { border-color: rgba(0,245,255,0.3); color: rgba(0,245,255,0.6); }

        .field-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: rgba(0,245,255,0.5);
          letter-spacing: 2px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;
        }

        .strength-bar { height: 3px; border-radius: 2px; transition: all 0.3s; }
      `}</style>

      {/* Scanline */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none', overflow: 'hidden', opacity: 0.03 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(transparent, rgba(0,245,255,0.4), transparent)', animation: 'scanline 5s linear infinite' }} />
      </div>
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)', opacity: 0.5 }} />

      {/* Background glows */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,245,255,0.07), transparent 60%)', animation: 'float1 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,110,0.07), transparent 60%)', animation: 'float2 14s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,245,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.025) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', position: 'relative', zIndex: 2 }}>
        <div style={{ width: '100%', maxWidth: '520px', animation: 'fadeSlideUp 0.8s ease forwards' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: '36px', height: '36px', border: '1px solid var(--cyan)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(0,245,255,0.3)' }}>
                  <span style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '14px', color: 'var(--cyan)' }}>E</span>
                </div>
                <span style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '16px', letterSpacing: '3px' }}>EDU<span style={{ color: 'var(--cyan)' }}>TRACK</span></span>
              </div>
              <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '2px' }}>
                HAVE ACCOUNT?{' '}
                <Link to="/login" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>SIGN IN</Link>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '22px', letterSpacing: '2px' }}>CREATE<br /><span style={{ color: 'var(--cyan)' }}>ACCOUNT</span></div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(255,0,110,0.08)', border: '1px solid rgba(255,0,110,0.25)', borderRadius: '6px', padding: '10px 14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ff6b9d', fontSize: '12px', fontFamily: 'Share Tech Mono', letterSpacing: '0.5px' }}>
              <AlertCircle size={13} /> {error}
            </div>
          )}

          {/* Role selector */}
          <div style={{ marginBottom: '20px' }}>
            <label className="field-label">ACCOUNT TYPE</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className={`role-btn ${formData.role === 'student' ? 'active' : ''}`} onClick={() => setFormData({ ...formData, role: 'student' })}>
                👤 STUDENT
              </button>
              <button type="button" className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`} onClick={() => setFormData({ ...formData, role: 'admin' })}>
                ⚡ EDUCATOR
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name + Email row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label className="field-label">FULL NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={14} color="rgba(0,245,255,0.4)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="cyber-input" required />
                </div>
              </div>
              <div>
                <label className="field-label">EMAIL</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={14} color="rgba(0,245,255,0.4)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@edu.com" className="cyber-input" required />
                </div>
              </div>
            </div>

            {/* Student fields */}
            {formData.role === 'student' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label className="field-label">ROLL NUMBER</label>
                  <div style={{ position: 'relative' }}>
                    <Hash size={14} color="rgba(0,245,255,0.4)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="CS2021001" className="cyber-input" />
                  </div>
                </div>
                <div>
                  <label className="field-label">SEMESTER</label>
                  <div style={{ position: 'relative' }}>
                    <Layers size={14} color="rgba(0,245,255,0.4)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <select name="semester" value={formData.semester} onChange={handleChange} className="cyber-select">
                      <option value="">Select Sem</option>
                      {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Department */}
            <div style={{ marginBottom: '14px' }}>
              <label className="field-label">DEPARTMENT</label>
              <div style={{ position: 'relative' }}>
                <BookOpen size={14} color="rgba(0,245,255,0.4)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <select name="department" value={formData.department} onChange={handleChange} className="cyber-select">
                  <option value="">Select Department</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Password row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
              <div>
                <label className="field-label">PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={14} color="rgba(0,245,255,0.4)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Min 6 chars" className="cyber-input" style={{ paddingRight: '36px' }} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0 }}>
                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
                {/* Password strength */}
                {formData.password && (
                  <div style={{ marginTop: '6px', display: 'flex', gap: '4px' }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} className="strength-bar" style={{ flex: 1, background: formData.password.length >= i * 3 ? (formData.password.length >= 10 ? 'var(--green)' : formData.password.length >= 6 ? 'var(--yellow)' : 'var(--pink)') : 'rgba(255,255,255,0.1)' }} />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="field-label">CONFIRM PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={14} color="rgba(0,245,255,0.4)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Repeat password" className="cyber-input" required />
                  {formData.confirmPassword && (
                    <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px' }}>
                      {formData.password === formData.confirmPassword ? '✅' : '❌'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="cyber-btn" disabled={loading}>
              {loading ? (
                <><span style={{ width: '13px', height: '13px', border: '2px solid rgba(0,0,0,0.3)', borderTop: '2px solid #000', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> CREATING ACCOUNT...</>
              ) : (
                <><UserPlus size={14} /> CREATE ACCOUNT</>
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>
            ALREADY REGISTERED?{' '}
            <Link to="/login" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>ACCESS SYSTEM</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;