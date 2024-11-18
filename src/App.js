import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import QuizEditor from "./pages/QuizEditor";
import QuizDetails from "./pages/QuizDetails";
import Navbar from "./components/Navbar";
import CreateQuiz from "./pages/CreateQuiz";
import AddCategory from "./pages/AddCategory"; // Import the AddCategory component
import Statistics from "./components/Statistics";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quizzes" element={<QuizEditor />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/quizzes/:id" element={<QuizDetails />} />
        <Route path="/add-category" element={<AddCategory />} /> {/* New route for Add Category */}
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;
