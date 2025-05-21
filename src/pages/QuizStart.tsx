import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizStart: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
  const el = document.documentElement;

  const goToQuiz = () => navigate('/quiz');

  if (el.requestFullscreen) {
    el.requestFullscreen().then(goToQuiz).catch((err) => {
      console.error('Fullscreen error:', err);
      alert('Please allow fullscreen access to start the quiz.');
    });
  } else if ((el as any).webkitRequestFullscreen) {
    try {
      (el as any).webkitRequestFullscreen();
      goToQuiz();
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  } else if ((el as any).msRequestFullscreen) {
    try {
      (el as any).msRequestFullscreen();
      goToQuiz();
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  } else {
    goToQuiz();
  }
};


  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Ready to begin?</h2>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizStart;
