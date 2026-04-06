import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Sparkles, TrendingUp, Users, BookOpen, BarChart3, Award, Zap, ArrowRight, CheckCircle, Star, Rocket, Trophy, Target } from 'lucide-react';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: BookOpen, title: 'Smart Learning', desc: 'Track progress with AI-powered insights and personalized recommendations', color: 'from-cyan-400 via-blue-500 to-indigo-600' },
    { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Visual reports and performance metrics in real-time', color: 'from-purple-400 via-pink-500 to-rose-600' },
    { icon: Users, title: 'Collaborative', desc: 'Connect with peers and educators seamlessly', color: 'from-orange-400 via-red-500 to-pink-600' },
    { icon: Award, title: 'Achievements', desc: 'Earn badges and track milestones throughout your journey', color: 'from-green-400 via-emerald-500 to-teal-600' },
    { icon: TrendingUp, title: 'Growth Tracking', desc: 'Monitor improvement over time with detailed analytics', color: 'from-yellow-400 via-orange-500 to-red-500' },
    { icon: Zap, title: 'Instant Updates', desc: 'Real-time notifications and alerts for everything important', color: 'from-indigo-400 via-purple-500 to-pink-600' }
  ];

  const stats = [
    { value: '10K+', label: 'Active Students', icon: Users },
    { value: '500+', label: 'Institutions', icon: Target },
    { value: '98%', label: 'Satisfaction', icon: Trophy },
    { value: '24/7', label: 'Support', icon: Rocket }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-cyan-100 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Orbitron:wght@500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes rgb-glow {
          0% { filter: hue-rotate(0deg) brightness(1.3); }
          25% { filter: hue-rotate(90deg) brightness(1.5); }
          50% { filter: hue-rotate(180deg) brightness(1.7); }
          75% { filter: hue-rotate(270deg) brightness(1.5); }
          100% { filter: hue-rotate(360deg) brightness(1.3); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(10deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.6), 0 0 60px rgba(59, 130, 246, 0.4), 0 0 90px rgba(236, 72, 153, 0.3);
          }
          50% { 
            box-shadow: 0 0 50px rgba(147, 51, 234, 0.8), 0 0 100px rgba(59, 130, 246, 0.6), 0 0 150px rgba(236, 72, 153, 0.5);
          }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes rainbow-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes neon-pulse {
          0%, 100% { 
            text-shadow: 
              0 0 10px rgba(255, 0, 255, 0.8),
              0 0 20px rgba(0, 255, 255, 0.6),
              0 0 30px rgba(255, 0, 255, 0.4),
              0 0 40px rgba(0, 255, 255, 0.3);
          }
          50% { 
            text-shadow: 
              0 0 20px rgba(255, 0, 255, 1),
              0 0 40px rgba(0, 255, 255, 0.8),
              0 0 60px rgba(255, 0, 255, 0.6),
              0 0 80px rgba(0, 255, 255, 0.5);
          }
        }
        
        .rgb-text {
          background: linear-gradient(90deg, 
            #ff0080, #ff0000, #ff8000, #ffff00, 
            #80ff00, #00ff00, #00ff80, #00ffff, 
            #0080ff, #0000ff, #8000ff, #ff00ff,
            #ff0080
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: rainbow-text 5s ease infinite;
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
        }
        
        .neon-text {
          color: #fff;
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          animation: neon-pulse 2s ease-in-out infinite;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(30px);
          border: 2px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        }
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .vibrant-shadow {
          box-shadow: 
            0 10px 40px rgba(168, 85, 247, 0.4),
            0 5px 20px rgba(236, 72, 153, 0.3),
            0 2px 10px rgba(59, 130, 246, 0.2);
        }
      `}</style>

      {/* Enhanced Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
          style={{
            background: 'linear-gradient(135deg, #ff0080, #ff0000, #ff8000)',
            animation: 'float 12s ease-in-out infinite',
            top: '5%',
            left: '5%'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
          style={{
            background: 'linear-gradient(135deg, #00ffff, #0080ff, #8000ff)',
            animation: 'float 15s ease-in-out infinite',
            animationDelay: '2s',
            bottom: '10%',
            right: '10%'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-40"
          style={{
            background: 'linear-gradient(135deg, #80ff00, #00ff00, #00ff80)',
            animation: 'float 18s ease-in-out infinite',
            animationDelay: '4s',
            top: '40%',
            left: '45%'
          }}
        />
        <div 
          className="absolute w-[350px] h-[350px] rounded-full blur-3xl opacity-35"
          style={{
            background: 'linear-gradient(135deg, #ff00ff, #ff0080, #ffff00)',
            animation: 'float 20s ease-in-out infinite',
            animationDelay: '6s',
            top: '60%',
            right: '30%'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-5">
        <div className="max-w-7xl mx-auto glass-card rounded-3xl px-8 py-5 flex items-center justify-between vibrant-shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-black rgb-text" style={{ letterSpacing: '0.02em' }}>STUDENT TRACKER</span>
          </div>
          <div className="flex items-center gap-5">
            <Link 
              to="/login"
              className="px-7 py-3 text-gray-800 hover:text-purple-700 font-bold text-lg transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all"
              style={{ animation: 'rgb-glow 4s ease-in-out infinite' }}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-36">
        <div className="text-center" style={{ animation: 'fadeInUp 1s ease-out' }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full mb-10 vibrant-shadow">
            <Sparkles className="w-5 h-5 text-purple-700" />
            <span className="text-base font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              🚀 Welcome to the Future of Education
            </span>
          </div>

          {/* Main Heading with Enhanced RGB */}
          <h1 className="mb-8 leading-tight">
            <div className="rgb-text mb-4" style={{ fontSize: '6.5rem', letterSpacing: '-0.03em', lineHeight: '1' }}>
              STUDENT TRACKER
            </div>
            <div className="text-6xl font-black text-gray-900 mt-6">
              Your Journey to{' '}
              <span className="bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </div>
          </h1>

          <p className="text-2xl text-gray-800 font-semibold max-w-4xl mx-auto mb-16 leading-relaxed">
            Track your academic progress, visualize your growth, and achieve your goals with our 
            <span className="text-purple-700"> cutting-edge platform</span> powered by advanced analytics and AI insights.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-6 mb-20">
            <Link 
              to="/register"
              className="group px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-black text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center gap-3 vibrant-shadow"
              style={{ animation: 'rgb-glow 4s ease-in-out infinite' }}
            >
              <Rocket className="w-6 h-6" />
              Start Free Trial
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              to="/login"
              className="px-12 py-5 glass-card text-gray-900 font-black text-xl rounded-3xl hover-lift flex items-center gap-3"
            >
              <Star className="w-6 h-6 text-purple-600" />
              Watch Demo
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto" style={{ animation: 'scaleIn 1.2s ease-out' }}>
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="glass-card rounded-3xl p-8 hover-lift vibrant-shadow">
                  <Icon className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                  <div className="text-5xl font-black bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  <div className="text-base text-gray-800 font-bold">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-36">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black text-gray-900 mb-6">
            Powerful <span className="rgb-text">Features</span>
          </h2>
          <p className="text-2xl text-gray-800 font-semibold">Everything you need to excel in your academic journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="glass-card rounded-3xl p-10 hover-lift group vibrant-shadow"
                style={{ animation: `fadeInUp ${0.8 + idx * 0.15}s ease-out` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-125 transition-transform shadow-2xl`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-lg text-gray-800 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-36">
        <div className="glass-card rounded-3xl p-16 text-center relative overflow-hidden vibrant-shadow">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20" style={{ animation: 'gradient-shift 8s ease infinite', backgroundSize: '200% 200%' }} />
          <div className="relative z-10">
            <h2 className="text-6xl font-black text-gray-900 mb-8">
              Ready to <span className="rgb-text">Transform</span> Your Learning?
            </h2>
            <p className="text-2xl text-gray-800 font-semibold mb-12 max-w-3xl mx-auto">
              Join thousands of students who are already achieving their academic goals with Student Tracker.
            </p>
            <div className="flex items-center justify-center gap-6">
              <Link 
                to="/register"
                className="px-14 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center gap-4 vibrant-shadow"
                style={{ animation: 'rgb-glow 4s ease-in-out infinite' }}
              >
                <CheckCircle className="w-8 h-8" />
                Start Your Journey Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 glass-card py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg text-gray-800 font-semibold">
            © 2024 <span className="font-black bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-600 bg-clip-text text-transparent">Student Tracker</span>. 
            All rights reserved. Built with ❤️ for students worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;