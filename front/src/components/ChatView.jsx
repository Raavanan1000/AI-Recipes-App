import { useState, useRef, useEffect, useContext } from "react";
import Message from "./Message";
import { ChatContext } from "../context/chatContext";
import Thinking from "./Thinking";
import { MdSend } from "react-icons/md";
import { replaceProfanities } from "no-profanity";
import { davinci } from "../utils/davinci";
import { dalle } from "../utils/dalle";
import Modal from "./Modal";
import Setting from "./Setting";

const options = ["ChatGPT", "DALL·E"];
const gptModel = ["gpt-3.5-turbo", "gpt-4"];

const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const [gpt, setGpt] = useState(gptModel[0]);
  const [messages, addMessage] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateMessage = (newValue, ai = false, selected) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
      selected: `${selected}`,
    };

    addMessage(newMsg);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const key = import.meta.env.VITE_OPENAI_KEY;

    console.log(key);

    const cleanPrompt = replaceProfanities(formValue);

    const newMsg = cleanPrompt;
    const aiModel = selected;
    const gptVersion = gpt;

    setThinking(true);
    setFormValue("");
    updateMessage(newMsg, false, aiModel);
    console.log(gptVersion);

    console.log(selected);
    try {
      if (aiModel === options[0]) {
        const LLMresponse = await davinci(cleanPrompt, key, gptVersion);
        LLMresponse && updateMessage(LLMresponse, true, aiModel);
      } else {
        const response = await dalle(cleanPrompt, key);
        const data = response.data.data[0].url;
        data && updateMessage(data, true, aiModel);
      }
    } catch (err) {
      window.alert(`Error: ${err} please try again later`);
    }

    setThinking(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <main className="relative flex flex-col h-screen p-1 overflow-hidden dark:bg-light-grey">
      <section className="flex flex-col flex-grow w-full px-4 overflow-y-scroll sm:px-10 md:px-32">
        {messages.length ? (
          messages.map((message, index) => (
            <Message key={index} message={{ ...message }} />
          ))
        ) : (
          <></>
        )}

        {thinking && <Thinking message="Thinking" />}

        <span ref={messagesEndRef}></span>
      </section>
      <form
        className="flex flex-col px-10 mb-2 md:px-32 join sm:flex-row"
        onSubmit={sendMessage}
      >
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full sm:w-40 select select-bordered join-item"
        >
          <option>{options[0]}</option>
          <option>{options[1]}</option>
        </select>
        <div className="flex items-stretch justify-between w-full">
          <textarea
            ref={inputRef}
            className="w-full grow input input-bordered join-item max-h-[20rem] min-h-[3rem]"
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button type="submit" className="join-item btn" disabled={!formValue}>
            <MdSend size={30} />
          </button>
        </div>
      </form>
      <Modal title="Setting" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal>
    </main>
  );
};

export default ChatView;
