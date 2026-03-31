import { useState, useEffect } from 'react';
import { Users, BookOpen, FileText, TrendingUp, AlertTriangle, Award, BarChart3, Activity } from 'lucide-react';
import { studentAPI, courseAPI, assessmentAPI, resultAPI } from '../../services/api';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalAssessments: 0,
    totalResults: 0,
    avgPercentage: 0,
    passRate: 0,
    gradeDistribution: [],
    recentResults: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [studentsRes, coursesRes, assessmentsRes, resultsRes] = await Promise.all([
          studentAPI.getAll(),
          courseAPI.getAll(),
          assessmentAPI.getAll(),
          resultAPI.getAll()
        ]);

        const students = studentsRes.data || [];
        const courses = coursesRes.data || [];
        const assessments = assessmentsRes.data || [];
        const results = resultsRes.data || [];

        // Calculate statistics
        const avgPercentage = results.length > 0 
          ? (results.reduce((sum, r) => sum + (r.percentage || 0), 0) / results.length).toFixed(1)
          : 0;

        const passRate = results.length > 0
          ? ((results.filter(r => (r.percentage || 0) >= 40).length / results.length) * 100).toFixed(1)
          : 0;

        // Grade distribution
        const gradeCount = {};
        results.forEach(r => {
          if (r.grade) {
            gradeCount[r.grade] = (gradeCount[r.grade] || 0) + 1;
          }
        });
        const gradeDistribution = Object.entries(gradeCount).map(([grade, count]) => ({ _id: grade, count }));

        setStats({
          totalStudents: students.length,
          totalCourses: courses.length,
          totalAssessments: assessments.length,
          totalResults: results.length,
          avgPercentage,
          passRate,
          gradeDistribution,
          recentResults: results.slice(-6).reverse()
        });
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const gradeColors = { 'A+': '#06ffa5', 'A': '#00f5ff', 'B': '#ffbe0b', 'C': '#ff9500', 'D': '#ff6b00', 'F': '#ff006e' };

  if (loading) return (
    <div style={styles.loadingWrap}>
      <div style={styles.spinner} />
      <div style={styles.loadingText}>LOADING SYSTEM DATA...</div>
    </div>
  );

  if (error) return (
    <div style={styles.errorWrap}>
      <AlertTriangle size={32} color="#ff006e" />
      <div style={{ color: '#ff006e', fontFamily: 'Share Tech Mono', marginTop: '12px' }}>{error}</div>
    </div>
  );

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes borderFlow { from{background-position:0% 50%} to{background-position:200% 50%} }
        .stat-card { transition: all 0.3s; cursor: default; }
        .stat-card:hover { transform: translateY(-4px); }
        .holo-card { transition: all 0.3s; }
        .holo-card:hover { transform: translateY(-3px); }
        .action-card { transition: all 0.3s; cursor: pointer; text-decoration: none; display: block; }
        .action-card:hover { transform: translateY(-4px) scale(1.02); }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '32px', animation: 'fadeUp 0.6s ease forwards' }}>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(0,245,255,0.5)', letterSpacing: '3px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06ffa5', boxShadow: '0 0 8px #06ffa5', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          ADMIN CONTROL CENTER
        </div>
        <h1 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '32px', letterSpacing: '3px', color: '#fff' }}>
          SYSTEM <span style={{ color: '#00f5ff', textShadow: '0 0 20px #00f5ff' }}>DASHBOARD</span>
        </h1>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'TOTAL STUDENTS', value: stats?.totalStudents || 0, icon: Users, color: '#00f5ff', bg: 'rgba(0,245,255,0.06)' },
          { label: 'ACTIVE COURSES', value: stats?.totalCourses || 0, icon: BookOpen, color: '#ff006e', bg: 'rgba(255,0,110,0.06)' },
          { label: 'ASSESSMENTS', value: stats?.totalAssessments || 0, icon: FileText, color: '#ffbe0b', bg: 'rgba(255,190,11,0.06)' },
          { label: 'AVG PERFORMANCE', value: `${stats?.avgPercentage || 0}%`, icon: TrendingUp, color: '#06ffa5', bg: 'rgba(6,255,165,0.06)' },
        ].map(({ label, value, icon: Icon, color, bg }, i) => (
          <div key={label} className="stat-card" style={{ ...styles.card, background: bg, animationDelay: `${i * 0.1}s`, animation: 'fadeUp 0.6s ease forwards', opacity: 0 }}>
            {/* Corner decorations */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '16px', borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '16px', borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16px', height: '16px', borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '36px', color, textShadow: `0 0 20px ${color}50`, lineHeight: 1 }}>{value}</div>
                <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginTop: '8px' }}>{label}</div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={color} />
              </div>
            </div>
            <div style={{ marginTop: '16px', height: '2px', background: `linear-gradient(90deg, ${color}, transparent)`, borderRadius: '1px' }} />
          </div>
        ))}
      </div>

      {/* Second row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>

        {/* Grade Distribution */}
        <div style={{ ...styles.card, animation: 'fadeUp 0.6s ease 0.3s forwards', opacity: 0 }}>
          <div style={styles.cardTitle}><BarChart3 size={14} color="#00f5ff" /> GRADE DISTRIBUTION</div>
          <div style={{ marginTop: '20px' }}>
            {stats?.gradeDistribution?.length > 0 ? stats.gradeDistribution.map(({ _id: grade, count }) => {
              const total = stats.gradeDistribution.reduce((a, b) => a + b.count, 0);
              const pct = total ? ((count / total) * 100).toFixed(1) : 0;
              const color = gradeColors[grade] || '#fff';
              return (
                <div key={grade} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'Orbitron', fontSize: '12px', color, fontWeight: 700 }}>GRADE {grade}</span>
                    <span style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}`, borderRadius: '3px', transition: 'width 1s ease' }} />
                  </div>
                </div>
              );
            }) : <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Share Tech Mono', fontSize: '12px', textAlign: 'center', padding: '20px' }}>NO DATA YET</div>}
          </div>
        </div>

        {/* Recent Results */}
        <div style={{ ...styles.card, animation: 'fadeUp 0.6s ease 0.4s forwards', opacity: 0 }}>
          <div style={styles.cardTitle}><Activity size={14} color="#ff006e" /> RECENT ACTIVITY</div>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stats?.recentResults?.length > 0 ? stats.recentResults.slice(0, 6).map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '14px', color: '#fff' }}>{r.student?.name || 'Unknown'}</div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{r.assessment?.title} • {r.course?.code}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '14px', color: gradeColors[r.grade] || '#fff' }}>{r.grade}</div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{r.percentage}%</div>
                </div>
              </div>
            )) : <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Share Tech Mono', fontSize: '12px', textAlign: 'center', padding: '20px' }}>NO RESULTS YET</div>}
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', marginBottom: '16px' }}>// QUICK ACCESS MODULES</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {[
            { to: '/admin/students', label: 'STUDENT_MGT', desc: 'Manage all students', icon: Users, color: '#00f5ff' },
            { to: '/admin/courses', label: 'COURSE_MGT', desc: 'Manage courses', icon: BookOpen, color: '#ff006e' },
            { to: '/admin/assessments', label: 'ASSESS_MGT', desc: 'Create assessments', icon: FileText, color: '#ffbe0b' },
            { to: '/admin/results', label: 'RESULTS_MGT', desc: 'Enter & view results', icon: Award, color: '#06ffa5' },
          ].map(({ to, label, desc, icon: Icon, color }) => (
            <Link key={to} to={to} className="action-card" style={{ ...styles.card, background: `${color}06`, borderColor: `${color}20`, textDecoration: 'none' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Icon size={16} color={color} />
              </div>
              <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color, letterSpacing: '1px' }}>{label}</div>
              <div style={{ fontFamily: 'Rajdhani', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pass Rate */}
      <div style={{ ...styles.card, animation: 'fadeUp 0.6s ease 0.5s forwards', opacity: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={styles.cardTitle}><TrendingUp size={14} color="#06ffa5" /> OVERALL PASS RATE</div>
            <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '48px', color: '#06ffa5', textShadow: '0 0 30px rgba(6,255,165,0.5)', marginTop: '8px' }}>
              {stats?.passRate || 0}%
            </div>
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
              BASED ON {stats?.totalResults || 0} TOTAL RESULTS
            </div>
          </div>
          <div style={{ flex: 1, maxWidth: '400px', marginLeft: '40px' }}>
            <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${stats?.passRate || 0}%`, background: 'linear-gradient(90deg, #06ffa5, #00f5ff)', boxShadow: '0 0 20px rgba(6,255,165,0.5)', borderRadius: '6px', transition: 'width 1.5s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>0%</span>
              <span style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '32px', background: '#03000a', minHeight: '100vh', color: '#fff' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '24px', position: 'relative', overflow: 'hidden' },
  cardTitle: { fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' },
  loadingWrap: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#03000a', gap: '16px' },
  spinner: { width: '40px', height: '40px', border: '2px solid rgba(0,245,255,0.1)', borderTop: '2px solid #00f5ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  loadingText: { fontFamily: 'Share Tech Mono', fontSize: '12px', color: 'rgba(0,245,255,0.5)', letterSpacing: '3px' },
  errorWrap: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#03000a' },
};

export default AdminDashboard;