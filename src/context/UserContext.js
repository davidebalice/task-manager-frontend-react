import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext();

export function UserProvider({ children }) {
  const token = localStorage.getItem("authToken");
  const [userData, setUserData] = useState(null);
  const [demo, setDemo] = useState(false);

  const login = (userData) => {
    setUserData(userData);
  };

  const logout = () => {
    setUserData(null);
  };

  useEffect(() => {
    console.log(token);
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/api/get/user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data.user);
        setUserData(response.data.user);
        setDemo(response.data.demo);
      })
      .catch((error) => {
        console.error("Error calling api:", error);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        userData,
        setUserData,
        login,
        logout,
        demo: demo,
      }}
    >
      {children}
    </Context.Provider>
  );
}

/*





import React, { createContext, useState } from "react";

export const Context = createContext();

export function Provider({ children }) {
  const [debug, setDebug] = useState(true);
  const [lang, setLang] = useState("en");
  const [firstRoute, setFirstRoute] = useState(true);
  const [rendered, setRendered] = useState(false);

  const linkedin = "https://www.linkedin.com";
  const github = "https://github.com/davidebalice";

  if (debug) {
    console.log(lang);
  }

  return (
    <Context.Provider
      value={{
        debug,
        setDebug,
        lang,
        setLang,
        rendered,
        setRendered,
        firstRoute,
        setFirstRoute,
        linkedin,
        github,
      }}
    >
      {children}
    </Context.Provider>
  );
}
*/
