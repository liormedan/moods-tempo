interface MoodData {
  generalFeeling: number;
  date: string;
}

export const predictMood = (moodHistory: MoodData[]): number => {
  if (moodHistory.length < 7) return 5; // Default if not enough data

  // Get last 7 days
  const recentMoods = moodHistory
    .slice(-7)
    .map((entry) => entry.generalFeeling);

  // Simple moving average
  const average = recentMoods.reduce((a, b) => a + b, 0) / recentMoods.length;

  // Simple trend analysis
  const trend = recentMoods[recentMoods.length - 1] - recentMoods[0];

  // Predict next value based on average and trend
  const prediction = average + trend / 7;

  // Ensure prediction is within bounds
  return Math.min(Math.max(prediction, 1), 10);
};

export const getMoodInsights = (moodHistory: MoodData[]) => {
  if (moodHistory.length < 7) return null;

  const recentMoods = moodHistory.slice(-7);
  const averageMood = recentMoods.reduce((a, b) => a + b.generalFeeling, 0) / 7;
  const bestDay = Math.max(...recentMoods.map((m) => m.generalFeeling));
  const worstDay = Math.min(...recentMoods.map((m) => m.generalFeeling));

  return {
    averageMood,
    bestDay,
    worstDay,
    trend: recentMoods[6].generalFeeling - recentMoods[0].generalFeeling,
  };
};
