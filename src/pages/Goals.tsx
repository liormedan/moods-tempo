import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Goal, Plus, Target, Trophy } from "lucide-react";

interface GoalItem {
  id: string;
  title: string;
  description: string;
  progress: number;
  tasks: { id: string; title: string; completed: boolean }[];
  deadline?: string;
}

const Goals = () => {
  const { toast } = useToast();
  const [goals, setGoals] = React.useState<GoalItem[]>([]);
  const [newGoal, setNewGoal] = React.useState({
    title: "",
    description: "",
  });

  React.useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    setGoals(savedGoals);
  }, []);

  const handleAddGoal = () => {
    if (!newGoal.title) {
      toast({
        title: "שגיאה",
        description: "נא להזין כותרת ליעד",
        variant: "destructive",
      });
      return;
    }

    const goal: GoalItem = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      progress: 0,
      tasks: [],
    };

    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setNewGoal({ title: "", description: "" });

    toast({
      description: "היעד נוסף בהצלחה",
    });
  };

  const toggleTask = (goalId: string, taskId: string) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const updatedTasks = goal.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });

        const progress =
          (updatedTasks.filter((t) => t.completed).length /
            updatedTasks.length) *
          100;

        return { ...goal, tasks: updatedTasks, progress };
      }
      return goal;
    });

    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const addTask = (goalId: string, taskTitle: string) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const newTask = {
          id: Date.now().toString(),
          title: taskTitle,
          completed: false,
        };
        return { ...goal, tasks: [...goal.tasks, newTask] };
      }
      return goal;
    });

    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">יעדים ומעקב</h1>
            <p className="mt-2 text-muted-foreground">
              הגדר יעדים אישיים ועקוב אחר ההתקדמות שלך
            </p>
          </div>
          <Target className="h-8 w-8 text-muted-foreground" />
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <Input
              placeholder="כותרת היעד"
              value={newGoal.title}
              onChange={(e) =>
                setNewGoal((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <Input
              placeholder="תיאור היעד"
              value={newGoal.description}
              onChange={(e) =>
                setNewGoal((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            <Button onClick={handleAddGoal} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              הוסף יעד חדש
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Goal className="h-5 w-5" />
                      {goal.title}
                    </h3>
                    <p className="text-muted-foreground">{goal.description}</p>
                  </div>
                  {goal.progress === 100 && (
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  )}
                </div>

                <Progress value={goal.progress} className="h-2" />

                <div className="space-y-2">
                  {goal.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(goal.id, task.id)}
                      />
                      <span
                        className={`${task.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="משימה חדשה"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const input = e.target as HTMLInputElement;
                        if (input.value.trim()) {
                          addTask(goal.id, input.value.trim());
                          input.value = "";
                        }
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      const input = e.currentTarget
                        .previousSibling as HTMLInputElement;
                      if (input.value.trim()) {
                        addTask(goal.id, input.value.trim());
                        input.value = "";
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;
