import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './components/DropDown';
import { UserContext } from '../context/UserContext';
import logo from '../images/logo.png';
import './Navbar.css';

const Navbar = () => {
    const [loading, setLoading] = useState(true);
    const { setUserName, userLoggedIn, setUserLoggedIn } = useContext(UserContext);

    const navLinks = [
        { name: 'Problems', address: '/problems' },
        { name: 'Blogs', address: '/blogs' },
        { name: 'Interviews', address: '/interviews' },
        { name: 'Companies', address: '/companies' }
    ];

    const fetchData = async () => {
        const res = await fetch('/user/info');
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            setUserName(data.user.username);
            setUserLoggedIn(true);
        } else {
            setUserName('Account');
            setUserLoggedIn(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [userLoggedIn]);

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
                    {!userLoggedIn ?
                        <div className="nav-item">
                            <Link className="login-btn" to="/login">Sign In</Link>
                        </div>
                        :
                        <DropDown />}
                </div>
            </div>
        </div>
    )
}

export default Navbar
