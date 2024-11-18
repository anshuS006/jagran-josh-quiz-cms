// src/components/QuizEditor.js
import React, { useEffect, useState } from "react";
import { getQuizzes, deleteQuiz, updateQuiz } from "../services/api";
import { Link } from "react-router-dom";

function QuizEditor() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editQuiz, setEditQuiz] = useState(null);
  const [newQuizName, setNewQuizName] = useState("");
  const [newQuizDescription, setNewQuizDescription] = useState("");

  // Fetch quizzes from the API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzes();
        setQuizzes(response.data);
      } catch (err) {
        setError("Failed to fetch quizzes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Handle quiz deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await deleteQuiz(id);
        setQuizzes(quizzes.filter((quiz) => quiz.quiz_id !== id));
      } catch (err) {
        setError("Failed to delete quiz");
        console.error(err);
      }
    }
  };

  // Handle opening the edit form
  const handleEdit = (quiz) => {
    setEditQuiz(quiz);
    setNewQuizName(quiz.quiz_name);
    setNewQuizDescription(quiz.quiz_description);
  };

  // Handle quiz update
  const handleUpdate = async () => {
    if (!newQuizName || !newQuizDescription) return alert("Both fields are required.");

    try {
      await updateQuiz(editQuiz.quiz_id, { quiz_name: newQuizName, quiz_description: newQuizDescription });
      setQuizzes(
        quizzes.map((quiz) =>
          quiz.quiz_id === editQuiz.quiz_id ? { ...quiz, quiz_name: newQuizName, quiz_description: newQuizDescription } : quiz
        )
      );
      setEditQuiz(null); // Close the edit form
    } catch (err) {
      setError("Failed to update quiz");
      console.error(err);
    }
  };

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Quiz Manager</h1>
      <div style={styles.buttonGroup}>
        <Link to="/create-quiz" style={styles.createButton}>
          + Create New Quiz
        </Link>
        <Link to="/add-category" style={styles.addCategoryButton}>
          + Add Category
        </Link>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Quiz Name</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Created At</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz._id} style={styles.tableRow}>
              <td>{quiz.quiz_name}</td>
              <td>{quiz.quiz_description}</td>
              <td>{new Date(quiz.created_at).toLocaleDateString()}</td>
              <td>
                <Link to={`/quizzes/${quiz.quiz_id}`} style={styles.viewButton}>
                  View
                </Link>
                <button onClick={() => handleEdit(quiz)} style={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => handleDelete(quiz.quiz_id)} style={styles.deleteButton}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form Modal */}
      {editQuiz && (
        <div style={styles.modal}>
          <h2 style={styles.modalTitle}>Edit Quiz</h2>
          <label style={styles.label}>Quiz Name:</label>
          <input
            type="text"
            value={newQuizName}
            onChange={(e) => setNewQuizName(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>Quiz Description:</label>
          <textarea
            value={newQuizDescription}
            onChange={(e) => setNewQuizDescription(e.target.value)}
            style={styles.textarea}
          />
          <div style={styles.buttonContainer}>
            <button onClick={handleUpdate} style={styles.updateButton}>
              Update
            </button>
            <button onClick={() => setEditQuiz(null)} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { 
    padding: "30px", 
    maxWidth: "1000px", 
    margin: "0 auto" 
  },
  title: { 
    marginBottom: "20px", 
    fontSize: "28px", 
    color: "#333", 
    fontWeight: "600", 
    textAlign: "center" 
  },
  buttonGroup: { 
    display: "flex", 
    justifyContent: "space-between", 
    marginBottom: "20px" 
  },
  createButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    textAlign: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  addCategoryButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    textAlign: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  table: { 
    width: "100%", 
    borderCollapse: "collapse", 
    marginBottom: "30px", 
    backgroundColor: "#f8f9fa" 
  },
  tableHeader: { 
    padding: "12px 15px", 
    backgroundColor: "#007bff", 
    color: "#fff", 
    fontWeight: "bold", 
    textAlign: "left" 
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
    "&:hover": { backgroundColor: "#f1f1f1" }
  },
  viewButton: {
    color: "#007bff",
    marginRight: "10px",
    textDecoration: "none",
    fontWeight: "500",
    cursor: "pointer",
  },
  editButton: { 
    backgroundColor: "#ffc107", 
    color: "#fff", 
    border: "none", 
    padding: "8px 12px", 
    borderRadius: "4px", 
    cursor: "pointer", 
    marginRight: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
  },
  deleteButton: { 
    backgroundColor: "#dc3545", 
    color: "#fff", 
    border: "none", 
    padding: "8px 12px", 
    borderRadius: "4px", 
    cursor: "pointer",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
  },
  
  // Modal Styling
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "30px 40px",
    borderRadius: "8px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
    zIndex: "1000",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  modalTitle: { 
    fontSize: "24px", 
    marginBottom: "15px", 
    color: "#333", 
    fontWeight: "600" 
  },
  label: { 
    alignSelf: "flex-start", 
    marginTop: "10px", 
    marginBottom: "5px", 
    color: "#333", 
    fontWeight: "500" 
  },
  input: { 
    width: "100%", 
    padding: "10px", 
    border: "1px solid #ccc", 
    borderRadius: "4px", 
    marginBottom: "15px" 
  },
  textarea: { 
    width: "100%", 
    padding: "10px", 
    border: "1px solid #ccc", 
    borderRadius: "4px", 
    minHeight: "80px", 
    marginBottom: "15px" 
  },
  buttonContainer: { 
    display: "flex", 
    justifyContent: "space-between", 
    width: "100%", 
    marginTop: "15px" 
  },
  updateButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    flex: "1",
    marginRight: "10px",
    transition: "background-color 0.3s ease",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    flex: "1",
    transition: "background-color 0.3s ease",
  },
};

export default QuizEditor;
