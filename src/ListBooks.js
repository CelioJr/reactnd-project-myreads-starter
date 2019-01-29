import React from 'react'
import {Link} from 'react-router-dom'
import Bookshelf from './Bookshelf'

import './App.css'

class ListBooks extends React.Component{

  state = {
    bookshelfs: [
      {title: 'Currently Reading', shelf:'currentlyReading'},
      {title: 'Want To Read', shelf:'wantToRead'},
      {title: 'read', shelf:'read'},
    ],
  }

  booksFiltered = shelf => ( 
    shelf === ''
    ? this.props.books 
    : this.props.books.filter(b => (
      b.shelf.toLowerCase() === shelf.toLowerCase()
    ))
  )
    render(){

      const { handleSelect } = this.props;
      
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.bookshelfs.map(bookshelf => (
                  <Bookshelf 
                    key={bookshelf.shelf}
                    title={bookshelf.title}
                    books={this.booksFiltered(bookshelf.shelf)}
                    handleSelect={handleSelect}
                    />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link 
              to='/search'>
                <button to='/search'>Add a book</button>
              </Link>
            </div>

          </div>
        )
    }
}

export default ListBooks;