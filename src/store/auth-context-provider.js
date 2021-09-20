
import React, { useState } from 'react'
import AuthContext from './auth-context'

const calcRemainingTime = ( expirationTime) => {
    const currentTime = new Date().getTime();
    const expDate = new Date(expirationTime).getTime();
    return expDate - currentTime;
}

const AuthContextProvider = ({children}) => {
 const initialToken = localStorage.getItem("token");
 const [token, setToken] = useState(initialToken);


 const userIsLogged = !!token; //check if token is truthy and not empty

 
 const logoutHander = () => {
    setToken(null);
    localStorage.removeItem("token");
 } 

 const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);

    const remainingTime = calcRemainingTime(expirationTime);
    
    setTimeout(logoutHander, remainingTime);
 } 


 const context = {
     token,
     isLoggedIn : userIsLogged,
     login : loginHandler,
     logout : logoutHander
 }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
