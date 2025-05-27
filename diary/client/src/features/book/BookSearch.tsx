import React, { useState } from 'react';
import { Book } from './types';


interface GoogleBookApiItem {
    id: string;
    volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    pageCount?: number;
    imageLinks?: { thumbnail?: string };
  };
}

interface Props {
  onSelect: (book: Book) => void;
}

const BookSearch: React.FC<Props> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GoogleBookApiItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Функция запуска поиска по Google Books API
  const searchBooks = async () => {
    // если пустой запрос — не ищем
    if (!query.trim()) return;
    setLoading(true);
    try {
         // Запрос к Google Books API с поиском по названию
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`);
      const data = await res.json();
      setResults(data.items || []);
    } catch (e) {
        // Сохраняем список найденных книг или пустой массив, если ничего не найдено
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

   // Обработчик выбора книги из результатов поиска
  // Подготавливает объект книги с нужными полями для нашего приложения и передаёт наверх
  const onBookClick = (item: GoogleBookApiItem) => {
    const book: Book = {
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      description: item.volumeInfo.description || '',
      pageCount: item.volumeInfo.pageCount || 0,
      coverUrl: item.volumeInfo.imageLinks?.thumbnail || '',
      status: 'wantToRead',
      comments: '',
    };
     // передаём выбранную книгу в родительский компонент
    onSelect(book);
  };

  return (
    <div className='book-search'>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Введите название книги"
        className='input'
      />
      <button className="search-button" onClick={searchBooks}>
      </button>
{/*disabled={loading}>{loading ? 'Поиск...' : 'Поиск'} */}
      <ul>
        {results.map(item => (
          <li key={item.id} onClick={() => onBookClick(item)} style={{ cursor: 'pointer' }}>
            <b>{item.volumeInfo.title}</b> {item.volumeInfo.authors ? ` — ${item.volumeInfo.authors.join(', ')}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;

