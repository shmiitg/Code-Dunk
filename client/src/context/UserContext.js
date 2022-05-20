import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userName, setUserName] = useState(null);
    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
