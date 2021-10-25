import React from 'react';
import { Link } from 'react-router-dom';
import './ReadMoreProblem.css';

const ReadMoreProblem = ({ title, difficulty, description, link }) => {

    const readMore = (description) => {
        let desc = '';
        let whiteSpace = 0;
        for (let i = 0; i < description.length; i++) {
            if (description[i] === ' ') whiteSpace++;
            if (whiteSpace === 30) return desc;
            desc += description[i];
        }
        return desc;
    }

    return (
        <div className="problem-rm-card">
            <div className="problem-rm-1">
                <div className="problem-rm-title">{title}</div>
                <div className="problem-rm-difficulty">{difficulty}</div>
            </div>
            <div className="problem-rm-2">
                <div className="problem-rm-description">{readMore(description) + '...'} <Link to={link}>Read More</Link></div>
            </div>
        </div>
    )
}

export default ReadMoreProblem
