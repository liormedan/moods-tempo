import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { signIn, signUp } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = isSignUp
        ? await signUp(formData.email, formData.password)
        : await signIn(formData.email, formData.password);

      if (error) throw error;

      if (isSignUp) {
        toast({
          title: "הרשמה בוצעה בהצלחה",
          description: "נשלח אליך מייל אימות. אנא אשר אותו כדי להתחבר.",
        });
      } else {
        toast({
          title: "התחברת בהצלחה",
          description: "ברוך הבא!",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "שגיאה",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0A0A]">
      <Card className="w-full max-w-md p-6 bg-[#1A1A1A] text-white border-gray-800">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              {isSignUp ? "הרשמה" : "התחברות"}
            </h1>
            <p className="mt-2 text-gray-400">
              {isSignUp
                ? "צור חשבון חדש כדי להתחיל"
                : "התחבר כדי לעקוב אחר מצב הרוח שלך"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>דואר אלקטרוני</Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                className="bg-[#2A2A2A] border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label>סיסמה</Label>
              <Input
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
                className="bg-[#2A2A2A] border-gray-700"
              />
            </div>

            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isSignUp ? (
                <>
                  <UserPlus className="h-4 w-4" />
                  הרשם
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  התחבר
                </>
              )}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              className="text-gray-400 hover:text-white"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "כבר יש לך חשבון? התחבר" : "אין לך חשבון? הרשם"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
