import { useState, useRef, useEffect, useContext } from "react";
import Message from "./Message";
import { ChatContext } from "../context/chatContext";
import Thinking from "./Thinking";
import { MdSend } from "react-icons/md";
import { replaceProfanities } from "no-profanity";
import { davinci } from "../utils/davinci";

const ChatView = () => {
  const [recommendations, setRecommendations] = useState([
    {
      title: "Recipe chicken",
      prompt: "Recipe chicken with chicken and vegetables",
    },
    {
      title: "Recipe chicken with sauce",
      prompt: "Recipe chicken with chicken and sauce",
    },
    {
      title: "Recipe vegetables",
      prompt: "Recipe vegetables with vegetables and sauce",
    },
    {
      title: "Recipe noodles",
      prompt: "Recipe noodles with noodles and sauce",
    },
  ]);

  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [takeIntoAccountAllergies, setTakeIntoAccountAllergies] =
    useState(true);
  const [messages, addMessage] = useContext(ChatContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
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

  /**
   *
   * @param {Event} e - The submit event of the form.
   */
  const sendMessage = async (e) => {
    e.preventDefault();

    const cleanPrompt = replaceProfanities(formValue);

    const newMsg = cleanPrompt;

    setThinking(true);
    setFormValue("");
    updateMessage(newMsg, false);

    const key = "";
    try {
      const LLMresponse = await davinci(cleanPrompt, key);
      LLMresponse && updateMessage(LLMresponse, true);
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
      <div className="mx-auto my-4 tabs tabs-boxed w-fit">
        <a
          onClick={() => setTakeIntoAccountAllergies(true)}
          className={`${takeIntoAccountAllergies && "tab-active"} tab`}
        >
          Take into account allergies
        </a>
        <a
          onClick={() => setTakeIntoAccountAllergies(false)}
          className={`${!takeIntoAccountAllergies && "tab-active"} tab`}
        >
          {`Don't take into account allergies`}
        </a>
      </div>

      <section className="flex flex-col flex-grow w-full px-4 overflow-y-scroll sm:px-10 md:px-32">
        {messages.length ? (
          messages.map((message, index) => (
            <Message key={index} message={{ ...message }} />
          ))
        ) : (
          <div className="flex my-2">
            <div className="w-screen overflow-hidden">
              <ul className="grid grid-cols-2 gap-2 mx-10">
                {recommendations.map((item, index) => (
                  <li
                    onClick={() => setFormValue(item.prompt)}
                    key={index}
                    className="p-6 border rounded-lg border-slate-300 hover:border-slate-500"
                  >
                    <p className="text-base font-semibold">{item.title}</p>
                    <p className="text-sm">{item.prompt}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {thinking && <Thinking />}

        <span ref={messagesEndRef}></span>
      </section>
      <form
        className="flex flex-col px-10 mb-2 md:px-32 join sm:flex-row"
        onSubmit={sendMessage}
      >
        <select
          value={"Chat"}
          className="w-full sm:w-40 select select-bordered join-item"
        >
          <option>{"Ask recipe"}</option>
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
    </main>
  );
};

export default ChatView;
