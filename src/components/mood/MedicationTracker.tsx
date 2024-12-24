import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Bell, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  taken: boolean;
  time?: string;
  reminder?: boolean;
  taken_at: string | null;
}

interface MedicationTrackerProps {
  onMedicationUpdate?: (medications: Medication[]) => void;
}

const MedicationTracker = ({
  onMedicationUpdate = () => {},
}: MedicationTrackerProps) => {
  const { toast } = useToast();
  const [medications, setMedications] = React.useState<Medication[]>([]);
  const [newMed, setNewMed] = React.useState({
    name: "",
    dosage: "",
    time: "09:00",
    reminder: true,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // Load medications from localStorage
    const savedMeds = JSON.parse(localStorage.getItem("medications") || "[]");
    setMedications(savedMeds);
  }, []);

  const handleMedicationToggle = async (id: string, currentTaken: boolean) => {
    const updatedMeds = medications.map((med) => {
      if (med.id === id) {
        return {
          ...med,
          taken: !currentTaken,
          taken_at: !currentTaken ? new Date().toISOString() : null,
        };
      }
      return med;
    });

    setMedications(updatedMeds);
    localStorage.setItem("medications", JSON.stringify(updatedMeds));
    onMedicationUpdate(updatedMeds);
  };

  const addMedication = async () => {
    if (newMed.name && newMed.dosage) {
      const newMedication: Medication = {
        id: Math.random().toString(),
        name: newMed.name,
        dosage: newMed.dosage,
        time: newMed.time,
        reminder: newMed.reminder,
        taken: false,
        taken_at: null,
      };

      const updatedMeds = [...medications, newMedication];
      setMedications(updatedMeds);
      localStorage.setItem("medications", JSON.stringify(updatedMeds));
      setNewMed({ name: "", dosage: "", time: "09:00", reminder: true });
      toast({
        description: "התרופה נוספה בהצלחה",
      });
    }
  };

  const removeMedication = async (id: string) => {
    const updatedMeds = medications.filter((med) => med.id !== id);
    setMedications(updatedMeds);
    localStorage.setItem("medications", JSON.stringify(updatedMeds));
    toast({
      description: "התרופה הוסרה בהצלחה",
    });
  };

  return (
    <Card className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6">מעקב תרופות</h2>

      <div className="space-y-6">
        {isLoading ? (
          <div>טוען...</div>
        ) : (
          <div className="grid gap-4">
            {medications.map((med) => (
              <div
                key={med.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Switch
                    checked={med.taken}
                    onCheckedChange={() =>
                      handleMedicationToggle(med.id, med.taken)
                    }
                  />
                  <div className="flex items-center gap-2">
                    {med.time && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {med.time}
                      </div>
                    )}
                    {med.reminder && (
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {med.dosage}
                    </p>
                    {med.taken_at && (
                      <p className="text-xs text-muted-foreground">
                        נלקח ב:{" "}
                        {new Date(med.taken_at).toLocaleTimeString("he-IL")}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMedication(med.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <div className="grid gap-2">
            <Label>שם התרופה</Label>
            <Input
              value={newMed.name}
              onChange={(e) =>
                setNewMed((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="הכנס שם תרופה"
            />
          </div>
          <div className="grid gap-2">
            <Label>מינון</Label>
            <Input
              value={newMed.dosage}
              onChange={(e) =>
                setNewMed((prev) => ({ ...prev, dosage: e.target.value }))
              }
              placeholder="הכנס מינון"
            />
          </div>
          <div className="grid gap-2">
            <Label>שעה</Label>
            <Input
              type="time"
              value={newMed.time}
              onChange={(e) =>
                setNewMed((prev) => ({ ...prev, time: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-2 items-end">
            <Label className="flex items-center gap-2">
              <Switch
                checked={newMed.reminder}
                onCheckedChange={(checked) =>
                  setNewMed((prev) => ({ ...prev, reminder: checked }))
                }
              />
              תזכורת
            </Label>
          </div>
          <Button className="self-end" onClick={addMedication}>
            <Plus className="h-4 w-4 ml-2" />
            הוסף תרופה
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MedicationTracker;
