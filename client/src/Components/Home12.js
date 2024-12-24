import React from "react";
import { Container, Row, Col, Button } from "reactstrap"; // Importing Reactstrap components
import plant2 from "./assets/HomeImg/plan2.png"; // Import your plant image
import { Link } from "react-router-dom";
import Shop from "./Shop";


const Home12 = () => {
  // Dynamically load images based on sequential naming (1.png, 2.png, etc.)
  const plantImages = Array.from({ length: 5 }, (_, i) =>
    require(`./assets/HomeImg/${i + 1}.png`)
  );

  // Array of plant names
  const plantNames = [
    "Crassula Ovata",
    "Haworthiopsis ",
    "Browningia ",
    "Chlorophytum",
    "Dracaena ",
  ];

  return (
    <div
      className="text-gray-800 container-large"
      style={{ backgroundColor: "#e8e8e8" }}
    >
      {/* Top 5 Plants Section */}
      <section className="py-5 bg-white">
        <Container >
          <h2 className="text-center text-gray-800 mb-4">Top 5 of the Week</h2>
          <Row className="d-flex justify-content-center">
            {/* Plant Cards */}
            {plantImages.map((src, index) => (
              <Col sm={6} lg={2} key={index} className="mb-3">
                <div
                  className="bg-light shadow rounded p-3 plant-card"
                  style={{
                    transition: "transform 0.3s ease", // Smooth scaling
                  }}
                >
                  <img
                    src={src} // Use dynamically imported images
                    alt={plantNames[index]} // Use corresponding plant name
                    className="w-100 mb-2 plant-image"
                    style={{
                      objectFit: "contain",
                      height: "150px",
                      transition: "transform 0.3s ease", // Smooth scaling
                    }}
                  />
                  <h5 className="text-center text-gray-800">{plantNames[index]}</h5>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Hero Section */}
      <Container className="py-1" >
        <Row className="align-items-center">
          <Col md={6} className="text-left p-0">
            <img
              src={plant2}
              alt="Plant"
              className="plant-image"
              style={{
                width: "300%",
                height: "auto",
                maxWidth: "500px",
                objectFit: "contain",
                transition: "transform 0.3s ease", // Optional max-width for responsiveness
              }}
            />
          </Col>
          <Col lg={6} className="text-right">
            <h1 className="text-success font-bold">The World of Plants</h1>
            <p className="text-gray-600 mb-3">
              Discover everything you need to know about your plants, treat
              them with kindness, and they will take care of you.
            </p>
            <Link to="/shop">
            <Button color="success" >Shop Now</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home12;
