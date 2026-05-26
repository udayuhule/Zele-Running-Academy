import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PlanSelection from './components/PlanSelection';
import ScheduleCalendar from './components/ScheduleCalendar';
import RunScreen from './components/RunScreen';
import PaceCalculator from './components/PaceCalculator';
import ProfileScreen from './components/ProfileScreen';
import { storage } from './utils/storage';
import { trainingPlans } from './data/trainingPlans';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activePlanId, setActivePlanId] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [activeWorkout, setActiveWorkout] = useState(null);

  // Sync state with storage on load
  useEffect(() => {
    const planId = storage.getActivePlan();
    setActivePlanId(planId);
    
    if (planId) {
      setCurrentWeek(storage.getCurrentWeek());
    }
  }, []);

  // Update active plan in state and local storage
  const handleSelectPlan = (planId) => {
    storage.setActivePlan(planId);
    setActivePlanId(planId);
    setCurrentWeek(1);
    setActiveTab('dashboard'); // Redirect to dashboard after plan selection
  };

  // Reset local state
  const handleResetData = () => {
    setActivePlanId(null);
    setCurrentWeek(1);
    setActiveWorkout(null);
    setActiveTab('dashboard');
  };

  // Trigger run assistant for a specific workout
  const handleStartWorkout = (workout) => {
    setActiveWorkout(workout);
    setActiveTab('run');
  };

  // Handle run assistant completion
  const handleRunComplete = () => {
    setActiveWorkout(null);
    // Reload week info to ensure status updates
    setCurrentWeek(storage.getCurrentWeek());
    setActiveTab('dashboard');
  };

  // Select dynamic background image based on active plan/theme
  const getBackgroundImage = () => {
    if (activeTab === 'dashboard') return '/assets/dashboard_group.jpg';
    if (activeTab === 'profile') return '/assets/marathon_profile.jpg';
    if (activeTab === 'plans') return '/assets/bg_dashboard.png';
    
    if (activePlanId && trainingPlans[activePlanId]) {
      return trainingPlans[activePlanId].bgImage;
    }
    return '/assets/bg_dashboard.png';
  };

  // Page switcher routing logic
  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            activePlanId={activePlanId}
            currentWeek={currentWeek}
            selectTab={setActiveTab}
            startWorkout={handleStartWorkout}
          />
        );
      case 'plans':
        return (
          <PlanSelection 
            activePlanId={activePlanId}
            onSelectPlan={handleSelectPlan}
          />
        );
      case 'schedule':
        return (
          <ScheduleCalendar 
            activePlanId={activePlanId}
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
            startWorkout={handleStartWorkout}
          />
        );
      case 'run':
        return (
          <RunScreen 
            activePlanId={activePlanId}
            activeWorkout={activeWorkout}
            onRunComplete={handleRunComplete}
          />
        );
      case 'tools':
        return <PaceCalculator />;
      case 'profile':
        return (
          <ProfileScreen 
            activePlanId={activePlanId}
            onResetData={handleResetData}
          />
        );
      default:
        return (
          <Dashboard 
            activePlanId={activePlanId}
            currentWeek={currentWeek}
            selectTab={setActiveTab}
            startWorkout={handleStartWorkout}
          />
        );
    }
  };

  return (
    <div style={styles.appWrapper}>
      {/* Background Graphic Overlays */}
      <div 
        className="bg-overlay" 
        style={{ 
          ...styles.bgOverlay, 
          backgroundImage: `url(${getBackgroundImage()})` 
        }} 
      />
      <div className="bg-radial" />
      
      {/* Dynamic Tab Content Area */}
      <main style={styles.main}>
        {renderPage()}
      </main>

      {/* Persistent Shell Bottom Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        hasActivePlan={!!activePlanId}
      />
    </div>
  );
}

const styles = {
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    position: 'relative'
  },
  bgOverlay: {
    transition: 'background-image 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: 'calc(100% - 76px)',
    overflow: 'hidden'
  }
};
