import { useState } from "react";
import ChatPage from "./chat/ChatPage";

const ChatListPage = () => {
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);

  return (
    <>
      {show && (
        <ChatPage
          currentUser={localStorage.getItem("username")}
          otherUser={user}
        />
      )}
      <div>
        <input
          type="text"
          placeholder="To"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button onClick={() => setShow(true)}>Show</button>
      </div>
    </>
  );
};

export default ChatListPage;
