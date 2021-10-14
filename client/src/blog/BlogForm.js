import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

const BlogForm = () => {
    const history = useHistory();
    const [blogArticle, setBlogArticle] = useState({ title: '', description: '', content: '' });
    const handleBlogInput = e => setBlogArticle({ ...blogArticle, [e.target.name]: e.target.value });
    const blogSave = async () => {
        const { title, description, content } = blogArticle;
        const res = await fetch('/blog/save', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, content })
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            history.push('/blog');
        } else {
            window.alert(data.error);
        }
    }
    return (
        <div className="container">
            <div className="blog-container">
                <div className="blog-heading">
                    <div className="blog-heading-title">Write a Blog</div>
                </div>
                <form method="POST" className="blog-form">
                    <div className="blog-form-field">
                        <label htmlFor="title">Title</label>
                        <input required value={blogArticle.title} onChange={handleBlogInput} autoComplete="off" name="title" />
                    </div>
                    <div className="blog-form-field">
                        <label htmlFor="description">Desciption</label>
                        <input required value={blogArticle.description} onChange={handleBlogInput} autoComplete="off" name="description" />
                    </div>
                    <div className="blog-form-field">
                        <label htmlFor="content">Content</label>
                        <textarea required onChange={handleBlogInput} name="content">{blogArticle.content}</textarea>
                    </div>
                </form>
                <div className="blog-write">
                    <Link className="blog-btn" to="/blog" onClick={blogSave}>Save</Link>
                </div>
            </div>
        </div >
    )
}

export default BlogForm
