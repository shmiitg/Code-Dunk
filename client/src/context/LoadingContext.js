import React, { createContext, useState } from "react";

export const LoadingContext = createContext();
export const PageLoadingContext = createContext();

const LoadingContextProvider = (props) => {
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(true);
    return (
        <PageLoadingContext.Provider value={{ pageLoading, setPageLoading }}>
            <LoadingContext.Provider value={{ loading, setLoading }}>
                {props.children}
            </LoadingContext.Provider>
        </PageLoadingContext.Provider>
    )

}

export default LoadingContextProvider;