
import React, { useState } from "react";

import axios from "axios";


const AddPlant = () => {

  const [plant, setPlant] = useState({ name: "", price: "", id: "" });

  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");


  const handleInputChange = (e) => {

    setPlant({ ...plant, [e.target.name]: e.target.value || "" });

  };


  const handleFileChange = (e) => {

    setImage(e.target.files[0] || null);

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    // Prevent submission if image is not selected

    if (!image) {

      setMessage("Please select an image.");

      return;

    }


    const formData = new FormData();

    formData.append("name", plant.name);

    formData.append("price", plant.price);

    formData.append("id", plant.id);

    formData.append("image", image);


    try {

      const response = await axios.post("http://localhost:3001/addPlant", formData, {

        headers: {

          "Content-Type": "multipart/form-data",

        },

      });

      setMessage(response.data.msg);

      setPlant({ name: "", price: "", id: "" }); // Reset all fields

      setImage(null);

    } catch (error) {

      setMessage(

        error.response ? error.response.data.msg : "Error uploading plant"

      );

    }

  };


  return (

    <div style={styles.container}>

      <h2 style={styles.header}>Add Plant</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <div style={styles.formGroup}>

          <label style={styles.label}>Name:</label>

          <input

            type="text"

            name="name"

            value={plant.name}

            onChange={handleInputChange}

            style={styles.input}

            placeholder="Enter plant name"

            required

          />

        </div>

        <div style={styles.formGroup}>

          <label style={styles.label}>Price:</label>

          <input

            type="number"

            name="price"

            value={plant.price}

            onChange={handleInputChange}

            style={styles.input}

            placeholder="Enter price"

            required

          />

        </div>

        <div style={styles.formGroup}>

          <label style={styles.label}>Plant ID:</label>

          <input

            type="text"

            name="id"

            value={plant.id}

            onChange={handleInputChange}

            style={styles.input}

            placeholder="Enter plant ID"

            required

          />

        </div>

        <div style={styles.formGroup}>

          <label style={styles.label}>Image:</label>

          <input

            type="file"

            onChange={handleFileChange}

            accept="image/*"

            style={styles.input}

            required

          />

        </div>

        <button type="submit" style={styles.button}>

          Add Plant

        </button>

      </form>

      {message && <p style={styles.message}>{message}</p>}

    </div>

  );

};


const styles = {

  container: {

    maxWidth: "500px",

    margin: "50px auto",

    padding: "20px",

    borderRadius: "8px",

    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",

    backgroundColor: "#f9f9f9",

    textAlign: "center",

  },

  header: {

    color: "#4CAF50",

    marginBottom: "20px",

  },

  form: {

    display: "flex",

    flexDirection: "column",

  },

  formGroup: {

    marginBottom: "15px",

  },

  label: {

    display: "block",

    marginBottom: "5px",

    fontWeight: "bold",

    color: "#333",

  },

  input: {

    width: "100%",

    padding: "10px",

    borderRadius: "5px",

    border: "1px solid #ccc",

  },

  button: {

    padding: "10px 15px",

    backgroundColor: "#4CAF50",

    color: "white",

    border: "none",

    borderRadius: "5px",

    cursor: "pointer",

  },

  message: {

    marginTop: "15px",

    color: "#28a745",

  },

};


export default AddPlant;



