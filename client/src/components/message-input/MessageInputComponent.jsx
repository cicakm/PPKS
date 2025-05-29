import { Form, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";
import { ChatDots } from "react-bootstrap-icons";

const MessageInputComponent = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onSend(input);
    setInput("");
  };

  return (
    <>
      <Form onSubmit={handleSend}>
        <InputGroup size="sm">
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="primary"
            type="submit"
            size="sm"
            className="rounded-end-pill px-3"
          >
            <ChatDots size={20} className="mb-1" />
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default MessageInputComponent;
