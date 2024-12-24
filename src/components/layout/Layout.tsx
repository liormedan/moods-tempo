import React from "react";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", String(newValue));
      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newValue;
    });
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]" dir="rtl">
      {/* Sidebar Container */}
      <div className="fixed top-0 right-0 h-full flex z-50">
        {/* Menu Button */}
        <div className="h-16 flex items-center px-4 bg-[#0A0A0A] border-b border-gray-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="h-12 w-12 text-white"
            title={isSidebarOpen ? "סגור תפריט" : "פתח תפריט"}
          >
            <Menu className="h-7 w-7" />
          </Button>
        </div>

        {/* Sidebar */}
        <div
          className={`h-full transition-all duration-300 ${isSidebarOpen ? "w-[240px]" : "w-0"} overflow-hidden bg-[#0A0A0A] border-l border-gray-800`}
        >
          <Sidebar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "mr-[304px]" : "mr-[64px]"}`}
      >
        {/* Top App Bar */}
        <div className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-gray-800 h-16 flex items-center px-4 justify-end">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <UserProfile />
          </div>
        </div>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
