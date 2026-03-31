import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Award, TrendingUp, LogOut, GraduationCap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'DASHBOARD', color: '#00f5ff' },
    { to: '/student/courses', icon: BookOpen, label: 'MY COURSES', color: '#ff006e' },
    { to: '/student/results', icon: Award, label: 'MY RESULTS', color: '#06ffa5' },
    { to: '/student/progress', icon: TrendingUp, label: 'PROGRESS', color: '#ffbe0b' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#03000a', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .nav-lnk { transition: all 0.2s; }
        .nav-lnk:hover { background: rgba(255,255,255,0.05) !important; }
      `}</style>

      <div style={{ width: collapsed ? '68px' : '210px', background: 'rgba(0,0,0,0.6)', borderRight: '1px solid rgba(0,245,255,0.06)', display: 'flex', flexDirection: 'column', transition: 'width 0.3s', overflow: 'hidden', backdropFilter: 'blur(20px)', flexShrink: 0 }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', border: '1px solid #00f5ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,245,255,0.08)', flexShrink: 0 }}>
            <GraduationCap size={18} color="#00f5ff" />
          </div>
          {!collapsed && <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '13px', letterSpacing: '2px', whiteSpace: 'nowrap' }}>EDU<span style={{ color: '#00f5ff' }}>TRACK</span></div>}
        </div>

        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(({ to, icon: Icon, label, color }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} className="nav-lnk" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '8px', textDecoration: 'none', background: active ? `${color}12` : 'transparent', border: active ? `1px solid ${color}25` : '1px solid transparent', position: 'relative', overflow: 'hidden' }}>
                {active && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: color, boxShadow: `0 0 8px ${color}` }} />}
                <Icon size={16} color={active ? color : 'rgba(255,255,255,0.35)'} style={{ flexShrink: 0 }} />
                {!collapsed && <span style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: active ? color : 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', whiteSpace: 'nowrap' }}>{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {!collapsed && (
            <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(0,245,255,0.6)', letterSpacing: '1px' }}>{user?.rollNumber || 'STUDENT'}</div>
            </div>
          )}
          <button onClick={logout} className="nav-lnk" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '8px', background: 'transparent', border: '1px solid transparent', cursor: 'pointer', color: 'rgba(255,0,110,0.6)' }}>
            <LogOut size={16} />
            {!collapsed && <span style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', letterSpacing: '1.5px' }}>LOGOUT</span>}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ height: '52px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', padding: '0 24px', background: 'rgba(0,0,0,0.3)' }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>☰</button>
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '2px' }}>STUDENT PORTAL</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}><Outlet /></div>
      </div>
    </div>
  );
};

export default Layout;