import React from 'react'

const NewBlog = ({ handleNewBlogFieldChange, addBlog, newTitle, newAuthor, newUrl }) => (
    <div>
        <h2>create new</h2>

        <div>
            title
            <input
                name="title"
                value={newTitle}
                onChange={handleNewBlogFieldChange}
            />
        </div>

        <div>
            author
            <input
                name="author"
                value={newAuthor}
                onChange={handleNewBlogFieldChange}
            />
        </div>

        <div>
            url
            <input
                name="url"
                value={newUrl}
                onChange={handleNewBlogFieldChange}
            />
        </div>

        <button onClick={addBlog}>create</button>

    </div>
)

export default NewBlog