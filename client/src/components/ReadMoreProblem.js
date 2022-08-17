import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ReadMoreProblem.css";

const ReadMoreProblem = ({ title, difficulty, statement, link }) => {
    const [mobile, setMobile] = useState(false);
    const readMore = (description) => {
        let desc = description.slice(0, 250);
        if (window.innerWidth <= 550) {
            desc = description.slice(0, 150);
        }
        desc += "...";
        return desc;
    };

    const setMobileView = () => {
        if (window.innerWidth <= 550) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    };
    useEffect(() => {
        window.addEventListener("resize", setMobileView);
        return () => window.removeEventListener("resize", setMobileView);
    }, [mobile]);

    return (
        <div className="problem-rm-card">
            <div className="problem-rm-1">
                <div className="problem-rm-title">{title}</div>
                <div className="problem-rm-difficulty">{difficulty}</div>
            </div>
            <div className="problem-rm-2">
                <div className="problem-rm-description">
                    {readMore(statement)}
                    <Link to={link}> Read More</Link>
                </div>
            </div>
        </div>
    );
};

export default ReadMoreProblem;
