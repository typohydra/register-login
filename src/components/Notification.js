const Notification = ({ notification }) => {
  if (!notification) return <div className="notification"></div>;

  const error = {
    color: "red",
  };

  const success = {
    color: "green",
  };

  return (
    <div
      className="notification"
      style={notification.style === "error" ? error : success}
    >
      {notification.text}
    </div>
  );
};

export default Notification;
