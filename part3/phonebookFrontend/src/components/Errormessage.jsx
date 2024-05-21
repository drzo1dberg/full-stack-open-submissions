const Errormessage = ({ message }) => {
  const errorMsgStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message === null) return null;
  return <div style={errorMsgStyle}>{message}</div>;
};
export default Errormessage;
