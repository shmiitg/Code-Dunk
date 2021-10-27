import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../images/logo.png';
import { UserContext } from '../context/UserContext';
import Loading from '../loading/Loading';
import './Auth.css'

const Login = () => {
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [user, setUser] = useState({ key: '', password: '' })
    const handleLoginInput = e => setUser({ ...user, [e.target.name]: e.target.value });
    const { setUserName } = useContext(UserContext);
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
            setUserName(data.userName);
        } else {
            window.alert(data.error);
        }
    }

    const fetchData = async () => {
        const res = await fetch('/user/info');
        setLoading(false);
        if (res.status === 200) {
            history.push('/');
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (loading) return <Loading />
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
