import React from "react";
import MoodStats from "@/components/mood/MoodStats";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Statistics = () => {
  return (
    <div className="p-4 md:p-6 bg-[#0A0A0A] text-white min-h-screen">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              סטטיסטיקות
            </h1>
            <p className="mt-2 text-gray-400">
              ניתוח מגמות ותובנות ממצבי הרוח שלך
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            ייצא נתונים
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 flex flex-col items-center justify-center bg-[#1A1A1A] text-white">
            <h3 className="text-2xl font-bold">7.5</h3>
            <p className="text-gray-400">מצב רוח ממוצע החודש</p>
          </Card>
          <Card className="p-6 flex flex-col items-center justify-center bg-[#1A1A1A] text-white">
            <h3 className="text-2xl font-bold text-green-500">+12%</h3>
            <p className="text-gray-400">שיפור מהחודש הקודם</p>
          </Card>
          <Card className="p-6 flex flex-col items-center justify-center bg-[#1A1A1A] text-white">
            <h3 className="text-2xl font-bold">85%</h3>
            <p className="text-gray-400">דיוק בתחזית</p>
          </Card>
        </div>

        <MoodStats />
      </div>
    </div>
  );
};

export default Statistics;
