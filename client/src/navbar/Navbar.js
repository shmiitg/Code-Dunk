import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './components/DropDown';
import { UserContext } from '../context/UserContext';
import { FaUserCircle } from 'react-icons/fa';
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

    const [dropDown, setDropDown] = useState(false);
    const toggleDropDown = () => setDropDown(prev => !prev);

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
                        <div className="user nav-item">
                            <FaUserCircle onClick={toggleDropDown} />
                            {dropDown && <DropDown toggleDropDown={toggleDropDown} setDropDown={setDropDown} />}
                        </div>}
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
