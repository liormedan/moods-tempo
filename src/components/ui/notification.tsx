import React from "react";
import { Bell, X } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

interface NotificationProps {
  title: string;
  message: string;
  onClose: () => void;
}

const Notification = ({ title, message, onClose }: NotificationProps) => {
  return (
    <Card className="fixed bottom-4 right-4 w-80 p-4 bg-background border shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Bell className="h-5 w-5" />
          <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default Notification;
