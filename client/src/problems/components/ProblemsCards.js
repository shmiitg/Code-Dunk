import { Link } from 'react-router-dom';
import dsa from '../../images/dsa.svg';
import { slug } from '../../hooks and functions/Slug';

const ProblemsCard = ({ problems }) => {

    return (
        <div className="main-card">
            <div className="problem-cards">
                {problems.map((problem, index) => (
                    <div key={index} className="problem-single-card">
                        <div className="problem-card-top">
                            <div className="problem-card-img">
                                <img src={dsa} alt="dsa logo" />
                            </div>
                            <div className="problem-card-content">
                                <div className="problem-link">
                                    <Link to={`/problems/${slug(problem.topic)}`}>{problem.topic}</Link>
                                </div>
                                <div className="problem-question-count">Total questions: {problem.questions.length}</div>
                            </div>
                        </div>
                        <div className="problem-progress">
                            {
                                problem.solved ? problem.solved === problem.questions.length ?
                                    'Completed' :
                                    <div className="bar">
                                        <div style={{ width: `${problem.solved * 100 / problem.questions.length}%` }} className="current-bar"></div>
                                    </div>
                                    : 'Not started yet'
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProblemsCard
