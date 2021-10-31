import React from 'react';
import './PostsLoading.css';

const PostsLoading = () => {
    return (
        <div className="post">
            <div className="post-link">
                <div className="post-title skeleton skeleton-post-text"></div>
                <div className="post-desc skeleton skeleton-post-text"></div>
                <div className="post-author skeleton skeleton-post-text"></div>
            </div>
        </div>
    )
}

export default PostsLoading
