import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;
  let logoutTimer;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    resetLogoutTimer(); // Start the logout timer on login
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    clearTimeout(logoutTimer); // Clear the logout timer on logout
  };

  // Function to start/reset the logout timer
  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      logoutHandler();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
  };

  // Listen for token changes to start/reset the logout timer
  useEffect(() => {
    if (token) {
      resetLogoutTimer();
    }
  });

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
