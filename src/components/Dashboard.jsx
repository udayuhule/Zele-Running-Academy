import React, { useState, useEffect } from 'react';
import { Flame, Trophy, Route, Calendar, ArrowRight, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { trainingPlans } from '../data/trainingPlans';
import { storage } from '../utils/storage';

export default function Dashboard({ activePlanId, currentWeek, selectTab, startWorkout }) {
  const [profile, setProfile] = useState({});
  const [stats, setStats] = useState({ totalDistance: 0, totalRuns: 0, streak: 0, activeDaysCount: 0 });
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [weeklyStatus, setWeeklyStatus] = useState([]);
  const [planProgress, setPlanProgress] = useState(0);

  const tips = [
    "Hydration is key! Drink water throughout the day, not just during runs.",
    "Breathe rhythmically. Try 2 steps breathing in, 2 steps breathing out.",
    "Make sure your running shoes have at least 1cm of space at the toes.",
    "Slow down! 80% of your runs should be easy, conversational pace.",
    "Focus on running tall. Avoid bending forward from the waist.",
    "Cadence target: Aim for 170-180 steps per minute to reduce injury risk."
  ];
  const [tipIndex] = useState(() => Math.floor(Math.random() * tips.length));

  useEffect(() => {
    const loadedProfile = storage.getUserProfile();
    setProfile(loadedProfile);
    
    if (activePlanId) {
      const currentStats = storage.getStats(activePlanId);
      setStats(currentStats);

      const plan = trainingPlans[activePlanId];
      const completed = storage.getCompletedWorkouts();
      setCompletedWorkouts(completed);

      // Determine today's day index (0-6 based on current day of the week, Monday=0)
      const dayOfWeek = (new Date().getDay() + 6) % 7; // Monday=0, Sunday=6
      const weekData = plan.weeks.find(w => w.weekNumber === currentWeek);
      
      if (weekData) {
        const todayWk = weekData.days[dayOfWeek];
        setTodayWorkout({
          ...todayWk,
          dayIndex: dayOfWeek,
          isCompleted: storage.isWorkoutComplete(activePlanId, currentWeek, dayOfWeek)
        });

        // Generate weekly check indicators
        const daysStatus = weekData.days.map((day, idx) => ({
          dayName: day.dayName,
          type: day.type,
          isDone: storage.isWorkoutComplete(activePlanId, currentWeek, idx)
        }));
        setWeeklyStatus(daysStatus);

        // Plan overall completion percentage
        const totalWorkouts = plan.weeks.length * 7;
        const keys = Object.keys(completed).filter(key => key.startsWith(activePlanId));
        setPlanProgress(Math.round((keys.length / totalWorkouts) * 100));
      }
    }
  }, [activePlanId, currentWeek]);

  // Handle checking/completing today's workout directly from Dashboard
  const handleToggleComplete = () => {
    if (!activePlanId || !todayWorkout) return;
    const completed = storage.toggleWorkoutComplete(activePlanId, currentWeek, todayWorkout.dayIndex);
    setCompletedWorkouts(completed);
    
    // Recalculate stats
    const currentStats = storage.getStats(activePlanId);
    setStats(currentStats);

    setTodayWorkout(prev => ({ ...prev, isCompleted: !prev.isCompleted }));
    
    // Update weekly checks
    setWeeklyStatus(prev => prev.map((day, idx) => 
      idx === todayWorkout.dayIndex ? { ...day, isDone: !day.isDone } : day
    ));

    // Update overall progress
    const plan = trainingPlans[activePlanId];
    const totalWorkouts = plan.weeks.length * 7;
    const keys = Object.keys(completed).filter(key => key.startsWith(activePlanId));
    setPlanProgress(Math.round((keys.length / totalWorkouts) * 100));
  };

  const activePlan = activePlanId ? trainingPlans[activePlanId] : null;

  return (
    <div className="page-container" style={styles.container}>
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/assets/logo.jpg" 
            alt="Zele Runners Academy" 
            style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '50%', 
              border: '2px solid var(--primary)', 
              boxShadow: '0 0 10px var(--primary-glow)',
              objectFit: 'cover'
            }} 
          />
          <div>
            <span style={styles.subGreeting}>Welcome back,</span>
            <h1 style={styles.greeting}>{profile.name || 'Runner'} 👋</h1>
          </div>
        </div>
        {activePlan && (
          <div style={styles.planProgressBadge}>
            <div style={styles.progressRingOuter}>
              <div style={{...styles.progressRingInner, width: `${planProgress}%`}} />
            </div>
            <span style={styles.progressText}>{planProgress}% Plan Done</span>
          </div>
        )}
      </header>

      {/* MOTIVATIONAL BANNER */}
      <div className="glass" style={styles.tipCard}>
        <div style={styles.tipIconContainer}>
          <Zap size={18} color="var(--primary)" />
        </div>
        <div style={styles.tipTextContainer}>
          <span style={styles.tipTitle}>COACH TIP OF THE DAY</span>
          <p style={styles.tipDesc}>"{tips[tipIndex]}"</p>
        </div>
      </div>

      {/* TODAY'S WORKOUT CARD */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Today's Workout</h2>
        
        {activePlan ? (
          todayWorkout ? (
            <div className="glass" style={styles.workoutCard}>
              <div style={styles.workoutTop}>
                <span style={{
                  ...styles.workoutTag,
                  backgroundColor: todayWorkout.type === 'run' ? 'var(--primary-glow)' : 'rgba(255, 255, 255, 0.08)',
                  color: todayWorkout.type === 'run' ? 'var(--primary)' : 'var(--text-secondary)',
                  borderColor: todayWorkout.type === 'run' ? 'var(--primary)' : 'var(--border-light)'
                }}>
                  {todayWorkout.type.toUpperCase()} • {todayWorkout.paceType}
                </span>
                <span style={styles.workoutWeekInfo}>Week {currentWeek} • Day {todayWorkout.dayIndex + 1}</span>
              </div>
              
              <h3 style={styles.workoutTitle}>{todayWorkout.title}</h3>
              <p style={styles.workoutDesc}>{todayWorkout.description}</p>
              
              <div style={styles.workoutMetrics}>
                {todayWorkout.distance > 0 && (
                  <div style={styles.metricItem}>
                    <Route size={18} color="var(--secondary)" />
                    <span>{todayWorkout.distance} km</span>
                  </div>
                )}
                <div style={styles.metricItem}>
                  <Calendar size={18} color="var(--tertiary)" />
                  <span>{todayWorkout.duration}</span>
                </div>
              </div>

              <div style={styles.workoutActions}>
                {todayWorkout.type === 'run' && !todayWorkout.isCompleted && (
                  <button 
                    onClick={() => startWorkout(todayWorkout)}
                    className="btn btn-primary" 
                    style={styles.startBtn}
                  >
                    Start Assistant <ArrowRight size={16} />
                  </button>
                )}
                <button 
                  onClick={handleToggleComplete}
                  className="btn btn-secondary"
                  style={{
                    ...styles.completeBtn,
                    borderColor: todayWorkout.isCompleted ? 'var(--tertiary)' : 'var(--border-light)',
                    color: todayWorkout.isCompleted ? 'var(--tertiary)' : 'var(--text-primary)'
                  }}
                >
                  <CheckCircle2 size={18} color={todayWorkout.isCompleted ? 'var(--tertiary)' : 'var(--text-muted)'} />
                  {todayWorkout.isCompleted ? 'Completed' : 'Mark Done'}
                </button>
              </div>
            </div>
          ) : (
            <div className="glass" style={styles.noWorkoutCard}>
              <p>No workout scheduled for today.</p>
            </div>
          )
        ) : (
          <div className="glass" style={styles.ctaCard} onClick={() => selectTab('plans')}>
            <Trophy size={42} color="var(--primary)" style={styles.ctaIcon} />
            <h3 style={styles.ctaTitle}>Select a Coaching Plan</h3>
            <p style={styles.ctaDesc}>Get structured training schedules from Couch to 5K, 10K, Half Marathon, or Full Marathon.</p>
            <button className="btn btn-primary" style={styles.ctaBtn}>
              Browse Plans <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* WEEKLY CHECKMARKS */}
      {activePlan && weeklyStatus.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Week {currentWeek} Progress</h2>
          <div className="glass" style={styles.weeklyChecksContainer}>
            {weeklyStatus.map((day, idx) => (
              <div key={idx} style={styles.weekDayItem}>
                <span style={styles.weekDayName}>{day.dayName}</span>
                <div style={{
                  ...styles.weekCheckCircle,
                  backgroundColor: day.isDone ? 'var(--tertiary)' : 'rgba(255,255,255,0.03)',
                  borderColor: day.isDone ? 'var(--tertiary)' : 'var(--border-light)',
                  boxShadow: day.isDone ? '0 0 10px rgba(0, 255, 135, 0.3)' : 'none'
                }}>
                  {day.isDone && <CheckCircle2 size={14} color="#030408" style={{ transform: 'scale(1.2)' }} />}
                </div>
                <span style={{
                  ...styles.weekDayType,
                  color: day.type === 'run' ? 'var(--primary)' : day.type === 'cross' ? 'var(--secondary)' : 'var(--text-muted)'
                }}>{day.type[0].toUpperCase()}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STATISTICS GRID */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Stats {activePlan && `(${activePlan.title})`}</h2>
        <div style={styles.statsGrid}>
          <div className="glass" style={styles.statCard}>
            <div style={{ ...styles.statIconWrap, color: 'var(--secondary)', backgroundColor: 'var(--secondary-glow)' }}>
              <Route size={20} />
            </div>
            <div style={styles.statInfo}>
              <span style={styles.statLabel}>Total Distance</span>
              <span style={styles.statVal}>{stats.totalDistance} <span style={styles.statUnit}>KM</span></span>
            </div>
          </div>
          
          <div className="glass" style={styles.statCard}>
            <div style={{ ...styles.statIconWrap, color: 'var(--primary)', backgroundColor: 'var(--primary-glow)' }}>
              <Flame size={20} />
            </div>
            <div style={styles.statInfo}>
              <span style={styles.statLabel}>Active Streak</span>
              <span style={styles.statVal}>{stats.streak} <span style={styles.statUnit}>DAYS</span></span>
            </div>
          </div>

          <div className="glass" style={styles.statCard}>
            <div style={{ ...styles.statIconWrap, color: 'var(--tertiary)', backgroundColor: 'var(--tertiary-glow)' }}>
              <Trophy size={20} />
            </div>
            <div style={styles.statInfo}>
              <span style={styles.statLabel}>Total Runs</span>
              <span style={styles.statVal}>{stats.totalRuns}</span>
            </div>
          </div>

          <div className="glass" style={styles.statCard}>
            <div style={{ ...styles.statIconWrap, color: 'var(--purple)', backgroundColor: 'var(--purple-glow)' }}>
              <Calendar size={20} />
            </div>
            <div style={styles.statInfo}>
              <span style={styles.statLabel}>Active Days</span>
              <span style={styles.statVal}>{stats.activeDaysCount}</span>
            </div>
          </div>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px'
  },
  subGreeting: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-sans)',
    display: 'block'
  },
  greeting: {
    fontSize: '28px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800',
    marginTop: '2px'
  },
  planProgressBadge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  },
  progressRingOuter: {
    width: '80px',
    height: '6px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressRingInner: {
    height: '100%',
    backgroundColor: 'var(--tertiary)',
    boxShadow: '0 0 8px var(--tertiary-glow)',
    borderRadius: '3px',
    transition: 'width 0.4s ease-out'
  },
  progressText: {
    fontSize: '10px',
    color: 'var(--text-secondary)',
    fontWeight: '600',
    letterSpacing: '0.02em'
  },
  tipCard: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    borderLeft: '4px solid var(--primary)',
    borderRadius: '16px'
  },
  tipIconContainer: {
    width: '36px',
    height: '36px',
    borderRadius: '12px',
    background: 'rgba(255,94,58,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  tipTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    textAlign: 'left'
  },
  tipTitle: {
    fontSize: '10px',
    color: 'var(--primary)',
    fontWeight: '700',
    letterSpacing: '0.08em'
  },
  tipDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4'
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
  workoutCard: {
    padding: '20px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    border: '1px solid var(--border-light)'
  },
  workoutTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  workoutTag: {
    fontSize: '10px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '10px',
    border: '1px solid transparent',
    letterSpacing: '0.05em'
  },
  workoutWeekInfo: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    fontWeight: '600'
  },
  workoutTitle: {
    fontSize: '22px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800'
  },
  workoutDesc: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.45'
  },
  workoutMetrics: {
    display: 'flex',
    gap: '20px',
    borderTop: '1px solid rgba(255,255,255,0.04)',
    paddingTop: '14px'
  },
  metricItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    fontWeight: '600'
  },
  workoutActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '4px'
  },
  startBtn: {
    flex: 1.5,
    padding: '12px',
    fontSize: '14px'
  },
  completeBtn: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    gap: '6px'
  },
  noWorkoutCard: {
    padding: '24px',
    color: 'var(--text-secondary)',
    fontSize: '14px'
  },
  ctaCard: {
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: '14px',
    cursor: 'pointer',
    border: '1px dashed var(--border-light)',
    transition: 'all 0.3s ease'
  },
  ctaCardHover: {
    borderColor: 'var(--primary)'
  },
  ctaIcon: {
    filter: 'drop-shadow(0 0 15px var(--primary-glow))'
  },
  ctaTitle: {
    fontSize: '20px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800',
    color: 'var(--text-primary)'
  },
  ctaDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
    maxWidth: '300px'
  },
  ctaBtn: {
    fontSize: '14px',
    padding: '10px 20px',
    marginTop: '6px'
  },
  weeklyChecksContainer: {
    padding: '16px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  weekDayItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    flex: 1
  },
  weekDayName: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    fontWeight: '600'
  },
  weekCheckCircle: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    border: '1px solid var(--border-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
  },
  weekDayType: {
    fontSize: '9px',
    fontWeight: '700'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  statCard: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left'
  },
  statIconWrap: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  statLabel: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    fontWeight: '500'
  },
  statVal: {
    fontSize: '18px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800',
    color: 'var(--text-primary)'
  },
  statUnit: {
    fontSize: '10px',
    color: 'var(--text-secondary)',
    fontWeight: '600'
  }
};
