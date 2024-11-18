import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000"; // Update this with your backend URL

//export const fetchData = (endpoint) => axios.get(`http://localhost:3000/questions/quizzes`);

// Fetch all quizzes
export const getQuizzes = () => axios.get(`${API_URL}/questions/quizzes`);

// Fetch questions by quiz ID
export const getQuestionsByQuizId = (id) => axios.get(`${API_URL}/questions/${id}`);

// Function to create a quiz with Excel file upload
export const createQuizWithFile = (formData) => {
    return axios.post(`${API_URL}/questions/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

// Delete a quiz
export const deleteQuiz = (id) => axios.delete(`${API_URL}/questions/quizzes/${id}`);

// Update existing quiz
export const updateQuiz = (id, quizData) => axios.put(`${API_URL}/questions/quizzes/${id}`, quizData);

// Update a single question by unique_id
export const updateQuestion = (unique_id, updatedData) => {
    return axios.put(`${API_URL}/singlequestion/${unique_id}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
};

export const deleteQuestion = async (unique_id) => {
    // Pass unique_id as a path parameter
    return await axios.delete(`${API_URL}/singlequestion/${unique_id}`);
};

export const fetchCategories = async () => {
    const response = await fetch(`${API_URL}/categories/list`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  };

export const addCategory = async (categoryData) => {
    try {
      const response = await axios.post(`${API_URL}/categories/add`, categoryData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add category");
    }
};

export const getStatistics = async () => {
    return axios.get("/api/statistics"); // Replace with your actual endpoint
  };


// Fetch quiz by ID
export const getQuizById = (id) => axios.get(`${API_URL}/quizzes/${id}`);

// Create new quiz
export const createQuiz = (quizData) => axios.post(`${API_URL}/quizzes`, quizData);


