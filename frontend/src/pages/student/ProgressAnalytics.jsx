import { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, PieChart, Target, Award, BookOpen } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ProgressAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const gradeColors = {
    'A+': '#06ffa5',
    'A': '#00f5ff',
    'B+': '#ffbe0b', 
    'B': '#ff9500',
    'C+': '#ff6b00',
    'C': '#ff4d00',
    'D': '#ff006e',
    'F': '#8b0000'
  };

  useEffect(() => {
    // Mock analytics data
    const mockAnalytics = {
      overallGPA: 3.4,
      totalCredits: 18,
      completedAssessments: 12,
      averageScore: 78.5,
      gradeDistribution: {
        'A+': 2,
        'A': 4,
        'B+': 3,
        'B': 2,
        'C': 1
      },
      subjectPerformance: [
        { subject: 'Data Structures', score: 85, grade: 'A', trend: 'up' },
        { subject: 'Database Systems', score: 84, grade: 'A', trend: 'up' },
        { subject: 'Web Development', score: 72, grade: 'B+', trend: 'stable' },
        { subject: 'Software Engineering', score: 93, grade: 'A+', trend: 'up' }
      ],
      monthlyProgress: [
        { month: 'Jan', score: 75 },
        { month: 'Feb', score: 78 },
        { month: 'Mar', score: 82 },
        { month: 'Apr', score: 79 }
      ],
      strengths: ['Problem Solving', 'Database Design', 'Code Quality'],
      improvements: ['Time Management', 'Testing', 'Documentation']
    };
    
    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03000a', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '36px', height: '36px', border: '2px solid rgba(0,245,255,0.1)', borderTop: '2px solid #00f5ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(0,245,255,0.5)', letterSpacing: '3px' }}>ANALYZING PROGRESS...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', background: '#03000a', minHeight: '100vh', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .analytics-card { transition: all 0.3s; }
        .analytics-card:hover { transform: translateY(-2px); }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '32px', animation: 'fadeUp 0.6s ease forwards' }}>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,190,11,0.5)', letterSpacing: '3px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffbe0b', boxShadow: '0 0 8px #ffbe0b', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          PROGRESS ANALYTICS
        </div>
        <h1 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '28px', letterSpacing: '2px' }}>
          ACADEMIC <span style={{ color: '#ffbe0b', textShadow: '0 0 20px #ffbe0b' }}>INSIGHTS</span>
        </h1>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
          COMPREHENSIVE PERFORMANCE ANALYSIS
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'OVERALL GPA', value: analytics.overallGPA.toFixed(1), icon: Award, color: '#06ffa5' },
          { label: 'TOTAL CREDITS', value: analytics.totalCredits, icon: BookOpen, color: '#00f5ff' },
          { label: 'ASSESSMENTS', value: analytics.completedAssessments, icon: Target, color: '#ff006e' },
          { label: 'AVG SCORE', value: `${analytics.averageScore}%`, icon: TrendingUp, color: '#ffbe0b' }
        ].map(({ label, value, icon: Icon, color }, i) => (
          <div key={label} className="analytics-card" style={{
            background: `${color}06`,
            border: `1px solid ${color}20`,
            borderRadius: '12px',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
            animation: `fadeUp 0.6s ease ${i * 0.1}s forwards`,
            opacity: 0
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${color}, transparent)` }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '32px', color, textShadow: `0 0 20px ${color}50`, lineHeight: 1 }}>{value}</div>
                <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginTop: '8px' }}>{label}</div>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={16} color={color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
        {/* Grade Distribution */}
        <div className="analytics-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', animation: 'fadeUp 0.6s ease 0.4s forwards', opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <PieChart size={14} color="#00f5ff" />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>GRADE DISTRIBUTION</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {Object.entries(analytics.gradeDistribution).map(([grade, count]) => {
              const color = gradeColors[grade];
              const total = Object.values(analytics.gradeDistribution).reduce((a, b) => a + b, 0);
              const percentage = ((count / total) * 100).toFixed(0);
              return (
                <div key={grade} style={{ flex: '1 1 calc(50% - 6px)', minWidth: '80px', background: `${color}10`, border: `1px solid ${color}25`, borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '24px', color, textShadow: `0 0 15px ${color}50` }}>{grade}</div>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '16px', color: '#fff', marginTop: '4px', fontWeight: 700 }}>{count}</div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="analytics-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', animation: 'fadeUp 0.6s ease 0.5s forwards', opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <BarChart3 size={14} color="#ff006e" />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>SUBJECT PERFORMANCE</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analytics.subjectPerformance.map((subject, index) => {
              const gradeColor = gradeColors[subject.grade];
              const trendColor = subject.trend === 'up' ? '#06ffa5' : subject.trend === 'down' ? '#ff006e' : '#ffbe0b';
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '14px', color: '#fff' }}>{subject.subject}</div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden', marginTop: '6px' }}>
                      <div style={{ height: '100%', width: `${subject.score}%`, background: gradeColor, borderRadius: '2px' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}>
                    <span style={{ fontFamily: 'Share Tech Mono', fontSize: '12px', color: gradeColor }}>{subject.score}%</span>
                    <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '14px', color: gradeColor, minWidth: '32px', textAlign: 'center' }}>{subject.grade}</div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: trendColor, boxShadow: `0 0 6px ${trendColor}` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Strengths */}
        <div className="analytics-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', animation: 'fadeUp 0.6s ease 0.6s forwards', opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Award size={14} color="#06ffa5" />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>STRENGTHS</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {analytics.strengths.map((strength, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: 'rgba(6,255,165,0.05)', border: '1px solid rgba(6,255,165,0.15)', borderRadius: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06ffa5', boxShadow: '0 0 6px #06ffa5' }} />
                <span style={{ fontFamily: 'Rajdhani', fontSize: '14px', color: '#fff' }}>{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="analytics-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', animation: 'fadeUp 0.6s ease 0.7s forwards', opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Target size={14} color="#ffbe0b" />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>FOCUS AREAS</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {analytics.improvements.map((improvement, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: 'rgba(255,190,11,0.05)', border: '1px solid rgba(255,190,11,0.15)', borderRadius: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffbe0b', boxShadow: '0 0 6px #ffbe0b' }} />
                <span style={{ fontFamily: 'Rajdhani', fontSize: '14px', color: '#fff' }}>{improvement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
