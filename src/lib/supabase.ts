import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Profile functions
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);
  return { data, error };
};

// Mood entries functions
export const createMoodEntry = async (entry: any) => {
  const { data, error } = await supabase
    .from("mood_entries")
    .insert([entry])
    .select()
    .single();
  return { data, error };
};

export const getMoodEntries = async (userId: string) => {
  const { data, error } = await supabase
    .from("mood_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
};

// Medications functions
export const createMedication = async (medication: any) => {
  const { data, error } = await supabase
    .from("medications")
    .insert([medication])
    .select()
    .single();
  return { data, error };
};

export const getMedications = async (userId: string) => {
  const { data, error } = await supabase
    .from("medications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
};

// Journal entries functions
export const createJournalEntry = async (entry: any) => {
  const { data, error } = await supabase
    .from("journal_entries")
    .insert([entry])
    .select()
    .single();
  return { data, error };
};

export const getJournalEntries = async (userId: string) => {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
};

// Goals functions
export const createGoal = async (goal: any) => {
  const { data, error } = await supabase
    .from("goals")
    .insert([goal])
    .select()
    .single();
  return { data, error };
};

export const getGoals = async (userId: string) => {
  const { data, error } = await supabase
    .from("goals")
    .select("*, goal_tasks(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
};

// Support groups functions
export const getSupportGroups = async () => {
  const { data, error } = await supabase
    .from("support_groups")
    .select("*, group_members(count)");
  return { data, error };
};

export const joinGroup = async (groupId: string, userId: string) => {
  const { data, error } = await supabase
    .from("group_members")
    .insert([{ group_id: groupId, user_id: userId }])
    .select()
    .single();
  return { data, error };
};
