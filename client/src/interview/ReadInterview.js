import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import moment from "moment";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import ReadPost from "../components/post/ReadPost";

const ReadInterview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const link = location.pathname.split("/")[3];
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [interview, setInterview] = useState({ title: "", company: "", content: "", author: "" });
    const [date, setDate] = useState("");
    const fetchInterview = async () => {
        const res = await fetch(`/api/interview/read/${link}`);
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            setInterview(data.interview);
            setDate(moment(data.interview.createdAt).format("MMM DD, YYYY"));
        } else if (res.status === 404) {
            setError(true);
        } else {
            window.alert(data.error);
        }
    };

    const deleteInterview = async () => {
        const res = await fetch(`/api/interview/delete/${link}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            navigate("/interviews");
        } else {
            window.alert(data.error);
        }
    };

    useEffect(() => {
        fetchInterview();
    }, [link]);

    if (loading) return <Loading />;
    if (error) return <Error />;
    return (
        <ReadPost
            type="interview"
            title={interview.title}
            desc={interview.company}
            author={interview.author}
            date={date}
            content={interview.content}
            link={interview.link}
            del={deleteInterview}
        />
    );
};

export default ReadInterview;
