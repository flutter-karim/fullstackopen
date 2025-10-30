export const Notification = ({ message, type }) => {
  const doneBoxStyle = {
    color: "green",
    fontSize: "20px",
    border: "3px solid green",
    borderRadius: "5px",
    backgroundColor: "#eee",
    padding: "10px",
    margin: "10px 0",
  };

  const errorBoxStyle = {
    color: "red",
    fontSize: "20px",
    border: "3px solid red",
    borderRadius: "5px",
    backgroundColor: "#eee",
    padding: "10px",
    margin: "10px 0",
  };

  const boxStyle = type == "error" ? errorBoxStyle : doneBoxStyle;

  return message !== "" ? (
    <div className={type} style={boxStyle}>
      {message}
    </div>
  ) : (
    <></>
  );
};
