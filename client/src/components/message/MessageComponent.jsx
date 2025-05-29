import { ListGroup } from "react-bootstrap";

const MessageComponent = ({ idx, msg, currentUser }) => {
  return (
    <>
      <ListGroup.Item
        key={idx}
        className="border-0"
        style={{
          display: "flex",
          justifyContent: msg.from === currentUser ? "flex-end" : "flex-start",
          background: "transparent",
        }}
      >
        <div
          style={{
            maxWidth: "70%",
            background: msg.from === currentUser ? "#0d6efd" : "#e9ecef",
            color: msg.from === currentUser ? "white" : "black",
            borderRadius: 16,
            padding: "8px 16px",
            marginBottom: 4,
          }}
        >
          <div>{msg.msg}</div>
        </div>
      </ListGroup.Item>
    </>
  );
};

export default MessageComponent;
