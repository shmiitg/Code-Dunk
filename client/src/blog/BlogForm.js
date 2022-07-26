import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/post/PostForm";
import { slug } from "../utils/Slug";

const BlogForm = () => {
    const navigate = useNavigate();
    const [blogArticle, setBlogArticle] = useState({ title: "", description: "", content: "" });
    const handleBlogInput = (e) => {
        let value = e.target.value;
        if (value === "\n") value = "</br>";
        setBlogArticle({ ...blogArticle, [e.target.name]: value });
    };

    const blogSave = async () => {
        const { title, description, content } = blogArticle;
        const res = await fetch("/api/blog/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, content }),
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            navigate(`/blog/read/${slug(title)}`);
        } else {
            window.alert(data.error);
        }
    };

    return (
        <PostForm
            name="Write a Blog"
            title={blogArticle.title}
            input_desc_name="description"
            desc_name="Description"
            desc={blogArticle.description}
            handleInput={handleBlogInput}
            save={blogSave}
        />
    );
};

export default BlogForm;
