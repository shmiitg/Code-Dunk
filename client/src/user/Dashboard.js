import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import './Dashboard.css';

const Dashboard = () => {
    const history = useHistory();
    const { search } = useLocation();
    const [userData, setUserData] = useState({ username: '', name: '', location: '', education: '', skill: '' });
    const [dashBoardData, setDashBoardData] = useState({
        rating: '', ranking: '', contest: '',
        problems: { easy: '', medium: '', hard: '' }
    });
    const fetchData = async () => {
        const username = search.split('=')[1];
        const res = await fetch(`/api/profile/dashboard?user=${username}`);
        const data = await res.json();
        if (res.status === 200) {
            const user = data.user;
            const dashBoard = data.dashBoard;
            setUserData(user);
            setDashBoardData(dashBoard);
        } else if (res.status === 404) {
            history.push('/');
        }
        else {
            history.push('/');
        }
    }

    useEffect(() => {
        fetchData();
    }, [search]);

    return (
        <div className="container">
            <div className="user-container">
                <div className="sidebar left">
                    <div className="profile-card dashboard-card">
                        <div className="about">
                            <div className="user-name">{userData.name}</div>
                            <div className="user-id">{userData.username}</div>
                        </div>
                        <div className="profile-item">
                            <div>Location</div>
                            <div>{userData.location}</div>
                        </div>
                        <div className="profile-item">
                            <div>Education</div>
                            <div>{userData.education}</div>
                        </div>
                        <div className="profile-item">
                            <div>Skills</div>
                            <div>{userData.skills}</div>
                        </div>
                    </div>
                </div>
                <div className="main right">
                    <div className="right-card dashboard-card">
                        <div className="right-card-top">
                            <div className="rating">
                                <div className="r1css">Contest Rating</div>
                                <div className="r2css">{dashBoardData.rating}</div>
                            </div>
                        </div>
                        <div className="right-card-bottom">
                            <div className="rankings">
                                <div className="r3css">Ranking</div>
                                <div className="r4css">{dashBoardData.ranking}</div>
                            </div>
                            <div className="contests">
                                <div className="r3css">Attended</div>
                                <div className="r4css">{dashBoardData.contests}</div>
                            </div>
                        </div>
                    </div>
                    <div className="right-card dashboard-card">
                        <div className="right-card-top">
                            <div className="problems">
                                <div className="r1css">Problems Solved</div>
                                <div className="r2css">{dashBoardData.problems.easy + dashBoardData.problems.medium + dashBoardData.problems.hard}</div>
                            </div>
                        </div>
                        <div className="right-card-bottom">
                            <div className="easy">
                                <div className="r3css">Easy</div>
                                <div className="r4css">{dashBoardData.problems.easy}</div>
                            </div>
                            <div className="medium">
                                <div className="r3css">Medium</div>
                                <div className="r4css">{dashBoardData.problems.medium}</div>
                            </div>
                            <div className="hard">
                                <div className="r3css">Hard</div>
                                <div className="r4css">{dashBoardData.problems.hard}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
