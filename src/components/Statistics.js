// src/components/Statistics.js
import React, { useEffect, useState } from "react";
import { getStatistics } from "../services/api";

function Statistics() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await getStatistics();
        setStats(response.data);
      } catch (err) {
        setError("Failed to load statistics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Quiz Statistics</h1>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2 style={styles.statValue}>{stats.totalQuizzes || 0}</h2>
          <p style={styles.statLabel}>Total Quizzes</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statValue}>{stats.totalAttempts || 0}</h2>
          <p style={styles.statLabel}>Total Attempts</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statValue}>{stats.averageScore || 0}%</h2>
          <p style={styles.statLabel}>Average Score</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statValue}>{stats.highestScore || 0}%</h2>
          <p style={styles.statLabel}>Highest Score</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statValue}>{stats.mostPopularQuiz || "N/A"}</h2>
          <p style={styles.statLabel}>Most Popular Quiz</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    color: "#333",
    fontWeight: "600",
    marginBottom: "30px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
  },
  statCard: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
  },
  statLabel: {
    fontSize: "14px",
    color: "#555",
    marginTop: "8px",
  },
};

export default Statistics;
