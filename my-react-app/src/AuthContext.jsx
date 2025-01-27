import React, {createContext, useState, useEffect, useContext} from 'react';

// Create a context with default values
export const AuthContext = createContext();
    


export const AuthProvider = ({children}) => {

    //We just create a Global isAuthenticated so we can use in many places.
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect( () => {
        // Check authentication status on mount
        const token = localStorage.getItem('authToken');
        
        if(token){
            setIsAuthenticated(true);
        }
    }, []);


    // Two Global Functions to work with
    const login = (token) => {
        //Received a token and set the token
        localStorage.setItem('authToken', token);
        
    }

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

