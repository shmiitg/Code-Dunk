import React, { useState, useEffect } from 'react';
import moment from 'moment';

const RunningContest = ({ status, setStatus, index, title, startTime, duration }) => {
    const [starts, setStarts] = useState(' ');
    const date = moment(startTime).format('MMM DD, YYYY');
    const start = moment(startTime).format('h:mm A');
    const end = findEndTime(start, duration);

    function findEndTime(str, dur) {
        const arr = str.split(':');
        let hr = parseInt(arr[0]);
        let min = parseInt(arr[1].substr(0, 2));
        let meridian = arr[1].substr(3);
        hr += dur.h;
        min += dur.m;
        if (min >= 60) {
            hr++; min -= 60;
        }
        if (hr >= 12) {
            if (hr > 12) hr -= 12;
            meridian = 'PM';
        }
        if (min < 10) min = '0' + min;
        const ans = hr + ':' + min + ' ' + meridian;
        return ans;
    }

    function timeLeft() {
        let curr = new Date().getTime();
        let start = new Date(startTime).getTime();
        let end = start + (duration.h * 60 + duration.m) * 60 * 1000;
        const distance = end - curr;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (days >= 1) setStarts(days + ' days');
        else if (days === 1) setStarts(days + ' day');
        else if (hours > 1) setStarts(hours + ' hours');
        else if (hours === 1) setStarts(hours + ' hour');
        else if (minutes > 1) setStarts(minutes + ' minutes');
        else if (minutes === 1) setStarts(minutes + ' minute');
        else if (seconds >= 1) setStarts(' less than a minute');
        else {
            setStatus(true);
        }
    }

    useEffect(() => {
        timeLeft();
        const interval = setInterval(timeLeft, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="nc-card">
            <div className="nc-time">Contest Started</div>
            <div className="nc-name">{title}</div>
            <div className="nc-date">{date} @ {start} - {end}</div>
            <div className="nc-ends">{`Ends in ${starts}`}</div>
        </div>
    )
}

export default RunningContest
