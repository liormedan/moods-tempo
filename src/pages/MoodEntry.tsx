import React from "react";
import MoodInput from "@/components/mood/MoodInput";

const MoodEntry = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">דיווח מצב רוח</h1>
          <p className="mt-2 text-muted-foreground">
            דווח על מצב הרוח והתחושות שלך
          </p>
        </div>

        <div className="flex justify-center">
          <MoodInput />
        </div>
      </div>
    </div>
  );
};

export default MoodEntry;
