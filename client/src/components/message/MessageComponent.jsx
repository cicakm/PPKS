import { ListGroup } from "react-bootstrap";

const MessageComponent = ({ idx, msg, currentUser }) => {
  return (
    <>
      <ListGroup.Item
        key={idx}
        className="border-0 bg-transparent px-2 py-1"
        style={{
          display: "flex",
          justifyContent: msg.from === currentUser ? "flex-end" : "flex-start",
        }}
      >
        <div
          className={
            "d-inline-block p-2 px-3 mb-1 rounded-4 shadow-sm " +
            (msg.from === currentUser
              ? "bg-primary text-white align-self-end"
              : "bg-light text-dark align-self-start")
          }
          style={{
            maxWidth: "80vw",
            wordBreak: "break-word",
            fontSize: "1rem",
          }}
        >
          {msg.msg}
        </div>
      </ListGroup.Item>
    </>
  );
};

export default MessageComponent;
