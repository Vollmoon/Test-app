import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayButtonWithPopup from './components/PlayButton';
import QuizPage from './pages/QuizPage';
import './App.css'
import QuizPageFullScreen from './pages/QuizPageFullScreen';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PlayButtonWithPopup />} />
                <Route path="/quiz" element={<QuizPage />} />
                 <Route path="/quizFullScreen" element={<QuizPageFullScreen />} />
            </Routes>
        </Router>
    );
};

export default App;
