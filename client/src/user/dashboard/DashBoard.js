import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Problems from './components/Problems';
import Loading from '../../loading/Loading';
import Rating from './components/Rating';
import Profile from './components/Profile';
import './DashBoard.css';

const Dashboard = () => {
    const history = useHistory();
    const { search } = useLocation();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({ username: '', name: '', location: '', education: '', skill: '' });
    const [dashBoardData, setDashBoardData] = useState({
        rating: '', ranking: '', contest: '',
        problems: { easy: '', medium: '', hard: '' }
    });

    const fetchData = async () => {
        const username = search.split('=')[1];
        const res = await fetch(`/api/profile/dashboard?user=${username}`);
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            const user = data.user;
            const dashBoard = data.dashBoard;
            setUserData(user);
            setDashBoardData(dashBoard);
        } else if (res.status === 404) {
            history.push('/blogs');
        }
        else {
            history.push('/');
        }
    }

    useEffect(() => {
        fetchData();
    }, [search]);

    if (loading) return <Loading />
    return (
        <div className="container">
            <div className="user-container">
                <div className="sidebar left">
                    <Profile name={userData.name} username={userData.name} location={userData.location} education={userData.education} skills={userData.skills} />
                </div>
                <div className="main right">
                    <Rating rating={dashBoardData.rating} ranking={dashBoardData.ranking} contests={dashBoardData.contests} />
                    <Problems easy={dashBoardData.problems.easy} medium={dashBoardData.problems.medium} hard={dashBoardData.problems.hard} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
