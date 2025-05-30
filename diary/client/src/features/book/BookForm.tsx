import React, { useState, ChangeEvent } from 'react';
import { Book } from '@entities/book/model/types';

interface Props {
  book: Book; // Книга для редактирования
  onSave: (book: Book) => void;
  onCancel: () => void;
}

const statusOptions = [
  { value: 'wantToRead', label: 'Хочу прочитать' },
  { value: 'reading', label: 'Читаю' },
  { value: 'read', label: 'Прочитано' },
];

const BookForm: React.FC<Props> = ({ book, onSave, onCancel }) => {
  // Состояния всех полей (editable)
  const [title, setTitle] = useState(book.title || '');
  const [authors, setAuthors] = useState(book.authors.join(', ') || '');
  const [pageCount, setPageCount] = useState(book.pageCount || 0);
  const [description, setDescription] = useState(book.description || '');
  const [status, setStatus] = useState<Book['status']>(book.status || 'wantToRead');
  const [comments, setComments] = useState(book.comments || '');
  const [coverUrl, setCoverUrl] = useState(book.coverUrl || '');

  /*Обработчики событий и функции*/

  // Функция для загрузки картинки
  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      if (typeof ev.target?.result === 'string') {
        setCoverUrl(ev.target.result);
      }
    };
    //FileReader читает файл как DataURL - данные превращаются в строку для вставки в src
    reader.readAsDataURL(file);
  };

  // Сохранение результата
  const save = () => {
    const bookToSave: Book = {
      //новый объект книги на основе текущего book
      ...book,
      title: title.trim(),
      authors: authors.split(',').map(str => str.trim()).filter(Boolean),
      pageCount: Number(pageCount) || 0,
      description: description.trim(),
      status,
      comments: comments.trim(),
      coverUrl,
    };
    onSave(bookToSave);
  };

  return (
    <div className="book-form">
      <h3>{book.id.startsWith('custom-') ? 'Добавить собственную книгу' : 'Редактировать информацию'}</h3>
      <label>
        Название:
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Введите название книги"
          required
        />
      </label>
      <label>
        Автор(ы):
        <input
          type="text"
          value={authors}
          onChange={e => setAuthors(e.target.value)}
          placeholder="Имена авторов через запятую"
        />
      </label>
      <label>
        Описание:
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Описание книги"
        />
      </label>
      <label>
        Количество страниц:
        <input
          type="number"
          value={pageCount}
          onChange={e => setPageCount(Number(e.target.value))}
          min={0}
        />
      </label>
      <label>
        Обложка:
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          style={{borderRadius: '15px', width: '348px'}}
        />
      </label>
      {coverUrl && (
        <div style={{margin: '16px 0'}}>
          <img 
            src={coverUrl} 
            alt="Обложка книги" 
            style={{ maxHeight: 200, maxWidth: '100%', boxShadow: '0 3px 12px #8882' }} 
          />
        </div>
      )}

      <label>
        Статус прочтения:
        <select
          value={status}
          onChange={e => setStatus(e.target.value as Book['status'])}
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Комментарии:
        <textarea
          value={comments}
          onChange={e => setComments(e.target.value)}
        />
      </label>

      <div style={{ display: 'flex', gap: 12}}>
        <button 
          onClick={save} 
          className='form-save'
        >
        Сохранить
        </button>
        <button 
          onClick={onCancel}
          className='form-save'
        >
          Отмена
        </button>
      </div>
    </div>
  );
};

export default BookForm;
