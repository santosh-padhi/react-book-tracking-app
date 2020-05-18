import React, {Component} from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import ListBooks from "./components/Book-Component/ListBook/ListBooks";
import SearchBooks from "./components/Search-Component/SearchBooks/SearchBooks";

const bookshelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' }
];

class App extends Component {

    state = {
        myBooks: [],
        searchBooks: []
    };

    componentDidMount = () => {
        BooksAPI.getAll()
            .then(books => {
                this.setState({ myBooks: books });
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: true });
            });
    };

    moveBook = (book, shelf) => {
        BooksAPI.update(book, shelf).catch(err => {
            console.log(err);
            this.setState({ error: true });
        });
        if (shelf === 'none') {
            this.setState(prevState => ({
                myBooks: prevState.myBooks.filter(b => b.id !== book.id)
            }));
        } else {
            book.shelf = shelf;
            this.setState(prevState => ({
                myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat(book)
            }));
        }
    };

    searchForBooks = (query => {
        if (query.length > 0) {
            BooksAPI.search(query).then(books => {
                if (books.error) {
                    this.setState({ searchBooks: [] });
                } else {
                    this.setState({ searchBooks: books });
                }
            });
        } else {
            this.setState({ searchBooks: [] });
        }
    });
    resetSearch = () => {
        this.setState({ searchBooks: [] });
    };

    render() {

        const { myBooks, searchBooks } = this.state;

        return (
            <div className="app">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <ListBooks
                            bookshelves={bookshelves}
                            books={myBooks}
                            onMove={this.moveBook}
                        />
                    )}
                />
                <Route
                    path="/search"
                    render={() => (
                        <SearchBooks
                            searchBooks={searchBooks}
                            myBooks={myBooks}
                            onSearch={this.searchForBooks}
                            onMove={this.moveBook}
                            onResetSearch={this.resetSearch}
                        />
                    )}
                />
            </div>
        );
    }
}

export default App;