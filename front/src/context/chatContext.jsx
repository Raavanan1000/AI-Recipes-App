import PropTypes from "prop-types";
import { createContext } from "react";
import useMessageCollection from "../hooks/useMessageCollection";

const ChatContext = createContext({});

const ChatContextProvider = (props) => {
  const { messages, addMessage, clearChat } = useMessageCollection();

  return (
    <ChatContext.Provider value={[messages, addMessage, clearChat]}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
