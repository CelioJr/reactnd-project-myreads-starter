import React from 'react'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import * as BookAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BookAPI.getAll()
      .then(books => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateBook = (book, shelf) => {
    BookAPI.update(book, shelf)
      .then(() => {
        const books = this.state.books.filter(curBook => curBook.id === book.id);
        if(books.length === 0) { // If don't have book
          this.setState(curState => ({
            books: curState.books.concat(book)
          }));
        } else {
          const newBooks = this.state.books.map(book => {
            if(book.id === books[0].id) book.shelf = shelf;
            return book;
          });
          this.setState(() => ({
            books: newBooks
          }));
        };
      });
  };

  handleSelect = (book, target) => {
    book.shelf = target.value;
    this.updateBook(book, target.value);
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks 
            books={this.state.books}
            updateBook={this.updateBook}
            handleSelect={this.handleSelect}/>
        )} />

        <Route path='/search' render={()=>(
            <SearchBooks 
              handleSelect={this.handleSelect}
              books={this.state.books}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp
