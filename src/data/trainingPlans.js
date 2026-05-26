export const trainingPlans = {
  "5k": {
    id: "5k",
    title: "Couch to 5K",
    distance: "5 km",
    targetDistance: 5,
    duration: "8 Weeks",
    weeksCount: 8,
    difficulty: "Beginner",
    description: "Perfect for absolute beginners. Safely transition from walking to running 5 km continuously.",
    bgImage: "/assets/bg_5k.png",
    color: "var(--primary)",
    gradient: "var(--gradient-primary)",
    glowColor: "var(--primary-glow)",
    weeks: [
      {
        weekNumber: 1,
        days: [
          { dayName: "Mon", type: "run", title: "Interval Jog", duration: "20 mins", distance: 2.0, paceType: "Easy/Walk", description: "Warm up with 5 mins walking. Alternate 1 min running and 1.5 mins walking for 15 mins." },
          { dayName: "Tue", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Let your muscles and joints adapt. Keep hydrated." },
          { dayName: "Wed", type: "run", title: "Interval Jog", duration: "20 mins", distance: 2.0, paceType: "Easy/Walk", description: "Warm up with 5 mins walking. Alternate 1 min running and 1.5 mins walking for 15 mins." },
          { dayName: "Thu", type: "cross", title: "Cross Training", duration: "30 mins", distance: 0, paceType: "Active", description: "Low impact activity: cycling, swimming, yoga, or brisk walking." },
          { dayName: "Fri", type: "run", title: "Interval Jog", duration: "20 mins", distance: 2.2, paceType: "Easy/Walk", description: "Warm up with 5 mins walking. Alternate 1 min running and 1.5 mins walking for 15 mins." },
          { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Relax and prepare for the long walk/run tomorrow." },
          { dayName: "Sun", type: "run", title: "Long Run / Walk", duration: "25 mins", distance: 2.8, paceType: "Easy", description: "Slow continuous progress. Jog when you can, walk when you need. Pace should be very conversational." }
        ]
      },
      {
        weekNumber: 2,
        days: [
          { dayName: "Mon", type: "run", title: "Easy Intervals", duration: "22 mins", distance: 2.3, paceType: "Easy/Walk", description: "5 mins warm-up walk. Alternate 1.5 mins running and 2 mins walking for 17 mins." },
          { dayName: "Tue", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest and recover." },
          { dayName: "Wed", type: "run", title: "Easy Intervals", duration: "22 mins", distance: 2.3, paceType: "Easy/Walk", description: "5 mins warm-up walk. Alternate 1.5 mins running and 2 mins walking for 17 mins." },
          { dayName: "Thu", type: "cross", title: "Cross Training", duration: "30 mins", distance: 0, paceType: "Active", description: "Stretching, strength exercises, or core workouts." },
          { dayName: "Fri", type: "run", title: "Easy Intervals", duration: "22 mins", distance: 2.5, paceType: "Easy/Walk", description: "5 mins warm-up walk. Alternate 1.5 mins running and 2 mins walking for 17 mins." },
          { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Sun", type: "run", title: "Long Run / Walk", duration: "28 mins", distance: 3.2, paceType: "Easy", description: "Build your endurance. Focus on running for longer segments of 3-4 mins." }
        ]
      },
      // Shortened weeks definition for space, but fully playable
      {
        weekNumber: 3,
        days: [
          { dayName: "Mon", type: "run", title: "Tempo Walk/Run", duration: "24 mins", distance: 2.6, paceType: "Tempo/Walk", description: "Jog 2 mins, walk 2 mins. Repeat 6 times." },
          { dayName: "Tue", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Wed", type: "run", title: "Tempo Walk/Run", duration: "24 mins", distance: 2.6, paceType: "Tempo/Walk", description: "Jog 2 mins, walk 2 mins. Repeat 6 times." },
          { dayName: "Thu", type: "cross", title: "Cross Training", duration: "35 mins", distance: 0, paceType: "Active", description: "Light weight training or cycling." },
          { dayName: "Fri", type: "run", title: "Tempo Walk/Run", duration: "24 mins", distance: 2.8, paceType: "Tempo/Walk", description: "Jog 2 mins, walk 1.5 mins. Repeat 7 times." },
          { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Sun", type: "run", title: "Long Run", duration: "30 mins", distance: 3.5, paceType: "Easy", description: "Try to run continuously for 5 mins twice with 2 mins walking in between." }
        ]
      },
      {
        weekNumber: 4,
        days: [
          { dayName: "Mon", type: "run", title: "Continuous Build", duration: "25 mins", distance: 3.0, paceType: "Easy", description: "Jog 3 mins, walk 1.5 mins. Repeat 5 times." },
          { dayName: "Tue", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Wed", type: "run", title: "Continuous Build", duration: "25 mins", distance: 3.0, paceType: "Easy", description: "Jog 3 mins, walk 1.5 mins. Repeat 5 times." },
          { dayName: "Thu", type: "cross", title: "Cross Training", duration: "35 mins", distance: 0, paceType: "Active", description: "Yoga and core strengthening." },
          { dayName: "Fri", type: "run", title: "Interval Push", duration: "26 mins", distance: 3.2, paceType: "Tempo", description: "Jog 5 mins, walk 2 mins, jog 5 mins, walk 2 mins, jog 5 mins." },
          { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Sun", type: "run", title: "Long Jog", duration: "32 mins", distance: 3.8, paceType: "Easy", description: "Try to run continuously for 8 mins, walk 3 mins, then run another 8 mins." }
        ]
      },
      {
        weekNumber: 5,
        days: [
          { dayName: "Mon", type: "run", title: "Steady Run", duration: "25 mins", distance: 3.2, paceType: "Easy", description: "Jog 5 mins, walk 3 mins. Repeat 3 times." },
          { dayName: "Tue", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Wed", type: "run", title: "Interval Challenge", duration: "25 mins", distance: 3.4, paceType: "Tempo", description: "Jog 8 mins, walk 5 mins, jog 8 mins." },
          { dayName: "Thu", type: "cross", title: "Cross Training", duration: "40 mins", distance: 0, paceType: "Active", description: "Stretching and strength training." },
          { dayName: "Fri", type: "run", title: "Steady Run", duration: "25 mins", distance: 3.5, paceType: "Easy", description: "Jog 5 mins, walk 2 mins, jog 5 mins, walk 2 mins." },
          { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Sun", type: "run", title: "Long Run Milestone", duration: "30 mins", distance: 4.0, paceType: "Easy", description: "Your first big milestone: Try to run 15 mins continuously, walk 3 mins, run 10 mins." }
        ]
      },
      {
        weekNumber: 6,
        days: [
          { dayName: "Mon", type: "run", title: "Interval Jog", duration: "25 mins", distance: 3.5, paceType: "Easy", description: "Jog 10 mins, walk 3 mins, jog 10 mins." },
          { dayName: "Tue", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Wed", type: "run", title: "Steady Jog", duration: "28 mins", distance: 3.8, paceType: "Easy", description: "Jog 12 mins, walk 2 mins, jog 12 mins." },
          { dayName: "Thu", type: "cross", title: "Cross Training", duration: "40 mins", distance: 0, paceType: "Active", description: "Low intensity swimming or walking." },
          { dayName: "Fri", type: "run", title: "Tough Intervals", duration: "25 mins", distance: 3.8, paceType: "Tempo", description: "Jog 15 mins continuously, walk 3 mins, jog 5 mins." },
          { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Sun", type: "run", title: "Long Continuous Run", duration: "30 mins", distance: 4.2, paceType: "Easy", description: "Attempt a continuous 20-minute jog without walking. Focus on breathing." }
        ]
      },
      {
        weekNumber: 7,
        days: [
          { dayName: "Mon", type: "run", title: "Continuous Progress", duration: "28 mins", distance: 4.2, paceType: "Easy", description: "Run 22 mins continuously. Walk 2 mins. Run 4 mins." },
          { dayName: "Tue", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Wed", type: "run", title: "Continuous Progress", duration: "28 mins", distance: 4.2, paceType: "Easy", description: "Run 22 mins continuously. Walk 2 mins. Run 4 mins." },
          { dayName: "Thu", type: "cross", title: "Cross Training", duration: "45 mins", distance: 0, paceType: "Active", description: "Brisk walk or cycling." },
          { dayName: "Fri", type: "run", title: "Threshold Run", duration: "30 mins", distance: 4.5, paceType: "Tempo", description: "Run 25 mins continuously. Celebrate your stamina build-up!" },
          { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Sun", type: "run", title: "Peak Long Run", duration: "35 mins", distance: 4.8, paceType: "Easy", description: "Run 28 mins continuously. You are very close to the full 5K distance!" }
        ]
      },
      {
        weekNumber: 8,
        days: [
          { dayName: "Mon", type: "run", title: "Easy Warm Up", duration: "25 mins", distance: 3.5, paceType: "Easy", description: "Run 20 mins easy. Tapering for the graduation run." },
          { dayName: "Tue", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Wed", type: "run", title: "Tempo Taper", duration: "20 mins", distance: 3.0, paceType: "Tempo", description: "15 mins of easy running with 3x1 min faster segments." },
          { dayName: "Thu", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest. Stay fresh and eat well." },
          { dayName: "Fri", type: "run", title: "Recovery Jog", duration: "15 mins", distance: 2.0, paceType: "Easy", description: "Light 10 mins jog just to loosen up the legs." },
          { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Complete rest before graduation day." },
          { dayName: "Sun", type: "run", title: "5K Graduation Run!", duration: "35 mins", distance: 5.0, paceType: "Race", description: "Today is the day! Run 5K continuously. Pace yourself, breathe, and finish strong!" }
        ]
      }
    ]
  },
  "10k": {
    id: "10k",
    title: "10K Transition",
    distance: "10 km",
    targetDistance: 10,
    duration: "10 Weeks",
    weeksCount: 10,
    difficulty: "Intermediate",
    description: "Designed for runners who can run 5K and want to double their distance and improve pace.",
    bgImage: "/assets/bg_10k.png",
    color: "var(--secondary)",
    gradient: "var(--gradient-cyan)",
    glowColor: "var(--secondary-glow)",
    weeks: [
      {
        weekNumber: 1,
        days: [
          { dayName: "Mon", type: "run", title: "Easy Run", duration: "30 mins", distance: 4.0, paceType: "Easy", description: "Run at conversational pace. Focus on easy breathing." },
          { dayName: "Tue", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest and recover." },
          { dayName: "Wed", type: "run", title: "Intervals Intro", duration: "35 mins", distance: 4.5, paceType: "Interval", description: "Warm up. Run 5x400m at fast pace with 90 sec walking in between." },
          { dayName: "Thu", type: "cross", title: "Cross Training", duration: "30 mins", distance: 0, paceType: "Active", description: "Low impact cardio: cycling or swimming." },
          { dayName: "Fri", type: "run", title: "Tempo Run", duration: "30 mins", distance: 4.2, paceType: "Tempo", description: "10 mins easy, 10 mins comfortably hard pace, 10 mins easy." },
          { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
          { dayName: "Sun", type: "run", title: "Long Run", duration: "45 mins", distance: 6.0, paceType: "Easy", description: "Long slow run. Focus on time on feet, not speed." }
        ]
      },
      // We will provide dynamically built weeks to ensure the application works fully.
      // Generating weeks 2-10 with structured progression:
      ...Array.from({ length: 9 }, (_, idx) => {
        const wk = idx + 2;
        const baseDist = 4.0 + (wk * 0.4);
        return {
          weekNumber: wk,
          days: [
            { dayName: "Mon", type: "run", title: "Easy Run", duration: `${Math.round(30 + wk * 1.5)} mins`, distance: Math.round((baseDist) * 10) / 10, paceType: "Easy", description: "Maintain a steady, conversational running pace." },
            { dayName: "Tue", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest and muscle recovery." },
            { dayName: "Wed", type: "run", title: wk === 10 ? "Taper Jog" : "Interval Run", duration: `${Math.round(35 + wk)} mins`, distance: Math.round((baseDist + 0.5) * 10) / 10, paceType: "Interval", description: wk === 10 ? "Light recovery intervals." : `Run ${4 + Math.round(wk / 2)}x600m at fast pace with 2 mins rest.` },
            { dayName: "Thu", type: "cross", title: "Cross Training", duration: "40 mins", distance: 0, paceType: "Active", description: "Strengthen hips and core muscles." },
            { dayName: "Fri", type: "run", title: "Tempo Progress", duration: `${Math.round(30 + wk)} mins`, distance: Math.round((baseDist + 0.2) * 10) / 10, paceType: "Tempo", description: `Run ${10 + wk} mins at target threshold pace.` },
            { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
            { dayName: "Sun", type: "run", title: wk === 10 ? "10K Goal Race!" : "Long Run", duration: `${Math.round(45 + wk * 2.5)} mins`, distance: wk === 10 ? 10.0 : Math.round((6.0 + wk * 0.4) * 10) / 10, paceType: wk === 10 ? "Race" : "Easy", description: wk === 10 ? "Congratulations! Execute your plan. Run 10 km continuously!" : "Build your stamina with your weekly long run." }
          ]
        };
      })
    ]
  },
  "21k": {
    id: "21k",
    title: "Half Marathon",
    distance: "21 km",
    targetDistance: 21.1,
    duration: "12 Weeks",
    weeksCount: 12,
    difficulty: "Advanced Beginner",
    description: "Build deep aerobic base, endurance, and pacing strategies for the 21.1 km Half Marathon.",
    bgImage: "/assets/bg_21k.png",
    color: "var(--tertiary)",
    gradient: "var(--gradient-green)",
    glowColor: "var(--tertiary-glow)",
    weeks: [
      {
        weekNumber: 1,
        days: [
          { dayName: "Mon", type: "run", title: "Recovery Jog", duration: "30 mins", distance: 5.0, paceType: "Easy", description: "Keep it super light and easy. Clear lactic acid." },
          { dayName: "Tue", type: "run", title: "Tempo Foundation", duration: "40 mins", distance: 6.5, paceType: "Tempo", description: "Warm up, 15 mins at tempo pace, cool down." },
          { dayName: "Wed", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Muscle repair day." },
          { dayName: "Thu", type: "run", title: "Easy Aerobic", duration: "35 mins", distance: 5.5, paceType: "Easy", description: "Comfortable, smooth run." },
          { dayName: "Fri", type: "cross", title: "Strength Work", duration: "45 mins", distance: 0, paceType: "Active", description: "Leg extensions, lunges, and core routines." },
          { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Prepare for your long run." },
          { dayName: "Sun", type: "run", title: "Long Run", duration: "60 mins", distance: 9.0, paceType: "Easy", description: "Comfortable long run. Practice running slowly to run longer." }
        ]
      },
      ...Array.from({ length: 11 }, (_, idx) => {
        const wk = idx + 2;
        const isTaper = wk > 10;
        const longRunDist = isTaper 
          ? (wk === 11 ? 12.0 : 21.1) 
          : Math.round((9.0 + wk * 0.9) * 10) / 10;
        
        return {
          weekNumber: wk,
          days: [
            { dayName: "Mon", type: "run", title: "Recovery Run", duration: "30 mins", distance: Math.round((5.0 + wk * 0.2) * 10) / 10, paceType: "Easy", description: "Slow recovery pace. Easy effort." },
            { dayName: "Tue", type: "run", title: wk === 12 ? "Light Jog" : "Tempo Run", duration: "45 mins", distance: Math.round((6.0 + wk * 0.3) * 10) / 10, paceType: "Tempo", description: wk === 12 ? "Shakeout jog. Keep it loose." : "Run at your threshold/half marathon goal pace." },
            { dayName: "Wed", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest." },
            { dayName: "Thu", type: "run", title: wk === 12 ? "Rest Day" : "Speed Intervals", duration: "40 mins", distance: Math.round((5.0 + wk * 0.4) * 10) / 10, paceType: "Interval", description: wk === 12 ? "Complete rest." : `Run ${3 + Math.round(wk / 3)}x1000m at 10K pace.` },
            { dayName: "Fri", type: "cross", title: "Cross Training", duration: "45 mins", distance: 0, paceType: "Active", description: "Stretch, swim, or cycle." },
            { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest before Sunday's target." },
            { dayName: "Sun", type: "run", title: wk === 12 ? "Half Marathon Race!" : "Long Run", duration: `${Math.round(60 + wk * 4)} mins`, distance: longRunDist, paceType: wk === 12 ? "Race" : "Easy", description: wk === 12 ? "Graduate! Complete your 21.1 km half marathon. Believe in your training!" : "Key workout of the week. Build your endurance." }
          ]
        };
      })
    ]
  },
  "42k": {
    id: "42k",
    title: "Full Marathon",
    distance: "42.2 km",
    targetDistance: 42.2,
    duration: "16 Weeks",
    weeksCount: 16,
    difficulty: "Advanced",
    description: "Peak volume, nutritional strategy, and deep physical and mental stamina for the ultimate 42.2 km challenge.",
    bgImage: "/assets/marathon_profile.jpg",
    color: "var(--purple)",
    gradient: "var(--gradient-purple)",
    glowColor: "var(--purple-glow)",
    weeks: [
      {
        weekNumber: 1,
        days: [
          { dayName: "Mon", type: "run", title: "Recovery Jog", duration: "35 mins", distance: 6.0, paceType: "Easy", description: "Light recovery work. Flush out legs." },
          { dayName: "Tue", type: "run", title: "Marathon Tempo", duration: "50 mins", distance: 8.0, paceType: "Tempo", description: "Run at target marathon pace for 20 mins." },
          { dayName: "Wed", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Rest and recover." },
          { dayName: "Thu", type: "run", title: "Easy Aerobic", duration: "40 mins", distance: 7.0, paceType: "Easy", description: "Aerobic maintenance." },
          { dayName: "Fri", type: "cross", title: "Core & Hips", duration: "45 mins", distance: 0, paceType: "Active", description: "Glutes, hamstrings, and stability training." },
          { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Hydrate and load carbs." },
          { dayName: "Sun", type: "run", title: "Long Run", duration: "90 mins", distance: 14.0, paceType: "Easy", description: "Slow, steady long run. Practice hydration." }
        ]
      },
      ...Array.from({ length: 15 }, (_, idx) => {
        const wk = idx + 2;
        const isTaper = wk > 13;
        
        let longRunDist = 14.0 + (wk * 1.2);
        if (longRunDist > 32.0) longRunDist = 32.0; // Limit long runs to 32k to avoid injury
        if (wk === 14) longRunDist = 22.0; // Tapering
        if (wk === 15) longRunDist = 12.0; // Tapering
        if (wk === 16) longRunDist = 42.2; // The Marathon
        
        return {
          weekNumber: wk,
          days: [
            { dayName: "Mon", type: "run", title: "Recovery Run", duration: "40 mins", distance: Math.round((6.0 + wk * 0.25) * 10) / 10, paceType: "Easy", description: "Easy pace to start the week fresh." },
            { dayName: "Tue", type: "run", title: wk === 16 ? "Shakeout Run" : "Tempo Run", duration: "55 mins", distance: Math.round((8.0 + wk * 0.35) * 10) / 10, paceType: "Tempo", description: wk === 16 ? "Easy shakeout run." : "Marathon goal pace run." },
            { dayName: "Wed", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Recovery day." },
            { dayName: "Thu", type: "run", title: wk === 16 ? "Rest Day" : "Speed / Yasso 800s", duration: "50 mins", distance: Math.round((7.0 + wk * 0.4) * 10) / 10, paceType: "Interval", description: wk === 16 ? "Rest." : `Run Yasso 800s (e.g. ${4 + Math.round(wk / 3.5)} repetitions).` },
            { dayName: "Fri", type: "cross", title: "Cross Training", duration: "45 mins", distance: 0, paceType: "Active", description: "Low intensity workout." },
            { dayName: "Sat", type: "rest", title: "Rest Day", duration: "Rest", distance: 0, paceType: "None", description: "Prepare for your long run." },
            { dayName: "Sun", type: "run", title: wk === 16 ? "MARATHON Graduation!" : "Long Run", duration: `${Math.round(90 + wk * 5.5)} mins`, distance: Math.round(longRunDist * 10) / 10, paceType: wk === 16 ? "Race" : "Easy", description: wk === 16 ? "This is it. You are a marathoner. Pace yourself, stick to nutrition, and enjoy the 42.2 km journey!" : "The core of your marathon foundation. Test gels and fluid intake." }
          ]
        };
      })
    ]
  }
};
