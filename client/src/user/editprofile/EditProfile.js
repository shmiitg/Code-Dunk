import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../loading/Loading';
import avatar from '../../images/avatar.jpg';
import "./EditProfile.css";

const EditProfile = () => {
    const [loading, setLoading] = useState(true);
    const [editName, setEditName] = useState(false);
    const [editGender, setEditGender] = useState(false);
    const [editLocation, setEditLocation] = useState(false);
    const [details, setDetails] = useState({ username: '', name: '', gender: '', location: '', birthday: '', education: '' })

    const [countries, setCountries] = useState(['Australia', 'England', 'India', 'Pakistan', 'South Africa'])

    const handleInput = e => setDetails({ ...details, [e.target.name]: e.target.value });

    const editData = async () => {
        const res = await axios.get('/user/info');
        const data = await res.data;
        if (res.status === 200) {
            setDetails(data.user);
        } else {
            window.alert(data.error)
        }
    }

    const fetchData = async () => {
        const res = await axios.get('/user/info');
        const data = await res.data;
        setLoading(false);
        if (res.status === 200) {
            setDetails(data.user);
        } else {
            window.alert(data.error)
        }
    }

    const editNameBtn = () => {
        editData();
        setEditName(true);
        setEditGender(false);
        setEditLocation(false);
    }

    const editGenderBtn = () => {
        editData();
        setEditGender(true);
        setEditName(false);
        setEditLocation(false);
    }

    const editLocationBtn = () => {
        editData();
        setEditLocation(true);
        setEditName(false);
        setEditGender(false);
    }

    const saveDetail = async () => {
        const { username, name, gender, location, birthday, education } = details;
        const res = await fetch('/user/edit', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, name, gender, location, birthday, education })
        });
        const data = await res.json();
        if (res.status === 200) {
            setEditName(false);
            setEditGender(false);
            setEditLocation(false);
        } else {
            window.alert(data.error);
        }
    }

    const cancelDetail = () => {
        editData();
        setEditName(false);
        setEditGender(false);
        setEditLocation(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (<Loading />)
    return (
        <div className="container">
            <div className="user-container">
                <div className="main">
                    <div className="main-card">
                        <div className="edit-list">
                            <div className="edit-card">
                                {!editName ?
                                    <div className="edit-info">
                                        <div className="edit-info-left">
                                            <div className="edit-title">Name</div>
                                            <div className="edit-desc">{details.name}</div>
                                        </div>
                                        <div className="edit-info-right">
                                            <div className="edit-btn" onClick={editNameBtn}>Edit</div>
                                        </div>
                                    </div>
                                    :
                                    <div className="edit-info">
                                        <div className="edit-info-left">
                                            <div className="edit-title">Name</div>
                                            <div className="edit-form">
                                                <input name="name" type="text" autoComplete="off" value={details.name} onChange={handleInput} />
                                                <div className="edit-form-btn">
                                                    <div className="save-btn btn" onClick={saveDetail}>Save</div>
                                                    <div className="cancel-btn btn" onClick={cancelDetail}>Cancel</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="edit-card">
                                {!editGender ?
                                    <div className="edit-info">
                                        <div className="edit-info-left">
                                            <div className="edit-title">Gender</div>
                                            <div className="edit-desc">{details.gender}</div>
                                        </div>
                                        <div className="edit-info-right">
                                            <div className="edit-btn" onClick={editGenderBtn}>Edit</div>
                                        </div>
                                    </div>
                                    :
                                    <div className="edit-info">
                                        <div className="edit-info-left">
                                            <div className="edit-title">Gender</div>
                                            <div className="edit-form">
                                                <select name="gender" onChange={handleInput}>
                                                    <option value="Not provided" selected={details.gender === 'Not provided'}>Select..</option>
                                                    <option value="Male" selected={details.gender === 'Male'}>Male</option>
                                                    <option value="Female" selected={details.gender === 'Female'}>Female</option>
                                                </select>
                                                <div className="edit-form-btn">
                                                    <div className="save-btn btn" onClick={saveDetail}>Save</div>
                                                    <div className="cancel-btn btn" onClick={cancelDetail}>Cancel</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="edit-card">
                                {!editLocation ?
                                    <div className="edit-info">
                                        <div className="edit-info-left">
                                            <div className="edit-title">Location</div>
                                            <div className="edit-desc">{details.location}</div>
                                        </div>
                                        <div className="edit-info-right">
                                            <div className="edit-btn" onClick={editLocationBtn}>Edit</div>
                                        </div>
                                    </div>
                                    :
                                    <div className="edit-info">
                                        <div className="edit-info-left">
                                            <div className="edit-title">Location</div>
                                            <div className="edit-form">
                                                <select name="location" onChange={handleInput}>
                                                    <option value="Your location" selected={details.location === 'Your location'}>Select..</option>
                                                    {countries.map((country, index) => (
                                                        <option key={index} value={country} selected={details.location === country}>{country}</option>
                                                    ))}
                                                </select>
                                                <div className="edit-form-btn">
                                                    <div className="save-btn btn" onClick={saveDetail}>Save</div>
                                                    <div className="cancel-btn btn" onClick={cancelDetail}>Cancel</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sidebar">
                    <div className="sidebar-card">
                        <div className="main-info">
                            <div className="profile-pic">
                                <img src={avatar} alt="" />
                            </div>
                            <div className="basic-info">
                                <div className="name">{details.name}</div>
                                <div className="id">{details.username}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EditProfile
