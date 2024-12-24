
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { removeFromCart, updateQuantity } from "../Features/PlantSlice"; 

import { Container, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

import'./CartStyle.css'


const Cart = () => {

  const cart = useSelector((state) => state.plants.cart); // Get cart from Redux state

  const dispatch = useDispatch();


  const [modal, setModal] = useState(false); // State to handle modal visibility


  const toggleModal = () => setModal(!modal); // Toggle the modal visibility


  const calculateTotal = () =>

    cart.reduce((total, item) => total + item.price * item.quantity, 0);


  const handleCheckout = () => {

    // You can implement further actions like API calls here

    alert("Thank you for your purchase!");

    toggleModal(); // Close the modal after checkout

  };


  return (

    <Container fluid className="py-5">

      <h1 className="text-center text-success mb-5">Your Cart</h1>


      {cart.length === 0 ? (

        <p className="text-center text-muted">Your cart is empty.</p>

      ) : (

        <>

          {cart.map((item) => (

            <Row key={item.id} className="mb-4 align-items-center justify-content-center">

              {/* Product Image */}

              <Col md={2} className="d-flex justify-content-center">

                <img

                  src={item.image}

                  alt={item.name}

                  style={{

                    width: "200px", // Increased image size

                    height: "auto",

                    objectFit: "cover",

                    borderRadius: "8px",

                  }}

                />

              </Col>


              {/* Product Details */}

              <Col md={3} className="text-center" style={{ paddingBottom: '5px' }}>

                <h5

                  style={{

                    marginBottom: '5px',

                    fontSize: '1.6rem',

                    color: 'green',

                  }}

                >

                  {item.name}

                </h5>

                <p

                  className="text-success"

                  style={{

                    marginBottom: '5px',

                    fontSize: '1.3rem', // زيادة حجم الخط للسعر

                    color: '#2a9d8f',   // تغيير اللون

                  }}

                >

                  ${item.price.toFixed(2)}

                </p>

              </Col>


              {/* Quantity and Actions */}

              <Col md={2} className="d-flex justify-content-center align-items-center"
style={{ paddingBottom: '5px' }}>

                <Button

                  color="success"

                  size="sm"

                  className="me-2"

                  onClick={() =>

                    dispatch(updateQuantity({ id: item.id, increment: -1 }))

                  }

                  style={{ backgroundColor: 'green', borderColor: 'green' }}

                >

                  <FaMinus />

                </Button>


                <span className="me-2" style={{ fontWeight: 'bold' }} >{item.quantity}</span>


                <Button

                  color="warning"

                  size="sm"

                  className="me-2"

                  onClick={() =>

                    dispatch(updateQuantity({ id: item.id, increment: 1 }))

                  }

                  style={{ backgroundColor: 'green', borderColor: 'green' }}

                >

                  <FaPlus style={{ color: '#ffffff' }} />

                </Button>

              </Col>


              {/* Delete Button */}

              <Col md={2} className="d-flex justify-content-center"
style={{ paddingBottom: '5px' }}>

                <Button

                  color="danger"

                  size="sm"

                  onClick={() => dispatch(removeFromCart(item.id))}

                  style={{ backgroundColor: 'green', borderColor: 'green' }}

                >

                  <FaTrash />

                </Button>

              </Col>

            </Row>

          ))}


          {/* Total and Checkout Button */}

          <Row className="mt-5 justify-content-center">

            <Col md={6} className="text-center">

              <h5>Total: ${calculateTotal().toFixed(2)}</h5>

              <Button color="success" onClick={toggleModal}>

                Payment

              </Button>

            </Col>

          </Row>


          {/* Modal for Payment Confirmation */}

          <Modal isOpen={modal} toggle={toggleModal}>

            <ModalHeader toggle={toggleModal}>Confirm Purchase</ModalHeader>

            <ModalBody>

              <p>Are you sure you want to proceed with the purchase?</p>

              <p>Total: ${calculateTotal().toFixed(2)}</p>

            </ModalBody>

            <ModalFooter>

              <Button color="secondary" onClick={toggleModal}>

                Cancel

              </Button>

              <Button color="success" onClick={handleCheckout}>

                Confirm Purchase

              </Button>

            </ModalFooter>

          </Modal>

        </>

      )}

    </Container>

  );

};


export default Cart;



