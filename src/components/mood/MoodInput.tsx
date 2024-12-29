import React from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";
import { createMoodEntry } from "@/lib/supabase";
import {
  AlertCircle,
  Brain,
  Heart,
  Moon,
  Users,
  Pill,
  MessageSquare,
  Clock,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MoodInputProps {
  onMoodSubmit?: (moodData: MoodData) => void;
  onNoteSubmit?: (note: string) => void;
  initialData?: MoodData;
  note?: string;
}

interface MoodData {
  generalFeeling: number;
  anxietyOptimism: number;
  activityLevel: number;
  sleepQuality: number;
  socialInteraction: number;
  tookMedication: boolean;
}

const defaultMoodData: MoodData = {
  generalFeeling: 5,
  anxietyOptimism: 5,
  activityLevel: 5,
  sleepQuality: 5,
  socialInteraction: 5,
  tookMedication: false,
};

const getSliderColor = (value: number) => {
  const percentage = (value - 1) / 9;
  if (percentage <= 0.25) return "bg-red-500";
  if (percentage <= 0.5) return "bg-yellow-500";
  if (percentage <= 0.75) return "bg-blue-500";
  return "bg-green-500";
};

const getMoodEmoji = (value: number) => {
  const percentage = (value - 1) / 9;
  if (percentage <= 0.25) return "😢";
  if (percentage <= 0.5) return "😐";
  if (percentage <= 0.75) return "🙂";
  return "😊";
};

const MoodInput = ({
  onMoodSubmit = () => {},
  onNoteSubmit = () => {},
  initialData = defaultMoodData,
  note = "",
}: MoodInputProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [moodData, setMoodData] = React.useState<MoodData>(initialData);
  const [moodNote, setMoodNote] = React.useState(note);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSliderChange = (value: number[], key: keyof MoodData) => {
    setMoodData((prev) => ({
      ...prev,
      [key]: value[0],
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "שגיאה",
        description: "יש להתחבר כדי לשמור מצב רוח",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const entry = {
        user_id: user.id,
        ...moodData,
        note: moodNote,
      };

      const { error } = await createMoodEntry(entry);
      if (error) throw error;

      toast({
        title: "נשמר בהצלחה",
        description: "מצב הרוח שלך נשמר במערכת",
      });

      setShowSuccess(true);
      onMoodSubmit(moodData);
      if (moodNote) {
        onNoteSubmit(moodNote);
      }

      setMoodData(defaultMoodData);
      setMoodNote("");

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error: any) {
      toast({
        title: "שגיאה",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const CustomSlider = ({
    value,
    onChange,
    label,
    leftLabel,
    rightLabel,
  }: any) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-xl text-white">{label}</Label>
        <span
          className={cn(
            "px-4 py-2 rounded-full text-white text-2xl font-medium",
            getSliderColor(value),
          )}
        >
          {getMoodEmoji(value)} {value}/10
        </span>
      </div>
      <div className="relative flex items-center gap-4">
        <span className="text-sm text-gray-400 min-w-[80px] text-center font-medium">
          {leftLabel}
        </span>
        <div className="relative flex-1">
          <Slider
            value={[value]}
            onValueChange={onChange}
            max={10}
            min={1}
            step={1}
            className="cursor-pointer"
          />
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
        <span className="text-sm text-gray-400 min-w-[80px] text-center font-medium">
          {rightLabel}
        </span>
      </div>
    </div>
  );

  const isLowMood = moodData.generalFeeling <= 3;

  return (
    <Card className="w-full max-w-[600px] p-8 bg-[#0A0A0A] text-white border-none">
      <div className="space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
            <Clock className="h-5 w-5" />
            <span className="text-xl">
              {currentTime.toLocaleTimeString("he-IL")}{" "}
              {currentTime.toLocaleDateString("he-IL")}
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">איך אתה מרגיש היום?</h2>
          <p className="text-xl text-gray-400">דרג את תחושותיך בסולם של 1-10</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="mood" className="border-gray-800">
            <AccordionTrigger className="text-xl hover:text-white hover:no-underline">
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6" />
                מצב רוח כללי
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <CustomSlider
                value={moodData.generalFeeling}
                onChange={(value: number[]) =>
                  handleSliderChange(value, "generalFeeling")
                }
                label="הרגשה כללית"
                leftLabel="מצוין"
                rightLabel="רע"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="anxiety" className="border-gray-800">
            <AccordionTrigger className="text-xl hover:text-white hover:no-underline">
              <div className="flex items-center gap-3">
                <Brain className="h-6 w-6" />
                חרדה ואופטימיות
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <CustomSlider
                value={moodData.anxietyOptimism}
                onChange={(value: number[]) =>
                  handleSliderChange(value, "anxietyOptimism")
                }
                label="חרדה - אופטימיות"
                leftLabel="אופטימיות"
                rightLabel="חרדה"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="activity" className="border-gray-800">
            <AccordionTrigger className="text-xl hover:text-white hover:no-underline">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6" />
                רמת פעילות
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <CustomSlider
                value={moodData.activityLevel}
                onChange={(value: number[]) =>
                  handleSliderChange(value, "activityLevel")
                }
                label="רמת פעילות"
                leftLabel="גבוהה"
                rightLabel="נמוכה"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sleep" className="border-gray-800">
            <AccordionTrigger className="text-xl hover:text-white hover:no-underline">
              <div className="flex items-center gap-3">
                <Moon className="h-6 w-6" />
                איכות שינה
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <CustomSlider
                value={moodData.sleepQuality}
                onChange={(value: number[]) =>
                  handleSliderChange(value, "sleepQuality")
                }
                label="איכות השינה"
                leftLabel="מצוינת"
                rightLabel="גרועה"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="social" className="border-gray-800">
            <AccordionTrigger className="text-xl hover:text-white hover:no-underline">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6" />
                אינטראקציה חברתית
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <CustomSlider
                value={moodData.socialInteraction}
                onChange={(value: number[]) =>
                  handleSliderChange(value, "socialInteraction")
                }
                label="אינטראקציה חברתית"
                leftLabel="רבה"
                rightLabel="מועטה"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="medication" className="border-gray-800">
            <AccordionTrigger className="text-xl hover:text-white hover:no-underline">
              <div className="flex items-center gap-3">
                <Pill className="h-6 w-6" />
                תרופות
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-4">
                <Label className="text-xl text-white block mb-4">
                  האם לקחת תרופות היום?
                </Label>
                <RadioGroup
                  value={moodData.tookMedication ? "yes" : "no"}
                  onValueChange={(value) =>
                    setMoodData((prev) => ({
                      ...prev,
                      tookMedication: value === "yes",
                    }))
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem
                      value="yes"
                      id="yes"
                      className="border-white"
                    />
                    <Label htmlFor="yes" className="text-lg text-white">
                      כן
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem
                      value="no"
                      id="no"
                      className="border-white"
                    />
                    <Label htmlFor="no" className="text-lg text-white">
                      לא
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="notes" className="border-gray-800">
            <AccordionTrigger className="text-xl hover:text-white hover:no-underline">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6" />
                הערות נוספות
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-4">
                <Input
                  placeholder="הוסף הערות או תובנות נוספות..."
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  className="flex-1 bg-gray-900 border-gray-800 text-white"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {showSuccess && (
          <div className="flex items-center gap-2 p-4 bg-green-900/20 text-green-400 rounded-lg border border-green-900/50">
            <p className="text-center w-full text-lg">הדיווח נשמר בהצלחה! 🎉</p>
          </div>
        )}

        {isLowMood && (
          <div className="flex items-center gap-2 p-4 bg-red-900/20 text-red-400 rounded-lg border border-red-900/50">
            <AlertCircle className="h-5 w-5" />
            <p>
              שים לב שדיווחת על מצב רוח נמוך. האם תרצה לשתף מישהו או לבקש עזרה?
            </p>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full mt-8 text-xl py-6 bg-white text-black hover:bg-gray-200"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "שומר..." : "שמור מצב רוח"}
        </Button>
      </div>
    </Card>
  );
};

export default MoodInput;
