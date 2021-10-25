import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import moment from 'moment';
import Loading from '../loading/Loading';
import ReadPost from '../components/post/ReadPost';

const ReadBlog = () => {
    const history = useHistory();
    const location = useLocation();
    const link = location.pathname.split('/')[3];
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState({ title: '', description: '', content: '', author: '' });
    const [date, setDate] = useState('');
    const fetchBlog = async () => {
        const res = await fetch(`/api/blog/read/${link}`);
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            setBlog(data.blog);
            setDate(moment(data.blog.createdAt).format('MMM DD, YYYY'));
        } else if (res.status === 404) {
            history.push('/blogs');
        } else {
            window.alert(data.error);
        }
    }

    const deleteBlog = async () => {
        const res = await fetch(`/api/blog/delete/${link}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.msg);
            history.push('/blogs');
        } else {
            window.alert(data.error);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, [link])

    if (loading) return (<Loading />)
    return (
        <ReadPost
            type="blog"
            title={blog.title}
            desc={blog.description}
            author={blog.author}
            date={date}
            content={blog.content}
            link={blog.link}
            del={deleteBlog}
        />
    )
}

export default ReadBlog
