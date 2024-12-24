import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  Settings,
  Clock,
  BarChart2,
  PlusCircle,
  Moon,
  Sun,
  BookOpen,
  MessageCircle,
  Users,
  Goal,
  Activity,
} from "lucide-react";

interface SidebarProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const Sidebar = ({ onThemeToggle, isDarkMode }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-screen w-[240px] border-l bg-[#0A0A0A] p-4 flex flex-col sticky top-0">
      <div className="space-y-4 flex-1">
        <div className="flex justify-center items-center">
          <h2 className="text-xl font-semibold text-white">מעקב מצב רוח</h2>
        </div>
        <Separator className="bg-gray-800" />

        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {/* Navigation Buttons */}
            <Button
              variant={isActive("/") ? "secondary" : "ghost"}
              className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
              onClick={() => navigate("/")}
            >
              <Home className="h-5 w-5" />
              דף הבית
            </Button>

            <Button
              variant={isActive("/mood-entry") ? "secondary" : "ghost"}
              className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
              onClick={() => navigate("/mood-entry")}
            >
              <PlusCircle className="h-5 w-5" />
              דיווח חדש
            </Button>

            <Button
              variant={isActive("/calendar") ? "secondary" : "ghost"}
              className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
              onClick={() => navigate("/calendar")}
            >
              <Calendar className="h-5 w-5" />
              לוח שנה
            </Button>

            <Button
              variant={isActive("/statistics") ? "secondary" : "ghost"}
              className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
              onClick={() => navigate("/statistics")}
            >
              <BarChart2 className="h-5 w-5" />
              סטטיסטיקות
            </Button>

            <Button
              variant={isActive("/reports") ? "secondary" : "ghost"}
              className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
              onClick={() => navigate("/reports")}
            >
              <Clock className="h-5 w-5" />
              דוחות
            </Button>

            <Separator className="my-2 bg-gray-800" />

            <Button
              variant={isActive("/journal") ? "secondary" : "ghost"}
              className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
              onClick={() => navigate("/journal")}
            >
              <BookOpen className="h-5 w-5" />
              יומן אישי
            </Button>

            <Button
              variant={isActive("/goals") ? "secondary" : "ghost"}
              className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
              onClick={() => navigate("/goals")}
            >
              <Goal className="h-5 w-5" />
              יעדים ומעקב
            </Button>

            <Button
              variant={isActive("/activities") ? "secondary" : "ghost"}
              className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
              onClick={() => navigate("/activities")}
            >
              <Activity className="h-5 w-5" />
              פעילויות מומלצות
            </Button>

            <Button
              variant={isActive("/support") ? "secondary" : "ghost"}
              className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
              onClick={() => navigate("/support")}
            >
              <Users className="h-5 w-5" />
              קבוצות תמיכה
            </Button>

            <Button
              variant={isActive("/chat") ? "secondary" : "ghost"}
              className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
              onClick={() => navigate("/chat")}
            >
              <MessageCircle className="h-5 w-5" />
              צ'אט תמיכה
            </Button>
          </div>
        </ScrollArea>

        <Separator className="bg-gray-800" />

        <div className="space-y-2">
          <Button
            variant={isActive("/settings") ? "secondary" : "ghost"}
            className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
            onClick={() => navigate("/settings")}
          >
            <Settings className="h-5 w-5" />
            הגדרות
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-center gap-2 h-12 text-lg text-white hover:text-white hover:bg-gray-800"
            onClick={onThemeToggle}
          >
            {isDarkMode ? (
              <>
                <Sun className="h-5 w-5" />
                מצב בהיר
              </>
            ) : (
              <>
                <Moon className="h-5 w-5" />
                מצב כהה
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
