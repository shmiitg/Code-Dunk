import React from 'react'

const Rating = ({ rating, ranking, contests }) => {
    return (
        <div className="right-card dashboard-card">
            <div className="right-card-top">
                <div className="rating">
                    <div className="r1css">Contest Rating</div>
                    <div className="r2css">{rating}</div>
                </div>
            </div>
            <div className="right-card-bottom">
                <div className="rankings">
                    <div className="r3css">Ranking</div>
                    <div className="r4css">{ranking}</div>
                </div>
                <div className="contests">
                    <div className="r3css">Attended</div>
                    <div className="r4css">{contests}</div>
                </div>
            </div>
        </div>
    )
}

export default Rating
