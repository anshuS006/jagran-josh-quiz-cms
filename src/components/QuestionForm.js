import React, { useState } from "react";

function QuestionForm({ addQuestion }) {
  const [questionText, setQuestionText] = useState("");
  const [answerOptions, setAnswerOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleAddQuestion = () => {
    addQuestion({ questionText, answerOptions, correctAnswer });
    setQuestionText("");
    setAnswerOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  return (
    <div>
      <input
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Enter question"
      />
      {answerOptions.map((option, index) => (
        <input
          key={index}
          value={option}
          onChange={(e) => {
            const newOptions = [...answerOptions];
            newOptions[index] = e.target.value;
            setAnswerOptions(newOptions);
          }}
          placeholder={`Option ${index + 1}`}
        />
      ))}
      <input
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        placeholder="Enter correct answer"
      />
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
}

export default QuestionForm;
