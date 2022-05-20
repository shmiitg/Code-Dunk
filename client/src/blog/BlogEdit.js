import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EditForm from "../components/post/EditForm";

const BlogEdit = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const link = pathname.split("/")[3];
    const [blogArticle, setBlogArticle] = useState({ title: "", description: "", content: "" });
    const fetchData = async () => {
        const res = await fetch(`/api/blog/edit/${link}`);
        const data = await res.json();
        if (res.status === 200) {
            setBlogArticle(data.blog);
        }
    };
    const handleBlogInput = (e) => {
        let value = e.target.value;
        if (value === "\n") value = "</br>";
        setBlogArticle({ ...blogArticle, [e.target.name]: value });
    };
    const blogSave = async () => {
        const { title, description, content } = blogArticle;
        const res = await fetch(`/api/blog/edit/${link}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, content }),
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            navigate(`/blog/read/${link}`);
        } else {
            window.alert(data.error);
        }
    };

    const blogCancel = () => {
        navigate(`/blog/read/${link}`);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <EditForm
            name="Edit your Blog"
            title={blogArticle.title}
            input_desc_name="description"
            desc_name="Description"
            desc={blogArticle.description}
            content={blogArticle.content}
            handleInput={handleBlogInput}
            save={blogSave}
            cancel={blogCancel}
        />
    );
};

export default BlogEdit;
