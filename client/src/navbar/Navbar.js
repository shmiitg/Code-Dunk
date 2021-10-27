import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './components/DropDown';
import { UserContext } from '../context/UserContext';
import logo from '../images/logo.png';
import './Navbar.css';

const Navbar = () => {
    const [loading, setLoading] = useState(true);
    const { userName, setUserName } = useContext(UserContext);

    const [navLinks, setNavLinks] = useState([
        { name: 'Problems', address: '/problems' },
        { name: 'Contests', address: '/contests' },
        { name: 'Blogs', address: '/blogs' },
        { name: 'Interviews', address: '/interviews' }
    ]);
    const [courses, setCourses] = useState(["Data Structrues", "Algorithms", "Web Development",
        "Machine Learning", "Python", "C++", "Puzzles"]);

    const fetchData = async () => {
        const res = await fetch('/user/info');
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            setUserName(data.user.username);
        } else {
            setUserName('Account');
        }
    }

    useEffect(() => {
        fetchData();
    }, [userName]);

    if (loading) return (<> </>)
    return (
        <div className="navbar">
            <div className="nav-links">
                <div className="nav-left">
                    <div className="nav-item nav-logo">
                        <Link to="/"><img src={logo} alt="logo" /></Link>
                    </div>
                    {navLinks.map((navlink, index) => (
                        <div key={index} className="nav-item">
                            <Link to={navlink.address}>{navlink.name}</Link>
                        </div>
                    ))}
                </div>
                <div className="nav-right">
                    {userName === 'Account' ?
                        <div className="nav-item">
                            <Link className="login-btn" to="/login">Sign In</Link>
                        </div>
                        :
                        <DropDown />
                    }
                </div>
            </div>
            <div className="course-topics">
                <div className="courses">
                    {courses.map((course, index) => (
                        <div key={index} className="course-item">
                            <Link to="/">{course}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Navbar
