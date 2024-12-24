import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Layout from "./components/layout/Layout";
import Calendar from "./pages/Calendar";
import Statistics from "./pages/Statistics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import MoodEntry from "./pages/MoodEntry";
import Journal from "./pages/Journal";
import Goals from "./pages/Goals";
import Activities from "./pages/Activities";
import Support from "./pages/Support";
import Chat from "./pages/Chat";

function App() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mood-entry" element={<MoodEntry />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/support" element={<Support />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
