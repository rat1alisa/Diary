import { Book } from '@entities/book/model/types';
import React, { useState } from 'react';
import './BookCard.scss'

type BookCardProps = {
  book: Book;
  onSelect: (book: Book) => void;
  onDelete: (book: Book) => void;
  onClick: (book: Book) => void;
};

const BookCard: React.FC<BookCardProps> = ({ book, onSelect, onDelete, onClick }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(f => !f);

  return (
    <div className={`flip-card${flipped ? ' flipped' : ''}`}>
      <div className="flip-card-inner">
        {/* Внешняя сторона — обложка */}
        <div className="flip-card-front" onClick={handleFlip}>
          <img src={book.coverUrl || '/no_cover.png'} alt={book.title} className="book-cover-img"/>
          <div className="book-title">{book.title}</div>
        </div>
        {/* Внутренняя сторона — информация и кнопка */}
        <div className="flip-card-back">
          <div className="book-info">
            <b>{book.title}</b>
            <div>Автор(ы): {book.authors.join(', ')}</div>
            <div>Страниц: {book.pageCount}</div>
            <div>Статус: {book.status}</div>
            <div>Комментарий: {book.comments}</div>
            <button
              className="form-save"
              onClick={e => { e.stopPropagation(); handleFlip(); }}
              title="Повернуть обратно"
              style={{margin: 0}}
            >
              Назад
            </button>
            <button
              className="form-save"
              onClick={e => { e.stopPropagation(); onDelete(book); }}
              title="Удалить книгу"
            >
              Удалить
            </button>
            <button
              className="form-save"
              onClick={e => { e.stopPropagation(); onClick(book); }}
              style={{margin: 0}}
            >
              Редактировать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookCard;
