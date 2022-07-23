import React from "react";
import "./PostsLoading.css";

const PostsLoading = () => {
    return (
        <div className="post">
            <div className="post-link">
                <div className="skeleton-post-title skeleton skeleton-post-text"></div>
                <div className="skeleton skeleton-post-text"></div>
                <div className="skeleton skeleton-post-text"></div>
            </div>
        </div>
    );
};

export default PostsLoading;
