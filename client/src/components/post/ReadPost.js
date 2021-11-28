import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './ReadPost.css';

const ReadPost = ({ type, title, desc, author, date, content, link, del }) => {
    const contentDivs = content.split('\n');

    return (
        <div className="container">
            <div className="container-lg">
                <div className="read-post-title">{title}</div>
                <div className="read-post-desc">{desc}</div>
                <div className="read-post-info">
                    <div className="read-post-info-left">
                        <div className="read-post-author"><Link to={`/profile/dashboard?user=${author}`}>{author}</Link></div>
                        <div className="read-post-date">{date}</div>
                    </div>
                    <div className="read-post-info-right">
                        <Link to={`/${type}/edit/${link}`} className="post-edit"><FaEdit /></Link>
                        <div onClick={del} className="post-delete"><MdDelete /></div>
                    </div>
                </div>
                <div className="read-post-content">
                    {contentDivs.map((cont, index) => (
                        <div className={cont === '' ? "post-lines line-break" : "post-lines"} key={index}>{cont}</div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default ReadPost
