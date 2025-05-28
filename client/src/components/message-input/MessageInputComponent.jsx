import { Form, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";

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
        <InputGroup className="p-3">
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" variant="primary">
            Send
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default MessageInputComponent;
