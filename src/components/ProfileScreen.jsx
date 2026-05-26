import React, { useState, useEffect } from 'react';
import { User, ShieldAlert, Trash2, Edit2, Check, Clock, Route, Trash } from 'lucide-react';
import { storage } from '../utils/storage';
import { trainingPlans } from '../data/trainingPlans';

export default function ProfileScreen({ activePlanId, onResetData }) {
  const [profile, setProfile] = useState({ name: 'Runner', targetPace: '6:00', weight: 70 });
  const [history, setHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPace, setEditPace] = useState('');
  const [editWeight, setEditWeight] = useState('');

  useEffect(() => {
    setProfile(storage.getUserProfile());
    setHistory(storage.getRunHistory());
  }, []);

  const handleEditToggle = () => {
    if (!isEditing) {
      setEditName(profile.name);
      setEditPace(profile.targetPace);
      setEditWeight(profile.weight);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = storage.updateUserProfile({
      name: editName,
      targetPace: editPace,
      weight: parseFloat(editWeight) || 70
    });
    setProfile(updated);
    setIsEditing(false);
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all run logs and reset plan progress? This action is irreversible.")) {
      localStorage.clear();
      onResetData();
      setProfile({ name: 'Runner', targetPace: '6:00', weight: 70 });
      setHistory([]);
    }
  };

  const activePlan = activePlanId ? trainingPlans[activePlanId] : null;

  return (
    <div className="page-container" style={styles.container}>
      {/* RUNNER PROFILE CARD */}
      <header className="glass" style={styles.profileHeader}>
        <div style={styles.avatarGlow}>
          <img 
            src="/assets/logo.jpg" 
            alt="Zele Runners" 
            style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              border: '2px solid var(--primary)', 
              boxShadow: '0 0 15px var(--primary-glow)',
              objectFit: 'cover'
            }} 
          />
        </div>

        {!isEditing ? (
          <div style={styles.profileInfo}>
            <h1 style={styles.profileName}>{profile.name}</h1>
            <span style={styles.planStatus}>
              {activePlan ? `Training Plan: ${activePlan.title}` : 'No Active Coaching Plan'}
            </span>
            <div style={styles.profileMetrics}>
              <div style={styles.profMetric}>
                <span style={styles.profMetricLabel}>Weight</span>
                <span style={styles.profMetricVal}>{profile.weight} kg</span>
              </div>
              <div style={styles.profMetric}>
                <span style={styles.profMetricLabel}>Goal Pace</span>
                <span style={styles.profMetricVal}>{profile.targetPace} /km</span>
              </div>
            </div>
            <button onClick={handleEditToggle} style={styles.editBtn}>
              <Edit2 size={12} /> Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} style={styles.editForm}>
            <input 
              type="text" 
              placeholder="Runner Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={styles.editInput}
              required
            />
            <div style={styles.editInputsRow}>
              <input 
                type="text" 
                placeholder="Pace (e.g. 5:45)"
                value={editPace}
                onChange={(e) => setEditPace(e.target.value)}
                style={styles.editInputHalf}
                required
              />
              <input 
                type="number" 
                placeholder="Weight (kg)"
                value={editWeight}
                onChange={(e) => setEditWeight(e.target.value)}
                style={styles.editInputHalf}
                required
              />
            </div>
            <div style={styles.editActions}>
              <button type="submit" style={styles.saveBtn}>
                <Check size={14} /> Save
              </button>
              <button type="button" onClick={handleEditToggle} style={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </header>

      {/* TARGET MARATHON BANNER */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>My Ambition</h2>
        <div className="glass" style={{
          position: 'relative',
          height: '130px',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '18px',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'linear-gradient(to top, rgba(11, 14, 30, 0.95) 30%, rgba(11, 14, 30, 0.1) 100%), url(/assets/marathon_profile.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'left' }}>
            <span style={{ fontSize: '9px', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.08em' }}>TARGET MARATHON</span>
            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-heading)', fontWeight: '800', color: '#FFFFFF', marginTop: '2px' }}>Pune Marathon (42.2K)</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Training to hit target pace of {profile.targetPace} /km.</p>
          </div>
        </div>
      </section>

      {/* RUN LOG HISTORY LIST */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Activity Logs</h2>
        
        {history.length > 0 ? (
          <div style={styles.historyList}>
            {history.map((run) => (
              <div key={run.id} className="glass" style={styles.historyCard}>
                <div style={styles.histTop}>
                  <h3 style={styles.histTitle}>{run.workoutTitle}</h3>
                  <span style={styles.histDate}>
                    {new Date(run.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                
                <div style={styles.histMetrics}>
                  <div style={styles.histMetricItem}>
                    <Route size={14} color="var(--secondary)" />
                    <span>{run.distance} km</span>
                  </div>
                  <div style={styles.histMetricItem}>
                    <Clock size={14} color="var(--tertiary)" />
                    <span>{run.duration}</span>
                  </div>
                  <div style={styles.histMetricItem}>
                    <span style={styles.histLabel}>Pace:</span>
                    <span style={styles.histVal}>{run.avgPace} /km</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass" style={styles.emptyHistory}>
            <Trash2 size={36} color="var(--text-muted)" style={{ marginBottom: '8px' }} />
            <p>No runs logged yet. Complete workouts from the schedule to see history here!</p>
          </div>
        )}
      </section>

      {/* DELETE / DATA RESET AREA */}
      <section style={styles.section}>
        <div className="glass" style={styles.dangerZone}>
          <div style={styles.dangerInfo}>
            <span style={styles.dangerTitle}>System Settings</span>
            <p style={styles.dangerDesc}>Resetting all data clears storage, history runs, and active planning states.</p>
          </div>
          <button onClick={handleClearHistory} style={styles.dangerBtn}>
            <Trash size={16} /> Reset App
          </button>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    zIndex: 1
  },
  profileHeader: {
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  },
  avatarGlow: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, var(--primary-glow) 0%, rgba(0,0,0,0) 70%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'var(--gradient-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 15px var(--primary-glow)'
  },
  avatarLetter: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'var(--font-heading)'
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    width: '100%'
  },
  profileName: {
    fontSize: '24px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800',
    color: '#FFFFFF'
  },
  planStatus: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    fontWeight: '600'
  },
  profileMetrics: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    width: '100%',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(255,255,255,0.04)'
  },
  profMetric: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    alignItems: 'center'
  },
  profMetricLabel: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    fontWeight: '500'
  },
  profMetricVal: {
    fontSize: '14px',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  editBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--primary)',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    textAlign: 'left'
  },
  editInput: {
    background: '#12152b',
    border: '1px solid var(--border-light)',
    borderRadius: '12px',
    padding: '10px 14px',
    color: '#FFFFFF',
    fontSize: '14px',
    width: '100%',
    outline: 'none'
  },
  editInputsRow: {
    display: 'flex',
    gap: '10px'
  },
  editInputHalf: {
    flex: 1,
    background: '#12152b',
    border: '1px solid var(--border-light)',
    borderRadius: '12px',
    padding: '10px 14px',
    color: '#FFFFFF',
    fontSize: '14px',
    outline: 'none'
  },
  editActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '6px'
  },
  saveBtn: {
    flex: 1.5,
    backgroundColor: 'var(--primary)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    padding: '8px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px'
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: 'transparent',
    border: '1px solid var(--border-light)',
    borderRadius: '10px',
    padding: '8px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    fontWeight: '600',
    cursor: 'pointer'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  sectionTitle: {
    fontSize: '18px',
    color: 'var(--text-primary)',
    textAlign: 'left',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700'
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  historyCard: {
    padding: '16px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  histTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  histTitle: {
    fontSize: '15px',
    color: '#FFFFFF',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700'
  },
  histDate: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    fontWeight: '600'
  },
  histMetrics: {
    display: 'flex',
    gap: '18px',
    alignItems: 'center'
  },
  histMetricItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: 'var(--text-primary)',
    fontWeight: '600'
  },
  histLabel: {
    fontSize: '12px',
    color: 'var(--text-muted)'
  },
  histVal: {
    fontSize: '13px',
    color: '#FFFFFF',
    fontWeight: '600'
  },
  emptyHistory: {
    padding: '36px 20px',
    color: 'var(--text-secondary)',
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: '1.45'
  },
  dangerZone: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    borderColor: 'rgba(255, 94, 58, 0.15)'
  },
  dangerInfo: {
    textAlign: 'left',
    maxWidth: '70%'
  },
  dangerTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--primary)',
    display: 'block'
  },
  dangerDesc: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
    marginTop: '2px'
  },
  dangerBtn: {
    backgroundColor: 'rgba(255, 94, 58, 0.1)',
    border: '1px solid rgba(255, 94, 58, 0.3)',
    borderRadius: '12px',
    padding: '8px 12px',
    color: 'var(--primary)',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  }
};
