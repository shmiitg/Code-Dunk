import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../loading/Loading";
import classes from "./EditProfile.module.css";

const EditProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const countries = ["Australia", "England", "India", "Pakistan", "South Africa"];

    const handleInput = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const fetchData = async () => {
        const res = await fetch("/user/info");
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            setUser(data.user);
        } else {
            navigate("/login");
        }
    };

    const saveDetail = async () => {
        const { username, name, education, gender, location, birthday } = user;
        const res = await fetch("/user/edit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, name, education, gender, location, birthday }),
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
        } else {
            window.alert(data.error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Loading />;
    return (
        <div className={classes["profile-edit-container"]}>
            <div className={classes["profile-edit-card"]}>
                <div className={classes["profile-header"]}>
                    <h1>Personal Information</h1>
                    <div className={classes["edit-btn"]}>
                        <button onClick={saveDetail}>Update</button>
                    </div>
                </div>
                <div className={classes["col"]}>
                    <div className={classes["type-1"]}>
                        <div className={classes["col-placeholder"]}>name</div>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleInput}
                            value={user.name}
                        />
                    </div>
                    <div className={classes["type-1"]}>
                        <div className={classes["col-placeholder"]}>education</div>
                        <input
                            type="text"
                            placeholder="Education"
                            name="education"
                            onChange={handleInput}
                            value={user.education}
                        />
                    </div>
                    <div className={classes["type-1"]}>
                        <div className={classes["col-placeholder"]}>gender</div>
                        <select name="gender" onChange={handleInput}>
                            <option value="" selected={user.country === "Your gender"}>
                                --Your Gender--
                            </option>
                            <option value="Male" selected={user.gender === "Male"}>
                                Male
                            </option>
                            <option value="Female" selected={user.gender === "Female"}>
                                Female
                            </option>
                        </select>
                    </div>
                    <div className={classes["type-1"]}>
                        <div className={classes["col-placeholder"]}>birthday</div>
                        <input
                            type="date"
                            placeholder="Select date"
                            name="birthday"
                            onChange={handleInput}
                            value={user.birthday}
                        />
                    </div>
                    <div className={classes["type-1"]}>
                        <div className={classes["col-placeholder"]}>location</div>
                        <select name="location" onChange={handleInput}>
                            <option value="" selected={user.country === "Your location"}>
                                --Select Location--
                            </option>
                            {countries.map((location, index) => (
                                <option
                                    key={index}
                                    value={location}
                                    selected={user.location === location}
                                >
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
