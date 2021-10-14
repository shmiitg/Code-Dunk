import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';

const BlogForm = () => {
    const history = useHistory();
    const [interviewArticle, setInterviewArticle] = useState({ title: '', company: '', content: '' });
    const handleInterviewInput = (e) => setInterviewArticle({ ...interviewArticle, [e.target.name]: e.target.value });
    const interviewSave = async () => {
        const { title, company, content } = interviewArticle;
        const res = await fetch('/interview/save', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, company, content })
        });
        console.log(res);
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            history.push('/interview');
        } else {
            window.alert(data.error);
        }
    }

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
            <div className="interview-container">
                <div className="interview-heading">
                    <div className="interview-heading-title">Share your interview experience</div>
                </div>
                <form method="POST" className="interveiw-form">
                    <div className="interview-form-field">
                        <label htmlFor="title">Title</label>
                        <input required value={interviewArticle.title} onChange={handleInterviewInput} autoComplete="off" name="title" />
                    </div>
                    <div className="interview-form-field">
                        <label htmlFor="company">Company</label>
                        <input required value={interviewArticle.company} onChange={handleInterviewInput} autoComplete="off" name="company" />
                    </div>
                    <div className="interview-form-field">
                        <label htmlFor="content">Content</label>
                        <textarea onChange={handleInterviewInput} name="content" id="content">{interviewArticle.content}</textarea>
                    </div>
                </form>
                <div className="interview-share">
                    <Link className="interview-btn" to="/interview" onClick={interviewSave}>Save</Link>
                </div>
            </div>
        </div >
    )
}

export default BlogForm
