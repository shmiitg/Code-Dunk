import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { RiUser3Line } from "react-icons/ri";
import { BiPencil, BiLogOut } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

const DropDown = () => {
    const navigate = useNavigate();
    const [dropDown, setDropDown] = useState(false);
    const { userName, setUserName } = useContext(UserContext);

    const logOut = async () => {
        const res = await fetch("/auth/logout");
        const data = await res.json();
        if (res.status === 200) {
            setDropDown((prev) => !prev);
            navigate("/login");
            setUserName(null);
        } else {
            window.alert(data.error);
        }
    };
    const dropDownRef = useRef();

    const toggleDropDown = () => setDropDown((prev) => !prev);

    useEffect(() => {
        const handler = (e) => {
            if (dropDown && dropDownRef.current && !dropDownRef.current.contains(e.target))
                setDropDown(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [dropDown]);

    return (
        <div ref={dropDownRef} className="user nav-item">
            <FaUserCircle onClick={toggleDropDown} />
            {dropDown && (
                <div className="dropdown">
                    <Link
                        onClick={toggleDropDown}
                        to={`/profile/dashboard?user=${userName}`}
                        className="dropdown-items"
                    >
                        <div className="dropdown-logo">
                            <RiUser3Line />
                        </div>
                        <div className="dropdown-title">My Profile</div>
                    </Link>
                    <Link onClick={toggleDropDown} to="/profile/edit" className="dropdown-items">
                        <div className="dropdown-logo">
                            <BiPencil />
                        </div>
                        <div className="dropdown-title">Edit Profile</div>
                    </Link>
                    <div onClick={logOut} className="dropdown-items">
                        <div className="dropdown-logo">
                            <BiLogOut />
                        </div>
                        <div className="dropdown-title">Logout</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDown;
