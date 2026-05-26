import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, ShieldAlert, Route, Trophy, CheckCircle } from 'lucide-react';
import { storage } from '../utils/storage';

export default function RunScreen({ activePlanId, activeWorkout, onRunComplete }) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0); // in seconds
  const [distance, setDistance] = useState(0); // in km
  const [pace, setPace] = useState('--:--');
  const [calories, setCalories] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [gpsPoints, setGpsPoints] = useState([]);
  
  const timerRef = useRef(null);
  const mapCanvasRef = useRef(null);
  
  const targetDistance = activeWorkout?.distance || 0;
  const isTimedWorkout = !targetDistance && activeWorkout?.duration && activeWorkout.duration.includes('mins');
  const targetDurationSeconds = isTimedWorkout 
    ? parseInt(activeWorkout.duration, 10) * 60 
    : 0;

  // Initialize Speech Synthesis helper
  const speak = (text) => {
    if (!audioEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Canvas map drawing loop
  useEffect(() => {
    if (!showSummary && mapCanvasRef.current) {
      const canvas = mapCanvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSpacing = 20;
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (gpsPoints.length > 1) {
        // Draw route path
        ctx.beginPath();
        ctx.strokeStyle = 'var(--secondary)';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'var(--secondary-glow)';
        
        ctx.moveTo(gpsPoints[0].x, gpsPoints[0].y);
        for (let i = 1; i < gpsPoints.length; i++) {
          ctx.lineTo(gpsPoints[i].x, gpsPoints[i].y);
        }
        ctx.stroke();
        
        // Reset shadows
        ctx.shadowBlur = 0;

        // Draw start point
        ctx.beginPath();
        ctx.arc(gpsPoints[0].x, gpsPoints[0].y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'var(--tertiary)';
        ctx.fill();

        // Draw current point pulse
        const lastPt = gpsPoints[gpsPoints.length - 1];
        ctx.beginPath();
        ctx.arc(lastPt.x, lastPt.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'var(--primary)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
      }
    }
  }, [gpsPoints, showSummary]);

  // Run updates simulation loop
  useEffect(() => {
    if (isRunning && !isPaused) {
      // Speak on Start
      if (time === 0) {
        speak(activeWorkout 
          ? `Starting your scheduled run: ${activeWorkout.title}. Goal is ${targetDistance || activeWorkout.duration}. Have a great run!`
          : "Starting a free run. Let's get moving!"
        );
        
        // Initialize GPS map starting coordinate
        setGpsPoints([{ x: 120, y: 150 }]);
      }

      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          const nextTime = prevTime + 1;
          
          // Realistic running pace simulation (e.g. 5:40 to 6:20 per km)
          const paceSecPerKm = 360 + Math.sin(nextTime / 10) * 15; // fluctuates around 6:00/km
          const speedKmPerSec = 1 / paceSecPerKm;
          
          setDistance((prevDist) => {
            const nextDist = prevDist + speedKmPerSec;
            
            // Speak milestone cues (e.g., every 0.5 km or 1.0 km)
            const oldFloor = Math.floor(prevDist * 2) / 2;
            const newFloor = Math.floor(nextDist * 2) / 2;
            if (newFloor > oldFloor) {
              speak(`You have run ${newFloor} kilometers. Keep it up!`);
            }
            
            return parseFloat(nextDist.toFixed(3));
          });

          // Calories (simulated: ~70 kcal per km)
          setCalories(Math.round(distance * 72));

          // Draw simulated GPS coordinate movement
          setGpsPoints((prevPoints) => {
            if (prevPoints.length === 0) return [{ x: 120, y: 150 }];
            const lastPt = prevPoints[prevPoints.length - 1];
            // Slow winding trajectory
            const angle = (nextTime / 4) + (Math.sin(nextTime / 15) * 0.5);
            const step = 2.2;
            const nextX = lastPt.x + Math.cos(angle) * step;
            const nextY = lastPt.y + Math.sin(angle) * step;
            
            // Constrain inside canvas limits
            const boundedX = Math.max(10, Math.min(230, nextX));
            const boundedY = Math.max(10, Math.min(230, nextY));

            return [...prevPoints, { x: boundedX, y: boundedY }];
          });

          return nextTime;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, isPaused]);

  // Update Pace readout
  useEffect(() => {
    if (time > 0 && distance > 0) {
      const minVal = time / 60;
      const paceValue = minVal / distance;
      const paceMin = Math.floor(paceValue);
      const paceSec = Math.floor((paceValue - paceMin) * 60);
      setPace(`${paceMin}:${paceSec.toString().padStart(2, '0')}`);
    }
  }, [time, distance]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    speak("Workout paused.");
  };

  const handleResume = () => {
    setIsPaused(false);
    speak("Resuming workout.");
  };

  const handleStop = () => {
    setIsRunning(false);
    speak(`Workout completed! Great job. You ran ${distance.toFixed(1)} kilometers in ${formatTime(time)}.`);
    setShowSummary(true);
  };

  const handleSave = () => {
    // Save to local storage
    const runLog = {
      planId: activePlanId,
      weekNum: activeWorkout?.weekNumber || storage.getCurrentWeek(),
      dayIndex: activeWorkout?.dayIndex,
      workoutTitle: activeWorkout?.title || "Free Run",
      distance: parseFloat(distance.toFixed(1)),
      duration: formatTime(time),
      avgPace: pace,
      calories
    };
    storage.addRunLog(runLog);
    setShowSummary(false);
    onRunComplete();
  };

  const handleDiscard = () => {
    setShowSummary(false);
    onRunComplete();
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Overall progress percentage for visual circular ring
  const circleProgress = targetDurationSeconds 
    ? (time / targetDurationSeconds) * 100 
    : targetDistance 
      ? (distance / targetDistance) * 100 
      : 100; // Free run just fills or pulses

  return (
    <div className="page-container" style={styles.container}>
      {!showSummary ? (
        <>
          <header style={styles.header}>
            <div>
              <span style={styles.subtitle}>
                {activeWorkout ? `Coaching Schedule: Day ${activeWorkout.dayIndex + 1}` : 'FREE RUN MODE'}
              </span>
              <h1 style={styles.title}>{activeWorkout ? activeWorkout.title : 'Active Running'}</h1>
            </div>
            <button 
              onClick={() => setAudioEnabled(!audioEnabled)}
              style={styles.audioToggle}
            >
              {audioEnabled ? <Volume2 size={20} color="var(--primary)" /> : <VolumeX size={20} color="var(--text-muted)" />}
            </button>
          </header>

          {/* ACTIVE RUNNING DETAILS */}
          <div style={styles.runLayout}>
            {/* Visual HUD Map */}
            <div className="glass" style={styles.mapContainer}>
              <canvas 
                ref={mapCanvasRef} 
                width="240" 
                height="240" 
                style={styles.mapCanvas}
              />
              <div style={styles.gpsBadge}>
                <span style={styles.gpsDot} />
                <span>GPS STREAMING</span>
              </div>
            </div>

            {/* Circular glowing timer indicator */}
            <div style={styles.timerCircleOuter}>
              <svg style={styles.svgCircle} viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" style={styles.circleBg} />
                <circle 
                  cx="80" 
                  cy="80" 
                  r="70" 
                  style={{
                    ...styles.circleProgress,
                    strokeDashoffset: 440 - (440 * Math.min(100, circleProgress)) / 100
                  }} 
                />
              </svg>
              <div style={styles.timerCenterContent}>
                <span style={styles.metricLabel}>DURATION</span>
                <span style={styles.timerVal}>{formatTime(time)}</span>
                {activeWorkout && (
                  <span style={styles.targetIndicator}>
                    Goal: {targetDistance ? `${targetDistance} km` : activeWorkout.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Substats dashboard Grid */}
            <div style={styles.statsGrid}>
              <div className="glass" style={styles.statBox}>
                <span style={styles.statLabel}>DISTANCE</span>
                <span style={styles.statVal}>{distance.toFixed(2)} <span style={styles.statUnit}>KM</span></span>
              </div>
              <div className="glass" style={styles.statBox}>
                <span style={styles.statLabel}>PACE</span>
                <span style={styles.statVal}>{pace} <span style={styles.statUnit}>/KM</span></span>
              </div>
              <div className="glass" style={styles.statBox}>
                <span style={styles.statLabel}>CALORIES</span>
                <span style={styles.statVal}>{calories} <span style={styles.statUnit}>KCAL</span></span>
              </div>
            </div>

            {/* Assistant control panel */}
            <div style={styles.controls}>
              {!isRunning ? (
                <button onClick={handleStart} className="btn btn-primary" style={styles.actionBtn}>
                  <Play size={20} fill="#FFFFFF" /> Start Session
                </button>
              ) : (
                <div style={styles.runningControls}>
                  {isPaused ? (
                    <button onClick={handleResume} className="btn btn-cyan" style={styles.controlBtn}>
                      <Play size={20} /> Resume
                    </button>
                  ) : (
                    <button onClick={handlePause} className="btn btn-secondary" style={styles.controlBtn}>
                      <Pause size={20} /> Pause
                    </button>
                  )}
                  <button onClick={handleStop} className="btn btn-primary" style={{ ...styles.controlBtn, background: 'var(--gradient-primary)' }}>
                    <Square size={20} fill="#FFFFFF" /> Finish
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* WORKOUT SUMMARY SCREEN */
        <div style={styles.summaryContainer}>
          <div style={styles.summaryBadge}>
            <Trophy size={48} color="var(--tertiary)" style={{ filter: 'drop-shadow(0 0 15px var(--tertiary-glow))' }} />
          </div>
          <h1 style={styles.summaryTitle}>Run Completed!</h1>
          <p style={styles.summarySubtitle}>Excellent work! You added another key workout to your training block.</p>
          
          <div className="glass" style={styles.summaryGrid}>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Plan Workout</span>
              <span style={styles.summaryValue}>{activeWorkout ? activeWorkout.title : 'Free Jog'}</span>
            </div>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Total Distance</span>
              <span style={styles.summaryValue}>{distance.toFixed(1)} km</span>
            </div>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Duration</span>
              <span style={styles.summaryValue}>{formatTime(time)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Average Pace</span>
              <span style={styles.summaryValue}>{pace} /km</span>
            </div>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Calories Burned</span>
              <span style={styles.summaryValue}>{calories} kcal</span>
            </div>
          </div>

          <div style={styles.summaryActions}>
            <button onClick={handleSave} className="btn btn-cyan" style={styles.summaryBtn}>
              <CheckCircle size={18} /> Save Run to Log
            </button>
            <button onClick={handleDiscard} className="btn btn-secondary" style={styles.summaryBtn}>
              Discard Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    zIndex: 1,
    height: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    marginTop: '12px'
  },
  title: {
    fontSize: '24px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800',
    color: '#FFFFFF'
  },
  subtitle: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    fontWeight: '600',
    letterSpacing: '0.04em'
  },
  audioToggle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  runLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    flex: 1,
    justifyContent: 'center'
  },
  mapContainer: {
    width: '240px',
    height: '240px',
    borderRadius: '30px',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.06)'
  },
  mapCanvas: {
    display: 'block',
    background: '#04060e'
  },
  gpsBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: 'rgba(3, 4, 8, 0.75)',
    border: '1px solid var(--border-light)',
    borderRadius: '12px',
    padding: '4px 10px',
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '0.04em',
    color: 'var(--secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  gpsDot: {
    width: '6px',
    height: '6px',
    backgroundColor: 'var(--secondary)',
    borderRadius: '50%',
    boxShadow: '0 0 8px var(--secondary-glow)',
    animation: 'pulse-slow 1.5s infinite ease-in-out'
  },
  timerCircleOuter: {
    width: '200px',
    height: '200px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  svgCircle: {
    width: '100%',
    height: '100%',
    transform: 'rotate(-90deg)'
  },
  circleBg: {
    fill: 'none',
    stroke: 'rgba(255, 255, 255, 0.03)',
    strokeWidth: '8'
  },
  circleProgress: {
    fill: 'none',
    stroke: 'var(--primary)',
    strokeWidth: '8',
    strokeLinecap: 'round',
    strokeDasharray: '440',
    transition: 'stroke-dashoffset 0.5s ease',
    filter: 'drop-shadow(0 0 6px var(--primary-glow))'
  },
  timerCenterContent: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px'
  },
  metricLabel: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    fontWeight: '600',
    letterSpacing: '0.08em'
  },
  timerVal: {
    fontSize: '36px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: '1'
  },
  targetIndicator: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    fontWeight: '500',
    marginTop: '4px'
  },
  statsGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: '10px'
  },
  statBox: {
    flex: 1,
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  statLabel: {
    fontSize: '9px',
    color: 'var(--text-muted)',
    fontWeight: '600',
    letterSpacing: '0.05em'
  },
  statVal: {
    fontSize: '16px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800',
    color: '#FFFFFF'
  },
  statUnit: {
    fontSize: '10px',
    color: 'var(--text-secondary)',
    fontWeight: '500'
  },
  controls: {
    width: '100%',
    marginTop: '12px'
  },
  actionBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '20px'
  },
  runningControls: {
    display: 'flex',
    gap: '12px',
    width: '100%'
  },
  controlBtn: {
    flex: 1,
    padding: '16px',
    borderRadius: '20px'
  },
  summaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '24px 12px',
    textAlign: 'center',
    gap: '16px'
  },
  summaryBadge: {
    width: '90px',
    height: '90px',
    borderRadius: '30px',
    backgroundColor: 'rgba(0, 255, 135, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  summaryTitle: {
    fontSize: '28px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800',
    color: '#FFFFFF'
  },
  summarySubtitle: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.45',
    maxWidth: '300px'
  },
  summaryGrid: {
    width: '100%',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    textAlign: 'left'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  summaryLabel: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    fontWeight: '500'
  },
  summaryValue: {
    fontSize: '14px',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  summaryActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    marginTop: '12px'
  },
  summaryBtn: {
    width: '100%',
    padding: '14px'
  }
};
