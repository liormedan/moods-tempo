import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { BookOpen, Save } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: number;
}

const Journal = () => {
  const { toast } = useToast();
  const [entries, setEntries] = React.useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = React.useState({
    title: "",
    content: "",
  });

  React.useEffect(() => {
    const savedEntries = JSON.parse(
      localStorage.getItem("journalEntries") || "[]",
    );
    setEntries(savedEntries);
  }, []);

  const handleSave = () => {
    if (!newEntry.title || !newEntry.content) {
      toast({
        title: "שגיאה",
        description: "נא למלא כותרת ותוכן",
        variant: "destructive",
      });
      return;
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date().toISOString(),
      mood: 5, // Default mood
    };

    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));

    setNewEntry({ title: "", content: "" });
    toast({
      description: "הרשומה נשמרה בהצלחה",
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">יומן אישי</h1>
            <p className="mt-2 text-muted-foreground">
              תעד את המחשבות והתחושות שלך
            </p>
          </div>
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <Input
              placeholder="כותרת"
              value={newEntry.title}
              onChange={(e) =>
                setNewEntry((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <Textarea
              placeholder="מה עובר עליך היום?"
              className="min-h-[200px]"
              value={newEntry.content}
              onChange={(e) =>
                setNewEntry((prev) => ({ ...prev, content: e.target.value }))
              }
            />
            <Button onClick={handleSave} className="w-full gap-2">
              <Save className="h-4 w-4" />
              שמור רשומה
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{entry.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(entry.date), "dd/MM/yyyy HH:mm")}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{entry.content}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journal;
