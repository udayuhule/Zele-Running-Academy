const KEYS = {
  ACTIVE_PLAN: "zele_active_plan",
  CURRENT_WEEK: "zele_current_week",
  COMPLETED_WORKOUTS: "zele_completed_workouts",
  RUN_HISTORY: "zele_run_history",
  USER_PROFILE: "zele_user_profile"
};

export const storage = {
  // Active Plan Management
  getActivePlan() {
    return localStorage.getItem(KEYS.ACTIVE_PLAN) || null;
  },
  
  setActivePlan(planId) {
    localStorage.setItem(KEYS.ACTIVE_PLAN, planId);
    // Initialize current week to 1 if plan changed
    this.setCurrentWeek(1);
  },
  
  // Current Week Management
  getCurrentWeek() {
    return parseInt(localStorage.getItem(KEYS.CURRENT_WEEK) || "1", 10);
  },
  
  setCurrentWeek(weekNumber) {
    localStorage.setItem(KEYS.CURRENT_WEEK, weekNumber.toString());
  },
  
  // Completed Workouts: { "planId_weekNum_dayIndex": true }
  getCompletedWorkouts() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.COMPLETED_WORKOUTS) || "{}");
    } catch {
      return {};
    }
  },
  
  toggleWorkoutComplete(planId, weekNum, dayIndex) {
    const completed = this.getCompletedWorkouts();
    const key = `${planId}_w${weekNum}_d${dayIndex}`;
    
    if (completed[key]) {
      delete completed[key];
    } else {
      completed[key] = new Date().toISOString();
    }
    
    localStorage.setItem(KEYS.COMPLETED_WORKOUTS, JSON.stringify(completed));
    return completed;
  },
  
  isWorkoutComplete(planId, weekNum, dayIndex) {
    const completed = this.getCompletedWorkouts();
    return !!completed[`${planId}_w${weekNum}_d${dayIndex}`];
  },
  
  // Run History Log: Array of { id, planId, date, distance, duration, avgPace, targetDistance }
  getRunHistory() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.RUN_HISTORY) || "[]");
    } catch {
      return [];
    }
  },
  
  addRunLog(runLog) {
    const history = this.getRunHistory();
    history.unshift({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...runLog
    });
    localStorage.setItem(KEYS.RUN_HISTORY, JSON.stringify(history));
    
    // Auto complete the corresponding workout if it belongs to one
    if (runLog.planId && runLog.weekNum !== undefined && runLog.dayIndex !== undefined) {
      const completed = this.getCompletedWorkouts();
      const key = `${runLog.planId}_w${runLog.weekNum}_d${runLog.dayIndex}`;
      completed[key] = new Date().toISOString();
      localStorage.setItem(KEYS.COMPLETED_WORKOUTS, JSON.stringify(completed));
    }
    
    return history;
  },
  
  // User Profile
  getUserProfile() {
    try {
      const defaultProfile = { name: "Runner", targetPace: "6:00", weight: 70, level: "Beginner" };
      const profile = localStorage.getItem(KEYS.USER_PROFILE);
      return profile ? { ...defaultProfile, ...JSON.parse(profile) } : defaultProfile;
    } catch {
      return { name: "Runner", targetPace: "6:00", weight: 70, level: "Beginner" };
    }
  },
  
  updateUserProfile(profileData) {
    const current = this.getUserProfile();
    const updated = { ...current, ...profileData };
    localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(updated));
    return updated;
  },
  
  // Statistics Calculations
  getStats(planId) {
    const history = this.getRunHistory();
    const completedWorkouts = this.getCompletedWorkouts();
    
    // Filter history for current plan
    const planRuns = history.filter(run => run.planId === planId);
    
    const totalDistance = planRuns.reduce((sum, run) => sum + parseFloat(run.distance || 0), 0);
    const totalRuns = planRuns.length;
    
    // Calculate Streak based on consecutive completed days (using history timestamps)
    const activeDays = new Set();
    history.forEach(run => {
      activeDays.add(new Date(run.date).toDateString());
    });
    
    let streak = 0;
    const today = new Date();
    const checkDate = new Date(today);
    
    // If they logged today or yesterday, check backward
    const todayStr = checkDate.toDateString();
    checkDate.setDate(checkDate.getDate() - 1);
    const yesterdayStr = checkDate.toDateString();
    
    const hasToday = activeDays.has(todayStr);
    const hasYesterday = activeDays.has(yesterdayStr);
    
    if (hasToday || hasYesterday) {
      const startCheck = hasToday ? today : checkDate;
      while (true) {
        if (activeDays.has(startCheck.toDateString())) {
          streak++;
          startCheck.setDate(startCheck.getDate() - 1);
        } else {
          break;
        }
      }
    }
    
    return {
      totalDistance: parseFloat(totalDistance.toFixed(1)),
      totalRuns,
      streak,
      activeDaysCount: activeDays.size
    };
  }
};
