import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface MoodStatsProps {
  weeklyData?: Array<{ date: string; value: number }>;
  monthlyData?: Array<{ date: string; value: number }>;
  mostFrequentMood?: string;
  averageMood?: number;
}

const defaultWeeklyData = [
  { date: "יום ב'", value: 4 },
  { date: "יום ג'", value: 3 },
  { date: "יום ד'", value: 5 },
  { date: "יום ה'", value: 4 },
  { date: "יום ו'", value: 4 },
  { date: "שבת", value: 5 },
  { date: "יום א'", value: 4 },
];

const moodDistribution = [
  { name: "שמח", value: 40, color: "#4CAF50" },
  { name: "ניטרלי", value: 30, color: "#FFC107" },
  { name: "עצוב", value: 20, color: "#2196F3" },
  { name: "כועס", value: 10, color: "#F44336" },
];

const factorsData = [
  {
    name: "בוקר",
    שמח: 4,
    עצוב: 3,
    כועס: 2,
    ניטרלי: 5,
  },
  {
    name: "צהריים",
    שמח: 6,
    עצוב: 2,
    כועס: 1,
    ניטרלי: 4,
  },
  {
    name: "ערב",
    שמח: 5,
    עצוב: 4,
    כועס: 2,
    ניטרלי: 3,
  },
];

const MoodStats = ({
  weeklyData = defaultWeeklyData,
  mostFrequentMood = "שמח",
  averageMood = 4.1,
}: MoodStatsProps) => {
  React.useEffect(() => {
    // Load data from localStorage
    const savedMoods = JSON.parse(localStorage.getItem("moods") || "[]");
    // Process data for charts here
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="grid gap-6">
      {/* Weekly Mood Trend */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>מגמת מצב רוח שבועית</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>סיכום מהיר</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">מצב רוח נפוץ</p>
              <p className="text-2xl font-semibold">{mostFrequentMood}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ממוצע</p>
              <p className="text-2xl font-semibold">
                {averageMood.toFixed(1)}/10
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ימים מתועדים</p>
              <p className="text-2xl font-semibold">14</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">שיפור משבוע שעבר</p>
              <p className="text-2xl font-semibold text-green-500">+12%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>התפלגות מצבי רוח</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {moodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Time of Day Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>ניתוח לפי שעות היום</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={factorsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="שמח" fill="#4CAF50" stackId="stack" />
                <Bar dataKey="ניטרלי" fill="#FFC107" stackId="stack" />
                <Bar dataKey="עצוב" fill="#2196F3" stackId="stack" />
                <Bar dataKey="כועס" fill="#F44336" stackId="stack" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodStats;
