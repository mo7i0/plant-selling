import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap";
import { Routes, Route } from "react-router-dom";  // Import Routes and Route
import Register from "./Components/RegisterCust";
import RegisterM from "./Components/RegisterM";
import PlantList from "./Components/PlantList";
import Shop from "./Components/Shop";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import LoginM from "./Components/LoginM";
import AddPlant from "./Components/AddPlant";
import { PlantProvider } from "./Components/PlantContext"; // Import the PlantProvider// Import PlantQuantity
 // Import the PlantProvider
import CartPage from "./Components/CartPage";
import Profile from "./Components/Profile";
import UpdatePlant from "./Components/UpdatePlant";
const App = () => {
  return (
    <PlantProvider> {/* Wrap the app with PlantProvider */}
      <Container fluid className="app-container">
        <Row>
          <Header />
        </Row>
        <Row className="main-content">
          <Routes> {/* Define your routes here */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registerM" element={<RegisterM />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginM" element={<LoginM />} />
            <Route path="/list" element={<PlantList />} />
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/addPlant" element={<AddPlant />} />
            <Route path="/update-plant/:id" element={<UpdatePlant/>} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile"  element={<Profile />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </PlantProvider>
  );
};

export default App;
