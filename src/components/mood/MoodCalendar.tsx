import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const defaultEntries: MoodEntry[] = [
  {
    date: new Date(2024, 0, 1),
    mood: "happy",
    note: "Great start to the year!",
  },
  { date: new Date(2024, 0, 2), mood: "neutral", note: "Regular day" },
  { date: new Date(2024, 0, 3), mood: "sad", note: "Feeling down" },
  { date: new Date(2024, 0, 4), mood: "angry", note: "Frustrated with work" },
];

const MoodCalendar = ({
  entries = defaultEntries,
  onDateSelect = () => {},
}: MoodCalendarProps) => {
  const getDayMood = (date: Date): MoodEntry | undefined => {
    return entries.find(
      (entry) =>
        entry.date.getDate() === date.getDate() &&
        entry.date.getMonth() === date.getMonth() &&
        entry.date.getFullYear() === date.getFullYear(),
    );
  };

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
