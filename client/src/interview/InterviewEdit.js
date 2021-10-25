import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import EditForm from '../components/post/EditForm';

const InterviewEdit = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const link = pathname.split('/')[3];
    const [interviewArticle, setInterviewArticle] = useState({ title: '', company: '', content: '' });
    const fetchData = async () => {
        const res = await fetch(`/api/interview/edit/${link}`);
        const data = await res.json();
        if (res.status === 200) {
            setInterviewArticle(data.interview);
        }
    }
    const handleInterviewInput = (e) => {
        let value = e.target.value;
        if (value === '\n') value = '</br>';
        setInterviewArticle({ ...interviewArticle, [e.target.name]: value })
    }
    const interviewSave = async () => {
        const { title, company, content } = interviewArticle;
        const res = await fetch(`/api/interview/edit/${link}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, company, content })
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            history.push(`/interview/read/${link}`);
        } else {
            window.alert(data.error);
        }
    }

    const interviewCancel = () => {
        history.push(`/interview/read/${link}`)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <EditForm
            name="Edit your Interview Experience"
            title={interviewArticle.title}
            input_desc_name="company"
            desc_name="Company"
            desc={interviewArticle.company}
            content={interviewArticle.content}
            handleInput={handleInterviewInput}
            save={interviewSave}
            cancel={interviewCancel}
        />
    )
}

export default InterviewEdit
