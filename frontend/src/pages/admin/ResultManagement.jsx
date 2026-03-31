import { useState, useEffect } from 'react';
import { Award, Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { resultAPI, studentAPI, assessmentAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ResultManagement = () => {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const gradeColors = {
    'A+': '#06ffa5', 'A': '#00f5ff', 'B+': '#ffbe0b', 'B': '#ff9500',
    'C+': '#ff6b00', 'C': '#ff4d00', 'D': '#ff006e', 'F': '#8b0000'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rRes, sRes, aRes] = await Promise.all([
          resultAPI.getAll(),
          studentAPI.getAll(),
          assessmentAPI.getAll()
        ]);
        setResults(rRes.data || []);
        setStudents(sRes.data || []);
        setAssessments(aRes.data || []);
      } catch (error) {
        toast.error('Failed to load data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = results.filter(r => 
    r.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.assessment?.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03000a', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '36px', height: '36px', border: '2px solid rgba(6,255,165,0.1)', borderTop: '2px solid #06ffa5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(6,255,165,0.5)', letterSpacing: '3px' }}>LOADING RESULTS...</div>
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
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(6,255,165,0.5)', letterSpacing: '3px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06ffa5', boxShadow: '0 0 8px #06ffa5', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            RESULT MANAGEMENT
          </div>
          <h1 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '28px', letterSpacing: '3px', color: '#fff' }}>
            STUDENT <span style={{ color: '#06ffa5', textShadow: '0 0 20px #06ffa5' }}>RESULTS</span>
          </h1>
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
            {results.length} TOTAL RESULTS
          </div>
        </div>
        <button style={{
          background: 'linear-gradient(135deg, #06ffa5, #00cc7a)',
          border: 'none',
          borderRadius: '6px',
          padding: '12px 20px',
          color: '#000',
          fontFamily: 'Orbitron',
          fontWeight: 700,
          fontSize: '11px',
          letterSpacing: '1px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 0 20px rgba(6,255,165,0.3)'
        }}>
          <Plus size={14} /> ADD RESULT
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <Search size={14} color="rgba(6,255,165,0.5)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="SEARCH BY STUDENT NAME OR ASSESSMENT..."
          style={{
            width: '100%',
            background: 'rgba(6,255,165,0.04)',
            border: '1px solid rgba(6,255,165,0.1)',
            borderRadius: '8px',
            padding: '12px 16px 12px 40px',
            color: '#fff',
            fontFamily: 'Share Tech Mono',
            fontSize: '12px',
            letterSpacing: '1px',
            outline: 'none'
          }}
        />
      </div>

      {/* Results Table */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>ASSESSMENT RESULTS</div>
        </div>
        
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Award size={48} color="rgba(255,255,255,0.1)" style={{ marginBottom: '16px' }} />
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: '14px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>NO RESULTS FOUND</div>
            <div style={{ fontFamily: 'Rajdhani', fontSize: '12px', color: 'rgba(255,255,255,0.2)', marginTop: '8px' }}>Results will appear here when added</div>
          </div>
        ) : (
          <div style={{ padding: '0 24px 24px' }}>
            {filtered.map((result, index) => {
              const gradeColor = gradeColors[result.grade] || '#fff';
              return (
                <div key={result.id || index} style={{
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
                  {/* Student & Assessment Info */}
                  <div>
                    <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '15px', color: '#fff', marginBottom: '4px' }}>
                      {result.student?.name || 'Unknown Student'}
                    </div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                      {result.assessment?.title || 'Unknown Assessment'} • {result.course?.code || 'N/A'}
                    </div>
                  </div>

                  {/* Marks */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '16px', color: '#fff' }}>
                      {result.marksObtained || 0}/{result.totalMarks || 100}
                    </div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>MARKS</div>
                  </div>

                  {/* Percentage */}
                  <div style={{ textAlign: 'center', minWidth: '80px' }}>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                      <div style={{ height: '100%', width: `${result.percentage || 0}%`, background: gradeColor, borderRadius: '3px', boxShadow: `0 0 8px ${gradeColor}50` }} />
                    </div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: gradeColor, fontWeight: 700 }}>
                      {result.percentage || 0}%
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
                      {result.grade || 'N/A'}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button style={{
                      background: 'rgba(0,245,255,0.15)',
                      border: '1px solid rgba(0,245,255,0.25)',
                      borderRadius: '5px',
                      padding: '6px',
                      cursor: 'pointer',
                      color: '#00f5ff',
                      display: 'flex'
                    }}>
                      <Edit2 size={12} />
                    </button>
                    <button style={{
                      background: 'rgba(255,0,110,0.15)',
                      border: '1px solid rgba(255,0,110,0.25)',
                      borderRadius: '5px',
                      padding: '6px',
                      cursor: 'pointer',
                      color: '#ff006e',
                      display: 'flex'
                    }}>
                      <Trash2 size={12} />
                    </button>
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

export default ResultManagement;
