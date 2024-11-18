// src/components/Dashboard.js
import React from "react";
import QuizList from "../components/QuizList";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Dashboard() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleCreateQuizClick = () => {
    navigate("/create-quiz"); // Navigate to the quiz creation page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Quiz Management Dashboard</h1>

      <section style={styles.welcomeSection}>
        <h2 style={styles.subtitle}>Welcome to the Quiz Dashboard</h2>
        <p style={styles.description}>
          Here, you can view, edit, and manage all quizzes. Use the options below
          to create new quizzes, view existing ones, or review quiz statistics.
        </p>
      </section>

      <section style={styles.quizSection}>
        <h2 style={styles.subtitle}>Available Quizzes</h2>
        <QuizList />
      </section>

      <section style={styles.createQuizSection}>
        <button
          style={styles.createButton}
          onClick={handleCreateQuizClick} // Trigger navigation on button click
        >
          + Create New Quiz
        </button>
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f4f4f4", // Light background for better contrast
    borderRadius: "10px", // Rounded corners for a modern look
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Enhanced shadow for depth
    maxWidth: "900px", // Limit max width for better readability
    margin: "20px auto", // Center the container
  },
  title: {
    fontSize: "34px", // Larger title font size
    color: "#333", // Darker color for better readability
    marginBottom: "20px",
  },
  welcomeSection: {
    marginBottom: "30px",
    padding: "15px", // Padding for better spacing
    backgroundColor: "#fff", // White background for contrast
    borderRadius: "8px", // Rounded corners
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
  },
  subtitle: {
    fontSize: "26px", // Subtitle size
    color: "#555", // Slightly lighter for subtitle text
    marginBottom: "10px",
  },
  description: {
    fontSize: "18px",
    color: "#666", // Lighter color for description text
    lineHeight: "1.6", // Increase line height for better readability
  },
  quizSection: {
    marginBottom: "30px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  createQuizSection: {
    textAlign: "center", // Center button in this section
    marginTop: "20px",
  },
  createButton: {
    padding: "12px 30px",
    fontSize: "20px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s, transform 0.2s", // Transition effects
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Button shadow
    outline: "none", // Remove outline on focus
  },
};

// Add hover effects for create button
const hoverStyle = {
  backgroundColor: "#0056b3", // Darker blue on hover
  transform: "scale(1.05)", // Slightly enlarge on hover
};

export default Dashboard;
