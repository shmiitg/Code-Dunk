import { Link } from 'react-router-dom';
import dsa from '../../images/dsa.svg';

const ProblemsCard = ({ problems }) => {

    function string_to_slug(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-') // collapse dashes
            .replace(/^-+/, '') // trim - from start of text
            .replace(/-+$/, ''); // trim - from end of text
        return str;
    }

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
                                    <Link to={`/problems/${string_to_slug(problem.topic)}`}>{problem.topic}</Link>
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
