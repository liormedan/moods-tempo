import React from "react";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, RefreshCw } from "lucide-react";

interface MoodHistoryFiltersProps {
  onDateRangeChange?: (range: { from: Date; to: Date }) => void;
  onMoodFilterChange?: (mood: string) => void;
  onRefresh?: () => void;
  dateRange?: { from: Date; to: Date };
  selectedMood?: string;
}

const MoodHistoryFilters = ({
  onDateRangeChange = () => {},
  onMoodFilterChange = () => {},
  onRefresh = () => {},
  dateRange = { from: new Date(), to: new Date() },
  selectedMood = "all",
}: MoodHistoryFiltersProps) => {
  return (
    <div className="w-full bg-background p-4 border rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <h2 className="text-lg font-semibold">היסטוריית מצב רוח</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
            className="ml-auto md:ml-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Select value={selectedMood} onValueChange={onMoodFilterChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="סנן לפי מצב רוח" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל מצבי הרוח</SelectItem>
              <SelectItem value="happy">שמח</SelectItem>
              <SelectItem value="sad">עצוב</SelectItem>
              <SelectItem value="angry">כועס</SelectItem>
              <SelectItem value="neutral">ניטרלי</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerWithRange
            date={dateRange}
            onDateChange={onDateRangeChange}
          />

          <Button
            variant="secondary"
            className="flex items-center gap-2 w-full md:w-auto"
          >
            <Filter className="h-4 w-4" />
            סינונים נוספים
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodHistoryFilters;
