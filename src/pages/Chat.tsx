import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
}

const defaultMessages: Message[] = [
  {
    id: "1",
    content: "שלום! איך אני יכול לעזור לך היום?",
    sender: {
      id: "support",
      name: "צוות תמיכה",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=support",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

const Chat = () => {
  const [messages, setMessages] = React.useState<Message[]>(defaultMessages);
  const [newMessage, setNewMessage] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: "user",
        name: "אני",
      },
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate support response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "תודה על הפנייה. אחד מנציגי התמיכה יחזור אליך בהקדם.",
        sender: {
          id: "support",
          name: "צוות תמיכה",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=support",
        },
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">צ'אט תמיכה</h1>
            <p className="mt-2 text-muted-foreground">
              שוחח עם צוות התמיכה שלנו
            </p>
          </div>
          <MessageCircle className="h-8 w-8 text-muted-foreground" />
        </div>

        <Card className="p-4">
          <ScrollArea ref={scrollRef} className="h-[500px] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender.id === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-8 w-8">
                    {message.sender.avatar ? (
                      <AvatarImage src={message.sender.avatar} />
                    ) : (
                      <AvatarFallback>
                        {message.sender.name.slice(0, 2)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={`space-y-1 ${message.sender.id === "user" ? "items-end" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {message.sender.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div
                      className={`rounded-lg p-3 ${message.sender.id === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex gap-2 mt-4">
            <Input
              placeholder="הקלד הודעה..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <Button
              className="gap-2"
              onClick={handleSend}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
              שלח
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
