import React, {Component} from 'react'
import DebounceInput from 'react-debounce-input';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class SearchBooks extends Component {

  state = {
    query: '',
    booksFiltered: []
  }

  OnUpdateQuery(query){
    if(query !== ''){
      this.setState(({ query: query }));
      const myBooks = this.props.books;

      if(this.state.query !== ''){
        BooksAPI.search(this.state.query)
        .then(books => {
          if(books !== undefined && books.length > 0){
            const booksFiltered = books.map(book => {
              const myBook = myBooks.filter(myBook => myBook.id === book.id);
              return myBook.length > 0 ? myBook[0] : book;
            })
            this.setState(({booksFiltered : booksFiltered}));
          }
        })
      }
    }else{
      this.setState(({ query: '', booksFiltered: [] }));
    }
  }

    render(){

      const { booksFiltered = [] } = this.state;
      const { handleSelect } = this.props;

        return(
            <div className="search-books">
            <div className="search-books-bar">
                <Link to='/'>
                    <button className="close-search">Close</button>  
                </Link>
              <div className="search-books-input-wrapper">
                <DebounceInput
                  debounceTimeout={600}
                  onChange={(e) => this.OnUpdateQuery(e.target.value)} 
                  type="text" 
                  placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              { booksFiltered.length > 0 &&(
                <ol className="books-grid">
                  {booksFiltered.map(book => (
                      <Book 
                        data={book}
                        handleSelect={handleSelect}
                      />
                  ))}
              </ol>
              )} 
            </div>
          </div>
        )
    }
}

export default SearchBooks;

SearchBooks.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}