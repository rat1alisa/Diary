import { Book } from '@entities/book/model/types';
import React, { useState } from 'react';


interface Props {
  book: Book;  // Книга, которую редактируем
  onSave: (book: Book) => void; // Функция для сохранения книги
  onCancel: () => void; // Отмена редактирования
}

const statusOptions = [
  { value: 'wantToRead', label: 'Хочу прочитать' },
  { value: 'reading', label: 'Читаю' },
  { value: 'read', label: 'Прочитано' },
];

const BookForm: React.FC<Props> = ({ book, onSave, onCancel }) => {
  // Локальное состояние для статуса и комментариев
  const [status, setStatus] = useState<Book['status']>(book.status);
  const [comments, setComments] = useState(book.comments || '');

  // Функция сохранения — вызывает onSave из props, передавая новую книгу с обновлёнными полями
  const save = () => {
    onSave({ ...book, status, comments });
  };

  return (
    <div className="book-form">
      <h3>{book.title}</h3>
      <p>Автор(ы): {book.authors.join(', ')}</p>
      <p>Страниц: {book.pageCount}</p>
      {book.coverUrl && <img src={book.coverUrl} alt={book.title} />}
      <p>{book.description}</p>

      <label>
        Статус прочтения:
        <select value={status} onChange={e => setStatus(e.target.value as Book['status'])}>
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>

      <label>
        Комментарии:
        <textarea value={comments} onChange={e => setComments(e.target.value)} />
      </label>

      <button onClick={save}>Сохранить</button>
      <button onClick={onCancel}>Отмена</button>
    </div>
  );
};

export default BookForm;
