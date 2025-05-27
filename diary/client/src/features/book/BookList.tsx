import { Book } from "./types";

interface BooksListProps {
    books: Book[];
  }
  const BooksList: React.FC<BooksListProps> = ({ books }) => {
    if (books.length === 0) return <p>Пока нет книг в этом разделе.</p>;
    return (
      <ul style={{listStyle:'none', paddingLeft:0, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'15px'}}>
        {books.map(book => (
          <li key={book.id} style={{cursor:'pointer', background:'#f0f8ff', borderRadius:'8px', padding:'10px', boxShadow:'0 1px 5px rgba(42,139,242,0.3)'}}>
            <img src={book.coverUrl || 'https://via.placeholder.com/100x140?text=No+Cover'} alt={book.title} style={{width:'100px', height:'140px', objectFit:'cover', borderRadius:'4px', marginBottom:'8px'}}/>
            <b>{book.title}</b>
            <p style={{fontSize:'0.85rem'}}>Автор(ы): {book.authors.join(', ') || 'Не указаны'}</p>
            <p style={{fontSize:'0.85rem'}}>Комментарий: {book.comments || '-'}</p>
          </li>
        ))}
      </ul>
    );
  };

export default BooksList;
  