import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const OtpInput = ({ value, onChange, error, label = 'Enter OTP' }) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    onChange(val);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Trigger parent submit
      e.target.blur();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-white/80 mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={6}
          placeholder="000000"
          className={`w-full px-4 py-3 text-center text-xl font-mono tracking-widest bg-white/10 border rounded-xl text-white 
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
            transition-all duration-200 backdrop-blur-sm font-semibold
            ${error ? 'border-red-400 ring-red-400/50' : focused ? 'border-primary-400 ring-primary-400/50 shadow-glow' : 'border-white/20'}`}
          style={{ letterSpacing: '0.2em' }}
          onKeyDown={handleKeyDown}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      <p className="mt-1 text-xs text-white/50 text-center">
        Didn't receive? <button className="text-primary-400 hover:text-primary-300 font-medium" onClick={() => {}}>Resend</button>
      </p>
    </div>
  );
};

export default OtpInput;

