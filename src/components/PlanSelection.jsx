import React from 'react';
import { CheckCircle2, ChevronRight, Route, Clock, ShieldAlert } from 'lucide-react';
import { trainingPlans } from '../data/trainingPlans';

export default function PlanSelection({ activePlanId, onSelectPlan }) {
  const plansList = Object.values(trainingPlans);

  return (
    <div className="page-container" style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Coaching Programs</h1>
        <p style={styles.subtitle}>Select a structured coaching plan matching your experience and goals.</p>
      </header>

      <div style={styles.plansList}>
        {plansList.map((plan) => {
          const isActive = plan.id === activePlanId;
          
          return (
            <div 
              key={plan.id}
              className="glass-interactive"
              onClick={() => onSelectPlan(plan.id)}
              style={{
                ...styles.planCard,
                borderColor: isActive ? plan.color : 'var(--border-light)',
                boxShadow: isActive ? `0 8px 30px ${plan.glowColor}` : 'none'
              }}
            >
              {/* Background Cover Overlay */}
              <div style={{
                ...styles.cardBg,
                backgroundImage: `linear-gradient(to top, rgba(11, 14, 30, 0.95) 40%, rgba(11, 14, 30, 0.4) 100%), url(${plan.bgImage})`
              }} />

              {/* Card Content */}
              <div style={styles.cardContent}>
                <div style={styles.topInfo}>
                  <span style={{
                    ...styles.difficultyBadge,
                    backgroundColor: isActive ? plan.color : 'rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#030408' : 'var(--text-secondary)'
                  }}>
                    {plan.difficulty}
                  </span>
                  {isActive && (
                    <span style={{ ...styles.activeBadge, color: plan.color }}>
                      <CheckCircle2 size={16} fill="rgba(3, 4, 8, 0.5)" /> ACTIVE
                    </span>
                  )}
                </div>

                <div style={styles.mainInfo}>
                  <h2 style={styles.planTitle}>{plan.title}</h2>
                  <p style={styles.planDesc}>{plan.description}</p>
                </div>

                <div style={styles.bottomBar}>
                  <div style={styles.metricItem}>
                    <Route size={16} color={isActive ? plan.color : 'var(--text-secondary)'} />
                    <span>{plan.distance} Goal</span>
                  </div>
                  <div style={styles.metricItem}>
                    <Clock size={16} color={isActive ? plan.color : 'var(--text-secondary)'} />
                    <span>{plan.duration}</span>
                  </div>
                  <div style={{
                    ...styles.actionArrow,
                    backgroundColor: isActive ? plan.color : 'rgba(255,255,255,0.05)',
                    color: isActive ? '#030408' : 'var(--text-primary)'
                  }}>
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass" style={styles.warningBox}>
        <ShieldAlert size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
        <div style={styles.warningText}>
          <span style={styles.warningTitle}>Safety Warning</span>
          <p style={styles.warningDesc}>Ensure you have checked with your medical professional before starting high intensity running training programs.</p>
        </div>
      </div>
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
    textAlign: 'left',
    marginTop: '12px'
  },
  title: {
    fontSize: '28px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
    marginTop: '4px'
  },
  plansList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  planCard: {
    height: '200px',
    borderRadius: '24px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderWidth: '1px',
    borderStyle: 'solid'
  },
  cardBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
    transition: 'transform 0.5s ease'
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    textAlign: 'left'
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  difficultyBadge: {
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '10px',
    letterSpacing: '0.02em',
    textTransform: 'uppercase'
  },
  activeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.05em'
  },
  mainInfo: {
    marginTop: 'auto',
    marginBottom: '12px'
  },
  planTitle: {
    fontSize: '24px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800',
    color: 'var(--text-primary)',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
  },
  planDesc: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
    marginTop: '4px',
    maxWidth: '90%',
    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
  },
  bottomBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: '12px'
  },
  metricItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#FFFFFF',
    fontWeight: '600'
  },
  actionArrow: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease'
  },
  warningBox: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    borderRadius: '16px',
    alignItems: 'center',
    border: '1px solid rgba(255,94,58,0.1)'
  },
  warningText: {
    textAlign: 'left'
  },
  warningTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--primary)',
    display: 'block'
  },
  warningDesc: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
    marginTop: '2px'
  }
};
