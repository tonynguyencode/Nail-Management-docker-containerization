import React, {createContext, useState, useEffect} from 'react';

// Create a context with default values
export const AuthContext = createContext({
    isAuthenticated: false,
    token: null,
    login: () => {},
    logout: () => {},
});


export const AuthProvider = ({children}) => {
    const [token, setToken] = useState( () => localStorage.getItem('authToken') );

    // Check foor existing token in storage on mount
    useEffect( () => {
        const storedToken = localStorage.getItem('authToken');
        if(storedToken){
            setToken(storedToken);
        }

    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('authToken', newToken); //Persist token if desired
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{isAuthenticated, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};