import React, { useState } from "react";
import { createQuiz } from "../services/api";

function QuizForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuiz = { title, description };
    try {
      await createQuiz(newQuiz);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description:
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">Save Quiz</button>
    </form>
  );
}

export default QuizForm;
