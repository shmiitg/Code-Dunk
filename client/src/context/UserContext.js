import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);
    return (
        <UserContext.Provider value={{ userName, setUserName, userId, setUserId }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
