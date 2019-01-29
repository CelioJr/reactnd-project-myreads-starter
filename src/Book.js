import React, {Component} from 'react'

class Book extends Component {

    render(){
        const { data, handleSelect } = this.props;

        return(
            <li>
                <div className="book">
                        <div className="book-top">
                            <div className="book-cover" 
                                style={{ width: 128, height: 193, backgroundImage: `url("${data.imageLinks.smallThumbnail}")` }}></div>
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
                            <div className="book-title">{data.title}}</div>
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
    }
}

export default Book;