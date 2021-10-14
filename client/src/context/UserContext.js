import React, { useState, createContext } from 'react'

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userName, setUserName] = useState('Account');
    const fetchData = async () => {
        const res = await fetch('/user/info');
        if (res.status === 200) {
            const data = await res.json();
            setUserName(data.user.username);
        } else {
            setUserName('Account');
        }
    }
    return (
        <UserContext.Provider value={{ userName, fetchData }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;