import React from "react";
import "./LoadingMain.css";

const LoadingMain = () => {
    return (
        <div className="loadingMain__loader">
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default LoadingMain;
