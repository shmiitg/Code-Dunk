import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

const BlogForm = () => {
    const history = useHistory();
    const [blogArticle, setBlogArticle] = useState({ title: '', description: '', content: '' });
    const handleBlogInput = e => setBlogArticle({ ...blogArticle, [e.target.name]: e.target.value });
    const blogSave = async () => {
        const { title, description, content } = blogArticle;
        const res = await fetch('/api/blog/save', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, content })
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            history.push('/blogs');
        } else {
            window.alert(data.error);
        }
    }
    const checkAuth = async () => {
        const res = await fetch('/user/info');
        if (res.status !== 200) {
            alert('Login to continue');
            history.push('/login');
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    useEffect(() => {
        const autoExpand = (field) => {
            // Reset field height
            field.style.height = 'inherit';
            // Get the computed styles for the element
            var computed = window.getComputedStyle(field);
            // Calculate the height
            var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                + field.scrollHeight
                + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

            field.style.height = height + 'px';
        };
        document.addEventListener('input', (e) => {
            if (e.target.tagName.toLowerCase() !== 'textarea') return;
            autoExpand(e.target);
        }, false);
    }, [])

    return (
        <div className="container">
            <div className="blog-container">
                <div className="blog-heading">
                    <div className="blog-heading-title">Write a Blog</div>
                </div>
                <form method="POST" className="post-form">
                    <div className="post-form-field">
                        <label htmlFor="title">Title</label>
                        <input required value={blogArticle.title} onChange={handleBlogInput} autoComplete="off" name="title" />
                    </div>
                    <div className="post-form-field">
                        <label htmlFor="description">Desciption</label>
                        <input required value={blogArticle.description} onChange={handleBlogInput} autoComplete="off" name="description" />
                    </div>
                    <div className="post-form-field">
                        <label htmlFor="content">Content</label>
                        <textarea required onChange={handleBlogInput} name="content"></textarea>
                    </div>
                </form>
                <div className="post-write">
                    <div className="post-write-btn" onClick={blogSave}>Save</div>
                </div>
            </div>
        </div >
    )
}

export default BlogForm
