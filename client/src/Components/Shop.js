import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Features/PlantSlice";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { FaCartPlus } from "react-icons/fa";
import Counter from "./Counter";
import './Style.css';

const Shop = () => {
  const dispatch = useDispatch();
  const [plants, setPlants] = useState([]);
  const [message, setMessage] = useState(null);
  const cart = useSelector((state) => state.plants.cart); // Access the cart state

  useEffect(() => {
    const fetchPlants = async () => {
        try {
            const response = await axios.get('http://localhost:3001/plants');
            console.log(response.data); // Log API response
            setPlants(response.data.data || []);
        } catch (error) {
            console.error('Error fetching plants:', error);
        }
    };
    fetchPlants();
}, []);


  const handleAddToCart = (plant, quantity) => {
    const cartItemId = Date.now(); // Generate a unique cartItemId
    dispatch(addToCart({ ...plant, cartItemId, quantity })); // Add product with unique cartItemId
    setMessage(`${plant.name} has been successfully added to the cart!`);
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <Container fluid className="py-5">
      <Row className="mb-5 align-items-center justify-content-center text-center">
        <Col md={6}>
          <h1 className="text-success ">Welcome to Our Plant Shop!</h1>
          <p className="text-muted fs-5 mb-4">
            Explore our collection of plants to bring life and greenery into your space.
          </p>
        </Col>
      </Row>

      {message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: "1000",
          }}
        >
          {message}
        </div>
      )}

      <Row>
      <Row>
  {plants && plants.length > 0 ? (
    plants.map((plant) => {
      console.log(plant.imageData); // Debugging imageData for each plant
      return (
        <Col md={3} sm={6} xs={12} className="mb-4" key={plant._id}>
          <Card className="h-100 shadow-sm">
          <CardImg
              top
              src={
                  plant.imageData?.filename
                      ? `http://localhost:3001/files/${plant.imageData.filename}`
                      : '/path/to/default-image.jpg' // Provide a default image
              }
              alt={plant.name}
              style={{ objectFit: 'cover', width: '100%', height: '300px' }}
              />


            <CardBody className="text-center">
              <CardTitle tag="h5">{plant.name}</CardTitle>
              <CardText>
                {plant.price !== undefined
                  ? `$${parseFloat(plant.price).toFixed(2)}`
                  : 'Price not available'}
              </CardText>
              <Button color="success" onClick={() => handleAddToCart(plant, 1)}>
                <FaCartPlus className="me-2" /> Add to Cart
              </Button>
              <Counter
                initialCount={0}
                maxQuantity={5}
                onQuantityChange={(quantity) => handleAddToCart(plant, quantity)}
              />
            </CardBody>
          </Card>
        </Col>
      );
    })
  ) : (
    <Col>
      <p className="text-center text-muted">No plants available to display.</p>
    </Col>
  )}
</Row>
</Row>
    </Container>
  );
};

export default Shop;