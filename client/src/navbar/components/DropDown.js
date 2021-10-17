import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { RiUser3Line } from 'react-icons/ri';
import { BiPencil, BiLogOut } from 'react-icons/bi';

const DropDown = ({ toggleDropDown, setDropDown }) => {
    const history = useHistory();
    const { userName, setUserName } = useContext(UserContext);

    const logOut = async () => {
        const res = await fetch('/auth/logout');
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            setDropDown(prev => !prev);
            history.push('/login');
            setUserName('Account');
        } else {
            window.alert(data.error);
        }
    }

    return (
        <div className="dropdown">
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
        </div>
    )
}

export default DropDown
