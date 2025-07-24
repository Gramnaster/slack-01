'use client'
import { useState, createContext, useContext } from "react";
import React from "react";
import PropTypes from 'prop-types';

// React Context is a way to manage state globally.
// createContext is a method provided by React's Context API. It facilitates a way to pass data through the component without having to pass props down manually at every level.
const DataContext = createContext();

const DataProvider = ({children}) => {
    const [userHeaders, setUserHeaders] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // create a function that arranges the userHeaders
    const handleHeaders = (header) => {
        const updatedHeader = {
            'access-token': header['access-token'],
            'client': header.client,
            'expiry': header.expiry,
            'uid': header.uid
        }
        setUserHeaders(updatedHeader);

        // Store in cookies for middleware.js access
        document.cookie = `access-token=${header['access-token']}; path=/main`;
        document.cookie = `client=${header.client}; path=/main`;
        document.cookie = `uid=${header.uid}; path=/main`;
        setIsAuthenticated(true);
    }

    const handleLogin = (status) => {
      setIsAuthenticated(status);
    };
  
    const handleLogout = () => {
      setIsAuthenticated(false);
    };
    
    return (
        // built-in component from React Context
        <DataContext.Provider value={
            {
                handleHeaders,
                handleLogin,
                handleLogout,
                userHeaders,
                isAuthenticated
            }
        }>
            {/* children are the elements that can use what's in our value object */}
            {children}
        </DataContext.Provider>
    )
}

DataProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useData = () => {
    // useContext - a React Hook that lets you read and subscribe to context from your component.
    return useContext(DataContext);
}

export default DataProvider;
