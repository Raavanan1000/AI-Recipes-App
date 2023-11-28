import { createContext, useContext, useState } from "react";

const context = createContext({ user: null, setUser: (user) => {} });
const useUser = () => useContext(context);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <context.Provider
      value={{
        user,
        setUser: (user) => {
          setUser(user);
        },
      }}
    >
      {children}
    </context.Provider>
  );
}

export { useUser };
