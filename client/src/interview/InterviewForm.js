import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/post/PostForm";
import { slug } from "../utils/Slug";

const InterviewForm = () => {
    const navigate = useNavigate();
    const [interviewArticle, setInterviewArticle] = useState({
        title: "",
        company: "",
        content: "",
    });
    const handleInterviewInput = (e) => {
        let value = e.target.value;
        if (value === "\n") value = "</br>";
        setInterviewArticle({ ...interviewArticle, [e.target.name]: value });
    };

    const interviewSave = async () => {
        const { title, company, content } = interviewArticle;
        const res = await fetch("/api/interview/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, company, content }),
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            navigate(`/interview/read/${slug(title)}`);
        } else {
            window.alert(data.error);
        }
    };

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
    );
};

export default InterviewForm;
