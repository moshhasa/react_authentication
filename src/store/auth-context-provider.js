
import React, { useState } from 'react'
import AuthContext from './auth-context'

const AuthContextProvider = ({children}) => {
 const initialToken = localStorage.getItem("token");
 const [token, setToken] = useState(initialToken);


 const userIsLogged = !!token; //check if token is truthy and not empty

 const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token)
 } 

 const logoutHander = () => {
    setToken(null);
    localStorage.removeItem("token");
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
