import React from "react";
import "./ProblemLoading.css";

const ProblemsLoading = () => {
    return (
        <div className="problem-rm-card">
            <div className="problem-loading-container-main">
                <div className="problem-loading-container-sm">
                    <div className="skeleton-post-title skeleton skeleton-post-text"></div>
                    <div className="skeleton skeleton-post-text"></div>
                    <div className="skeleton skeleton-post-text"></div>
                    <div className="skeleton skeleton-post-text"></div>
                </div>
            </div>
        </div>
    );
};

export default ProblemsLoading;
