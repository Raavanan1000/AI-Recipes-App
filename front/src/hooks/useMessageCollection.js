import { useState, useEffect } from "react";

const useMessageCollection = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages"));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    if (messages.length) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearChat = () => {
    localStorage.setItem("messages", JSON.stringify([]));
    setMessages([]);
  };

  return { messages, addMessage, clearChat };
};

export default useMessageCollection;
