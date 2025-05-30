import React, { useState } from 'react';
import './ChallengeWidget.scss';

const GOAL = 3;

const ChallengeWidget: React.FC = () => {
  const [booksRead, setBooksRead] = useState(0);

  const handleAddBook = () => {
    if (booksRead < GOAL) setBooksRead(prev => prev + 1);
  };

  const handleReset = () => {
    setBooksRead(0);
  };

  const percent = Math.round((booksRead / GOAL) * 100);

  return (
    <div className="challenge-widget">
      <h3>📚 Читательский челлендж месяца</h3>
      <p>Задача: прочитать <b>{GOAL}</b> книги за этот месяц!</p>
      <div className="challenge-progress-bar">
        <div
          className="challenge-progress"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p>
        Прогресс: <b>{booksRead}/{GOAL}</b>
      </p>
      <button
        className="challenge-btn"
        onClick={handleAddBook}
        disabled={booksRead >= GOAL}
      >
        Добавить прочитанную книгу
      </button>
      <button className="challenge-reset-btn" onClick={handleReset}>
        Сбросить
      </button>
      {booksRead >= GOAL && (
        <div className="challenge-done">Поздравляем, вы выполнили челлендж!</div>
      )}
    </div>
  );
};

export default ChallengeWidget;
