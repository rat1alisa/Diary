import React from 'react';
import './UserProgressAndBookOfMonth.scss';

const BOOK_OF_MONTH = {
  title: '451° по Фаренгейту',
  author: 'Рэй Брэдбери',
  coverUrl: 'https://imo10.labirint.ru/books/556173/cover.jpg/484-0',
  description: 'Антиутопия о тоталитарном государстве, в котором книги публично сжигаются, а читающих преследуют.',
};

const UserProgressAndBookOfMonth: React.FC = () => {
  return (
    <div className="stats-book-wrapper">
      <div className="bookmonth-block">
        <div className="bookmonth-card">
          <img src={BOOK_OF_MONTH.coverUrl} alt={BOOK_OF_MONTH.title} />
          <div>
            <div className="bookmonth-title">{BOOK_OF_MONTH.title}</div>
            <div className="bookmonth-author">{BOOK_OF_MONTH.author}</div>
            <div className="bookmonth-desc">{BOOK_OF_MONTH.description}</div>
            <button className="bookmonth-btn">Подробнее</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProgressAndBookOfMonth;
