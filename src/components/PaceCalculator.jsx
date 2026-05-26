import React, { useState } from 'react';
import { Calculator, Award, ShieldAlert, Heart, Calendar } from 'lucide-react';

export default function PaceCalculator() {
  const [activeSubTab, setActiveSubTab] = useState('calc'); // calc, zones, tips
  
  // Pace Calc State
  const [calcDistance, setCalcDistance] = useState('5'); // 5, 10, 21.1, 42.2, custom
  const [customDistance, setCustomDistance] = useState('');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('30');
  const [seconds, setSeconds] = useState('00');
  const [resultPace, setResultPace] = useState(null);

  // Training Zones State
  const [test5kMin, setTest5kMin] = useState('30');
  const [test5kSec, setTest5kSec] = useState('00');
  const [zones, setZones] = useState(null);

  const handleCalculatePace = (e) => {
    e.preventDefault();
    const d = calcDistance === 'custom' ? parseFloat(customDistance) : parseFloat(calcDistance);
    if (!d || d <= 0) return;

    const totalSeconds = (parseInt(hours, 10) * 3600) + (parseInt(minutes, 10) * 60) + parseInt(seconds, 10);
    if (totalSeconds <= 0) return;

    const secondsPerKm = totalSeconds / d;
    const paceMinutes = Math.floor(secondsPerKm / 60);
    const paceSeconds = Math.round(secondsPerKm % 60);

    setResultPace(`${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`);
  };

  const handleCalculateZones = (e) => {
    e.preventDefault();
    const mins = parseInt(test5kMin, 10);
    const secs = parseInt(test5kSec, 10);
    const totalSecs = (mins * 60) + secs;
    if (totalSecs <= 0) return;

    // Calculate paces relative to 5K pace (seconds per km)
    const basePace = totalSecs / 5; // 5K pace in seconds per km

    // Zone 1: Recovery Pace (~130% to 140% of 5K pace)
    const recoveryMin = basePace * 1.35;
    // Zone 2: Aerobic/Easy Pace (~120% to 128% of 5K pace)
    const easyMin = basePace * 1.22;
    // Zone 3: Tempo/Threshold (~105% to 110% of 5K pace)
    const tempoMin = basePace * 1.07;
    // Zone 4: VO2 Max Intervals (~90% to 95% of 5K pace)
    const vo2Min = basePace * 0.92;

    const formatPace = (secVal) => {
      const m = Math.floor(secVal / 60);
      const s = Math.round(secVal % 60);
      return `${m}:${s.toString().padStart(2, '0')}`;
    };

    setZones([
      { name: 'Zone 1: Active Recovery', pace: `${formatPace(recoveryMin)} - ${formatPace(recoveryMin + 30)}`, desc: 'For recovery runs. Super easy, builds capillary density.', color: 'var(--text-muted)' },
      { name: 'Zone 2: Aerobic / Easy', pace: `${formatPace(easyMin)} - ${formatPace(easyMin + 20)}`, desc: 'Base building pace. Conversational, burns fat efficiently.', color: 'var(--tertiary)' },
      { name: 'Zone 3: Tempo / Threshold', pace: `${formatPace(tempoMin)} - ${formatPace(tempoMin + 15)}`, desc: 'Comfortably hard. Improves lactate clearing threshold.', color: 'var(--primary)' },
      { name: 'Zone 4: VO2 Max Intervals', pace: `${formatPace(vo2Min)} - ${formatPace(vo2Min + 10)}`, desc: 'Hard interval pace. Builds stroke volume and aerobic power.', color: 'var(--secondary)' }
    ]);
  };

  return (
    <div className="page-container" style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Run Tools</h1>
        <p style={styles.subtitle}>Utility tools to estimate paces and calculate training zones.</p>
      </header>

      {/* Subnavigation tab switcher */}
      <div style={styles.subTabBar}>
        <button 
          onClick={() => setActiveSubTab('calc')}
          style={{
            ...styles.subTabBtn,
            color: activeSubTab === 'calc' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeSubTab === 'calc' ? '2px solid var(--primary)' : 'none'
          }}
        >
          Pace Calculator
        </button>
        <button 
          onClick={() => setActiveSubTab('zones')}
          style={{
            ...styles.subTabBtn,
            color: activeSubTab === 'zones' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeSubTab === 'zones' ? '2px solid var(--primary)' : 'none'
          }}
        >
          Training Zones
        </button>
        <button 
          onClick={() => setActiveSubTab('tips')}
          style={{
            ...styles.subTabBtn,
            color: activeSubTab === 'tips' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeSubTab === 'tips' ? '2px solid var(--primary)' : 'none'
          }}
        >
          Form & Safety
        </button>
      </div>

      <div style={styles.tabContent}>
        {/* PACE CALCULATOR */}
        {activeSubTab === 'calc' && (
          <div className="glass" style={styles.card}>
            <form onSubmit={handleCalculatePace} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Select Goal Distance</label>
                <select 
                  value={calcDistance} 
                  onChange={(e) => setCalcDistance(e.target.value)}
                  style={styles.select}
                >
                  <option value="5">5K Run</option>
                  <option value="10">10K Run</option>
                  <option value="21.0975">Half Marathon (21.1K)</option>
                  <option value="42.195">Marathon (42.2K)</option>
                  <option value="custom">Custom Distance...</option>
                </select>
              </div>

              {calcDistance === 'custom' && (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Distance (km)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="e.g. 8.5"
                    value={customDistance} 
                    onChange={(e) => setCustomDistance(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
              )}

              <div style={styles.inputGroup}>
                <label style={styles.label}>Goal Duration (HH : MM : SS)</label>
                <div style={styles.timeInputsWrap}>
                  <input 
                    type="number" 
                    min="0" max="23"
                    value={hours} 
                    onChange={(e) => setHours(e.target.value)}
                    style={styles.timeInput}
                  />
                  <span style={styles.timeDivider}>:</span>
                  <input 
                    type="number" 
                    min="0" max="59"
                    value={minutes} 
                    onChange={(e) => setMinutes(e.target.value)}
                    style={styles.timeInput}
                  />
                  <span style={styles.timeDivider}>:</span>
                  <input 
                    type="number" 
                    min="0" max="59"
                    value={seconds} 
                    onChange={(e) => setSeconds(e.target.value)}
                    style={styles.timeInput}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={styles.calcBtn}>
                <Calculator size={18} /> Calculate Target Pace
              </button>
            </form>

            {resultPace && (
              <div style={styles.resultBox}>
                <span style={styles.resultLabel}>REQUIRED PACE</span>
                <span style={styles.resultVal}>{resultPace} <span style={styles.resultUnit}>/km</span></span>
              </div>
            )}
          </div>
        )}

        {/* TRAINING ZONES */}
        {activeSubTab === 'zones' && (
          <div style={styles.zonesWrapper}>
            <div className="glass" style={styles.card}>
              <form onSubmit={handleCalculateZones} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Your Current 5K Time (MM : SS)</label>
                  <div style={styles.timeInputsWrap}>
                    <input 
                      type="number" 
                      min="10" max="90"
                      value={test5kMin} 
                      onChange={(e) => setTest5kMin(e.target.value)}
                      style={styles.timeInput}
                    />
                    <span style={styles.timeDivider}>:</span>
                    <input 
                      type="number" 
                      min="0" max="59"
                      value={test5kSec} 
                      onChange={(e) => setTest5kSec(e.target.value)}
                      style={styles.timeInput}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-cyan" style={styles.calcBtn}>
                  Calculate Training Zones
                </button>
              </form>
            </div>

            {zones && (
              <div style={styles.zonesList}>
                {zones.map((zone, idx) => (
                  <div key={idx} className="glass" style={styles.zoneCard}>
                    <div style={styles.zoneTop}>
                      <span style={{ ...styles.zoneName, color: zone.color }}>{zone.name}</span>
                      <span style={styles.zonePaceVal}>{zone.pace} /km</span>
                    </div>
                    <p style={styles.zoneDesc}>{zone.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RUNNING TIPS */}
        {activeSubTab === 'tips' && (
          <div style={styles.tipsList}>
            <div className="glass" style={styles.tipDetailCard}>
              <Heart size={24} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div style={styles.tipDetailText}>
                <h3 style={styles.tipDetailTitle}>The 10% Weekly Rule</h3>
                <p style={styles.tipDetailDesc}>To avoid overuse injuries (like shin splints or runner's knee), never increase your total weekly running volume by more than 10% from the previous week.</p>
              </div>
            </div>

            <div className="glass" style={styles.tipDetailCard}>
              <Award size={24} color="var(--secondary)" style={{ flexShrink: 0 }} />
              <div style={styles.tipDetailText}>
                <h3 style={styles.tipDetailTitle}>Proper Running Form</h3>
                <p style={styles.tipDetailDesc}>Keep your head up, shoulders relaxed, and arms swinging naturally forward and back (not side-to-side). Try to land midfoot rather than striking hard with your heel.</p>
              </div>
            </div>

            <div className="glass" style={styles.tipDetailCard}>
              <ShieldAlert size={24} color="var(--tertiary)" style={{ flexShrink: 0 }} />
              <div style={styles.tipDetailText}>
                <h3 style={styles.tipDetailTitle}>RPE (Effort Scale)</h3>
                <p style={styles.tipDetailDesc}>Use the Rate of Perceived Exertion. An easy run is RPE 3-4 (you can talk in full sentences). A tempo run is RPE 6-7 (comfortably hard, short phrases only). Intervals are RPE 8-9.</p>
              </div>
            </div>

            <div className="glass" style={styles.tipDetailCard}>
              <Calendar size={24} color="var(--purple)" style={{ flexShrink: 0 }} />
              <div style={styles.tipDetailText}>
                <h3 style={styles.tipDetailTitle}>Cross-Training Benefits</h3>
                <p style={styles.tipDetailDesc}>Cycling, swimming, and resistance bands strengthen surrounding stabilizers, build deep cardiovascular base, and take impact stresses off your bones and joints.</p>
              </div>
            </div>
          </div>
        )}
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
  subTabBar: {
    display: 'flex',
    borderBottom: '1px solid var(--border-light)',
    marginBottom: '8px'
  },
  subTabBtn: {
    flex: 1,
    background: 'none',
    border: 'none',
    padding: '12px 0',
    fontSize: '14px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    transition: 'all 0.2s ease'
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  card: {
    padding: '24px 20px',
    textAlign: 'left'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    fontWeight: '600'
  },
  select: {
    background: '#12152b',
    border: '1px solid var(--border-light)',
    borderRadius: '12px',
    padding: '12px 14px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'var(--font-sans)',
    outline: 'none'
  },
  input: {
    background: '#12152b',
    border: '1px solid var(--border-light)',
    borderRadius: '12px',
    padding: '12px 14px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'var(--font-sans)',
    outline: 'none'
  },
  timeInputsWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  timeInput: {
    flex: 1,
    background: '#12152b',
    border: '1px solid var(--border-light)',
    borderRadius: '12px',
    padding: '12px',
    color: '#FFFFFF',
    fontSize: '16px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    textAlign: 'center',
    outline: 'none'
  },
  timeDivider: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--text-muted)'
  },
  calcBtn: {
    width: '100%',
    padding: '14px'
  },
  resultBox: {
    marginTop: '20px',
    padding: '16px',
    borderRadius: '16px',
    background: 'rgba(255, 94, 58, 0.08)',
    border: '1px solid rgba(255, 94, 58, 0.2)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  resultLabel: {
    fontSize: '11px',
    color: 'var(--primary)',
    fontWeight: '700',
    letterSpacing: '0.08em'
  },
  resultVal: {
    fontSize: '28px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '850',
    color: '#FFFFFF'
  },
  resultUnit: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-secondary)'
  },
  zonesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  zonesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  zoneCard: {
    padding: '16px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  zoneTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  zoneName: {
    fontSize: '14px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800'
  },
  zonePaceVal: {
    fontSize: '15px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    color: '#FFFFFF'
  },
  zoneDesc: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4'
  },
  tipsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  tipDetailCard: {
    padding: '18px',
    display: 'flex',
    gap: '14px',
    textAlign: 'left',
    alignItems: 'flex-start'
  },
  tipDetailText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  tipDetailTitle: {
    fontSize: '16px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    color: '#FFFFFF'
  },
  tipDetailDesc: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    lineHeight: '1.45'
  }
};
