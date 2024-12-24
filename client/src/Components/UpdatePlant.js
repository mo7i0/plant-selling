import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlantById, updatePlants } from "../Features/PlantSlice";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const UpdatePlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedPlant, isLoading, isError, msg } = useSelector((state) => state.plants);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!selectedPlant || selectedPlant._id !== id) {
      dispatch(fetchPlantById(id));
    }
  }, [dispatch, id, selectedPlant]);

  useEffect(() => {
    if (selectedPlant) {
      setFormData({
        name: selectedPlant.name || "",
        price: selectedPlant.price || "",
        image: selectedPlant.image || "",
      });
      setPreview(selectedPlant.image || "");
    }
  }, [selectedPlant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePlants({ id, ...formData })).unwrap();
      navigate("/list");
    } catch (error) {
      console.error("Error updating plant:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{msg || "Error loading plant data"}</p>;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center text-success mb-4">Update Plant</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Plant Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Plant Price</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">Plant Image</Label>
              <Input type="file" id="image" accept="image/*" onChange={handleFileChange} />
              {preview && <img src={preview} alt="Preview" className="mt-3" style={{ width: "100%" }} />}
            </FormGroup>
            <Button type="submit" color="success" className="w-100">
              Update Plant
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdatePlant;
