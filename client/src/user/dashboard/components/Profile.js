import React from "react";
import styles from "./Profile.module.css";

const Profile = ({ name, location, education }) => {
    return (
        <div className={styles["profile-container"]}>
            <div className={styles["profile-card"]}>
                <div className={styles["profile-info"]}>
                    <div className={styles["profile-name"]}>{name}</div>
                    <div className={styles["profile-location"]}>{location}</div>
                </div>
                <div className={styles["profile-education"]}>{education}</div>
            </div>
        </div>
    );
};

export default Profile;
