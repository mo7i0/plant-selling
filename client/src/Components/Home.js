import React from "react";
import { Card, CardBody, CardTitle, CardText, Container, Row, Col, Button } from "reactstrap"; // Importing Reactstrap components
import SeedlingsData from "./assets/SeedlingsData";
import'./Style.css'
import plant1 from "./assets/HomeImg/plant1.png"
import Home11 from "./Home11";
import Home12 from "./Home12";


const Home = () => {
 
  return (
    
    <div className="container" style={{ backgroundColor: '#9bceba' }}>
      <div >
      <Home11/>     
    </div>
    <Home12/>
    </div>
    
  );
};

export default Home;