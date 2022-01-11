import React, { useState, createContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userName, setUserName] = useState('Account');
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    return (
        <UserContext.Provider value={{ userName, setUserName, userLoggedIn, setUserLoggedIn }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;