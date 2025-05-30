import React, { useState } from 'react';

type Author = {
  id: string;
  name: string;
  photoUrl: string;
};

type AuthorFormProps = {
  author: Author;
  onSave: (author: Author) => void;
  onCancel: () => void;
};

const AuthorForm: React.FC<AuthorFormProps> = ({ author, onSave, onCancel }) => {
  const [name, setName] = useState(author.name);
  const [photoUrl, setPhotoUrl] = useState(author.photoUrl);

  // Для вставки картинки из файлов пользователя
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setPhotoUrl(event.target?.result as string || '');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== '') {
      onSave({
        ...author,
        name: name.trim(),
        photoUrl,
      });
    }
  };

  return (
    <form 
        onSubmit={handleSubmit}
        className="book-form"
    >
      <label>
        Имя автора:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{width: '100%', fontSize: 18, marginTop: 6, marginBottom: 4}}
        />
      </label>
      <label>
        Фото автора:
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{marginTop: 6}}
        />
      </label>
      {photoUrl && (
        <div style={{textAlign: 'center'}}>
          <img src={photoUrl} alt="Фотография автора" style={{maxWidth: 98, maxHeight: 98, borderRadius: 16, marginTop: '9px', boxShadow: '0 2px 8px #fff6fc'}} />
        </div>
      )}
      <div style={{display: 'flex', gap: '14px', justifyContent: 'center', marginTop: 13}}>
        <button type="submit" className='form-save'>Сохранить</button>
        <button type="button" className='form-save' onClick={onCancel}>Отмена</button>
      </div>
    </form>
  );
};

export default AuthorForm;
