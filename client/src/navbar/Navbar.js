import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Navbar.css';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { RiUser3Line } from 'react-icons/ri';
import { BiPencil, BiLogOut } from 'react-icons/bi';

const Navbar = () => {
    const history = useHistory();
    const { userName, fetchData } = useContext(UserContext);
    const [navLinks, setNavLinks] = useState([
        { name: 'Problems', address: '/problems', id: 1 },
        { name: 'Contests', address: '/contests', id: 2 },
        { name: 'Blogs', address: '/blogs', id: 3 },
        { name: 'Interviews', address: '/interviews', id: 4 }
    ]);
    const [courses, setCourses] = useState([
        { name: "Data Structrues", id: 1 },
        { name: "Algorithms", id: 2 },
        { name: "Web Development", id: 3 },
        { name: "Machine Learning", id: 4 },
        { name: "Python", id: 5 },
        { name: "C++", id: 6 },
        { name: "Puzzles", id: 7 }
    ]);
    const [dropDown, setDropDown] = useState(false);
    const toggleDropDown = () => setDropDown(prev => !prev);
    const logOut = async () => {
        console.log('Logging out');
        const res = await axios.get('/auth/logout');
        const data = await res.data;
        if (res.status === 200) {
            window.alert(data.msg);
            setDropDown(prev => !prev);
            fetchData();
        } else {
            window.alert(data.error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [userName]);

    return (
        <div className="navbar">
            <div className="nav-links">
                <div className="nav-left">
                    {navLinks.map(navlink => (
                        <div key={navlink.id} className="nav-item">
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
                            {dropDown && <div className="dropdown">
                                <Link onClick={toggleDropDown} to={`/profile/dashboard?user=${userName}`} className="dropdown-items">
                                    <div className="dropdown-logo"><RiUser3Line /></div>
                                    <div className="dropdown-title">My Profile</div>
                                </Link>
                                <Link onClick={toggleDropDown} to="/profile/edit" className="dropdown-items">
                                    <div className="dropdown-logo"><BiPencil /></div>
                                    <div className="dropdown-title">Edit Profile</div>
                                </Link>
                                <div onClick={logOut} className="dropdown-items">
                                    <div className="dropdown-logo"><BiLogOut /></div>
                                    <div className="dropdown-title">Logout</div>
                                </div>
                            </div>}
                        </div>}
                </div>
            </div>
            <div className="course-topics">
                <div className="courses">
                    {courses.map(course => (
                        <div key={course.id} className="course-item">
                            <Link to="/">{course.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Navbar
