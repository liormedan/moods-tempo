interface UserSettings {
  dailyReminder: boolean;
  medicationReminders: boolean;
  reminderTime: string;
  darkMode: boolean;
  language: string;
}

const DEFAULT_SETTINGS: UserSettings = {
  dailyReminder: true,
  medicationReminders: true,
  reminderTime: "20:00",
  darkMode: false,
  language: "he",
};

export const loadSettings = (): UserSettings => {
  const saved = localStorage.getItem("userSettings");
  return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
};

export const saveSettings = (settings: Partial<UserSettings>) => {
  const current = loadSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem("userSettings", JSON.stringify(updated));
  return updated;
};

export const clearSettings = () => {
  localStorage.removeItem("userSettings");
  return DEFAULT_SETTINGS;
};
