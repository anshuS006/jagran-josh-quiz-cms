// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Quiz CMS</h1>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Dashboard</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/create-quiz" style={styles.navLink}>Create Quiz</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/quizzes" style={styles.navLink}>All Quizzes</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/add-category" style={styles.navLink}>Add Category</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/statistics" style={styles.navLink}>Statistics</Link>
        </li>        
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
  },
  title: {
    margin: 0,
  },
  navList: {
    listStyle: "none",
    display: "flex",
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginLeft: "20px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Navbar;
