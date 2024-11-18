import React, { useEffect, useState } from "react";
import { getQuizzes } from "../services/api";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call the getQuizzes function with the specific endpoint
    getQuizzes()
      .then((response) => {
        setQuizzes(response.data); // Assuming response data is an array of quizzes
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading quizzes...</p>;
  }

  return (
    <div>
      {/* <h2>Available Quizzes</h2> */}
      <ul>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <li key={quiz._id}>
              <h3>{quiz.quiz_name}</h3>
              <p>{quiz.quiz_description}</p>
              <small>Created on: {new Date(quiz.created_at).toLocaleDateString()}</small>
            </li>
          ))
        ) : (
          <p>No quizzes available</p>
        )}
      </ul>
    </div>
  );
}

export default QuizList;
