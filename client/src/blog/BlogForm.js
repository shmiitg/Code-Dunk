import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import PostForm from '../components/post/PostForm';

const BlogForm = () => {
    const history = useHistory();
    const [blogArticle, setBlogArticle] = useState({ title: '', description: '', content: '' });
    const handleBlogInput = (e) => {
        let value = e.target.value;
        if (value === '\n') value = '</br>';
        setBlogArticle({ ...blogArticle, [e.target.name]: value })
    }

    function string_to_slug(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-') // collapse dashes
            .replace(/^-+/, '') // trim - from start of text
            .replace(/-+$/, ''); // trim - from end of text

        return str;
    }

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
            history.push(`/blog/read/${string_to_slug(title)}`);
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
    )
}

export default BlogForm
