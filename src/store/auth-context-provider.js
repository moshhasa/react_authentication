import React, { useCallback, useEffect, useState } from "react";
import AuthContext from "./auth-context";

let logoutTimer;

const calcRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const expDate = new Date(expirationTime).getTime();
  return expDate - currentTime;
};

const retriveStoredToken = () => {
  const initialToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expiration");

  const remainingTime = calcRemainingTime(storedExpirationTime);
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return null;
  }

  return {
    token: initialToken,
    expiresIn: storedExpirationTime,
  };
};

const AuthContextProvider = ({ children }) => {
  const tokenData = retriveStoredToken();

  const initialToken = tokenData ? tokenData.token : null;
  const [token, setToken] = useState(initialToken);

  const userIsLogged = !!token; //check if token is truthy and not empty

  const logoutHander = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setTimeout("expiration", expirationTime);
    const remainingTime = calcRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHander, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHander, tokenData.expiresIn);
    }
  }, [tokenData, logoutHander]);

  const context = {
    token,
    isLoggedIn: userIsLogged,
    login: loginHandler,
    logout: logoutHander,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
