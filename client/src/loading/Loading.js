import React from "react";
import "./Loading.css";

const Loading = () => {
    return (
        <div className="loader__container">
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loading;
