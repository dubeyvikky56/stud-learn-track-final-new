import { useState, useEffect } from 'react';
import { TrendingUp, Award, BookOpen, Target, ChevronRight } from 'lucide-react';
import { resultAPI, courseAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const [data, setData] = useState({
    avgPercentage: 0,
    totalAssessments: 0,
    passRate: 0,
    enrolledCourses: 0,
    gradeDistribution: {},
    courses: [],
    recentResults: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const gradeColors = { 'A+': '#06ffa5', 'A': '#00f5ff', 'B': '#ffbe0b', 'C': '#ff9500', 'D': '#ff6b00', 'F': '#ff006e' };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        
        // Create initial mock data
        const mockData = {
          avgPercentage: 78.5,
          totalAssessments: 12,
          passRate: 85,
          enrolledCourses: 4,
          gradeDistribution: { 'A': 3, 'B': 5, 'C': 3, 'D': 1 },
          courses: [],
          recentResults: []
        };
        
        // Try to fetch actual courses
        try {
          const coursesRes = await courseAPI.getAll();
          if (coursesRes.data && coursesRes.data.length > 0) {
            mockData.courses = coursesRes.data.slice(0, 4);
            mockData.enrolledCourses = mockData.courses.length;
            toast.success('Courses loaded successfully!');
          }
        } catch (err) {
          console.log('Could not fetch courses:', err);
          toast.error('Could not load courses data');
        }
        
        // Try to fetch student results if we have user info
        if (user?.email) {
          try {
            // This would need a proper student ID lookup
            // For now, we'll use mock data
            console.log('User data:', user);
          } catch (err) {
            console.log('Could not fetch results:', err);
          }
        }
        
        setData(mockData);
        
      } catch (err) {
        console.error('Error fetching student data:', err);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [user]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03000a', flexDirection: 'column', gap: '16px' }}>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: '36px', height: '36px', border: '2px solid rgba(0,245,255,0.1)', borderTop: '2px solid #00f5ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(0,245,255,0.5)', letterSpacing: '3px' }}>LOADING YOUR DATA...</div>
    </div>
  );

  return (
    <div style={{ padding: '32px', background: '#03000a', minHeight: '100vh', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .stat-c:hover { transform: translateY(-4px) !important; }
      `}</style>

      {/* Welcome */}
      <div style={{ marginBottom: '32px', animation: 'fadeUp 0.6s ease forwards' }}>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(0,245,255,0.5)', letterSpacing: '3px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06ffa5', boxShadow: '0 0 8px #06ffa5', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          STUDENT PORTAL
        </div>
        <h1 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '28px', letterSpacing: '2px' }}>
          WELCOME, <span style={{ color: '#00f5ff', textShadow: '0 0 20px #00f5ff' }}>{user?.name?.toUpperCase()}</span>
        </h1>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
          {user?.rollNumber && `ROLL: ${user.rollNumber} • `}{user?.department && `${user.department} • `}{user?.semester && `SEM ${user.semester}`}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'AVG SCORE', value: `${data?.avgPercentage || 0}%`, icon: TrendingUp, color: '#00f5ff' },
          { label: 'ASSESSMENTS', value: data?.totalAssessments || 0, icon: Target, color: '#ff006e' },
          { label: 'PASS RATE', value: `${data?.passRate || 0}%`, icon: Award, color: '#06ffa5' },
          { label: 'COURSES', value: data?.enrolledCourses || 0, icon: BookOpen, color: '#ffbe0b' },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <div key={label} className="stat-c" style={{ background: `${color}06`, border: `1px solid ${color}20`, borderRadius: '12px', padding: '24px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s', animationDelay: `${i * 0.1}s`, animation: 'fadeUp 0.6s ease forwards', opacity: 0 }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Grade Distribution */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', animation: 'fadeUp 0.6s ease 0.3s forwards', opacity: 0 }}>
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={12} color="#ffbe0b" /> GRADE BREAKDOWN
          </div>
          {data?.gradeDistribution && Object.keys(data.gradeDistribution).length > 0 ? (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {Object.entries(data.gradeDistribution).map(([grade, count]) => {
                const color = gradeColors[grade] || '#fff';
                return (
                  <div key={grade} style={{ flex: 1, minWidth: '70px', background: `${color}10`, border: `1px solid ${color}25`, borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '28px', color, textShadow: `0 0 15px ${color}50` }}>{grade}</div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '18px', color: '#fff', marginTop: '4px', fontWeight: 700 }}>{count}</div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>TIMES</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px', fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>NO GRADES YET</div>
          )}
        </div>

        {/* Enrolled Courses */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', animation: 'fadeUp 0.6s ease 0.4s forwards', opacity: 0 }}>
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={12} color="#ff006e" /> MY COURSES
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data?.courses?.length > 0 ? data.courses.map(course => (
              <div key={course._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div>
                  <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '14px' }}>{course.name}</div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{course.code} • {course.instructor?.name}</div>
                </div>
                <span style={{ fontFamily: 'Orbitron', fontSize: '11px', color: '#ff006e', background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.2)', borderRadius: '4px', padding: '3px 8px' }}>{course.credits}CR</span>
              </div>
            )) : <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>NOT ENROLLED IN ANY COURSE</div>}
          </div>
        </div>
      </div>

      {/* Recent Results */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', animation: 'fadeUp 0.6s ease 0.5s forwards', opacity: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={12} color="#00f5ff" /> RECENT ASSESSMENTS
          </div>
          <Link to="/student/results" style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: '#00f5ff', textDecoration: 'none', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            VIEW ALL <ChevronRight size={12} />
          </Link>
        </div>
        {data?.recentResults?.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.recentResults.map((r, i) => {
              const color = gradeColors[r.grade] || '#fff';
              return (
                <div key={r._id || i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '16px', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div>
                    <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '14px' }}>{r.assessment?.title}</div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{r.course?.code} • {r.assessment?.type}</div>
                  </div>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>{r.marksObtained}/{r.totalMarks}</div>
                  <div style={{ minWidth: '80px' }}>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${r.percentage}%`, background: color, borderRadius: '2px' }} />
                    </div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color, marginTop: '3px', textAlign: 'right' }}>{r.percentage}%</div>
                  </div>
                  <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '18px', color, textShadow: `0 0 10px ${color}50`, minWidth: '32px', textAlign: 'center' }}>{r.grade}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '2px' }}>
            NO RESULTS YET — ASSESSMENTS WILL APPEAR HERE
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;