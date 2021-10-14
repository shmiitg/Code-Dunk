import React from 'react'
import { Link } from 'react-router-dom'

const Problem = (props) => {
    const { title, image } = props;
    return (
        <Link to="/problems/programming">
            <div className="panel-card">
                <div className="course-title">{title}</div>
                <div className="course-image">
                    <img src={image} />
                </div>
            </div>
        </Link>
    )
}

export default Problem
