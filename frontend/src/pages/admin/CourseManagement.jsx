import { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit2, Trash2, X, Save, Users, Search } from 'lucide-react';
import { courseAPI, studentAPI } from '../../services/api';
import toast from 'react-hot-toast';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const blank = { name: '', code: '', description: '', department: '', semester: '', credits: 3, learningOutcomes: [''] };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [cRes, sRes] = await Promise.all([courseAPI.getAll(), studentAPI.getAll()]);
      setCourses(cRes.data);
      setStudents(sRes.data);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...editCourse, learningOutcomes: editCourse.learningOutcomes?.filter(o => o.trim()) };
      if (editCourse._id) { await courseAPI.update(editCourse._id, data); toast.success('Course updated!'); }
      else { await courseAPI.create(data); toast.success('Course created!'); }
      setShowModal(false);
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try { await courseAPI.delete(id); toast.success('Course deleted'); fetchData(); }
    catch { toast.error('Delete failed'); }
  };

  const handleRemoveStudent = async (courseId, studentId) => {
    try { await courseAPI.removeStudent(courseId, studentId); toast.success('Student removed'); fetchData(); if (viewCourse) { const res = await courseAPI.getById(courseId); setViewCourse(res.data); } }
    catch { toast.error('Failed to remove'); }
  };

  const addOutcome = () => setEditCourse({ ...editCourse, learningOutcomes: [...(editCourse.learningOutcomes || []), ''] });
  const updateOutcome = (i, val) => { const lo = [...(editCourse.learningOutcomes || [])]; lo[i] = val; setEditCourse({ ...editCourse, learningOutcomes: lo }); };
  const removeOutcome = (i) => { const lo = [...(editCourse.learningOutcomes || [])].filter((_, idx) => idx !== i); setEditCourse({ ...editCourse, learningOutcomes: lo }); };

  const filtered = courses.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()) || c.code?.toLowerCase().includes(search.toLowerCase()) || c.department?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <LoadingScreen />;

  return (
    <div style={S.container}>
      <style>{base}</style>

      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={S.sectionLabel}><span style={S.dot} /> COURSE MANAGEMENT</div>
          <h1 style={S.pageTitle}>COURSE <span style={{ color: '#ff006e' }}>REGISTRY</span></h1>
          <div style={S.sub}>{courses.length} ACTIVE COURSES</div>
        </div>
        <button onClick={() => { setEditCourse({ ...blank }); setShowModal(true); }} style={S.addBtn}>
          <Plus size={14} /> ADD COURSE
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <Search size={14} color="rgba(255,0,110,0.5)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="SEARCH COURSES..." style={{ ...S.searchInput, paddingLeft: '40px', borderColor: 'rgba(255,0,110,0.1)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {filtered.map((course, i) => (
          <div key={course._id} style={{ ...S.card, animationDelay: `${i * 0.08}s`, animation: 'fadeUp 0.5s ease forwards', opacity: 0 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff006e, transparent)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '13px', color: '#ff006e', letterSpacing: '1px' }}>{course.code}</div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '17px', color: '#fff', marginTop: '4px' }}>{course.name}</div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => { setEditCourse({ ...course }); setShowModal(true); }} style={S.iconBtn('#ff006e')}><Edit2 size={12} /></button>
                <button onClick={() => handleDelete(course._id)} style={S.iconBtn('#ff006e')}><Trash2 size={12} /></button>
              </div>
            </div>
            <div style={{ fontFamily: 'Rajdhani', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', lineHeight: 1.6 }}>{course.description || 'No description'}</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <span style={S.chip('#ff006e')}>{course.department}</span>
              <span style={S.chip('#ffbe0b')}>SEM {course.semester}</span>
              <span style={S.chip('#00f5ff')}>{course.credits} CREDITS</span>
            </div>
            {course.learningOutcomes?.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginBottom: '6px' }}>LEARNING OUTCOMES</div>
                {course.learningOutcomes.slice(0, 2).map((lo, i) => (
                  <div key={i} style={{ fontFamily: 'Rajdhani', fontSize: '12px', color: 'rgba(255,255,255,0.4)', paddingLeft: '8px', borderLeft: '1px solid rgba(255,0,110,0.3)', marginBottom: '3px' }}>{lo}</div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                <Users size={12} /> {course.enrolledStudents?.length || 0} STUDENTS
              </div>
              <button onClick={() => setViewCourse(course)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Share Tech Mono', fontSize: '10px', color: '#ff006e', letterSpacing: '1px' }}>VIEW ROSTER →</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', fontFamily: 'Share Tech Mono', color: 'rgba(255,255,255,0.2)', fontSize: '12px', letterSpacing: '2px' }}>NO COURSES FOUND</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && editCourse && (
        <div style={S.overlay}>
          <div style={{ ...S.modal, maxWidth: '600px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '16px', letterSpacing: '2px', color: '#ff006e' }}>{editCourse._id ? 'EDIT COURSE' : 'CREATE COURSE'}</div>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[{ label: 'COURSE NAME', field: 'name' }, { label: 'COURSE CODE', field: 'code' }, { label: 'DEPARTMENT', field: 'department' }, { label: 'CREDITS', field: 'credits', type: 'number' }].map(({ label, field, type }) => (
                  <div key={field}>
                    <label style={S.label}>{label}</label>
                    <input type={type || 'text'} value={editCourse[field] || ''} onChange={e => setEditCourse({ ...editCourse, [field]: e.target.value })} style={S.input} required={['name', 'code', 'department'].includes(field)} />
                  </div>
                ))}
                <div>
                  <label style={S.label}>SEMESTER</label>
                  <select value={editCourse.semester || ''} onChange={e => setEditCourse({ ...editCourse, semester: e.target.value })} style={S.input} required>
                    <option value="">Select</option>
                    {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginTop: '14px' }}>
                <label style={S.label}>DESCRIPTION</label>
                <textarea value={editCourse.description || ''} onChange={e => setEditCourse({ ...editCourse, description: e.target.value })} rows={2} style={{ ...S.input, resize: 'vertical' }} />
              </div>
              <div style={{ marginTop: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={S.label}>LEARNING OUTCOMES</label>
                  <button type="button" onClick={addOutcome} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff006e', fontFamily: 'Share Tech Mono', fontSize: '10px', letterSpacing: '1px' }}>+ ADD</button>
                </div>
                {(editCourse.learningOutcomes || []).map((lo, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <input value={lo} onChange={e => updateOutcome(i, e.target.value)} placeholder={`Outcome ${i + 1}`} style={{ ...S.input, flex: 1 }} />
                    <button type="button" onClick={() => removeOutcome(i)} style={{ background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.2)', borderRadius: '6px', padding: '0 10px', cursor: 'pointer', color: '#ff006e' }}><X size={12} /></button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" disabled={saving} style={{ ...S.actionBtn, background: 'linear-gradient(135deg, #ff006e, #cc0055)', color: '#fff' }}>
                  <Save size={13} /> {saving ? 'SAVING...' : 'SAVE COURSE'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} style={{ ...S.actionBtn, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Roster Modal */}
      {viewCourse && (
        <div style={S.overlay}>
          <div style={{ ...S.modal, maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '14px', letterSpacing: '2px', color: '#ff006e' }}>{viewCourse.code}</div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '16px', color: '#fff', marginTop: '2px' }}>{viewCourse.name}</div>
              </div>
              <button onClick={() => setViewCourse(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><X size={18} /></button>
            </div>
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginBottom: '12px' }}>
              ENROLLED STUDENTS ({viewCourse.enrolledStudents?.length || 0})
            </div>
            <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {viewCourse.enrolledStudents?.length > 0 ? viewCourse.enrolledStudents.map(s => (
                <div key={s._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '14px' }}>{s.name}</div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{s.rollNumber} • {s.email}</div>
                  </div>
                  <button onClick={() => handleRemoveStudent(viewCourse._id, s._id)} style={{ background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.2)', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', color: '#ff006e', fontSize: '10px', fontFamily: 'Share Tech Mono' }}>REMOVE</button>
                </div>
              )) : <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>NO STUDENTS ENROLLED</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingScreen = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03000a', flexDirection: 'column', gap: '16px' }}>
    <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    <div style={{ width: '36px', height: '36px', border: '2px solid rgba(255,0,110,0.1)', borderTop: '2px solid #ff006e', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,0,110,0.5)', letterSpacing: '3px' }}>LOADING...</div>
  </div>
);

const base = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
`;

const S = {
  container: { padding: '32px', background: '#03000a', minHeight: '100vh', color: '#fff' },
  sectionLabel: { fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,0,110,0.6)', letterSpacing: '3px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', background: '#ff006e', boxShadow: '0 0 8px #ff006e', display: 'inline-block' },
  pageTitle: { fontFamily: 'Orbitron', fontWeight: 900, fontSize: '28px', letterSpacing: '3px', color: '#fff' },
  sub: { fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' },
  addBtn: { background: 'linear-gradient(135deg, #ff006e, #cc0055)', border: 'none', borderRadius: '6px', padding: '12px 20px', color: '#fff', fontFamily: 'Orbitron', fontWeight: 700, fontSize: '11px', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 20px rgba(255,0,110,0.3)' },
  searchInput: { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '12px 16px', color: '#fff', fontFamily: 'Share Tech Mono', fontSize: '12px', letterSpacing: '1px', outline: 'none' },
  card: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', position: 'relative', overflow: 'hidden' },
  chip: (color) => ({ fontFamily: 'Share Tech Mono', fontSize: '10px', color, background: `${color}15`, border: `1px solid ${color}25`, borderRadius: '3px', padding: '2px 8px', letterSpacing: '1px' }),
  iconBtn: (color) => ({ background: `${color}15`, border: `1px solid ${color}25`, borderRadius: '5px', padding: '6px', cursor: 'pointer', color, display: 'flex' }),
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' },
  modal: { background: '#0a0a1a', border: '1px solid rgba(255,0,110,0.15)', borderRadius: '16px', padding: '32px', width: '100%' },
  label: { fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,0,110,0.6)', letterSpacing: '2px', display: 'block', marginBottom: '6px' },
  input: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontFamily: 'Rajdhani', fontSize: '14px', outline: 'none' },
  actionBtn: { border: 'none', borderRadius: '6px', padding: '10px 20px', fontFamily: 'Orbitron', fontWeight: 700, fontSize: '11px', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' },
};

export default CourseManagement;