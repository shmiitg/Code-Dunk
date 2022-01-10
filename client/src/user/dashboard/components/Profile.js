import React from 'react';
import styles from './Profile.module.css';
import logo from '../../../images/avatar_image.png'

const Profile = ({ problems, name, location, education }) => {
    return (
        <div className={styles["profile-container"]}>
            <div className={styles["profile-card"]}>
                <div className={styles["profile-info"]}>
                    <div className={styles["profile-name"]}>{name}</div>
                    <div className={styles["profile-location"]}>{location}</div>
                </div>
                <div className={styles["profile-education"]}>{education}</div>
                <div className={styles["line"]}></div>
                <div className={styles["profile-problems"]}>
                    <div className={styles["problem-types"]}>
                        <div className={styles["problem-type"]}>Easy</div>
                        <div className={styles["problem-count"]}>{problems[0]}</div>
                    </div>
                    <div className={styles["problem-types"]}>
                        <div className={styles["problem-type"]}>Medium</div>
                        <div className={styles["problem-count"]}>{problems[1]}</div>
                    </div>
                    <div className={styles["problem-types"]}>
                        <div className={styles["problem-type"]}>Hard</div>
                        <div className={styles["problem-count"]}>{problems[2]}</div>
                    </div>
                </div>
                <div className={styles["line"]}></div>
                <div className={styles["profile-bio"]}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae laborum corrupti tenetur veniam sequi ipsa deserunt veritatis possimus? A, sapiente.
                </div>
            </div>
        </div>
    )
}

export default Profile
