import React, { useEffect } from 'react';

const EditForm = ({ name, title, input_desc_name, desc_name, desc, content, handleInput, save, cancel }) => {
    useEffect(() => {
        const autoExpand = (field) => {
            // Reset field height
            field.style.height = 'inherit';
            // Get the computed styles for the element
            var computed = window.getComputedStyle(field);
            // Calculate the height
            var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                + field.scrollHeight
                + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

            field.style.height = height + 'px';
        };
        document.addEventListener('input', (e) => {
            if (e.target.tagName.toLowerCase() !== 'textarea') return;
            autoExpand(e.target);
        }, false);
    }, [])

    return (
        <div>
            <div className="container">
                <div className="blog-container">
                    <div className="blog-heading">
                        <div className="blog-heading-title">{name}</div>
                    </div>
                    <form method="POST" className="post-form">
                        <div className="post-form-field">
                            <label htmlFor="title">Title</label>
                            <input required value={title} onChange={handleInput} autoComplete="off" name="title" />
                        </div>
                        <div className="post-form-field">
                            <label htmlFor={input_desc_name} >{desc_name}</label>
                            <input required value={desc} onChange={handleInput} autoComplete="off" name={input_desc_name} />
                        </div>
                        <div className="post-form-field">
                            <label htmlFor="content">Content</label>
                            <textarea required onChange={handleInput} defaultValue={content} name="content"></textarea>
                        </div>
                    </form>
                    <div className="post-write">
                        <div className="post-write-btn" onClick={save}>Save</div>
                        <div className="post-cancel-btn" onClick={cancel}>Cancel</div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default EditForm
