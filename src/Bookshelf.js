import React, {Component} from 'react';
import Book from './Book';

class Bookshelf extends Component{
    render(){
      const { title, books = [], handleSelect } = this.props;
        return(
            <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.map(book => (
                    <Book 
                      key={book.id} 
                      data={book}
                      handleSelect={handleSelect}/>
                ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default Bookshelf;