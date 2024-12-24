import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "./List.css";

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // Fetch plant data from the backend
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get("http://localhost:3001/plants");
        console.log(response.data.data); // Log to ensure all data is present
        setPlants(response.data.data); // Set the state with fetched plants
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, []);

  const handleUpdatePlant = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:3001/plants/${id}`, updatedData);
      // Update state locally after successful update
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant._id === id ? { ...plant, ...updatedData } : plant
        )
      );
    } catch (error) {
      console.error("Error updating plant:", error);
    }
  };

  // Delete plant
  const handleRemovePlant = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/plants/${id}`);
      // Update state locally after successful deletion
      setPlants((prevPlants) => prevPlants.filter((plant) => plant._id !== id));
    } catch (error) {
      console.error("Error removing plant:", error);
    }
  };

  return (
    <div className="plant-list">
      {alertMessage && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px 15px",
            border: "1px solid #c3e6cb",
            borderRadius: "5px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {alertMessage}
        </div>
      )}

      {plants.map((plant) => (
        <div
          className="plant-item"
          key={plant._id} // Use _id from MongoDB
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <img
            src={`http://localhost:3001/files/${plant.image}`} // Serve image from backend
            alt={plant.name}
            className="plant-image"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: "20px",
            }}
          />

          <div
            className="plant-details"
            style={{ flex: 1, marginRight: "20px" }}
          >
            <h2 className="plant-name">{plant.name}</h2>
            <p className="plant-price">
              Price: ${plant.price ? parseFloat(plant.price).toFixed(2) : "N/A"}
            </p>
          </div>

          <button
            onClick={() => handleRemovePlant(plant._id)}
            className="remove-plant-button"
            style={{
              marginRight: "10px",
              padding: "10px 15px",
              backgroundColor: "#79b28d",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Remove
          </button>

          <Button
            onClick={() => navigate(`/update-plant/${plant._id}`)}
            className="remove-plant-button"
            style={{
              marginRight: "10px",
              padding: "10px 15px",
              backgroundColor: "#79b28d",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Update
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PlantList;
