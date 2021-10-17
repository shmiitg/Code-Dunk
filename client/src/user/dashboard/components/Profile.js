import React from 'react'

const Profile = ({ name, username, location, education, skills }) => {
    return (
        <div className="profile-card dashboard-card">
            <div className="about">
                <div className="user-name">{name}</div>
                <div className="user-id">{username}</div>
            </div>
            <div className="profile-item">
                <div>Location</div>
                <div>{location}</div>
            </div>
            <div className="profile-item">
                <div>Education</div>
                <div>{education}</div>
            </div>
            <div className="profile-item">
                <div>Skills</div>
                <div>{skills}</div>
            </div>
        </div>
    )
}

export default Profile
