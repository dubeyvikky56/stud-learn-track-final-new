import { useState, useEffect } from 'react';
import { BookOpen, Clock, User, Award } from 'lucide-react';
import { courseAPI } from '../../services/api';
import toast from 'react-hot-toast';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseAPI.getAll();
        setCourses(response.data || []);
      } catch (error) {
        toast.error('Failed to load courses');
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03000a', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '36px', height: '36px', border: '2px solid rgba(0,245,255,0.1)', borderTop: '2px solid #00f5ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(0,245,255,0.5)', letterSpacing: '3px' }}>LOADING COURSES...</div>
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
        .course-card { transition: all 0.3s; cursor: pointer; }
        .course-card:hover { transform: translateY(-4px); }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '32px', animation: 'fadeUp 0.6s ease forwards' }}>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(0,245,255,0.5)', letterSpacing: '3px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff006e', boxShadow: '0 0 8px #ff006e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          MY ENROLLED COURSES
        </div>
        <h1 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '28px', letterSpacing: '2px' }}>
          COURSE <span style={{ color: '#ff006e', textShadow: '0 0 20px #ff006e' }}>CATALOG</span>
        </h1>
        <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
          {courses.length} AVAILABLE COURSES
        </div>
      </div>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px' }}>
          <BookOpen size={48} color="rgba(255,255,255,0.1)" style={{ marginBottom: '16px' }} />
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: '14px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>NO COURSES AVAILABLE</div>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '12px', color: 'rgba(255,255,255,0.2)', marginTop: '8px' }}>Contact your administrator to enroll in courses</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {courses.map((course, index) => (
            <div key={course.id || index} className="course-card" style={{ 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.06)', 
              borderRadius: '12px', 
              padding: '24px', 
              position: 'relative', 
              overflow: 'hidden',
              animation: `fadeUp 0.6s ease ${index * 0.1}s forwards`,
              opacity: 0
            }}>
              {/* Course Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={20} color="#ff006e" />
                </div>
                <div style={{ background: 'rgba(6,255,165,0.1)', border: '1px solid rgba(6,255,165,0.2)', borderRadius: '4px', padding: '4px 8px' }}>
                  <span style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: '#06ffa5', letterSpacing: '1px' }}>ENROLLED</span>
                </div>
              </div>

              {/* Course Info */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '16px', color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
                  {course.courseName || course.name || 'Course Name'}
                </h3>
                <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,0,110,0.6)', letterSpacing: '1px', marginBottom: '8px' }}>
                  {course.courseId || 'COURSE-001'}
                </div>
                <p style={{ fontFamily: 'Rajdhani', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: '12px' }}>
                  {course.description || 'Course description not available'}
                </p>
              </div>

              {/* Course Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={12} color="rgba(255,255,255,0.4)" />
                  <span style={{ fontFamily: 'Rajdhani', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Instructor: {course.instructor || 'TBA'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={12} color="rgba(255,255,255,0.4)" />
                  <span style={{ fontFamily: 'Rajdhani', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Duration: Full Semester</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>PROGRESS</span>
                  <span style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: '#00f5ff' }}>75%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '75%', background: 'linear-gradient(90deg, #00f5ff, #ff006e)', borderRadius: '2px' }} />
                </div>
              </div>

              {/* Action Button */}
              <button style={{
                width: '100%',
                background: 'linear-gradient(135deg, rgba(255,0,110,0.1), rgba(0,245,255,0.1))',
                border: '1px solid rgba(255,0,110,0.2)',
                borderRadius: '8px',
                padding: '10px',
                color: '#ff006e',
                fontFamily: 'Share Tech Mono',
                fontSize: '11px',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <Award size={12} />
                VIEW ASSESSMENTS
              </button>

              {/* Decorative Elements */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff006e, transparent)' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
