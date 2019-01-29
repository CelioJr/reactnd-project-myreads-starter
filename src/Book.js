import React, {Component} from 'react'
import PropTypes from 'prop-types'

const Book = props => {
        const { data, handleSelect } = props;

        return(
            <li>
                <div className="book">
                        <div className="book-top">
                            {data.imageLinks !== undefined ? (
                                <a href={data.previewLink} target="_blank" rel="noopener noreferrer">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${data.imageLinks.thumbnail}')` }}></div>
                                </a>
                                ) : (
                                <a href={data.previewLink} target="_blank" rel="noopener noreferrer">
                                    <div className="book-cover" style={{ width: 128, height: 193 }}></div>
                                </a>
                            )}
                            <div className="book-shelf-changer">
                                <select value={data.shelf !== undefined ? data.shelf : 'none'}
                                onChange={(e) => handleSelect(data, e.target)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        {data.title !== undefined ? (
                            <div className="book-title">{data.title}</div>
                        ) : (
                            <div className='book-title'>Untitled</div>
                        )}
                        { data.authors !== undefined ? (
                            data.authors.map(author => (
                                <div key={author} className="book-authors">{author}</div>))
                        ) : (
                            <div className="book-authors"></div>
                        )}
                </div>
             </li>
        )
};

export default Book;

Book.propTypes = {
    data: PropTypes.object.isRequired,
    handleSelect: PropTypes.func.isRequired
}