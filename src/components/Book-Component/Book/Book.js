import React from 'react';
import BookShelfChanger from "../BookShelfChanger/BookShelfChanger";

const Book = ({ book, shelf, onMove }) => (
    <li>
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${
                            book.imageLinks
                                ? book.imageLinks.thumbnail
                                : 'assets/book-placeholder.svg'
                        })`
                    }}
                />
                <BookShelfChanger book={book} shelf={shelf} onMove={onMove} />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
                {book.authors ? book.authors.join(', ') : 'Unknown Author'}
            </div>
        </div>
    </li>
);

export default Book;
