export const Notification = ({ message }) => {
  const boxStyle = {
    color: "green",
    fontSize: "20px",
    border: "3px solid green",
    borderRadius: "5px",
    backgroundColor: "#eee",
    padding: "10px",
    margin: "10px 0",
  };
  if (message === null) {
    return null;
  }

  return message !== "" ? (
    <div className="error" style={boxStyle}>
      {message}
    </div>
  ) : (
    <></>
  );
};
