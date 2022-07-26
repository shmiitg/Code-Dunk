import React from "react";
import { Link, useLocation } from "react-router-dom";
import DropDown from "./components/DropDown";
import logo from "../images/logo.png";
import Sidebar from "./Sidebar";
import { FaBlog, FaIndustry, FaPuzzlePiece } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import "./Navbar.css";

const Navigation = ({ userName }) => {
    let location = useLocation();
    location = location.pathname;

    const navLinks = [
        { name: "Problems", address: "/problems", icon: <MdQuestionAnswer /> },
        { name: "Blogs", address: "/blogs", icon: <FaBlog /> },
        { name: "Interviews", address: "/interviews", icon: <FaPuzzlePiece /> },
        { name: "Companies", address: "/companies", icon: <FaIndustry /> },
    ];

    return (
        <div className="navbar">
            <div className="nav-links">
                <div className="nav-left">
                    <div className="nav-hamburger">
                        <Sidebar
                            navLinks={navLinks}
                            pageWrapId={"page-wrap"}
                            outerContainerId={"outer-container"}
                        />
                    </div>
                    <div className="navbar-links">
                        {navLinks.map((navlink, index) => (
                            <div
                                key={index}
                                className={
                                    location === navlink.address
                                        ? "nav-item nav-item-active"
                                        : "nav-item"
                                }
                            >
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

export default Navigation;
