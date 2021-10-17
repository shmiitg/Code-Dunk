import React from 'react'

const Problems = ({ easy, medium, hard }) => {
    return (
        <div className="right-card dashboard-card">
            <div className="right-card-top">
                <div className="problems">
                    <div className="r1css">Problems Solved</div>
                    <div className="r2css">{easy + medium + hard}</div>
                </div>
            </div>
            <div className="right-card-bottom">
                <div className="easy">
                    <div className="r3css">Easy</div>
                    <div className="r4css">{easy}</div>
                </div>
                <div className="medium">
                    <div className="r3css">Medium</div>
                    <div className="r4css">{medium}</div>
                </div>
                <div className="hard">
                    <div className="r3css">Hard</div>
                    <div className="r4css">{hard}</div>
                </div>
            </div>
        </div>
    )
}

export default Problems
