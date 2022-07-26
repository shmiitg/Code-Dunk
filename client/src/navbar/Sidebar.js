import React from "react";
import { Link, useLocation } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

const Sidebar = ({ navLinks }) => {
    let location = useLocation();
    location = location.pathname;

    return (
        <Menu>
            {navLinks.map((navlink, idx) => (
                <Link
                    to={navlink.address}
                    key={idx}
                    className={
                        location === navlink.address
                            ? "current-item-main sidebar-item-main"
                            : "sidebar-item-main"
                    }
                >
                    <div className="sidebar-item">
                        <div className="sidebar-icon">{navlink.icon}</div>
                        <div className="sidebar-link">{navlink.name}</div>
                    </div>
                </Link>
            ))}
        </Menu>
    );
};

export default Sidebar;
