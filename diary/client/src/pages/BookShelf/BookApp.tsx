import React, { useState, useEffect } from 'react';
import { Book } from '@entities/book/model/types';
import BookForm from '@features/book/BookForm';
import BookSearch from '@features/book/BookSearch';
import BookCard from '@features/book/BookCard';
import "./BookApp.scss";
import AuthorForm from '@features/book/AuthorForm';
import ChallengeWidget from '@features/book/chell/ChallengeWidget';
import UserProgressAndBookOfMonth from '@features/book/UserProgress/UserProgressAndBookOfMonth';

const LOCAL_STORAGE_API_KEY = 'my_bookshelf_api';
const LOCAL_STORAGE_CUSTOM_KEY = 'my_bookshelf_custom';
const WISH_BOOKS_COUNT = 5;
const FAVORITE_AUTHORS_COUNT = 5;

type Author = {
  id: string;
  name: string;
  photoUrl: string;
};

const BookApp: React.FC = () => {
  const [booksFromAPI, setBooksFromAPI] = useState<Book[]>([]);
  const [customBooks, setCustomBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [wishlist, setWishlist] = useState<Array<Book | null>>(Array(WISH_BOOKS_COUNT).fill(null));
  const [editingWishIndex, setEditingWishIndex] = useState<number | null>(null);  
  const [favoriteAuthors, setFavoriteAuthors] = useState<Array<Author | null>>(
    Array(FAVORITE_AUTHORS_COUNT).fill(null)
  );
  const [editingAuthorIndex, setEditingAuthorIndex] = useState<number | null>(null);
  
 
  // Загрузка данных из localStorage
  useEffect(() => {
    const storedApi = localStorage.getItem(LOCAL_STORAGE_API_KEY);
    if (storedApi) setBooksFromAPI(JSON.parse(storedApi));
    const storedCustom = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
    if (storedCustom) setCustomBooks(JSON.parse(storedCustom));
  }, []);

  // Сохраняем книги из поиска
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_API_KEY, JSON.stringify(booksFromAPI));
  }, [booksFromAPI]);
  // Сохраняем собственные книги
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify(customBooks));
  }, [customBooks]);

  /*Обработчики событий и функции*/

  // Обработчик выбора книги из поиска Google API
  const onBookSelect = (book: Book) => {
    setEditingBook(book);
  };

  // Функция удаления по id 
  const onDeleteBook = (book: Book) => {
    if (book.id.startsWith('custom-')) {
      setCustomBooks(prev => prev.filter(b => b.id !== book.id));
    } else {
      setBooksFromAPI(prev => prev.filter(b => b.id !== book.id));
    }
  };

  // Сохранение книги
  const onSaveBook = (book: Book) => {
    if (book.id.startsWith('custom-')) {
      setCustomBooks(prev => {
        const exists = prev.find(b => b.id === book.id);
        if (exists) return prev.map(b => (b.id === book.id ? book : b));
        return [...prev, book];
      });
    } else {
      setBooksFromAPI(prev => {
        const exists = prev.find(b => b.id === book.id);
        if (exists) return prev.map(b => (b.id === book.id ? book : b));
        return [...prev, book];
      });
    }
    setEditingBook(null);
  };

  // Кнопка "Добавить собственную книгу"
  const handleAddCustomBook = () => {
    const newBook: Book = {
      id: 'custom-' + Date.now().toString(),
      title: '',
      authors: [],
      pageCount: 0,
      coverUrl: '',
      description: '',
      status: 'wantToRead',
      comments: '',
    };
    setEditingBook(newBook);
  };

  // Открыть форму редактирования хотелки
  const handleEditWish = (index: number) => {
    setEditingBook(null);
    setEditingWishIndex(index);
  };  

  // Сохранить wanted book — после редактирования BookForm
  const handleSaveWishBook = (book: Book) => {
    setWishlist(prev => {
      const copy = [...prev];
      copy[editingWishIndex!] = book;
      return copy;
    });
    setEditingWishIndex(null);
  };
  
   // Отмена редактирования
   const handleCancelWish = () => {
    setEditingWishIndex(null);
  };

  const handleDeleteWish = (index: number) => {
    setWishlist(prev => {
      const arr = [...prev];
      arr[index] = null;
      return arr;
    });
    // Если сейчас редактируется эта книга — закрываем форму
    if (editingWishIndex === index) {
      setEditingWishIndex(null);
    }
  };
  
  return (
    <div className="book-app">
      <h1>My personal library</h1>

      {/*Kнижная полка*/}
      <div style={{marginBottom: '80px'}}>

        <div className='shelf-title'>
          <h2 style={{marginBottom: 0, fontSize: '55px'}}>Моя книжная полка</h2>
          <p style={{marginBottom: '20px', marginTop: 0, fontSize: '20px'}}>Есть ли книга, которую вы читаете?</p>
        </div>
        
        <div className='book-reading'>
          {/*Моя книжная полка */}
          <div className='book-shelf'>
            <h2>Добавить книгу из библиотеки</h2>
            {!editingBook && (
              <>
                <BookSearch onSelect={onBookSelect} />
                {booksFromAPI.length === 0 && <b style={{fontSize: '20px'}}>Пока нет записанных книг</b>}
                <ul className="book-list">
                  {booksFromAPI.map(book => (
                    <li key={book.id} className="book-list-item">
                      <BookCard
                        book={book}
                        onSelect={onBookSelect}
                        onDelete={onDeleteBook}
                        onClick={() => setEditingBook(book)}
                      />
                    </li>
                  ))}
                </ul>            
              </>
            )}
          </div>

          {/*Добавить собственную книгу*/}
          <div className='book-shelf'>
            <h2>Добавить собственную книгу</h2>
            {!editingBook && (
              <>
                <button
                  className='addbook-button'
                  onClick={handleAddCustomBook}
                >
                  Добавить собственную книгу
                </button>
                <ul className="book-list">
                  {customBooks.length === 0 && <b style={{fontSize: '20px'}}>Пока нет добавленных книг</b>}
                  {customBooks.map(book => (
                    <li key={book.id} className="book-list-item">
                      <BookCard
                        book={book}
                        onSelect={onBookSelect}
                        onDelete={onDeleteBook}
                        onClick={() => setEditingBook(book)}
                      />
                    </li>
                  ))}
                </ul>            
              </>
            )}

            {editingBook && (
              <div className="modal-blur">
                <div className="modal-center">
                  <BookForm
                    book={editingBook}
                    onSave={onSaveBook}
                    onCancel={() => setEditingBook(null)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/*Kнижные хотелки*/}
      <div style={{marginBottom: '80px'}}>
        <div className='shelf-title'>
          <h2 style={{marginBottom: 0, fontSize: '55px'}}>Мои хотелки</h2>
          <p style={{marginBottom: '20px', marginTop: 0, fontSize: '20px'}}>Книги, которые стоит прочитать позже)</p>
        </div>
    
          <div className='book-shelf'>
            <div className="wishlist-circles">
            {wishlist.map((wish, idx) => (
              <div className="wishlist-circle-wrapper" key={idx}>
                <button
                  className="wishlist-circle"
                  onClick={() => handleEditWish(idx)}
                  type="button"
                >
                  {wish && wish.coverUrl
                    ? <img src={wish.coverUrl} alt={wish.title} />
                    : <span className="plus">+</span>
                  }
                </button>
                {wish && (
                  <button
                    className="wishlist-delete-btn"
                    title="Удалить книгу из хотелки"
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteWish(idx);
                    }}
                    type="button"
                  >
                    ×
                  </button>
                )}

                <div style={{
                    marginTop: '10px',
                    textAlign: 'center',
                    minHeight: '26px',
                    fontSize: '17px',
                    color: wish?.title ? '#5c433e' : '#bc96bb',
                    fontWeight: wish?.title ? 600 : 400,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    maxWidth: '110px'
                  }}
                >
                  {wish?.title ? wish.title : ''}
                </div>
            </div>
          ))}
        </div>

            {editingWishIndex !== null && (
            <div className="modal-blur">
              <div className="modal-center">
                <BookForm
                  book={wishlist[editingWishIndex] || {
                    id: 'wish-' + Date.now(),
                    title: '',
                    authors: [],
                    pageCount: 0,
                    coverUrl: '',
                    description: '',
                    status: 'wantToRead',
                    comments: '',
                  }}
                  onSave={handleSaveWishBook}
                  onCancel={handleCancelWish}
                />
              </div>
            </div>
          )}
          </div>
      </div>
      
      {/*Aвторы*/}
      <div style={{marginBottom: '80px'}}>
        <div className='shelf-title'>
          <h2 style={{marginBottom: 0, fontSize: '55px'}}>Любимые авторы</h2>
        </div>
        <div className='book-reading'>
          <div className='book-shelf'>
            <div className="wishlist-circles">
              {favoriteAuthors.map((author, idx) => (
                <div className="wishlist-circle-wrapper" key={idx}>
                  <button
                    type="button"
                    className="wishlist-circle"
                    title={author ? 'Редактировать автора' : 'Добавить автора'}
                    onClick={() => setEditingAuthorIndex(idx)}
                    style={{borderRadius: 0}}
                  >
                    {author && author.photoUrl
                      ? <img 
                        src={author.photoUrl} 
                        alt={author.name} 
                        style={{borderRadius: 0, width: '100%'}}
                      />
                      : <span className="plus">+</span>
                    }
                  </button>
                  {author && (
                    <button
                      className="wishlist-delete-btn"
                      title="Удалить автора"
                      onClick={e => {
                        e.stopPropagation();
                        setFavoriteAuthors(prev => {
                          const arr = [...prev];
                          arr[idx] = null;
                          return arr;
                        });
                        if (editingAuthorIndex === idx) {
                          setEditingAuthorIndex(null);
                        }
                      }}
                      type="button"
                    >
                      ×
                    </button>
                  )}

                  <div
                  style={{
                    marginTop: '10px',
                    textAlign: 'center',
                    minHeight: '26px',
                    fontSize: '17px',
                    color: author ? '#5c433e' : '#bc96bb',
                    fontWeight: author ? 600 : 400,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    maxWidth: '110px'
                  }}
                >
                  {author ? author.name : ''}
                </div>

                  {editingAuthorIndex !== null && (
                    <div className="modal-blur">
                      <div className="modal-center">
                        <AuthorForm
                          author={favoriteAuthors[editingAuthorIndex] || {
                            id: 'author-' + Date.now(),
                            name: '',
                            photoUrl: '',
                          }}
                          onSave={authorData => {
                            setFavoriteAuthors(prev => {
                              const copy = [...prev];
                              copy[editingAuthorIndex] = authorData;
                              return copy;
                            });
                            setEditingAuthorIndex(null);
                          }}
                          onCancel={() => setEditingAuthorIndex(null)}
                        />
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{marginBottom: '80px'}}>
        <div className='shelf-title'>
          <h2 style={{marginBottom: 0, fontSize: '55px'}}>Читательский челлендж</h2>
        </div>
          <ChallengeWidget />
      </div>

      <div style={{marginBottom: '80px'}}>
        <div className='shelf-title'>
          <h2 style={{marginBottom: 0, fontSize: '55px'}}>Книга месяца</h2>
        </div>
          <UserProgressAndBookOfMonth />
      </div>
    </div>
  );
};

export default BookApp;