import React, { useEffect } from 'react';
const ProgressBar = require('progressbar.js');

const Progress = ({ total, done, days }) => {

    const onLoad = () => {
        const progressBar =
            new ProgressBar.Circle('#progress', {
                color: '#655ea1',
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
        <div className="sidebar-card">
            <div className="sidebar-card-heading">Progress</div>
            <div className="progress-card">
                <div className="box">
                    <div className="progress" id="progress">
                        <div className="inner">
                            {done === 0 && 'Not yet started'}
                            {done !== 0 && done * 100 / total}
                            {done !== 0 && '%'}
                        </div>
                    </div>
                </div>
                <div className="problem-statistics">
                    <div className="stats">
                        <div className="stats-left">Solved </div>
                        <div className="stats-right">{done}/{total}</div>
                    </div>
                    <div className="stats">
                        <div className="stats-left">Days left </div>
                        <div className="stats-right">{days === 0 ? '-' : days}</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Progress
