import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import PostForm from '../components/post/PostForm';

const InterviewForm = () => {
    const history = useHistory();
    const [interviewArticle, setInterviewArticle] = useState({ title: '', company: '', content: '' });
    const handleInterviewInput = (e) => {
        let value = e.target.value;
        if (value === '\n') value = '</br>';
        setInterviewArticle({ ...interviewArticle, [e.target.name]: value })
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

    const interviewSave = async () => {
        const { title, company, content } = interviewArticle;
        const res = await fetch('/api/interview/save', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, company, content })
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            history.push(`/interview/read/${string_to_slug(title)}`);
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
            name="Share your interview experience"
            title={interviewArticle.title}
            input_desc_name="company"
            desc_name="Company"
            desc={interviewArticle.company}
            handleInput={handleInterviewInput}
            save={interviewSave}
        />
    )
}

export default InterviewForm
