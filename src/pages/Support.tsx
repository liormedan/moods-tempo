import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, MessageCircle } from "lucide-react";

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  image?: string;
}

const defaultGroups: Group[] = [
  {
    id: "1",
    name: "קבוצת תמיכה כללית",
    description: "קבוצה לשיתוף ותמיכה הדדית במגוון נושאים",
    members: 128,
    category: "כללי",
  },
  {
    id: "2",
    name: "התמודדות עם חרדה",
    description: "קבוצה לשיתוף טיפים והתמודדות עם חרדה",
    members: 85,
    category: "חרדה",
  },
  {
    id: "3",
    name: "שיפור מצב רוח",
    description: "טיפים ותמיכה לשיפור מצב הרוח היומיומי",
    members: 156,
    category: "מצב רוח",
  },
];

const Support = () => {
  const [groups] = React.useState<Group[]>(defaultGroups);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredGroups = groups.filter(
    (group) =>
      group.name.includes(searchQuery) ||
      group.description.includes(searchQuery) ||
      group.category.includes(searchQuery),
  );

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">קבוצות תמיכה</h1>
            <p className="mt-2 text-muted-foreground">
              הצטרף לקבוצות תמיכה ושתף את החוויות שלך
            </p>
          </div>
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>

        <div className="relative">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חפש קבוצות..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      {group.image ? (
                        <AvatarImage src={group.image} />
                      ) : (
                        <AvatarFallback>
                          {group.name.slice(0, 2)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {group.members} חברים
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    הצטרף
                  </Button>
                </div>

                <p className="text-muted-foreground">{group.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm bg-muted text-muted-foreground px-2 py-1 rounded">
                    {group.category}
                  </span>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    צ'אט קבוצתי
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

export default Support;
