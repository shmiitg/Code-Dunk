import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import logo from '../images/logo.png';

const Register = () => {
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [user, setUser] = useState({ username: '', email: '', password: '', cpassword: '' })
    const handleInput = e => setUser({ ...user, [e.target.name]: e.target.value });
    const { setUserName } = useContext(UserContext);

    const handleClick = async () => {
        const { username, email, password, cpassword } = user;
        const res = await fetch('/auth/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, cpassword })
        });
        const data = await res.json();
        if (res.status === 200) {
            setUserName(data.userName);
            history.push('/');
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

    if (loading) return <></>
    return (
        <div className="container">
            <div className="form-container">
                <div className="form-logo">
                    <img src={logo} alt="logo" />
                </div>
                <form id="register" method="POST">
                    <div className="form-fields">
                        <input name="username" type="text" className="form-control" id="name" placeholder="Username"
                            autoComplete="off" value={user.username} onChange={handleInput} />
                    </div>
                    <div className="form-fields">
                        <input name="email" type="email" className="form-control" id="email" placeholder="E-mail"
                            autoComplete="off" value={user.email} onChange={handleInput} />
                    </div>
                    <div className="form-fields">
                        <input name="password" type="password" className="form-control" id="password"
                            placeholder="Password" autoComplete="off" value={user.password} onChange={handleInput} />
                    </div>
                    <div className="form-fields">
                        <input name="cpassword" type="password" className="form-control" id="cpassword"
                            placeholder="Confirm Password" autoComplete="off" value={user.cpassword} onChange={handleInput} />
                    </div>
                </form>
                <button className="btn-account" onClick={handleClick}>Submit</button>
                <div className="account-toggle">
                    <p>Have an account?</p><Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
