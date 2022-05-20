import React from "react";
import { Link } from "react-router-dom";
import DropDown from "./components/DropDown";
import logo from "../images/logo.png";
import "./Navbar.css";

const Navbar = ({ userName }) => {
    const navLinks = [
        { name: "Problems", address: "/problems" },
        { name: "Blogs", address: "/blogs" },
        { name: "Interviews", address: "/interviews" },
        { name: "Companies", address: "/companies" },
    ];

    return (
        <div className="navbar">
            <div className="nav-links">
                <div className="nav-left">
                    <div className="nav-item nav-logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    {navLinks.map((navlink, index) => (
                        <div key={index} className="nav-item">
                            <Link to={navlink.address}>{navlink.name}</Link>
                        </div>
                    ))}
                </div>
                <div className="nav-right">
                    {userName ? (
                        <DropDown />
                    ) : (
                        <div className="nav-item">
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
