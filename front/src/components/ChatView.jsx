import { useState, useRef, useEffect, useContext } from "react";
import Message from "./Message";
import { ChatContext } from "../context/chatContext";
import Thinking from "./Thinking";
import { MdSend } from "react-icons/md";
import { replaceProfanities } from "no-profanity";
import { davinci } from "../utils/davinci";
import Recipe from "./Recipe";

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
  const [recipesFromServer, setRecipesFromServer] = useState([
    {
      Name: "Christmas pie",
      url: "https://www.bbcgoodfood.com/recipes/2793/christmas-pie",
      Description:
        "Combine a few key Christmas flavours here to make a pie that both children and adults will adore",
      Author: "Mary Cadogan",
      Ingredients: [
        "2 tbsp olive oil",
        "knob butter",
        "1 onion, finely chopped",
        "500g sausagemeat or skinned sausages",
        "grated zest of 1 lemon",
        "100g fresh white breadcrumbs",
        "85g ready-to-eat dried apricots, chopped",
        "50g chestnut, canned or vacuum-packed, chopped",
        "2 tsp chopped fresh or 1tsp dried thyme",
        "100g cranberries, fresh or frozen",
        "500g boneless, skinless chicken breasts",
        "500g pack ready-made shortcrust pastry",
        "beaten egg, to glaze",
      ],
      Method: [
        "Heat oven to 190C/fan 170C/gas 5. Heat 1 tbsp oil and the butter in a frying pan, then add the onion and fry for 5 mins until softened. Cool slightly. Tip the sausagemeat, lemon zest, breadcrumbs, apricots, chestnuts and thyme into a bowl. Add the onion and cranberries, and mix everything together with your hands, adding plenty of pepper and a little salt.",
        "Cut each chicken breast into three fillets lengthwise and season all over with salt and pepper. Heat the remaining oil in the frying pan, and fry the chicken fillets quickly until browned, about 6-8 mins.",
        "Roll out two-thirds of the pastry to line a 20-23cm springform or deep loose-based tart tin. Press in half the sausage mix and spread to level. Then add the chicken pieces in one layer and cover with the rest of the sausage. Press down lightly.",
        "Roll out the remaining pastry. Brush the edges of the pastry with beaten egg and cover with the pastry lid. Pinch the edges to seal, then trim. Brush the top of the pie with egg, then roll out the trimmings to make holly leaf shapes and berries. Decorate the pie and brush again with egg.",
        "Set the tin on a baking sheet and bake for 50-60 mins, then cool in the tin for 15 mins. Remove and leave to cool completely. Serve with a winter salad and pickles.",
      ],
    },
    {
      Name: "Christmas pie",
      url: "https://www.bbcgoodfood.com/recipes/2793/christmas-pie",
      Description:
        "Combine a few key Christmas flavours here to make a pie that both children and adults will adore",
      Author: "Mary Cadogan",
      Ingredients: [
        "2 tbsp olive oil",
        "knob butter",
        "1 onion, finely chopped",
        "500g sausagemeat or skinned sausages",
        "grated zest of 1 lemon",
        "100g fresh white breadcrumbs",
        "85g ready-to-eat dried apricots, chopped",
        "50g chestnut, canned or vacuum-packed, chopped",
        "2 tsp chopped fresh or 1tsp dried thyme",
        "100g cranberries, fresh or frozen",
        "500g boneless, skinless chicken breasts",
        "500g pack ready-made shortcrust pastry",
        "beaten egg, to glaze",
      ],
      Method: [
        "Heat oven to 190C/fan 170C/gas 5. Heat 1 tbsp oil and the butter in a frying pan, then add the onion and fry for 5 mins until softened. Cool slightly. Tip the sausagemeat, lemon zest, breadcrumbs, apricots, chestnuts and thyme into a bowl. Add the onion and cranberries, and mix everything together with your hands, adding plenty of pepper and a little salt.",
        "Cut each chicken breast into three fillets lengthwise and season all over with salt and pepper. Heat the remaining oil in the frying pan, and fry the chicken fillets quickly until browned, about 6-8 mins.",
        "Roll out two-thirds of the pastry to line a 20-23cm springform or deep loose-based tart tin. Press in half the sausage mix and spread to level. Then add the chicken pieces in one layer and cover with the rest of the sausage. Press down lightly.",
        "Roll out the remaining pastry. Brush the edges of the pastry with beaten egg and cover with the pastry lid. Pinch the edges to seal, then trim. Brush the top of the pie with egg, then roll out the trimmings to make holly leaf shapes and berries. Decorate the pie and brush again with egg.",
        "Set the tin on a baking sheet and bake for 50-60 mins, then cool in the tin for 15 mins. Remove and leave to cool completely. Serve with a winter salad and pickles.",
      ],
    },
    {
      Name: "Christmas pie",
      url: "https://www.bbcgoodfood.com/recipes/2793/christmas-pie",
      Description:
        "Combine a few key Christmas flavours here to make a pie that both children and adults will adore",
      Author: "Mary Cadogan",
      Ingredients: [
        "2 tbsp olive oil",
        "knob butter",
        "1 onion, finely chopped",
        "500g sausagemeat or skinned sausages",
        "grated zest of 1 lemon",
        "100g fresh white breadcrumbs",
        "85g ready-to-eat dried apricots, chopped",
        "50g chestnut, canned or vacuum-packed, chopped",
        "2 tsp chopped fresh or 1tsp dried thyme",
        "100g cranberries, fresh or frozen",
        "500g boneless, skinless chicken breasts",
        "500g pack ready-made shortcrust pastry",
        "beaten egg, to glaze",
      ],
      Method: [
        "Heat oven to 190C/fan 170C/gas 5. Heat 1 tbsp oil and the butter in a frying pan, then add the onion and fry for 5 mins until softened. Cool slightly. Tip the sausagemeat, lemon zest, breadcrumbs, apricots, chestnuts and thyme into a bowl. Add the onion and cranberries, and mix everything together with your hands, adding plenty of pepper and a little salt.",
        "Cut each chicken breast into three fillets lengthwise and season all over with salt and pepper. Heat the remaining oil in the frying pan, and fry the chicken fillets quickly until browned, about 6-8 mins.",
        "Roll out two-thirds of the pastry to line a 20-23cm springform or deep loose-based tart tin. Press in half the sausage mix and spread to level. Then add the chicken pieces in one layer and cover with the rest of the sausage. Press down lightly.",
        "Roll out the remaining pastry. Brush the edges of the pastry with beaten egg and cover with the pastry lid. Pinch the edges to seal, then trim. Brush the top of the pie with egg, then roll out the trimmings to make holly leaf shapes and berries. Decorate the pie and brush again with egg.",
        "Set the tin on a baking sheet and bake for 50-60 mins, then cool in the tin for 15 mins. Remove and leave to cool completely. Serve with a winter salad and pickles.",
      ],
    },
  ]);
  const [takeIntoAccountAllergies, setTakeIntoAccountAllergies] =
    useState(true);
  const [messages, addMessage] = useContext(ChatContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateRecipes = (newRecipes) => {
    setRecipesFromServer(newRecipes);
  };

  /**
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const updateMessage = (newValue, ai = false, selected = "") => {
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

    setThinking(true);
    setFormValue("");
    updateMessage(cleanPrompt, false);

    const key = "";
    try {
      const LLMresponse = await davinci(cleanPrompt, key);
      LLMresponse && updateRecipes(LLMresponse, true);
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
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <main className="w-screen flex flex-col h-screen p-1 overflow-hidden dark:bg-light-grey">
      {!recipesFromServer?.length > 0 && (
        <>
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
                disabled={recipesFromServer?.length > 0}
                onKeyDown={handleKeyDown}
                onChange={(e) => setFormValue(e.target.value)}
              />
              <button
                type="submit"
                className="join-item btn"
                disabled={!formValue || recipesFromServer?.length > 0}
              >
                <MdSend size={30} />
              </button>
            </div>
          </form>
        </>
      )}
      {recipesFromServer?.length > 0 && (
        <div className="flex flex-col mt-12 justify-center items-center">
          <div className="text-2xl mb-12 text-center font-bold text-slate-900">
            Recipes recommened for you based on your search
          </div>
          <div className="flex w-full h-full justify-center items-center gap-3 flex-wrap">
            {recipesFromServer?.map((recipe, index) => (
              <Recipe key={index} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ChatView;
