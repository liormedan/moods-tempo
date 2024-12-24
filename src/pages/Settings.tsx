import React from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Bell, Moon, Sun, Trash2, User } from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = React.useState({
    name: "משתמש אנונימי",
    email: "guest@example.com",
    avatarUrl: "",
    dailyReminder: true,
    medicationReminders: true,
    reminderTime: "20:00",
    darkMode: false,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">הגדרות</h1>
          <p className="mt-2 text-muted-foreground">
            נהל את חשבונך והעדפות המערכת
          </p>
        </div>

        {/* User Profile Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            פרטי משתמש
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={settings.avatarUrl} />
              <AvatarFallback className="text-2xl">
                {settings.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline">שנה תמונה</Button>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>שם מלא</Label>
              <Input
                value={settings.name}
                onChange={(e) => handleSettingChange("name", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>דואר אלקטרוני</Label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange("email", e.target.value)}
              />
            </div>
            <Button className="w-full">שמור שינויים</Button>
          </div>
        </Card>

        {/* System Settings Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            הגדרות מערכת
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">התראות יומיות</Label>
                <p className="text-sm text-muted-foreground">
                  קבל תזכורת יומית למילוי מצב הרוח
                </p>
              </div>
              <Switch
                checked={settings.dailyReminder}
                onCheckedChange={(checked) =>
                  handleSettingChange("dailyReminder", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">תזכורות תרופות</Label>
                <p className="text-sm text-muted-foreground">
                  קבל תזכורות לנטילת תרופות
                </p>
              </div>
              <Switch
                checked={settings.medicationReminders}
                onCheckedChange={(checked) =>
                  handleSettingChange("medicationReminders", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">מצב כהה</Label>
                <p className="text-sm text-muted-foreground">
                  החלף בין מצב בהיר לכהה
                </p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) =>
                  handleSettingChange("darkMode", checked)
                }
                icon={
                  settings.darkMode ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )
                }
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>שעת תזכורת יומית</Label>
              <Input
                type="time"
                value={settings.reminderTime}
                onChange={(e) =>
                  handleSettingChange("reminderTime", e.target.value)
                }
              />
            </div>
          </div>
        </Card>

        {/* Danger Zone Card */}
        <Card className="p-6 border-red-200">
          <h2 className="text-xl font-semibold mb-4 text-red-600 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            אזור מסוכן
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              פעולות אלו הן בלתי הפיכות. אנא היה בטוח לפני ביצוע פעולות אלו.
            </p>
            <div className="space-y-2">
              <Button variant="destructive" className="w-full">
                מחק את כל הנתונים
              </Button>
              <Button variant="destructive" className="w-full">
                מחק חשבון
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
