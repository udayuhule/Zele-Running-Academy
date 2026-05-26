import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Dumbbell, Moon, Play, Timer, Route } from 'lucide-react';
import { trainingPlans } from '../data/trainingPlans';
import { storage } from '../utils/storage';

export default function ScheduleCalendar({ activePlanId, currentWeek, setCurrentWeek, startWorkout }) {
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const plan = activePlanId ? trainingPlans[activePlanId] : null;

  useEffect(() => {
    if (activePlanId) {
      setCompletedWorkouts(storage.getCompletedWorkouts());
    }
  }, [activePlanId, currentWeek]);

  if (!plan) return null;

  const weekData = plan.weeks.find(w => w.weekNumber === currentWeek);

  const handlePrevWeek = () => {
    if (currentWeek > 1) {
      const newWk = currentWeek - 1;
      setCurrentWeek(newWk);
      storage.setCurrentWeek(newWk);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < plan.weeksCount) {
      const newWk = currentWeek + 1;
      setCurrentWeek(newWk);
      storage.setCurrentWeek(newWk);
    }
  };

  const handleToggleComplete = (dayIndex) => {
    const completed = storage.toggleWorkoutComplete(activePlanId, currentWeek, dayIndex);
    setCompletedWorkouts(completed);
  };

  const getDayIcon = (type) => {
    switch (type) {
      case 'run':
        return <Play size={18} color="var(--primary)" />;
      case 'cross':
        return <Dumbbell size={18} color="var(--secondary)" />;
      case 'rest':
      default:
        return <Moon size={18} color="var(--text-muted)" />;
    }
  };

  const getDayTagColor = (type) => {
    switch (type) {
      case 'run':
        return { bg: 'var(--primary-glow)', text: 'var(--primary)' };
      case 'cross':
        return { bg: 'var(--secondary-glow)', text: 'var(--secondary)' };
      case 'rest':
      default:
        return { bg: 'rgba(255, 255, 255, 0.05)', text: 'var(--text-secondary)' };
    }
  };

  return (
    <div className="page-container" style={styles.container}>
      {/* WEEK SWITCHER HEADER */}
      <header style={styles.header}>
        <button 
          onClick={handlePrevWeek} 
          disabled={currentWeek === 1}
          style={{ ...styles.arrowBtn, opacity: currentWeek === 1 ? 0.3 : 1 }}
        >
          <ChevronLeft size={24} />
        </button>
        <div style={styles.weekTitleContainer}>
          <h1 style={styles.title}>Week {currentWeek}</h1>
          <span style={styles.subtitle}>{plan.title} • {currentWeek} of {plan.weeksCount}</span>
        </div>
        <button 
          onClick={handleNextWeek} 
          disabled={currentWeek === plan.weeksCount}
          style={{ ...styles.arrowBtn, opacity: currentWeek === plan.weeksCount ? 0.3 : 1 }}
        >
          <ChevronRight size={24} />
        </button>
      </header>

      {/* WEEKLY WORKOUTS LIST */}
      <div style={styles.workoutList}>
        {weekData?.days.map((day, idx) => {
          const isDone = !!completedWorkouts[`${activePlanId}_w${currentWeek}_d${idx}`];
          const tagColors = getDayTagColor(day.type);

          return (
            <div 
              key={idx}
              className="glass"
              style={{
                ...styles.dayCard,
                borderColor: isDone ? 'rgba(0, 255, 135, 0.2)' : 'var(--border-light)',
                borderLeft: `4px solid ${day.type === 'run' ? 'var(--primary)' : day.type === 'cross' ? 'var(--secondary)' : 'var(--text-muted)'}`
              }}
            >
              <div style={styles.dayTop}>
                <div style={styles.dayBadgeWrap}>
                  <div style={styles.iconCircle}>
                    {getDayIcon(day.type)}
                  </div>
                  <div>
                    <h3 style={styles.dayTitle}>{day.title}</h3>
                    <span style={styles.dayNameLabel}>{day.dayName} • Day {idx + 1}</span>
                  </div>
                </div>

                <span style={{
                  ...styles.typeTag,
                  backgroundColor: tagColors.bg,
                  color: tagColors.text
                }}>
                  {day.type.toUpperCase()}
                </span>
              </div>

              <p style={styles.dayDesc}>{day.description}</p>

              {/* Day Metrics & Action Bar */}
              <div style={styles.dayBottom}>
                <div style={styles.metricsWrap}>
                  {day.distance > 0 && (
                    <div style={styles.metricItem}>
                      <Route size={14} color="var(--text-secondary)" />
                      <span>{day.distance} km</span>
                    </div>
                  )}
                  <div style={styles.metricItem}>
                    <Timer size={14} color="var(--text-secondary)" />
                    <span>{day.duration}</span>
                  </div>
                </div>

                <div style={styles.actionsWrap}>
                  {day.type === 'run' && !isDone && (
                    <button 
                      onClick={() => startWorkout({ ...day, dayIndex: idx })}
                      style={styles.actionBtnPlay}
                      title="Start Running Assistant"
                    >
                      <Play size={14} fill="#030408" /> Run
                    </button>
                  )}
                  <button 
                    onClick={() => handleToggleComplete(idx)}
                    style={{
                      ...styles.actionBtnCheck,
                      backgroundColor: isDone ? 'rgba(0,255,135,0.1)' : 'transparent',
                      borderColor: isDone ? 'var(--tertiary)' : 'var(--border-light)',
                      color: isDone ? 'var(--tertiary)' : 'var(--text-primary)'
                    }}
                  >
                    <CheckCircle2 size={16} color={isDone ? 'var(--tertiary)' : 'var(--text-muted)'} />
                    {isDone ? 'Done' : 'Check'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    zIndex: 1
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px'
  },
  arrowBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border-light)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  weekTitleContainer: {
    textAlign: 'center'
  },
  title: {
    fontSize: '28px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800',
    color: 'var(--text-primary)'
  },
  subtitle: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    fontWeight: '600'
  },
  workoutList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  dayCard: {
    padding: '16px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'border 0.3s ease'
  },
  dayTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  dayBadgeWrap: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  iconCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayTitle: {
    fontSize: '16px',
    color: '#FFFFFF',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700'
  },
  dayNameLabel: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    fontWeight: '600'
  },
  typeTag: {
    fontSize: '9px',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '8px',
    letterSpacing: '0.04em'
  },
  dayDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.45'
  },
  dayBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid rgba(255,255,255,0.04)',
    paddingTop: '12px',
    marginTop: '2px'
  },
  metricsWrap: {
    display: 'flex',
    gap: '14px'
  },
  metricItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#FFFFFF',
    fontWeight: '500'
  },
  actionsWrap: {
    display: 'flex',
    gap: '8px'
  },
  actionBtnPlay: {
    backgroundColor: 'var(--primary)',
    color: '#030408',
    border: 'none',
    borderRadius: '10px',
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px var(--primary-glow)'
  },
  actionBtnCheck: {
    background: 'transparent',
    border: '1px solid var(--border-light)',
    borderRadius: '10px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};
