const Notification = ({ notification }) => {
  if (!notification) return;

  const error = {
    color: "red",
  };

  const success = {
    color: "green",
  };

  return (
    <div style={notification.style === "error" ? error : success}>
      {notification.text}
    </div>
  );
};

export default Notification;
