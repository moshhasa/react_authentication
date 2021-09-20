
import React, { useState } from 'react'
import AuthContext from './auth-context'

const AuthContextProvider = ({children}) => {
 const [token, setToken] = useState(null)

 const userIsLogged = !!token; //check if token is truthy and not empty

 const loginHandler = (token) => setToken(token)

 const logoutHander = () => setToken(null);

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
