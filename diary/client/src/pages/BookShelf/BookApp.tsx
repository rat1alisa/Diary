import BookForm from '@features/book/BookForm';
import BookSearch from '@features/book/BookSearch';
import { Book } from '@features/book/types';
import React, { useState, useEffect } from 'react';
import "./BookApp.scss"

const LOCAL_STORAGE_KEY = 'my_bookshelf';

const BookApp: React.FC = () => {
  // Состояние всех книг на полке пользователя
  const [books, setBooks] = useState<Book[]>([]);
   // Состояние для текущей книги 
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Загрузка книг из localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setBooks(JSON.parse(stored));
  }, []);

  // Сохраняем обновления в localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  // Обработчик, который вызывается когда пользователь выбирает книгу из поиска
  // Сохраняем ее в состояние для редактирования (открываем форму)
  const onBookSelect = (book: Book) => {
    setEditingBook(book);
  };

  // Обработчик сохранения книги
  // Если книга уже есть в списке — обновляем ее, иначе добавляем новую
  // После сохранения закрываем форму редактирования
  const onSaveBook = (book: Book) => {
    setBooks(prev => {
      const exists = prev.find(b => b.id === book.id);
      if (exists) 
         // Обновляем существующую книгу по id
        return prev.map(b => (b.id === book.id ? book : b));
       // Добавляем новую книгу
      return [...prev, book];
    });
    setEditingBook(null);
  };
  
  return (
    <div className="book-app">
      <h1>My personal library</h1>

      <div className='book-shelf'>
      <h2>Моя книжная полка</h2>
      {!editingBook && (
        <>
          <BookSearch onSelect={onBookSelect} />
          {books.length === 0 && <p>Пока нет записанных книг</p>}
          <ul className="book-list">
            {books.map(book => (
              <li key={book.id} onClick={() => onBookSelect(book)} className="book-item">
                <div className="book">
                  <div className="book-info">
    
                    Автор(ы): {book.authors.join(', ')}<br />
                    Статус: {book.status}<br />
                    Комментарий: {book.comments}
                  </div>
                  <div className="cover">
                    <div className="cover-info">
                      {/*<b>
                        <b>{book.title}</b><br />
            </b>*/}
                      <img src={book.coverUrl} alt={book.title} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      </div>

      {editingBook && (
        <BookForm book={editingBook} onSave={onSaveBook} onCancel={() => setEditingBook(null)} />
      )}
    </div>
  );
};

export default BookApp;



/*
`onBookSelect(book)` — вызывается при выборе книги из поиска или списка, показывает форму редактирования  
`onSaveBook(book)` — сохраняет книгу в список (создание или обновление), закрывает форму  
`useEffect` с localStorage — сохраняет и загружает список книг для персистентности  
При отсутствии редактируемой книги показываем поиск и список книг  
При редактировании показываем форму и прячем остальной интерфейс
*/