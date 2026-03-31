import { useState, useEffect } from 'react';
import { Users, Search, Edit2, Trash2, Plus, X, Save, AlertTriangle, ChevronDown } from 'lucide-react';
import { studentAPI, courseAPI } from '../../services/api';
import toast from 'react-hot-toast';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editStudent, setEditStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [enrollModal, setEnrollModal] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sRes, cRes] = await Promise.all([studentAPI.getAll(), courseAPI.getAll()]);
      setStudents(sRes.data);
      setCourses(cRes.data);
    } catch (err) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await studentAPI.update(editStudent._id, editStudent);
      toast.success('Student updated!');
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this student?')) return;
    try {
      await studentAPI.delete(id);
      toast.success('Student deactivated');
      fetchData();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleEnroll = async () => {
    if (!selectedCourse) return toast.error('Select a course');
    setSaving(true);
    try {
      await courseAPI.enrollStudent(selectedCourse, enrollModal._id);
      toast.success(`${enrollModal.name} enrolled successfully!`);
      setEnrollModal(null);
      setSelectedCourse('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setSaving(false);
    }
  };

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNumber?.toLowerCase().includes(search.toLowerCase()) ||
    s.department?.toLowerCase().includes(search.toLowerCase())
  );

  const gradeColor = (avg) => {
    if (!avg) return 'rgba(255,255,255,0.3)';
    if (avg >= 80) return '#06ffa5';
    if (avg >= 60) return '#ffbe0b';
    return '#ff006e';
  };

  if (loading) return <LoadingScreen />;

  return (
    <div style={styles.container}>
      <style>{baseStyles}</style>

      {/* Header */}
      <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={styles.sectionLabel}><span style={styles.dot} /> STUDENT MANAGEMENT</div>
          <h1 style={styles.pageTitle}>STUDENT <span style={{ color: '#00f5ff' }}>REGISTRY</span></h1>
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{students.length} REGISTERED STUDENTS</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <Search size={14} color="rgba(0,245,255,0.5)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="SEARCH BY NAME, EMAIL, ROLL, DEPARTMENT..."
          style={styles.searchInput}
        />
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,245,255,0.1)' }}>
              {['STUDENT', 'ROLL NO', 'DEPARTMENT', 'SEMESTER', 'STATUS', 'ACTIONS'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', fontFamily: 'Share Tech Mono', color: 'rgba(255,255,255,0.2)', fontSize: '12px', letterSpacing: '2px' }}>NO STUDENTS FOUND</td></tr>
            ) : filtered.map((student, i) => (
              <tr key={student._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', animation: `fadeUp 0.4s ease ${i * 0.05}s forwards`, opacity: 0 }} className="table-row">
                <td style={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron', fontWeight: 700, fontSize: '13px', color: '#00f5ff' }}>
                      {student.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '15px', color: '#fff' }}>{student.name}</div>
                      <div style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{student.email}</div>
                    </div>
                  </div>
                </td>
                <td style={styles.td}><span style={styles.badge}>{student.rollNumber || '—'}</span></td>
                <td style={styles.td}><span style={{ fontFamily: 'Rajdhani', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{student.department || '—'}</span></td>
                <td style={styles.td}><span style={{ fontFamily: 'Orbitron', fontSize: '12px', color: '#ffbe0b' }}>SEM {student.semester || '—'}</span></td>
                <td style={styles.td}>
                  <span style={{ ...styles.statusBadge, background: student.isActive ? 'rgba(6,255,165,0.1)' : 'rgba(255,0,110,0.1)', color: student.isActive ? '#06ffa5' : '#ff006e', border: `1px solid ${student.isActive ? '#06ffa530' : '#ff006e30'}` }}>
                    {student.isActive ? '● ACTIVE' : '○ INACTIVE'}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setEditStudent({ ...student }); setShowModal(true); }} style={styles.iconBtn('#00f5ff')} title="Edit">
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => setEnrollModal(student)} style={styles.iconBtn('#ffbe0b')} title="Enroll in Course">
                      <Plus size={13} />
                    </button>
                    <button onClick={() => handleDelete(student._id)} style={styles.iconBtn('#ff006e')} title="Deactivate">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && editStudent && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '16px', letterSpacing: '2px', color: '#00f5ff' }}>EDIT STUDENT</div>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleUpdate}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[
                  { label: 'FULL NAME', field: 'name', type: 'text' },
                  { label: 'EMAIL', field: 'email', type: 'email' },
                  { label: 'ROLL NUMBER', field: 'rollNumber', type: 'text' },
                  { label: 'DEPARTMENT', field: 'department', type: 'text' },
                ].map(({ label, field, type }) => (
                  <div key={field}>
                    <label style={styles.label}>{label}</label>
                    <input type={type} value={editStudent[field] || ''} onChange={e => setEditStudent({ ...editStudent, [field]: e.target.value })} style={styles.input} />
                  </div>
                ))}
                <div>
                  <label style={styles.label}>SEMESTER</label>
                  <select value={editStudent.semester || ''} onChange={e => setEditStudent({ ...editStudent, semester: e.target.value })} style={styles.input}>
                    <option value="">Select</option>
                    {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>STATUS</label>
                  <select value={editStudent.isActive} onChange={e => setEditStudent({ ...editStudent, isActive: e.target.value === 'true' })} style={styles.input}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" disabled={saving} style={styles.cyberBtn('#00f5ff')}>
                  <Save size={13} /> {saving ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} style={styles.cyberBtn('rgba(255,255,255,0.3)')}>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enroll Modal */}
      {enrollModal && (
        <div style={styles.overlay}>
          <div style={{ ...styles.modal, maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '14px', letterSpacing: '2px', color: '#ffbe0b' }}>ENROLL IN COURSE</div>
              <button onClick={() => setEnrollModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><X size={18} /></button>
            </div>
            <div style={{ fontFamily: 'Rajdhani', fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>
              Enrolling: <span style={{ color: '#fff', fontWeight: 700 }}>{enrollModal.name}</span>
            </div>
            <label style={styles.label}>SELECT COURSE</label>
            <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} style={{ ...styles.input, marginBottom: '20px' }}>
              <option value="">Choose a course...</option>
              {courses.map(c => <option key={c._id} value={c._id}>{c.name} ({c.code})</option>)}
            </select>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleEnroll} disabled={saving} style={styles.cyberBtn('#ffbe0b')}>
                <Plus size={13} /> {saving ? 'ENROLLING...' : 'ENROLL'}
              </button>
              <button onClick={() => setEnrollModal(null)} style={styles.cyberBtn('rgba(255,255,255,0.3)')}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingScreen = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03000a', flexDirection: 'column', gap: '16px' }}>
    <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    <div style={{ width: '36px', height: '36px', border: '2px solid rgba(0,245,255,0.1)', borderTop: '2px solid #00f5ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <div style={{ fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(0,245,255,0.5)', letterSpacing: '3px' }}>LOADING...</div>
  </div>
);

const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .table-row:hover { background: rgba(0,245,255,0.03) !important; }
`;

const styles = {
  container: { padding: '32px', background: '#03000a', minHeight: '100vh', color: '#fff' },
  sectionLabel: { fontFamily: 'Share Tech Mono', fontSize: '11px', color: 'rgba(0,245,255,0.5)', letterSpacing: '3px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', background: '#00f5ff', boxShadow: '0 0 8px #00f5ff', display: 'inline-block' },
  pageTitle: { fontFamily: 'Orbitron', fontWeight: 900, fontSize: '28px', letterSpacing: '3px', color: '#fff' },
  searchInput: { width: '100%', background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.1)', borderRadius: '8px', padding: '12px 16px 12px 40px', color: '#fff', fontFamily: 'Share Tech Mono', fontSize: '12px', letterSpacing: '1px', outline: 'none' },
  tableWrap: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' },
  th: { padding: '14px 16px', textAlign: 'left', fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(0,245,255,0.5)', letterSpacing: '2px', background: 'rgba(0,245,255,0.03)' },
  td: { padding: '14px 16px', verticalAlign: 'middle' },
  badge: { fontFamily: 'Share Tech Mono', fontSize: '11px', color: '#ffbe0b', background: 'rgba(255,190,11,0.1)', border: '1px solid rgba(255,190,11,0.2)', borderRadius: '4px', padding: '3px 8px' },
  statusBadge: { fontFamily: 'Share Tech Mono', fontSize: '10px', borderRadius: '4px', padding: '4px 10px', letterSpacing: '1px' },
  iconBtn: (color) => ({ background: `${color}15`, border: `1px solid ${color}30`, borderRadius: '6px', padding: '7px', cursor: 'pointer', color, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }),
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' },
  modal: { background: '#0a0a1a', border: '1px solid rgba(0,245,255,0.15)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '560px', position: 'relative' },
  label: { fontFamily: 'Share Tech Mono', fontSize: '10px', color: 'rgba(0,245,255,0.5)', letterSpacing: '2px', display: 'block', marginBottom: '6px' },
  input: { width: '100%', background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontFamily: 'Rajdhani', fontSize: '14px', outline: 'none', marginBottom: '0' },
  cyberBtn: (color) => ({ background: color === '#00f5ff' ? 'linear-gradient(135deg, #00f5ff, #0099aa)' : color === '#ffbe0b' ? 'linear-gradient(135deg, #ffbe0b, #cc9600)' : 'rgba(255,255,255,0.05)', border: `1px solid ${color}30`, borderRadius: '6px', padding: '10px 20px', color: color === '#00f5ff' || color === '#ffbe0b' ? '#000' : 'rgba(255,255,255,0.6)', fontFamily: 'Orbitron', fontWeight: 700, fontSize: '11px', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }),
};

export default StudentManagement;