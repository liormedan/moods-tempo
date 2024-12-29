import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMoodEntries } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

type Mood = "happy" | "neutral" | "sad" | "angry";

interface MoodEntry {
  date: Date;
  mood: Mood;
  note?: string;
}

interface MoodCalendarProps {
  entries?: MoodEntry[];
  onDateSelect?: (date: Date) => void;
}

const moodColors = {
  happy: "bg-green-200",
  neutral: "bg-yellow-200",
  sad: "bg-blue-200",
  angry: "bg-red-200",
};

const getMoodType = (value: number): Mood => {
  if (value >= 8) return "happy";
  if (value >= 5) return "neutral";
  if (value >= 3) return "sad";
  return "angry";
};

const MoodCalendar = ({
  entries: propEntries,
  onDateSelect = () => {},
}: MoodCalendarProps) => {
  const { user } = useAuth();
  const [entries, setEntries] = React.useState<MoodEntry[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (propEntries) {
      setEntries(propEntries);
      setLoading(false);
      return;
    }

    const loadEntries = async () => {
      if (!user) return;

      try {
        const { data, error } = await getMoodEntries(user.id);
        if (error) throw error;

        const formattedEntries = data.map((entry) => ({
          date: new Date(entry.created_at),
          mood: getMoodType(entry.general_feeling),
          note: entry.note || undefined,
        }));

        setEntries(formattedEntries);
      } catch (error) {
        console.error("Error loading mood entries:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, [user, propEntries]);

  const getDayMood = (date: Date): MoodEntry | undefined => {
    return entries.find(
      (entry) =>
        entry.date.getDate() === date.getDate() &&
        entry.date.getMonth() === date.getMonth() &&
        entry.date.getFullYear() === date.getFullYear(),
    );
  };

  if (loading) {
    return (
      <Card className="p-6 w-full max-w-[800px]">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="h-[400px] bg-gray-100 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 w-full max-w-[800px]">
      <h2 className="text-2xl font-semibold mb-4">היסטוריית מצבי רוח</h2>
      <TooltipProvider>
        <Calendar
          mode="single"
          className="rounded-md border"
          modifiers={{
            mood: (date) => getDayMood(date) !== undefined,
          }}
          modifiersStyles={{
            mood: { fontWeight: "bold" },
          }}
          components={{
            Day: ({ date }) => {
              const moodEntry = getDayMood(date);
              if (!moodEntry) {
                return (
                  <div className="h-8 w-8 flex items-center justify-center">
                    {date.getDate()}
                  </div>
                );
              }

              return (
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={`h-8 w-8 flex items-center justify-center rounded-full ${moodColors[moodEntry.mood]}`}
                    >
                      {date.getDate()}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{moodEntry.note || `מצב רוח: ${moodEntry.mood}`}</p>
                  </TooltipContent>
                </Tooltip>
              );
            },
          }}
          onDayClick={onDateSelect}
        />
      </TooltipProvider>
    </Card>
  );
};

export default MoodCalendar;
