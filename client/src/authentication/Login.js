import React, { useContext, useState, useEffect } from 'react';
import './Auth.css'
import { Link, useHistory } from 'react-router-dom';
import logo from '../images/programming.png';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const history = useHistory();
    const [user, setUser] = useState({ key: '', password: '' })
    const handleLoginInput = e => setUser({ ...user, [e.target.name]: e.target.value });
    const { fetchData } = useContext(UserContext);
    const userLogin = async () => {
        const { key, password } = user;
        const res = await fetch('/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, password })
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            history.push('/');
            fetchData();
        } else {
            window.alert(data.error);
        }
    }
    return (
        <div className="container">
            <div className="form-container">
                <div className="form-logo">
                    <img src={logo} alt="logo" />
                </div>
                <form id="login" method="POST">
                    <div className="form-fields">
                        <input name="key" type="text" className="form-control" id="key" placeholder="Username or E-mail"
                            autoComplete="off" value={user.key} onChange={handleLoginInput} />
                    </div>
                    <div className="form-fields">
                        <input name="password" type="password" className="form-control" id="password"
                            placeholder="Password" autoComplete="off" value={user.password} onChange={handleLoginInput} />
                    </div>
                </form>
                <button className="btn-account" onClick={userLogin}>Submit</button>
                <div className="account-toggle">
                    <p>No account?</p><Link to="/register">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
