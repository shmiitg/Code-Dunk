import React, { useState, createContext, useContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userName, setUserName] = useState('Account');
    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;