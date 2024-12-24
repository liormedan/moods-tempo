import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyData = [
  { date: "יום ב'", value: 4 },
  { date: "יום ג'", value: 3 },
  { date: "יום ד'", value: 5 },
  { date: "יום ה'", value: 4 },
  { date: "יום ו'", value: 4 },
  { date: "שבת", value: 5 },
  { date: "יום א'", value: 4 },
];

const monthlyData = [
  { date: "שבוע 1", value: 4.2 },
  { date: "שבוע 2", value: 3.8 },
  { date: "שבוע 3", value: 4.5 },
  { date: "שבוע 4", value: 4.0 },
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

const moodDistribution = [
  { name: "שמח", value: 40, color: "#4CAF50" },
  { name: "ניטרלי", value: 30, color: "#FFC107" },
  { name: "עצוב", value: 20, color: "#2196F3" },
  { name: "כועס", value: 10, color: "#F44336" },
];

const Home = () => {
  const navigate = useNavigate();

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
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-card p-6 rounded-lg border shadow-sm">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              ברוך הבא
            </h1>
            <p className="mt-2 text-gray-600">
              עקוב אחר מצב הרוח והתחושות היומיות שלך
            </p>
          </div>
          <div>
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => navigate("/calendar")}
            >
              <Calendar className="h-5 w-5" />
              היסטוריה
            </Button>
          </div>
        </div>

        {/* Trend Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>מגמת מצב רוח שבועית</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
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

          <Card>
            <CardHeader>
              <CardTitle>סקירה חודשית</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white">
            <h3 className="text-2xl font-bold text-purple-600">7.5</h3>
            <p className="text-gray-600">מצב רוח ממוצע היום</p>
          </Card>
          <Card className="p-6 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
            <h3 className="text-2xl font-bold text-blue-600">85%</h3>
            <p className="text-gray-600">דיוק בתחזית</p>
          </Card>
          <Card className="p-6 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
            <h3 className="text-2xl font-bold text-indigo-600">14</h3>
            <p className="text-gray-600">ימים רצופים של מעקב</p>
          </Card>
          <Card className="p-6 flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 to-white">
            <h3 className="text-2xl font-bold text-violet-600">+12%</h3>
            <p className="text-gray-600">שיפור משבוע שעבר</p>
          </Card>
        </div>

        {/* Additional Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>התפלגות מצבי רוח</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moodDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {moodDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

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
      </div>
    </div>
  );
};

export default Home;
