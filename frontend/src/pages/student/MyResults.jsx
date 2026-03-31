import { useState, useEffect } from 'react';
import { Award, TrendingUp, Target, Calendar, Download } from 'lucide-react';
import { resultAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const MyResults = () => {
  const [results, setResults] = useState([]);
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
    const fetchResults = async () => {
      try {
        // For demo purposes, create mock results
        const mockResults = [
          {
            id: '1',
            assessment: { title: 'Midterm Exam', type: 'EXAM' },
            course: { name: 'Data Structures', code: 'CS201' },
            marksObtained: 85,
            totalMarks: 100,
            percentage: 85,
            grade: 'A',
            date: '2024-03-15'
          },
          {
            id: '2', 
            assessment: { title: 'Database Project', type: 'PROJECT' },
            course: { name: 'Database Systems', code: 'CS301' },
            marksObtained: 42,
            totalMarks: 50,
            percentage: 84,
            grade: 'A',
            date: '2024-03-20'
          },
          {
            id: '3',
            assessment: { title: 'Quiz 1', type: 'QUIZ' },
            course: { name: 'Web Development', code: 'CS401' },
            marksObtained: 18,
            totalMarks: 25,
            percentage: 72,
            grade: 'B+',
            date: '2024-03-25'
          },
          {
            id: '4',
            assessment: { title: 'Assignment 2', type: 'ASSIGNMENT' },
            course: { name: 'Software Engineering', code: 'CS501' },
            marksObtained: 28,
            totalMarks: 30,
            percentage: 93,
            grade: 'A+',
            date: '2024-03-28'
          }
        ];
        
        setResults(mockResults);
      } catch (error) {
        toast.error('Failed to load results');
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const calculateStats = () => {
    if (results.length === 0) return { avgPercentage: 0, totalAssessments: 0, highestGrade: 'N/A' };
    
    const avgPercentage = (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(1);
    const grades = results.map(r => r.grade);
    const gradeOrder = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
    const highestGrade = gradeOrder.find(grade => grades.includes(grade)) || 'N/A';
    
    return {
      avgPercentage,
      totalAssessments: results.length,
      highestGrade
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03000a', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '36px', height: '36px', border: '2px solid rgba(0,245,255,0.1)', borderTop: '2px solid #00f5ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(0,245,255,0.5)', letterSpacing: '3px' }}>LOADING RESULTS...</div>
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
        .result-card { transition: all 0.3s; }
        .result-card:hover { transform: translateY(-2px); }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '32px', animation: 'fadeUp 0.6s ease forwards' }}>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(6,255,165,0.5)', letterSpacing: '3px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06ffa5', boxShadow: '0 0 8px #06ffa5', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          ACADEMIC RESULTS
        </div>
        <h1 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '28px', letterSpacing: '2px' }}>
          MY <span style={{ color: '#06ffa5', textShadow: '0 0 20px #06ffa5' }}>PERFORMANCE</span>
        </h1>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
          {results.length} ASSESSMENT RESULTS
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'AVERAGE SCORE', value: `${stats.avgPercentage}%`, icon: TrendingUp, color: '#00f5ff' },
          { label: 'ASSESSMENTS', value: stats.totalAssessments, icon: Target, color: '#ff006e' },
          { label: 'HIGHEST GRADE', value: stats.highestGrade, icon: Award, color: '#06ffa5' }
        ].map(({ label, value, icon: Icon, color }, i) => (
          <div key={label} style={{ 
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

      {/* Results Table */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden', animation: 'fadeUp 0.6s ease 0.3s forwards', opacity: 0 }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>ASSESSMENT RESULTS</div>
          <button style={{
            background: 'linear-gradient(135deg, #06ffa5, #00f5ff)',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontFamily: 'Share Tech Mono',
            fontSize: '10px',
            letterSpacing: '1px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Download size={12} /> EXPORT
          </button>
        </div>
        
        {results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Award size={48} color="rgba(255,255,255,0.1)" style={{ marginBottom: '16px' }} />
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: '14px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>NO RESULTS AVAILABLE</div>
            <div style={{ fontFamily: 'Rajdhani', fontSize: '12px', color: 'rgba(255,255,255,0.2)', marginTop: '8px' }}>Your assessment results will appear here</div>
          </div>
        ) : (
          <div style={{ padding: '0 24px 24px' }}>
            {results.map((result, index) => {
              const gradeColor = gradeColors[result.grade] || '#fff';
              return (
                <div key={result.id} className="result-card" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto auto auto auto',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  animation: `fadeUp 0.4s ease ${index * 0.05}s forwards`,
                  opacity: 0
                }}>
                  {/* Assessment Info */}
                  <div>
                    <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '15px', color: '#fff', marginBottom: '4px' }}>
                      {result.assessment.title}
                    </div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                      {result.course.code} • {result.assessment.type}
                    </div>
                  </div>

                  {/* Course */}
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                    {result.course.name}
                  </div>

                  {/* Marks */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '16px', color: '#fff' }}>
                      {result.marksObtained}/{result.totalMarks}
                    </div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>MARKS</div>
                  </div>

                  {/* Percentage */}
                  <div style={{ textAlign: 'center', minWidth: '80px' }}>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                      <div style={{ height: '100%', width: `${result.percentage}%`, background: gradeColor, borderRadius: '3px', boxShadow: `0 0 8px ${gradeColor}50` }} />
                    </div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: gradeColor, fontWeight: 700 }}>
                      {result.percentage}%
                    </div>
                  </div>

                  {/* Grade */}
                  <div style={{ textAlign: 'center', minWidth: '60px' }}>
                    <div style={{
                      fontFamily: 'Orbitron',
                      fontWeight: 900,
                      fontSize: '24px',
                      color: gradeColor,
                      textShadow: `0 0 15px ${gradeColor}50`,
                      background: `${gradeColor}10`,
                      border: `1px solid ${gradeColor}25`,
                      borderRadius: '8px',
                      padding: '8px',
                      minWidth: '50px'
                    }}>
                      {result.grade}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResults;
