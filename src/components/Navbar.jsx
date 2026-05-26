import React from 'react';
import { Home, Award, Calendar, Flame, Activity, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, hasActivePlan }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'plans', label: 'Plans', icon: Award },
    { id: 'schedule', label: 'Schedule', icon: Calendar, disabled: !hasActivePlan },
    { id: 'run', label: 'Quick Run', icon: Flame },
    { id: 'tools', label: 'Tools', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          if (item.disabled) return null;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                ...styles.btn,
                color: isActive ? 'var(--primary)' : 'var(--text-muted)'
              }}
              aria-label={item.label}
            >
              <div style={{
                ...styles.iconContainer,
                background: isActive ? 'rgba(255, 94, 58, 0.12)' : 'transparent',
                boxShadow: isActive ? '0 0 15px rgba(255, 94, 58, 0.15)' : 'none'
              }}>
                <Icon size={22} style={{
                  ...styles.icon,
                  filter: isActive ? 'drop-shadow(0 0 4px var(--primary))' : 'none'
                }} />
              </div>
              <span style={{
                ...styles.label,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: isActive ? '600' : '400'
              }}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '76px',
    background: 'rgba(11, 14, 30, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid var(--border-light)',
    paddingBottom: 'var(--safe-area-bottom)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 8px'
  },
  btn: {
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
    flex: 1,
    padding: '8px 0',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  iconContainer: {
    padding: '6px 16px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  icon: {
    transition: 'all 0.2s ease'
  },
  label: {
    fontSize: '10px',
    letterSpacing: '0.02em',
    fontFamily: 'var(--font-sans)',
    transition: 'all 0.2s ease'
  }
};
