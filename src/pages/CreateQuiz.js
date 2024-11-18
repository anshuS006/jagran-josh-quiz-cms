// src/pages/CreateQuiz.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuizWithFile } from "../services/api"; // Import the API function for file upload

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData to hold the file and quiz information
    const formData = new FormData();
    formData.append("file", file); // Append the uploaded file
    formData.append("quiz_name", quizName); // Append quiz name
    formData.append("quiz_description", quizDescription); // Append quiz description

    try {
      await createQuizWithFile(formData);
      alert("Quiz created successfully!");
      navigate("/quizzes"); // Redirect to the quizzes page after creation
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create New Quiz</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Quiz Name:</label>
          <input
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Quiz Description:</label>
          <textarea
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Upload Excel File:</label>
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.fileInput}
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>Create Quiz</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px", // Limit max width for better readability
    margin: "0 auto", // Center the container
    backgroundColor: "#f9f9f9", // Light background for contrast
    borderRadius: "8px", // Rounded corners for a modern look
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  },
  title: {
    marginBottom: "30px",
    fontSize: "28px", // Increase title size
    color: "#333", // Darker color for better readability
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "20px", // Increased margin for better spacing
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#555", // Slightly lighter for label text
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    transition: "border-color 0.3s", // Transition effect on focus
  },
  textarea: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minHeight: "80px",
    transition: "border-color 0.3s", // Transition effect on focus
  },
  fileInput: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
  },
  submitButton: {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, transform 0.2s", // Transition effects
  },
};

// Add hover effects for submit button
const submitButtonStyle = {
  ...styles.submitButton,
  ':hover': {
    backgroundColor: "#0056b3", // Darker blue on hover
    transform: "scale(1.05)", // Slightly enlarge on hover
  },
};

export default CreateQuiz;
