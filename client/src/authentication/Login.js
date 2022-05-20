import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { UserContext } from "../context/UserContext";
import "./Auth.css";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ key: "", password: "" });
    const keyRef = useRef(null);
    const passwordRef = useRef(null);
    const submitRef = useRef(null);
    const handleLoginInput = (e) => setUser({ ...user, [e.target.name]: e.target.value });
    const { setUserName } = useContext(UserContext);

    function keyKeyDown(e) {
        if (e.keyCode === 13) {
            userLogin();
        }
        if (e.keyCode === 40) {
            passwordRef.current.focus();
        }
    }

    function passwordKeyDown(e) {
        if (e.keyCode === 13) {
            userLogin();
        }
        if (e.keyCode === 38) {
            keyRef.current.focus();
        }
        if (e.keyCode === 40) {
            submitRef.current.focus();
        }
    }

    function submitKeyDown(e) {
        if (e.keyCode === 38) {
            passwordRef.current.focus();
        }
    }

    const userLogin = async () => {
        const { key, password } = user;
        const res = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, password }),
        });
        const data = await res.json();
        if (res.status === 200) {
            setUserName(data.userName);
            navigate("/");
        } else {
            window.alert(data.error);
        }
    };

    useEffect(() => {
        if (keyRef.current) {
            keyRef.current.focus();
        }
    }, []);

    return (
        <div className="auth__container">
            <div className="form-container">
                <div className="form-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div id="login" method="POST">
                    <div className="form-fields">
                        <input
                            name="key"
                            type="text"
                            className="form-control"
                            id="key"
                            placeholder="Username or E-mail"
                            value={user.key}
                            onChange={handleLoginInput}
                            ref={keyRef}
                            onKeyDown={keyKeyDown}
                        />
                    </div>
                    <div className="form-fields">
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleLoginInput}
                            ref={passwordRef}
                            onKeyDown={passwordKeyDown}
                        />
                    </div>
                </div>
                <button
                    className="btn-account"
                    onClick={userLogin}
                    ref={submitRef}
                    onKeyDown={submitKeyDown}
                >
                    Submit
                </button>
                <div className="account-toggle">
                    <p>No account?</p>
                    <Link to="/register">Sign Up</Link>
                </div>
            </div>
        </div>
        // </div>
    );
};

export default Login;
