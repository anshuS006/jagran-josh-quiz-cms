// src/pages/QuizDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuestionsByQuizId, updateQuestion, deleteQuestion } from "../services/api"; // Import the delete API function

const QuizDetails = () => {
  const { id } = useParams(); // Get the quiz ID from the URL
  const location = useLocation(); // Get location object to access passed state
  const { quiz_name, quiz_description } = location.state || {}; // Destructure quiz name and description from state
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for question editing
  const [editQuestion, setEditQuestion] = useState(null); // Track the question being edited
  const [updatedQuestionText, setUpdatedQuestionText] = useState("");
  const [updatedOptions, setUpdatedOptions] = useState(["", "", "", ""]);
  const [updatedAnswer, setUpdatedAnswer] = useState("");

  // State for delete confirmation
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  // Fetch questions for the specific quiz
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestionsByQuizId(id);
        setQuestions(response.data);
      } catch (err) {
        setError("Failed to fetch quiz details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  // Handle question edit initiation
  const handleEditQuestion = (question) => {
    setEditQuestion(question);
    setUpdatedQuestionText(question.question || "");
    setUpdatedOptions([
      question.option_1 || "",
      question.option_2 || "",
      question.option_3 || "",
      question.option_4 || "",
    ]);
    setUpdatedAnswer(question.correct_option || "");
  };

  // Handle updating a question
  const handleUpdateQuestion = async () => {
    const updatedData = {};
  
    if (updatedQuestionText) updatedData.question = updatedQuestionText;
  
    if (updatedOptions.length) {
      updatedData.option_1 = updatedOptions[0] || editQuestion.option_1;
      updatedData.option_2 = updatedOptions[1] || editQuestion.option_2;
      updatedData.option_3 = updatedOptions[2] || editQuestion.option_3;
      updatedData.option_4 = updatedOptions[3] || editQuestion.option_4;
    }
  
    if (updatedAnswer) updatedData.correct_option = parseInt(updatedAnswer);
  
    try {
      await updateQuestion(editQuestion.unique_id, updatedData);
  
      setQuestions(
        questions.map((q) =>
          q.unique_id === editQuestion.unique_id ? { ...q, ...updatedData } : q
        )
      );
  
      setEditQuestion(null);
    } catch (err) {
      setError("Failed to update question");
      console.error(err);
    }
  };

  // Handle delete confirmation initiation
  const handleDeleteQuestion = (question) => {
    setQuestionToDelete(question);
    setDeleteConfirmation(true);
  };

  // Confirm deletion of a question
  const confirmDeleteQuestion = async () => {
    if (!questionToDelete) return;

    try {
      await deleteQuestion(questionToDelete.unique_id);
      setQuestions(questions.filter((q) => q.unique_id !== questionToDelete.unique_id));
      setDeleteConfirmation(false);
      setQuestionToDelete(null);
    } catch (err) {
      setError("Failed to delete question");
      console.error(err);
    }
  };

  // Cancel deletion process
  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setQuestionToDelete(null);
  };

  if (loading) return <p>Loading quiz details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{quiz_name}</h1>
      <p style={styles.description}>{quiz_description}</p>
      {questions.length === 0 ? (
        <p>No questions available for this quiz.</p>
      ) : (
        questions.map((question) => (
          <div key={question.unique_id} style={styles.questionContainer}>
            <h3 style={styles.question}>{question.question}</h3>
            <ul style={styles.optionsList}>
              <li>{`1. ${question.option_1}`}</li>
              <li>{`2. ${question.option_2}`}</li>
              <li>{`3. ${question.option_3}`}</li>
              <li>{`4. ${question.option_4}`}</li>
            </ul>
            <p style={styles.correctOption}>
              Correct Answer: Option {question.correct_option} - {question[`option_${question.correct_option}`]}
            </p>
            <div style={styles.buttonContainer}>
              <button onClick={() => handleEditQuestion(question)} style={styles.editButton}>
                Edit
              </button>
              <button onClick={() => handleDeleteQuestion(question)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Edit Question Modal */}
      {editQuestion && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <h2>Edit Question</h2>
            <label style={styles.label}>Question Text:</label>
            <input
              type="text"
              value={updatedQuestionText}
              onChange={(e) => setUpdatedQuestionText(e.target.value)}
              style={styles.input}
            />
            
            <label style={styles.label}>Options:</label>
            {updatedOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...updatedOptions];
                  newOptions[index] = e.target.value;
                  setUpdatedOptions(newOptions);
                }}
                style={styles.input}
              />
            ))}

            <label style={styles.label}>Correct Option:</label>
            <input
              type="number"
              min="1"
              max="4"
              value={updatedAnswer}
              onChange={(e) => setUpdatedAnswer(e.target.value)}
              style={styles.input}
            />
            
            <div style={styles.buttonContainer}>
              <button onClick={handleUpdateQuestion} style={styles.updateButton}>
                Update Question
              </button>
              <button onClick={() => setEditQuestion(null)} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {deleteConfirmation && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this question?</p>
            <div style={styles.buttonContainer}>
              <button onClick={confirmDeleteQuestion} style={styles.deleteButton}>
                Yes, Delete
              </button>
              <button onClick={cancelDelete} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { marginBottom: "10px", fontSize: "24px" },
  description: { marginBottom: "20px", fontStyle: "italic", color: "#555", fontSize: "18px" },
  questionContainer: {
    marginBottom: "15px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  question: { margin: "0 0 10px", fontSize: "20px" },
  optionsList: { listStyleType: "none", padding: "0" },
  correctOption: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#28a745",
  },
  buttonContainer: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between", // Align buttons evenly
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    width: "400px",
    textAlign: "center",
  },
  label: { marginTop: "10px", display: "block", fontWeight: "bold" },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  updateButton: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default QuizDetails;
