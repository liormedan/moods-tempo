import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Heart, ThumbsUp, Timer } from "lucide-react";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  benefits: string[];
  icon: React.ReactNode;
}

const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    title: "הליכה בחוץ",
    description: "צא להליכה קצרה באוויר הפתוח",
    duration: "20 דקות",
    benefits: ["שיפור מצב הרוח", "פעילות גופנית", "חשיפה לשמש"],
    icon: <Activity className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "מדיטציה",
    description: "תרגילי נשימה ומדיטציה להרגעה",
    duration: "10 דקות",
    benefits: ["הפחתת מתח", "שיפור ריכוז", "רגיעה נפשית"],
    icon: <Heart className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "שיחה עם חבר",
    description: "התקשר לחבר או בן משפחה לשיחה",
    duration: "15 דקות",
    benefits: ["תמיכה חברתית", "שיתוף רגשות", "הקלה נפשית"],
    icon: <ThumbsUp className="h-5 w-5" />,
  },
];

const Activities = () => {
  const [activities] = React.useState<ActivityItem[]>(defaultActivities);
  const [completedActivities, setCompletedActivities] = React.useState<
    string[]
  >([]);

  const toggleActivity = (id: string) => {
    setCompletedActivities((prev) =>
      prev.includes(id)
        ? prev.filter((activityId) => activityId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">פעילויות מומלצות</h1>
            <p className="mt-2 text-muted-foreground">
              פעילויות שיכולות לעזור לשפר את מצב הרוח שלך
            </p>
          </div>
          <Activity className="h-8 w-8 text-muted-foreground" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className={`p-6 transition-all ${completedActivities.includes(activity.id) ? "bg-muted" : ""}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      {activity.icon}
                      {activity.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Timer className="h-4 w-4" />
                      {activity.duration}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground">{activity.description}</p>

                <div className="space-y-2">
                  <p className="text-sm font-medium">יתרונות:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {activity.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={
                    completedActivities.includes(activity.id)
                      ? "outline"
                      : "default"
                  }
                  className="w-full"
                  onClick={() => toggleActivity(activity.id)}
                >
                  {completedActivities.includes(activity.id)
                    ? "בטל סימון כהושלם"
                    : "סמן כהושלם"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
