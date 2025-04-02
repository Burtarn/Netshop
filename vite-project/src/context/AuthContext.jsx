import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedValue = localStorage.getItem('isAuthenticated');
        return storedValue ? JSON.parse(storedValue) : false;
    });


    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = () => {
    return useContext(AuthContext);
    };