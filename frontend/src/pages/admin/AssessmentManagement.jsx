import { useState, useEffect } from 'react';
import { FileText, Plus, Edit2, Trash2, X, Save, Search } from 'lucide-react';
import { assessmentAPI, courseAPI } from '../../services/api';
import toast from 'react-hot-toast';

const AssessmentManagement = () => {
  const [assessments, setAssessments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const blank = { title: '', course: '', type: 'quiz', totalMarks: '', weightage: '', conductedDate: '', description: '', learningOutcome: '' };
  const types = ['quiz', 'assignment', 'midterm', 'final', 'project', 'lab'];
  const typeColors = { quiz: '#00f5ff', assignment: '#ff006e', midterm: '#ffbe0b', final: '#ff4d00', project: '#06ffa5', lab: '#8338ec' };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [aRes, cRes] = await Promise.all([assessmentAPI.getAll(), courseAPI.getAll()]);
      setAssessments(aRes.data);
      setCourses(cRes.data);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem._id) { await assessmentAPI.update(editItem._id, editItem); toast.success('Assessment updated!'); }
      else { await assessmentAPI.create(editItem); toast.success('Assessment created!'); }
      setShowModal(false);
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this assessment?')) return;
    try { await assessmentAPI.delete(id); toast.success('Deleted'); fetchData(); }
    catch { toast.error('Delete failed'); }
  };

  const filtered = assessments.filter(a => {
    const matchSearch = a.title?.toLowerCase().includes(search.toLowerCase()) || a.course?.name?.toLowerCase().includes(search.toLowerCase());
    const matchCourse = !filterCourse || a.course?._id === filterCourse;
    return matchSearch && matchCourse;
  });

  if (loading) return <LoadingScreen />;

  return (
    <div style={S.container}>
      <style>{base}</style>

      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={S.sectionLabel}><span style={S.dot} /> ASSESSMENT MANAGEMENT</div>
          <h1 style={S.pageTitle}>ASSESSMENT <span style={{ color: '#ffbe0b' }}>CENTER</span></h1>
          <div style={S.sub}>{assessments.length} TOTAL ASSESSMENTS</div>
        </div>
        <button onClick={() => { setEditItem({ ...blank }); setShowModal(true); }} style={S.addBtn}>
          <Plus size={14} /> CREATE ASSESSMENT
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={14} color="rgba(255,190,11,0.5)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="SEARCH ASSESSMENTS..." style={{ ...S.searchInput, paddingLeft: '40px' }} />
        </div>
        <select value={filterCourse} onChange={e => setFilterCourse(e.target.value)} style={{ ...S.searchInput, width: '220px' }}>
          <option value="">ALL COURSES</option>
          {courses.map(c => <option key={c._id} value={c._id}>{c.code} - {c.name}</option>)}
        </select>
      </div>

      {/* Assessment Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {filtered.map((a, i) => {
          const color = typeColors[a.type] || '#fff';
          return (
            <div key={a._id} style={{ ...S.card, animationDelay: `${i * 0.07}s`, animation: 'fadeUp 0.5s ease forwards', opacity: 0 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${color}, transparent)` }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color, background: `${color}15`, border: `1px solid ${color}25`, borderRadius: '3px', padding: '3px 10px', letterSpacing: '1px', textTransform: 'uppercase' }}>{a.type}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => { setEditItem({ ...a, course: a.course?._id }); setShowModal(true); }} style={S.iconBtn(color)}><Edit2 size={11} /></button>
                  <button onClick={() => handleDelete(a._id)} style={S.iconBtn('#ff006e')}><Trash2 size={11} /></button>
                </div>
              </div>
              <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '17px', color: '#fff', marginBottom: '6px' }}>{a.title}</div>
              <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>{a.course?.code} — {a.course?.name}</div>
              {a.description && <div style={{ fontFamily: 'Rajdhani', fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '16px', lineHeight: 1.5 }}>{a.description}</div>}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={S.infoBox}>
                  <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '20px', color }}>{a.totalMarks}</div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>TOTAL MARKS</div>
                </div>
                <div style={S.infoBox}>
                  <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '20px', color }}>{a.weightage}%</div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>WEIGHTAGE</div>
                </div>
              </div>
              {a.conductedDate && (
                <div style={{ marginTop: '12px', fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
                  📅 {new Date(a.conductedDate).toLocaleDateString()}
                </div>
              )}
              {a.learningOutcome && (
                <div style={{ marginTop: '10px', padding: '8px 10px', background: `${color}08`, borderLeft: `2px solid ${color}`, borderRadius: '0 4px 4px 0' }}>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', marginBottom: '2px' }}>LEARNING OUTCOME</div>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{a.learningOutcome}</div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', fontFamily: 'Share Tech Mono', color: 'rgba(255,255,255,0.2)', fontSize: '12px', letterSpacing: '2px' }}>NO ASSESSMENTS FOUND</div>
        )}
      </div>

      {/* Modal */}
      {showModal && editItem && (
        <div style={S.overlay}>
          <div style={{ ...S.modal, maxWidth: '580px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '16px', letterSpacing: '2px', color: '#ffbe0b' }}>{editItem._id ? 'EDIT ASSESSMENT' : 'CREATE ASSESSMENT'}</div>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div style={{ marginBottom: '14px' }}>
                <label style={S.label}>TITLE</label>
                <input value={editItem.title} onChange={e => setEditItem({ ...editItem, title: e.target.value })} style={S.input} required placeholder="e.g. Mid Term Exam 2024" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={S.label}>COURSE</label>
                  <select value={editItem.course} onChange={e => setEditItem({ ...editItem, course: e.target.value })} style={S.input} required>
                    <option value="">Select Course</option>
                    {courses.map(c => <option key={c._id} value={c._id}>{c.code} - {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.label}>TYPE</label>
                  <select value={editItem.type} onChange={e => setEditItem({ ...editItem, type: e.target.value })} style={S.input}>
                    {types.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.label}>TOTAL MARKS</label>
                  <input type="number" value={editItem.totalMarks} onChange={e => setEditItem({ ...editItem, totalMarks: e.target.value })} style={S.input} required min="1" />
                </div>
                <div>
                  <label style={S.label}>WEIGHTAGE (%)</label>
                  <input type="number" value={editItem.weightage} onChange={e => setEditItem({ ...editItem, weightage: e.target.value })} style={S.input} required min="1" max="100" />
                </div>
                <div>
                  <label style={S.label}>CONDUCTED DATE</label>
                  <input type="date" value={editItem.conductedDate ? editItem.conductedDate.split('T')[0] : ''} onChange={e => setEditItem({ ...editItem, conductedDate: e.target.value })} style={S.input} />
                </div>
              </div>
              <div style={{ marginTop: '14px' }}>
                <label style={S.label}>DESCRIPTION</label>
                <textarea value={editItem.description || ''} onChange={e => setEditItem({ ...editItem, description: e.target.value })} rows={2} style={{ ...S.input, resize: 'vertical' }} />
              </div>
              <div style={{ marginTop: '14px' }}>
                <label style={S.label}>LEARNING OUTCOME</label>
                <input value={editItem.learningOutcome || ''} onChange={e => setEditItem({ ...editItem, learningOutcome: e.target.value })} style={S.input} placeholder="What students will learn from this assessment" />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" disabled={saving} style={{ ...S.actionBtn, background: 'linear-gradient(135deg, #ffbe0b, #cc9600)', color: '#000' }}>
                  <Save size={13} /> {saving ? 'SAVING...' : 'SAVE'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} style={{ ...S.actionBtn, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingScreen = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03000a', flexDirection: 'column', gap: '16px' }}>
    <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    <div style={{ width: '36px', height: '36px', border: '2px solid rgba(255,190,11,0.1)', borderTop: '2px solid #ffbe0b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,190,11,0.5)', letterSpacing: '3px' }}>LOADING...</div>
  </div>
);

const base = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
`;

const S = {
  container: { padding: '32px', background: '#03000a', minHeight: '100vh', color: '#fff' },
  sectionLabel: { fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,190,11,0.6)', letterSpacing: '3px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', background: '#ffbe0b', boxShadow: '0 0 8px #ffbe0b', display: 'inline-block' },
  pageTitle: { fontFamily: 'Orbitron', fontWeight: 900, fontSize: '28px', letterSpacing: '3px', color: '#fff' },
  sub: { fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' },
  addBtn: { background: 'linear-gradient(135deg, #ffbe0b, #cc9600)', border: 'none', borderRadius: '6px', padding: '12px 20px', color: '#000', fontFamily: 'Orbitron', fontWeight: 700, fontSize: '11px', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 20px rgba(255,190,11,0.3)' },
  searchInput: { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '12px 16px', color: '#fff', fontFamily: 'Share Tech Mono', fontSize: '12px', letterSpacing: '1px', outline: 'none' },
  card: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', position: 'relative', overflow: 'hidden' },
  infoBox: { background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px', border: '1px solid rgba(255,255,255,0.05)' },
  iconBtn: (color) => ({ background: `${color}15`, border: `1px solid ${color}25`, borderRadius: '5px', padding: '6px', cursor: 'pointer', color, display: 'flex' }),
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' },
  modal: { background: '#0a0a1a', border: '1px solid rgba(255,190,11,0.15)', borderRadius: '16px', padding: '32px', width: '100%' },
  label: { fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,190,11,0.6)', letterSpacing: '2px', display: 'block', marginBottom: '6px' },
  input: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontFamily: 'Rajdhani', fontSize: '14px', outline: 'none' },
  actionBtn: { border: 'none', borderRadius: '6px', padding: '10px 20px', fontFamily: 'Orbitron', fontWeight: 700, fontSize: '11px', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' },
};

export default AssessmentManagement;