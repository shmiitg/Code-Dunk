import React, { useEffect } from 'react';
import styles from './Progress.module.css';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = require('progressbar.js');

const Progress = ({ total, done, days }) => {
    const onLoad = () => {
        const progressBar =
            new ProgressBar.Circle('#progress', {
                color: '#008181',
                strokeWidth: 15,
                duration: 2000, // milliseconds
                easing: 'easeInOut'
            });
        progressBar.animate(done / total); // percent
    };

    useEffect(() => {
        onLoad();
    }, [])

    return (
        <div className={styles["progress-container"]}>
            <div className={styles["progress-heading"]}>Progress</div>
            <div className={styles["progress-card"]}>
                <div className={styles["box"]}>
                    <div className={styles["progress"]} id="progress">
                        <div className={styles["bg"]}></div>
                        <div className={styles["inner"]}>
                            {done === 0 && 'Not yet started'}
                            {done !== 0 && done * 100 / total}
                            {done !== 0 && '%'}
                        </div>
                    </div>
                </div>
                <div className={styles["problem-statistics"]}>
                    <div className={styles["stats"]}>
                        <div className={styles["stats-left"]}>Solved </div>
                        <div className={styles["stats-right"]}>{done}/{total}</div>
                    </div>
                    <div className={styles["stats"]}>
                        <div className={styles["stats-left"]}>Days left </div>
                        <div className={styles["stats-right"]}>{days === 0 ? '-' : days}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Progress
