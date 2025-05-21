import { Box, Button, Typography } from "@mui/material";
import React from "react";

type QuestionProps = {
  questionText: string;      
  options: string[];
  onSelect: (option: string) => void;
  questionIndex: number;    
  totalQuestions: number;   
};

const Question: React.FC<QuestionProps> = ({
  questionText,
  options,
  onSelect,
  questionIndex,
  totalQuestions,
}) => {
  
  return (
    <Box
      maxWidth="600px"
      mx="auto"
      p={3}
      borderRadius={2}
      boxShadow={3}
      bgcolor="background.paper"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" fontWeight="bold" color="red">
          Question {questionIndex + 1} of {totalQuestions}
        </Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        {questionText}
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {options.map((option, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => onSelect(option)}
            sx={{ justifyContent: "flex-start", textTransform: "none" }}
          >
            {option}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Question;