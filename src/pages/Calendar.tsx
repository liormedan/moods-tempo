import React from "react";
import MoodCalendar from "@/components/mood/MoodCalendar";
import MoodHistoryFilters from "@/components/mood/MoodHistoryFilters";
import MedicationTracker from "@/components/mood/MedicationTracker";

const Calendar = () => {
  return (
    <div className="p-4 md:p-6 bg-[#0A0A0A] text-white min-h-screen">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            היסטוריה
          </h1>
          <p className="mt-2 text-gray-400">
            צפה בהיסטוריית מצבי הרוח והתרופות שלך
          </p>
        </div>

        <div className="space-y-6">
          <MoodHistoryFilters />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MoodCalendar />
            <MedicationTracker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
