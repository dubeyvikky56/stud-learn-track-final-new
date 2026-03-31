import { Link } from 'react-router-dom';
import { Users, BarChart3, FileText, Shield, TrendingUp, GraduationCap, ArrowRight, Zap, Star, Cpu, Globe } from 'lucide-react';

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fffef7 0%, #fff9e6 50%, #fffcf0 100%)', color: '#1a1a1a', overflowX: 'hidden', cursor: 'default' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cyan: #0099cc;
          --pink: #e63946;
          --yellow: #f4a261;
          --green: #06a77d;
          --purple: #7209b7;
          --orange: #ff6b35;
          --dark: #1a1a1a;
          --warmWhite: #fffef7;
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes flicker {
          0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.4} 94%{opacity:1} 96%{opacity:0.7} 97%{opacity:1}
        }
        @keyframes glitch1 {
          0%,100%{clip-path:inset(0 0 98% 0);transform:translate(-4px,0)}
          20%{clip-path:inset(30% 0 50% 0);transform:translate(4px,0)}
          40%{clip-path:inset(60% 0 20% 0);transform:translate(-2px,0)}
          60%{clip-path:inset(10% 0 80% 0);transform:translate(3px,0)}
          80%{clip-path:inset(80% 0 5% 0);transform:translate(-3px,0)}
        }
        @keyframes glitch2 {
          0%,100%{clip-path:inset(50% 0 30% 0);transform:translate(4px,0)}
          25%{clip-path:inset(10% 0 70% 0);transform:translate(-4px,0)}
          50%{clip-path:inset(70% 0 15% 0);transform:translate(2px,0)}
          75%{clip-path:inset(20% 0 60% 0);transform:translate(-2px,0)}
        }
        @keyframes neonPulse {
          0%,100%{text-shadow:0 0 7px var(--cyan),0 0 10px var(--cyan),0 0 21px var(--cyan)}
          50%{text-shadow:0 0 4px var(--cyan),0 0 7px var(--cyan),0 0 13px var(--cyan)}
        }
        @keyframes borderRotate {
          from{background-position:0% 50%}
          to{background-position:200% 50%}
        }
        @keyframes fadeSlideUp {
          from{opacity:0;transform:translateY(50px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes float {
          0%,100%{transform:translateY(0px)}
          50%{transform:translateY(-12px)}
        }
        @keyframes rotateHalo {
          from{transform:rotate(0deg)}
          to{transform:rotate(360deg)}
        }
        @keyframes dataFlow {
          0%{opacity:0;transform:translateY(0)}
          10%{opacity:1}
          90%{opacity:1}
          100%{opacity:0;transform:translateY(-40px)}
        }
        @keyframes rgb-shift {
          0%{filter:hue-rotate(0deg)}
          100%{filter:hue-rotate(360deg)}
        }
        @keyframes marquee {
          from{transform:translateX(0)}
          to{transform:translateX(-50%)}
        }

        .orbitron { font-family: 'Orbitron', sans-serif; }
        .rajdhani { font-family: 'Rajdhani', sans-serif; }
        .mono { font-family: 'Share Tech Mono', monospace; }

        .glitch-wrapper { position:relative; display:inline-block; }
        .glitch-wrapper::before,
        .glitch-wrapper::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          font-family: 'Orbitron', sans-serif;
        }
        .glitch-wrapper::before {
          color: var(--pink);
          animation: glitch1 3s infinite linear;
        }
        .glitch-wrapper::after {
          color: var(--cyan);
          animation: glitch2 3s infinite linear;
          animation-delay: 0.1s;
        }

        .neon-cyan {
          color: var(--cyan);
          animation: neonPulse 2.5s ease-in-out infinite;
        }

        .holo-card {
          position: relative;
          background: rgba(255,255,255,0.8);
          border: 1px solid transparent;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .holo-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          padding: 1px;
          background: linear-gradient(135deg, var(--cyan), var(--pink), var(--purple), var(--cyan));
          background-size: 300% 300%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderRotate 4s linear infinite;
          opacity: 0.3;
          transition: opacity 0.3s;
        }
        .holo-card:hover::before { opacity: 0.7; }
        .holo-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08), 0 0 40px rgba(0,153,204,0.15);
          background: rgba(255,255,255,0.95);
        }

        .cyber-btn {
          position: relative;
          background: linear-gradient(135deg, var(--cyan), #0077aa);
          color: #fff;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2px;
          padding: 16px 36px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(0,153,204,0.3);
          text-transform: uppercase;
        }
        .cyber-btn:hover {
          box-shadow: 0 6px 20px rgba(0,153,204,0.5);
          transform: translateY(-2px);
        }

        .cyber-btn-outline {
          position: relative;
          background: transparent;
          color: var(--pink);
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2px;
          padding: 15px 36px;
          border: 2px solid var(--pink);
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: all 0.3s;
          text-transform: uppercase;
        }
        .cyber-btn-outline:hover {
          background: rgba(230,57,70,0.1);
          box-shadow: 0 4px 16px rgba(230,57,70,0.3);
          transform: translateY(-2px);
        }

        .stat-block {
          position: relative;
          padding: 28px;
          background: rgba(255,255,255,0.6);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .stat-block::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          animation: borderRotate 2s linear infinite;
          background-size: 200% 100%;
        }
        .stat-block:hover { background: rgba(255,255,255,0.8); transform: scale(1.03); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }

        .ticker-wrap {
          overflow: hidden;
          background: rgba(0,153,204,0.06);
          border-top: 1px solid rgba(0,153,204,0.15);
          border-bottom: 1px solid rgba(0,153,204,0.15);
          padding: 12px 0;
        }
        .ticker {
          display: flex;
          gap: 0;
          animation: marquee 20s linear infinite;
          white-space: nowrap;
        }

        .nav-item {
          color: rgba(26,26,26,0.6);
          text-decoration: none;
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.2s;
          position: relative;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 2px;
          background: var(--cyan);
          transform: scaleX(0);
          transition: transform 0.3s;
        }
        .nav-item:hover { color: var(--cyan); }
        .nav-item:hover::after { transform: scaleX(1); }

        .corner-decoration {
          position: absolute;
          width: 20px; height: 20px;
          border-color: var(--cyan);
          border-style: solid;
          opacity: 0.6;
        }

        .badge-cyber {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--cyan);
          border: 1px solid rgba(0,153,204,0.3);
          padding: 6px 16px;
          border-radius: 2px;
          background: rgba(0,153,204,0.06);
          margin-bottom: 28px;
        }

        .section-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--pink);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--pink), transparent);
          max-width: 80px;
        }
      `}</style>

      {/* Scanline overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none', overflow: 'hidden', opacity: 0.02 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(transparent, rgba(0,153,204,0.2), transparent)', animation: 'scanline 6s linear infinite' }} />
      </div>

      {/* Subtle texture */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)',
        opacity: 0.3
      }} />

      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {/* Warm yellow glow top-left */}
        <div style={{ position: 'absolute', top: '-20%', left: '-15%', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,162,97,0.12) 0%, transparent 60%)' }} />
        {/* Cyan glow right */}
        <div style={{ position: 'absolute', top: '20%', right: '-15%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,153,204,0.08) 0%, transparent 60%)' }} />
        {/* Purple glow bottom */}
        <div style={{ position: 'absolute', bottom: '-20%', left: '30%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 60%)' }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(0,153,204,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,153,204,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)'
        }} />
      </div>

      {/* NAVBAR */}
      <nav style={{
        position: 'relative', zIndex: 10,
        padding: '0 48px', height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,153,204,0.12)',
        background: 'rgba(255,254,247,0.95)', backdropFilter: 'blur(20px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '36px', height: '36px',
              background: 'linear-gradient(135deg, #fff, #f5f5f5)',
              border: '2px solid var(--cyan)',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,153,204,0.2)'
            }}>
              <GraduationCap size={18} color="#0099cc" />
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: '16px', letterSpacing: '3px', color: '#1a1a1a', lineHeight: 1 }}>
              EDU<span style={{ color: 'var(--cyan)' }}>TRACK</span>
            </div>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '9px', color: 'rgba(0,153,204,0.6)', letterSpacing: '2px' }}>v2.0.26 // ONLINE</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {['Features', 'Analytics', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-item">{item}</a>
          ))}
          <div style={{ width: '1px', height: '20px', background: 'rgba(0,153,204,0.2)' }} />
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/register" className="cyber-btn" style={{ padding: '10px 20px', fontSize: '11px' }}>
            Launch <Zap size={12} />
          </Link>
        </div>
      </nav>

      {/* TICKER */}
      <div className="ticker-wrap" style={{ position: 'relative', zIndex: 5 }}>
        <div className="ticker">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: 'flex', gap: '0' }}>
              {['// STUDENT ANALYTICS', '// REAL-TIME TRACKING', '// AI-POWERED INSIGHTS', '// PERFORMANCE METRICS', '// GRADE MANAGEMENT', '// LIVE DASHBOARDS', '// EDUCATOR TOOLS', '// OUTCOME TRACKING'].map(text => (
                <span key={text} style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '11px', color: 'rgba(0,153,204,0.6)', letterSpacing: '2px', padding: '0 40px' }}>
                  {text}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1300px', margin: '0 auto',
        padding: '80px 48px 60px',
        display: 'grid', gridTemplateColumns: '1.2fr 0.8fr',
        gap: '80px', alignItems: 'center'
      }}>
        <div style={{ animation: 'fadeSlideUp 0.8s ease forwards' }}>
          <div className="badge-cyber">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', display: 'inline-block', animation: 'flicker 3s infinite' }} />
            SYS_ONLINE // NEXT-GEN PLATFORM
          </div>

          <div style={{ marginBottom: '8px' }}>
            <div className="glitch-wrapper" data-text="STUDENT" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 'clamp(52px,7vw,90px)', letterSpacing: '6px', lineHeight: 1, color: '#1a1a1a' }}>
              STUDENT
            </div>
          </div>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 'clamp(52px,7vw,90px)', letterSpacing: '6px', lineHeight: 1, marginBottom: '8px' }}>
            <span className="neon-cyan">LEARNING</span>
          </div>
          <div style={{ position: 'relative', marginBottom: '36px' }}>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 'clamp(52px,7vw,90px)', letterSpacing: '6px', lineHeight: 1, background: 'linear-gradient(135deg, var(--pink), var(--purple), var(--pink))', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              TRACKER
            </div>
          </div>

          <p className="rajdhani" style={{ fontSize: '18px', color: 'rgba(26,26,26,0.65)', lineHeight: 1.8, marginBottom: '44px', maxWidth: '480px', fontWeight: 400, letterSpacing: '0.5px' }}>
            Next-generation platform for tracking student outcomes. Real-time analytics, AI-powered insights, and futuristic dashboards built for the digital age.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/register" className="cyber-btn">
              Initialize <ArrowRight size={14} />
            </Link>
            <Link to="/login" className="cyber-btn-outline">
              Access System
            </Link>
          </div>

          {/* Live stats row */}
          <div style={{ display: 'flex', gap: '40px', marginTop: '52px', paddingTop: '36px', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
            {[
              { num: '2,547', label: 'Active Users', color: 'var(--cyan)' },
              { num: '15K+', label: 'Assessments', color: 'var(--pink)' },
              { num: '92%', label: 'Success Rate', color: 'var(--green)' },
            ].map(({ num, label, color }) => (
              <div key={label}>
                <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '28px', color }}>{num}</div>
                <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '10px', color: 'rgba(26,26,26,0.4)', marginTop: '4px', letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HUD-style stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', animation: 'fadeSlideUp 0.8s ease 0.2s both' }}>
          {[
            { label: 'TOTAL STUDENTS', value: '2,547', icon: Users, color: 'var(--cyan)', bg: 'rgba(0,153,204,0.08)' },
            { label: 'ASSESSMENTS', value: '15,392', icon: FileText, color: 'var(--pink)', bg: 'rgba(230,57,70,0.08)' },
            { label: 'AVG SCORE', value: '85.4%', icon: BarChart3, color: 'var(--yellow)', bg: 'rgba(244,162,97,0.08)' },
            { label: 'SUCCESS RATE', value: '92.1%', icon: TrendingUp, color: 'var(--green)', bg: 'rgba(6,167,125,0.08)' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="stat-block" style={{ background: bg }}>
              {/* Corner decorations */}
              <div className="corner-decoration" style={{ top: 0, left: 0, borderWidth: '1px 0 0 1px', borderColor: color }} />
              <div className="corner-decoration" style={{ top: 0, right: 0, borderWidth: '1px 1px 0 0', borderColor: color }} />
              <div className="corner-decoration" style={{ bottom: 0, left: 0, borderWidth: '0 0 1px 1px', borderColor: color }} />
              <div className="corner-decoration" style={{ bottom: 0, right: 0, borderWidth: '0 1px 1px 0', borderColor: color }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', border: `1px solid ${color}`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.5)' }}>
                  <Icon size={14} color={color} />
                </div>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}`, animation: 'flicker 2s infinite' }} />
              </div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '28px', color }}>{value}</div>
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '9px', color: 'rgba(26,26,26,0.4)', marginTop: '6px', letterSpacing: '2px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" style={{ position: 'relative', zIndex: 2, maxWidth: '1300px', margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ marginBottom: '60px' }}>
          <div className="section-label">// CORE MODULES</div>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 'clamp(32px,4vw,52px)', letterSpacing: '4px', lineHeight: 1 }}>
            SYSTEM <span style={{ color: 'var(--cyan)' }}>FEATURES</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { icon: Users, title: 'STUDENT_MGT', desc: 'Full lifecycle management of student profiles, enrollments, and academic records with real-time sync.', color: 'var(--cyan)' },
            { icon: BarChart3, title: 'ANALYTICS_ENGINE', desc: 'Deep performance analytics with AI-powered trend detection and predictive outcome modeling.', color: 'var(--pink)' },
            { icon: FileText, title: 'ASSESS_TRACKER', desc: 'Multi-format assessment tracking — quizzes, exams, projects — with instant result processing.', color: 'var(--yellow)' },
            { icon: Shield, title: 'SECURE_VAULT', desc: 'Military-grade data encryption ensuring zero-breach student data security and GDPR compliance.', color: 'var(--green)' },
            { icon: TrendingUp, title: 'PROGRESS_MONITOR', desc: 'Live progress dashboards with automated alerts and actionable educator insights.', color: 'var(--purple)' },
            { icon: Cpu, title: 'AI_INSIGHTS', desc: 'Machine learning algorithms that identify at-risk students and suggest intervention strategies.', color: 'var(--orange)' },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="holo-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `rgba(255,255,255,0.6)`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={color} />
                </div>
                <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '12px', color, letterSpacing: '1px' }}>{title}</div>
              </div>
              <p className="rajdhani" style={{ color: 'rgba(26,26,26,0.6)', fontSize: '15px', lineHeight: 1.7, fontWeight: 400 }}>{desc}</p>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color, fontSize: '11px', fontFamily: 'Share Tech Mono, monospace', letterSpacing: '1px', opacity: 0.8 }}>
                <span>ACCESS MODULE</span> <ArrowRight size={10} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1300px', margin: '0 auto', padding: '40px 48px 100px' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(0,153,204,0.2)',
          borderRadius: '12px', padding: '70px 60px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}>
          {/* Animated corner accents */}
          {[
            { top: 0, left: 0, borderWidth: '2px 0 0 2px' },
            { top: 0, right: 0, borderWidth: '2px 2px 0 0' },
            { bottom: 0, left: 0, borderWidth: '0 0 2px 2px' },
            { bottom: 0, right: 0, borderWidth: '0 2px 2px 0' },
          ].map((style, i) => (
            <div key={i} style={{ position: 'absolute', width: '30px', height: '30px', borderStyle: 'solid', borderColor: 'var(--cyan)', opacity: 0.6, ...style }} />
          ))}

          {/* Glow */}
          <div style={{ position: 'absolute', top: '50%', left: '20%', transform: 'translateY(-50%)', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,162,97,0.1), transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '580px', position: 'relative' }}>
            <div className="section-label">// INITIALIZE SYSTEM</div>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 'clamp(28px,3.5vw,46px)', letterSpacing: '3px', lineHeight: 1.1, marginBottom: '20px' }}>
              READY TO <span style={{ color: 'var(--cyan)' }}>UPGRADE</span> YOUR INSTITUTION?
            </div>
            <p className="rajdhani" style={{ color: 'rgba(26,26,26,0.6)', fontSize: '17px', lineHeight: 1.7 }}>
              Join 500+ institutions already running on EduTrack. Deploy in minutes, see results in days.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '220px', position: 'relative' }}>
            <Link to="/register" className="cyber-btn" style={{ justifyContent: 'center' }}>
              START FREE <ArrowRight size={14} />
            </Link>
            <Link to="/login" className="cyber-btn-outline" style={{ justifyContent: 'center' }}>
              SIGN IN
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        borderTop: '1px solid rgba(0,153,204,0.12)',
        padding: '28px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', zIndex: 2,
        background: 'rgba(255,254,247,0.9)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '28px', height: '28px', border: '2px solid var(--cyan)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,153,204,0.2)' }}>
            <GraduationCap size={14} color="#0099cc" />
          </div>
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '3px' }}>
            EDU<span style={{ color: 'var(--cyan)' }}>TRACK</span>
          </span>
        </div>
        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '11px', color: 'rgba(26,26,26,0.3)', letterSpacing: '1px' }}>
          © 2026 EDUTRACK SYSTEMS // ALL RIGHTS RESERVED
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', animation: 'flicker 2s infinite' }} />
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '10px', color: 'var(--green)', letterSpacing: '2px' }}>ALL SYSTEMS OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;