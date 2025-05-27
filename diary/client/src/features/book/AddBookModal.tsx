import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Обработчики кнопок:
  const handleSearch = () => {
    onClose();
    navigate('/books/search');
  };

  const handleManual = () => {
    onClose();
    navigate('/books/add-manual');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Добавить книгу</h3>
        <button onClick={handleSearch}>Добавить книгу по поиску</button>
        <button onClick={handleManual}>Добавить книгу вручную</button>
        <button onClick={onClose} className="modal-close">Закрыть</button>
      </div>
    </div>
  );
};

export default AddBookModal;
