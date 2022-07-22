import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";
import Profile from "./components/Profile";
import Progress from "./components/Progress";
import "./DashBoard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        name: "",
        location: "",
        education: "",
        skill: "",
    });
    const [problemsData, setProblemsData] = useState([]);
    const [done, setDone] = useState(0);
    const [total, setTotal] = useState(1);

    const fetchData = async () => {
        const username = search.split("=")[1];
        const resUser = await fetch(`/api/profile/dashboard?user=${username}`);
        if (resUser.status === 404) {
            setLoading(false);
            setError(true);
            return;
        }
        const dataUser = await resUser.json();
        const resProblems = await fetch("/api/problems");
        const dataProblems = await resProblems.json();

        if (resUser.status === 200 && resProblems.status === 200) {
            setUserData(dataUser.user);
            setProblemsData(dataUser.probs);
            setDone(dataUser.done);
            setTotal(dataProblems.problems.length);
        } else {
            navigate("/");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [search]);

    if (loading) return <Loading />;
    if (error) return <Error />;
    return (
        <div className="user-container">
            <Profile
                name={userData.name}
                username={userData.username}
                location={userData.location}
                education={userData.education}
            />
            <Progress total={total} done={done} problems={problemsData} />
        </div>
    );
};

export default Dashboard;
