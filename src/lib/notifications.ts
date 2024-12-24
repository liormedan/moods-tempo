export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const scheduleNotification = (
  title: string,
  message: string,
  time: Date,
) => {
  const now = new Date().getTime();
  const scheduledTime = time.getTime();
  const delay = scheduledTime - now;

  if (delay > 0) {
    setTimeout(() => {
      new Notification(title, {
        body: message,
        icon: "/notification-icon.png",
      });
    }, delay);
  }
};
