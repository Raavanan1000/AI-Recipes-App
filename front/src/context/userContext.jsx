import { createContext, useContext, useState } from "react";

const context = createContext({
  user: null,
  setUser: (user) => {},
  addAllergy: (allergy) => {},
});
const useUser = () => useContext(context);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  function addAllergy(allergy) {
    setUser((prev) => ({ ...prev, allergis: [...prev.allergis, allergy] }));
  }

  return (
    <context.Provider
      value={{
        user,
        setUser: (user) => {
          setUser(user);
        },
        addAllergy,
      }}
    >
      {children}
    </context.Provider>
  );
}

export { useUser };
