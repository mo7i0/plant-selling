import React from 'react'
import img1 from "./assets/HomeImg/1.png";
import img2 from "./assets/HomeImg/2.png";
import img3 from "./assets/HomeImg/3.png";
import img4 from "./assets/HomeImg/4.png";
import img5 from "./assets/HomeImg/5.png";
import img6 from "./assets/HomeImg/6.png";
import { Card, CardBody, CardTitle, CardText, Container, Row, Col, Button } from "reactstrap"; // Importing Reactstrap components

const Home11 = ()=>{
    const images = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="container" style={{ backgroundColor: '#9bceba' }}>
      <Container>
        <Row>

          <Col md={8}>
          <br/>
          <br/>
            <h1 style={{ fontWeight: 'bold', color: 'white', lineHeight: '1.2' }}>
              Make Your Space<br />
              <span style={{ color: 'green' }}>Greener</span><br />
              With Plants
            </h1>
          </Col>
          
          <Col
      md={4}
      style={{
        backgroundColor: "#e8e8e8",
        height: "300px", // Set the height of the column
        borderTopLeftRadius: "150px", // Round the top left corner
        borderTopRightRadius: "150px", // Round the top right corner
        marginTop: "20px", // Add space above the column
        overflow: "hidden", // Ensure content doesn't overflow the container
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          animation: "scroll 10s linear infinite",
          whiteSpace: "nowrap", // Keep images in a single line
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            style={{
              height: "20%",
              marginRight: "4px", // Space between images
            }}
          />
        ))}
      </div>
      
      {/* Inline CSS for animation */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0.5%);
            }
            100% {
              transform: translateX(-30%);
            }
          }
        `}
      </style>
    </Col>
        </Row>
      </Container>

    </div>
  );  
};

export default Home11
