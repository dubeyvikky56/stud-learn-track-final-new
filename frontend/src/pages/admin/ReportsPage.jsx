import { useState, useEffect } from 'react';
import { BarChart3, Download, FileText, TrendingUp, Users, Award } from 'lucide-react';
import { reportAPI, studentAPI, courseAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ReportsPage = () => {
  const [reports, setReports] = useState({
    totalStudents: 0,
    totalCourses: 0,
    averagePerformance: 0,
    passRate: 0,
    gradeDistribution: {},
    topPerformers: [],
    coursePerformance: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [students, setStudents] = useState([]);

  const gradeColors = {
    'A+': '#06ffa5', 'A': '#00f5ff', 'B+': '#ffbe0b', 'B': '#ff9500',
    'C+': '#ff6b00', 'C': '#ff4d00', 'D': '#ff006e', 'F': '#8b0000'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await studentAPI.getAll();
        setStudents(studentsRes.data || []);
        
        // Mock report data
        const mockReports = {
          totalStudents: studentsRes.data?.length || 0,
          totalCourses: 4,
          averagePerformance: 78.5,
          passRate: 85.2,
          gradeDistribution: { 'A+': 5, 'A': 8, 'B+': 12, 'B': 7, 'C': 3, 'D': 2, 'F': 1 },
          topPerformers: [
            { name: 'John Doe', average: 92.5, grade: 'A+' },
            { name: 'Jane Smith', average: 89.3, grade: 'A' },
            { name: 'Mike Johnson', average: 87.1, grade: 'A' }
          ],
          coursePerformance: [
            { course: 'Data Structures', average: 82.4, students: 25 },
            { course: 'Database Systems', average: 78.9, students: 23 },
            { course: 'Web Development', average: 85.2, students: 28 },
            { course: 'Software Engineering', average: 79.6, students: 22 }
          ]
        };
        setReports(mockReports);
      } catch (error) {
        toast.error('Failed to load reports');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateStudentReport = async () => {
    if (!selectedStudent) {
      toast.error('Please select a student');
      return;
    }
    try {
      // In a real app, this would call the API
      toast.success('Student report generated!');
    } catch (error) {
      toast.error('Failed to generate report');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03000a', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '36px', height: '36px', border: '2px solid rgba(255,77,0,0.1)', borderTop: '2px solid #ff4d00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,77,0,0.5)', letterSpacing: '3px' }}>GENERATING REPORTS...</div>
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
        .report-card { transition: all 0.3s; }
        .report-card:hover { transform: translateY(-2px); }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '32px', animation: 'fadeUp 0.6s ease forwards' }}>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,77,0,0.5)', letterSpacing: '3px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4d00', boxShadow: '0 0 8px #ff4d00', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          ANALYTICS & REPORTS
        </div>
        <h1 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '28px', letterSpacing: '2px' }}>
          PERFORMANCE <span style={{ color: '#ff4d00', textShadow: '0 0 20px #ff4d00' }}>REPORTS</span>
        </h1>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
          COMPREHENSIVE ACADEMIC ANALYTICS
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'TOTAL STUDENTS', value: reports.totalStudents, icon: Users, color: '#00f5ff' },
          { label: 'ACTIVE COURSES', value: reports.totalCourses, icon: FileText, color: '#ff006e' },
          { label: 'AVG PERFORMANCE', value: `${reports.averagePerformance}%`, icon: TrendingUp, color: '#06ffa5' },
          { label: 'PASS RATE', value: `${reports.passRate}%`, icon: Award, color: '#ffbe0b' }
        ].map(({ label, value, icon: Icon, color }, i) => (
          <div key={label} className="report-card" style={{
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
        <div className="report-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', animation: 'fadeUp 0.6s ease 0.4s forwards', opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <BarChart3 size={14} color="#00f5ff" />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>GRADE DISTRIBUTION</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {Object.entries(reports.gradeDistribution).map(([grade, count]) => {
              const color = gradeColors[grade];
              const total = Object.values(reports.gradeDistribution).reduce((a, b) => a + b, 0);
              const percentage = total ? ((count / total) * 100).toFixed(0) : 0;
              return (
                <div key={grade} style={{ flex: '1 1 calc(25% - 9px)', minWidth: '60px', background: `${color}10`, border: `1px solid ${color}25`, borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '20px', color, textShadow: `0 0 15px ${color}50` }}>{grade}</div>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '14px', color: '#fff', marginTop: '2px', fontWeight: 700 }}>{count}</div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: '8px', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performers */}
        <div className="report-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', animation: 'fadeUp 0.6s ease 0.5s forwards', opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Award size={14} color="#06ffa5" />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>TOP PERFORMERS</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reports.topPerformers.map((student, index) => {
              const gradeColor = gradeColors[student.grade];
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `${gradeColor}20`, border: `1px solid ${gradeColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron', fontWeight: 700, fontSize: '10px', color: gradeColor }}>
                      {index + 1}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '14px', color: '#fff' }}>{student.name}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: 'Share Tech Mono', fontSize: '12px', color: gradeColor }}>{student.average}%</span>
                    <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '14px', color: gradeColor, minWidth: '32px', textAlign: 'center' }}>{student.grade}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Course Performance & Student Report Generator */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Course Performance */}
        <div className="report-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', animation: 'fadeUp 0.6s ease 0.6s forwards', opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <TrendingUp size={14} color="#ffbe0b" />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>COURSE PERFORMANCE</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reports.coursePerformance.map((course, index) => {
              const performance = course.average;
              const color = performance >= 80 ? '#06ffa5' : performance >= 70 ? '#ffbe0b' : performance >= 60 ? '#ff9500' : '#ff006e';
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '15px', color: '#fff', marginBottom: '4px' }}>{course.course}</div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{course.students} STUDENTS ENROLLED</div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden', marginTop: '8px' }}>
                      <div style={{ height: '100%', width: `${performance}%`, background: color, borderRadius: '2px' }} />
                    </div>
                  </div>
                  <div style={{ marginLeft: '20px', textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '20px', color, textShadow: `0 0 10px ${color}50` }}>{performance}%</div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>AVERAGE</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Student Report Generator */}
        <div className="report-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', animation: 'fadeUp 0.6s ease 0.7s forwards', opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Download size={14} color="#ff4d00" />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>GENERATE REPORT</span>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,77,0,0.6)', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>SELECT STUDENT</label>
            <select 
              value={selectedStudent} 
              onChange={e => setSelectedStudent(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
                padding: '10px 14px',
                color: '#fff',
                fontFamily: 'Rajdhani',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="">Choose student...</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <button 
            onClick={generateStudentReport}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #ff4d00, #cc3d00)',
              border: 'none',
              borderRadius: '6px',
              padding: '12px',
              color: '#fff',
              fontFamily: 'Orbitron',
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '1px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}
          >
            <Download size={12} /> GENERATE PDF
          </button>
          <div style={{ padding: '12px', background: 'rgba(255,77,0,0.05)', border: '1px solid rgba(255,77,0,0.15)', borderRadius: '6px' }}>
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>REPORT INCLUDES:</div>
            <ul style={{ fontFamily: 'Rajdhani', fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, paddingLeft: '16px' }}>
              <li>Academic Performance</li>
              <li>Grade Analysis</li>
              <li>Progress Tracking</li>
              <li>Recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
