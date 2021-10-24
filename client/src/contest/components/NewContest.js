import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './NewContest.css';

const NewContest = ({ title, startTime, duration, dateNow }) => {
    const [starts, setStarts] = useState('');
    const [started, setStarted] = useState(false);
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
            hr++;
            min -= 60;
        }
        if (hr >= 12) {
            if (hr > 12) hr -= 12;
            meridian = 'PM';
        }
        const ans = hr + ':' + min + ' ' + meridian;
        return ans;
    }

    const daysLeft = () => {
        //check for days left
        let curr = moment(Date.now()).format('DD');
        let start = moment(startTime).format('DD');
        const daysLeft = start - curr;
        if (daysLeft > 1) {
            setStarts(daysLeft + ' days');
            return;
        } else if (daysLeft === 1) {
            setStarts(daysLeft + ' day');
            return;
        }

        //check for hours left
        curr = moment(Date.now()).format('hh A');
        start = moment(startTime).format('hh A');
        if (curr.substr(3) === 'PM') curr = parseInt(curr) + 12;
        else if (curr.substr(3) == 'AM' && curr.substr(0, 2) === '12') curr = parseInt(curr) - 12;
        curr = parseInt(curr);
        if (start.substr(3) === 'PM') start = parseInt(start) + 12;
        else if (start.substr(3) == 'AM' && start.substr(0, 2) === '12') start = parseInt(start) - 12;
        start = parseInt(start);
        const hrsLeft = start - curr;
        if (hrsLeft > 1) {
            setStarts(hrsLeft + ' hours');
            return;
        } else if (hrsLeft === 1) {
            setStarts(hrsLeft + ' hour');
            return;
        }

        //check for minutes left
        curr = moment(Date.now()).format('mm');
        start = moment(startTime).format('mm');
        const minLeft = start - curr;
        if (minLeft > 1) {
            setStarts(minLeft + ' minutes');
            return;
        } else if (minLeft === 1) {
            setStarts(minLeft + ' minute');
            return;
        }
        //check for seconds left
        curr = moment(Date.now()).format('ss');
        start = moment(startTime).format('ss');
        const secLeft = start - curr;
        if (secLeft > 1) {
            setStarts(secLeft + ' seconds');
            return;
        } else if (secLeft === 1) {
            setStarts(secLeft + ' second');
            return;
        }
        setStarted(true);
    }
    useEffect(() => {
        setInterval(daysLeft, 1000);
    }, [])

    return (
        <div className="nc-card">
            <div className="nc-time">{started ? 'Contest Started' : `Starts in ${starts}`}</div>
            <div className="nc-name">{title}</div>
            <div className="nc-date">{date} @ {start} - {end}</div>
            <div className="nc-register">Register</div>
        </div>
    )
}

export default NewContest
