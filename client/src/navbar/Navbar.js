import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DropDown from "./components/DropDown";
import logo from "../images/logo.png";
import "./Navbar.css";

const Navbar = ({ userName }) => {
    const [resNav, setResNav] = useState(false);

    const resNavRef = useRef();

    const toggleClick = () => setResNav((prev) => !prev);

    const navLinks = [
        { name: "Problems", address: "/problems" },
        { name: "Blogs", address: "/blogs" },
        { name: "Interviews", address: "/interviews" },
        { name: "Companies", address: "/companies" },
    ];

    useEffect(() => {
        const handler = (e) => {
            if (resNav && resNavRef.current && !resNavRef.current.contains(e.target)) {
                setResNav(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [resNav]);

    return (
        <div className="navbar">
            <div className="nav-links">
                <div className="nav-left">
                    <div onClick={toggleClick} ref={resNavRef} className="hamburger">
                        {resNav ? (
                            <>
                                <span onClick={toggleClick} className="bar active"></span>
                                <span onClick={toggleClick} className="bar active"></span>
                                <span onClick={toggleClick} className="bar active"></span>
                                <div className="navbar__links active">
                                    {navLinks.map((navlink, index) => (
                                        <div key={index} className="nav-item">
                                            <Link onClick={toggleClick} to={navlink.address}>
                                                {navlink.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <span onClick={toggleClick} className="bar"></span>
                                <span onClick={toggleClick} className="bar"></span>
                                <span onClick={toggleClick} className="bar"></span>
                                <div className="navbar__links">
                                    {navLinks.map((navlink, index) => (
                                        <div key={index} className="nav-item">
                                            <Link to={navlink.address}>{navlink.name}</Link>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="navbar__links">
                        {navLinks.map((navlink, index) => (
                            <div key={index} className="nav-item">
                                <Link to={navlink.address}>{navlink.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="nav-logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="nav-right">
                    {userName ? (
                        <DropDown />
                    ) : (
                        <div className="nav-items">
                            <Link className="login-btn" to="/login">
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
