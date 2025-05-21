import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Question from '../components/Questions';
import { CircularProgress } from '@mui/material';


const quizQuestions = [
    { question: 'What is the capital of India?', options: ['NewDelhi', 'TamilNadu', 'Bangalore', 'Kerala'] },
    { question: 'Which language is used for web development?', options: ['Python', 'Java', 'JavaScript', 'C++'] },
    { question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Venus', 'Jupiter'] },
    { question: 'What is the largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'] },
];

const QuizPage: React.FC = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState(200);
    const [summaryOpen, setSummaryOpen] = useState(false);

    const questionsPerPage = 2;
    const totalPages = Math.ceil(quizQuestions.length / questionsPerPage);
    const currentQuestions = quizQuestions.slice(
        pageIndex * questionsPerPage,
        (pageIndex + 1) * questionsPerPage
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                alert("Stop test to switch between tab.");
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const handleSelect = (index: number, option: string) => {
        const absoluteIndex = pageIndex * questionsPerPage + index;
        const updatedAnswers = [...answers];
        updatedAnswers[absoluteIndex] = option;
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (pageIndex < totalPages - 1) {
            setPageIndex(pageIndex + 1);
        } else {
            alert('Quiz Completed!');
        }
    };

    return (
        <Box p={4}>
            <div>
                <h2>Sample Test</h2>
            </div>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box position="relative" display="inline-flex">
                        <CircularProgress
                            variant="determinate"
                            value={(timeLeft / 300) * 100}
                            size={48}
                            thickness={4}
                            color={timeLeft < 60 ? 'error' : 'primary'}
                        />
                        <Box
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            position="absolute"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="caption" fontWeight="bold">
                                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="subtitle2">Time Left</Typography>
                </Box>

                <Button variant="outlined" onClick={() => setSummaryOpen(true)}>
                    See All Questions
                </Button>
            </Box>

            {currentQuestions.map((q, i) => (
                <Box
                    key={i}
                    mb={4}
                    p={3}
                    boxShadow={3}
                    borderRadius={2}
                    bgcolor="background.paper"
                >
                    <Question
                        questionText={q.question}
                        options={q.options}
                        onSelect={(option) => handleSelect(i, option)}
                        questionIndex={pageIndex * questionsPerPage + i}
                        totalQuestions={quizQuestions.length}
                    />

                </Box>
            ))}

            {/* Next Button */}
            <Box textAlign="right">
                <Button
                    variant="contained"
                    onClick={handleNext}

                >
                    {pageIndex < totalPages - 1 ? 'Next' : 'Finish'}
                </Button>
            </Box>

            {/* Summary Dialog */}
            <Dialog open={summaryOpen} onClose={() => setSummaryOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Question Status</Typography>
                        <IconButton size="small" onClick={() => setSummaryOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {quizQuestions.map((_, idx) => (
                        <Paper
                            key={idx}
                            elevation={2}
                            sx={{
                                mb: 1,
                                p: 1.5,
                                backgroundColor: answers[idx] ? 'success.light' : 'warning.light',
                                color: answers[idx] ? 'success.contrastText' : 'warning.contrastText',
                            }}
                        >
                            Question {idx + 1}: {answers[idx] ? 'Answered' : 'Unanswered'}
                        </Paper>
                    ))}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default QuizPage;
