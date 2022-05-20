import React, { useEffect } from "react";
import styles from "./Progress.module.css";

const ProgressBar = require("progressbar.js");

const Progress = ({ total, done, problems }) => {
    const onLoad = () => {
        const progressBar = new ProgressBar.Circle("#progress", {
            color: "#008181",
            strokeWidth: 15,
            duration: 2000, // milliseconds
            easing: "easeInOut",
        });
        progressBar.animate(done / total); // percent
    };

    function roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <div className={styles["progress-container"]}>
            <div className={styles["progress-heading"]}>Progress</div>
            <div className={styles["progress-card"]}>
                <div className={styles["box"]}>
                    <div className={styles["progress"]} id="progress">
                        <div className={styles["bg"]}></div>
                        <div className={styles["inner"]}>
                            {done === 0 && "Not yet started"}
                            {done !== 0 && roundToTwo((done * 100) / total)}
                            {done !== 0 && "%"}
                        </div>
                    </div>
                </div>
                <div className={styles["problem-statistics"]}>
                    <div className={styles["stats__1"]}>
                        <div className={styles["stats-left"]}>Solved</div>
                        <div className={styles["stats-right"]}>
                            {done}/{total}
                        </div>
                    </div>
                    <div className={styles["stats__2"]}>
                        <div className={styles["stats-left"]}>Easy</div>
                        <div className={styles["stats-right"]}>{problems[0]}</div>
                    </div>
                    <div className={styles["stats__2"]}>
                        <div className={styles["stats-left"]}>Medium</div>
                        <div className={styles["stats-right"]}>{problems[1]}</div>
                    </div>
                    <div className={styles["stats__2"]}>
                        <div className={styles["stats-left"]}>Hard</div>
                        <div className={styles["stats-right"]}>{problems[2]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Progress;
