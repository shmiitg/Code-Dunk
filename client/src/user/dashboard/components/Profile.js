import React from "react";
import styles from "./Profile.module.css";
import { IoLocationSharp } from "react-icons/io5";
import { FaGraduationCap, FaGithub } from "react-icons/fa";

const Profile = ({ name, username, location, education }) => {
    return (
        <div className={styles["profile-container"]}>
            <div className={styles["profile-card"]}>
                <div className={styles["profile-image"]}>
                    <img
                        src={`https://avatars.dicebear.com/api/open-peeps/${username}.svg`}
                        alt="avatar"
                    />
                </div>
                <div className={styles["profile-name"]}>{name ? name : "Not avaiable"}</div>
                <div className={styles["profile-info"]}>
                    <div className={styles["profile-svgs"]}>
                        <div className={styles["profile-svg"]}>
                            <IoLocationSharp />
                        </div>
                        <div className={styles["profile-svg"]}>
                            <FaGraduationCap />
                        </div>
                    </div>
                    <div className={styles["profile-fields"]}>
                        <div className={styles["profile-field"]}>
                            {location ? location : "Not avaiable"}
                        </div>
                        <div className={styles["profile-field"]}>
                            {education ? education : "Not avaiable"}
                        </div>
                    </div>
                </div>
                <div className={styles["profile-bio"]}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt iusto tempore
                    quis sit omnis sunt eligendi fuga non, suscipit nam!
                </div>
                <div className={styles["profile-social"]}>
                    <div className={styles["profile-social-heading"]}>Get Connected</div>
                    <div className={styles["profile-social-icons"]}>
                        <a target="_blank" href={`https://github.com/${name}`}>
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
