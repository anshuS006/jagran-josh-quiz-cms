// src/pages/AddCategory.js
import React, { useState, useEffect } from "react";
import { addCategory, fetchCategories } from "../services/api"; // Import the add category and fetch categories API functions

const AddCategory = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // State for showing success modal
  const [showCategoryModal, setShowCategoryModal] = useState(false); // State for showing category list modal
  const [categories, setCategories] = useState([]); // State for the category list

  // Fetch categories when component mounts
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories(); // Fetch categories from API
        setCategories(response); // Set the categories state with the response data
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setError("Failed to load categories. Please try again.");
      }
    };

    loadCategories();
  }, []);

  // Function to validate inputs
  const validateInputs = () => {
    // Check if categoryId is empty or non-numeric
    if (!categoryId || isNaN(categoryId)) {
      setError("Category ID must be a non-empty numeric value.");
      return false;
    }

    // Check if categoryName is empty
    if (!categoryName) {
      setError("Category Name cannot be empty.");
      return false;
    }

    setError(""); // Clear any previous errors if inputs are valid
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Only proceed if inputs are valid

    // Prepare request body
    const categoryData = {
      categoryId: parseInt(categoryId, 10),
      categoryName: categoryName.trim(), // Trim whitespace from category name
    };

    try {
      // Make API request to add category
      await addCategory(categoryData);
      setSuccessMessage("Category added successfully!");
      setShowModal(true); // Show modal on success
      setCategoryId(""); // Clear the input fields after submission
      setCategoryName("");
      
      // Refresh categories list after adding a new category
      const updatedCategories = await fetchCategories();
      setCategories(updatedCategories);
    } catch (err) {
      setError("Failed to add category. Please try again.");
      console.error(err);
    }
  };

  // Ensure only numeric input for categoryId
  const handleCategoryIdInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setCategoryId(value);
  };

  // Function to close the success modal
  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage("");
    // Clear input fields on modal close
    setCategoryId(""); 
    setCategoryName(""); 
  };

  // Function to open/close the category modal
  const toggleCategoryModal = () => {
    setShowCategoryModal((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Category</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Category ID:</label>
        <input
          type="text"
          value={categoryId}
          onChange={handleCategoryIdInput}
          style={styles.input}
          placeholder="Enter numeric Category ID"
        />

        <label style={styles.label}>Category Name:</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          style={styles.input}
          placeholder="Enter Category Name"
        />

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.submitButton}>
            Add Category
          </button>
          <button type="button" onClick={toggleCategoryModal} style={styles.showCategoriesButton}>
            Show Categories
          </button>
        </div>
      </form>

      {/* Modal for success message */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={closeModal} style={styles.closeButtonModal}>
              &times; {/* Close icon */}
            </button>
            <p>{successMessage}</p>
            <button onClick={closeModal} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for category list */}
      {showCategoryModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.categoryModalContent}>
            <button onClick={toggleCategoryModal} style={styles.closeButtonModal}>
              &times; {/* Close icon */}
            </button>
            <h3 style={styles.categoryListHeading}>Category List</h3>
            <ul style={styles.categoryList}>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category._id} style={styles.categoryListItem}>
                    {category.category_name} (ID: {category.category_id})
                  </li>
                ))
              ) : (
                <li style={styles.categoryListItem}>No categories found.</li>
              )}
            </ul>
            <button onClick={toggleCategoryModal} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: { fontSize: "24px", marginBottom: "20px" },
  error: { color: "red", marginBottom: "10px" },
  form: { width: "100%", maxWidth: "400px" },
  label: { marginBottom: "8px", fontWeight: "bold" },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between", // Align buttons
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s, transform 0.3s",
  },
  showCategoriesButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s, transform 0.3s",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "4px",
    textAlign: "center",
    width: "300px",
  },
  categoryModalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "4px",
    textAlign: "left",
    width: "400px",
    maxHeight: "70vh", // Max height for scrolling
    overflowY: "auto", // Enable scrolling
    position: "relative", // Allow positioning of close button
  },
  closeButtonModal: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "24px", // Increase size for visibility
    fontWeight: "bold",
    color: "#000", // Change color for visibility
    lineHeight: "24px", // Adjust line height
  },
  closeButton: {
    marginTop: "15px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  categoryListContainer: {
    marginTop: "20px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "left",
  },
  categoryListHeading: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  categoryList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  categoryListItem: {
    padding: "8px",
    borderBottom: "1px solid #ccc",
  },
};

export default AddCategory;
