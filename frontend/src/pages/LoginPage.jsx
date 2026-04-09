import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Shield, ArrowRight, Sparkles, CheckCircle2, UserCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import OtpInput from '../components/OtpInput';

const LoginPage = () => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      toast.error('Invalid email');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await login(email, '', role);
    } catch (err) {
      console.error('Send OTP error:', err);
      if (err.message === 'OTP_REQUIRED') {
        setStep('otp');
        toast.success('🔐 OTP sent to your email!');
      } else {
        const errorMsg = err.response?.data?.message || err.message || err || 'Failed to send OTP';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      toast.error('Invalid OTP format');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await login(email, otp, role);
      console.log('Login result:', result);
      console.log('User role from result:', result.role);
      
      toast.success(`✅ Welcome ${result.name}!`);
      
      // Navigate based on actual role from backend
      const dashboardPath = result.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
      console.log('Navigating to:', dashboardPath);
      
      setTimeout(() => {
        navigate(dashboardPath, { replace: true });
      }, 500);
    } catch (err) {
      console.error('Verify OTP error:', err);
      const errorMsg = err.response?.data?.message || err.message || err || 'Invalid OTP';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setRole(demoRole);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-30px) rotate(5deg); } }
        @keyframes glow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" style={{ animation: 'float 10s ease-in-out infinite 2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" style={{ animation: 'float 12s ease-in-out infinite 4s' }} />
      </div>

      <div className="relative w-full max-w-md" style={{ animation: 'slideIn 0.6s ease-out' }}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-3xl shadow-2xl shadow-purple-500/50 mb-6 relative" style={{ animation: 'glow 3s ease-in-out infinite' }}>
            <Shield className="w-10 h-10 text-white" />
            <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-1 -right-1" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
            {step === 'otp' ? 'Verify OTP' : 'Secure Login'}
          </h1>
          <p className="text-purple-200/80 text-lg">
            {step === 'otp' ? 'Enter the 6-digit code sent to your email' : 'Login as Admin or Student - Auto-registration enabled!'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-2xl flex items-center gap-3 text-red-200 relative z-10" style={{ animation: 'slideIn 0.3s ease-out' }}>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {step === 'email' ? (
            <form onSubmit={handleSendOtp} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all text-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                  <UserCircle className="w-5 h-5" />
                  Login As
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('STUDENT')}
                    className={`py-4 px-4 rounded-xl font-bold transition-all text-base ${
                      role === 'STUDENT'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    🎓 Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('ADMIN')}
                    className={`py-4 px-4 rounded-xl font-bold transition-all text-base ${
                      role === 'ADMIN'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50 scale-105'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    👨💼 Admin
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full" style={{ animation: 'spin 0.8s linear infinite' }} />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-sm text-purple-200/70 font-medium">Quick Demo</span>
                  <div className="flex-1 h-px bg-white/20" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => fillDemo('admin@test.com', 'ADMIN')}
                    className="py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white/90 hover:text-white transition-all text-sm font-semibold backdrop-blur-sm"
                  >
                    👨💼 Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemo('student@test.com', 'STUDENT')}
                    className="py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white/90 hover:text-white transition-all text-sm font-semibold backdrop-blur-sm"
                  >
                    🎓 Student
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6 relative z-10">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                  OTP sent to {email}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-xs font-medium">
                  {role === 'ADMIN' ? '👨💼 Admin' : '🎓 Student'}
                </div>
              </div>

              <OtpInput
                value={otp}
                onChange={(val) => { setOtp(val); setError(''); }}
                error={error}
                label="Enter 6-Digit OTP"
              />

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-green-500/50 hover:shadow-green-500/70 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full" style={{ animation: 'spin 0.8s linear infinite' }} />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Verify & Login
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => { setStep('email'); setOtp(''); setError(''); }}
                className="w-full text-sm text-purple-200/80 hover:text-white transition-colors font-medium"
              >
                ← Change email or role
              </button>
            </form>
          )}

          <div className="mt-8 text-center relative z-10">
            <p className="text-purple-200/70 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-pink-400 hover:text-pink-300 font-bold transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-purple-200/70 hover:text-white transition-colors inline-flex items-center gap-2 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
