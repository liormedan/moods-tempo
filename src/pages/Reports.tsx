import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { format } from "date-fns";

interface MoodEntry {
  date: string;
  generalFeeling: number;
  anxietyOptimism: number;
  activityLevel: number;
  sleepQuality: number;
  socialInteraction: number;
  tookMedication: boolean;
  note?: string;
}

const Reports = () => {
  const [entries, setEntries] = React.useState<MoodEntry[]>([]);

  React.useEffect(() => {
    const savedMoods = JSON.parse(localStorage.getItem("moods") || "[]");
    setEntries(savedMoods);
  }, []);

  const getMoodEmoji = (value: number) => {
    const percentage = (value - 1) / 9;
    if (percentage <= 0.25) return "😢";
    if (percentage <= 0.5) return "😐";
    if (percentage <= 0.75) return "🙂";
    return "😊";
  };

  const exportToCSV = () => {
    const headers = [
      "תאריך",
      "מצב רוח כללי",
      "חרדה/אופטימיות",
      "רמת פעילות",
      "איכות שינה",
      "אינטראקציה חברתית",
      "תרופות",
      "הערות",
    ];

    const csvContent = [
      headers.join(","),
      ...entries.map((entry) =>
        [
          format(new Date(entry.date), "dd/MM/yyyy HH:mm"),
          entry.generalFeeling,
          entry.anxietyOptimism,
          entry.activityLevel,
          entry.sleepQuality,
          entry.socialInteraction,
          entry.tookMedication ? "כן" : "לא",
          entry.note || "",
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `mood_report_${format(new Date(), "dd_MM_yyyy")}.csv`;
    link.click();
  };

  return (
    <div className="p-4 md:p-6 bg-[#0A0A0A] text-white min-h-screen">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">דוחות</h1>
            <p className="mt-2 text-gray-400">
              דוחות מפורטים על מצבי הרוח והתרופות שלך
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              סינון
            </Button>
            <Button onClick={exportToCSV} className="gap-2">
              <Download className="h-4 w-4" />
              ייצוא לאקסל
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#1A1A1A]">
                <TableHead className="text-right w-[160px] text-gray-400">
                  תאריך
                </TableHead>
                <TableHead className="text-right w-[120px] text-gray-400">
                  מצב רוח כללי
                </TableHead>
                <TableHead className="text-right w-[140px] text-gray-400">
                  חרדה/אופטימיות
                </TableHead>
                <TableHead className="text-right w-[120px] text-gray-400">
                  רמת פעילות
                </TableHead>
                <TableHead className="text-right w-[120px] text-gray-400">
                  איכות שינה
                </TableHead>
                <TableHead className="text-right w-[140px] text-gray-400">
                  אינטראקציה חברתית
                </TableHead>
                <TableHead className="text-right w-[100px] text-gray-400">
                  תרופות
                </TableHead>
                <TableHead className="text-right text-gray-400">
                  הערות
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow key={index} className="border-gray-800">
                  <TableCell className="font-medium text-white">
                    {format(new Date(entry.date), "dd/MM/yyyy HH:mm")}
                  </TableCell>
                  <TableCell className="text-white">
                    {getMoodEmoji(entry.generalFeeling)} {entry.generalFeeling}
                    /10
                  </TableCell>
                  <TableCell className="text-white">
                    {getMoodEmoji(entry.anxietyOptimism)}{" "}
                    {entry.anxietyOptimism}/10
                  </TableCell>
                  <TableCell className="text-white">
                    {getMoodEmoji(entry.activityLevel)} {entry.activityLevel}/10
                  </TableCell>
                  <TableCell className="text-white">
                    {getMoodEmoji(entry.sleepQuality)} {entry.sleepQuality}/10
                  </TableCell>
                  <TableCell className="text-white">
                    {getMoodEmoji(entry.socialInteraction)}{" "}
                    {entry.socialInteraction}/10
                  </TableCell>
                  <TableCell className="text-white">
                    {entry.tookMedication ? "✅" : "❌"}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-white">
                    {entry.note || "-"}
                  </TableCell>
                </TableRow>
              ))}
              {entries.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-gray-400"
                  >
                    אין נתונים להצגה
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
