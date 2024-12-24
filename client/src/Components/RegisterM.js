import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userSchemaValidation } from '../Validations/UserValidations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerM} from '../Features/ManagerSlice';
import './RegisterCust.css'; // Import custom CSS for styles
import img5 from "./assets/HomeImg/5.png";
import { Row } from 'reactstrap';
const RegisterM = () => {
  // State for form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonNo, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfirmPass] = useState('');

  const { msg, manager } = useSelector(state => state.managers);

  // React Hook Form validation setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  // Redux setup
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form submission handler
  const onSubmit = () => {
    const userData = {
      name: name,
      email: email,
      phonNo: phonNo,
      password: password,
    };
    dispatch(registerM(userData)); // Dispatch action to register the user
    navigate('/loginM'); // Redirect to login page after registration
  };

  return (
    <div className="register-container">
      {/* Left Section - Registration Form */}
      <div className="form-section">
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              {...register('name', { onChange: (e) => setName(e.target.value) })}
            />
            <p className="error-text">{errors.name?.message}</p>
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              {...register('email', { onChange: (e) => setEmail(e.target.value) })}
            />
            <p className="error-text">{errors.email?.message}</p>
          </div>

          {/* Phone Input */}
          <div className="form-group">
            <label htmlFor="phonNo">Phone Number:</label>
            <input
              type="tel"
              id="phonNo"
              className="form-control"
              placeholder="Enter your phone number"
              {...register('phonNo', { onChange: (e) => setPhone(e.target.value) })}
            />
            <p className="error-text">{errors.phonNo?.message}</p>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              {...register('password', { onChange: (e) => setPassword(e.target.value) })}
            />
            <p className="error-text">{errors.password?.message}</p>
          </div>

          {/* Confirm Password Input */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              {...register('confirmPassword', { onChange: (e) => setConfirmPass(e.target.value) })}
            />
            <p className="error-text">{errors.confirmPassword?.message}</p>
          </div>

          {/* Submit Button */}
          <div className="submit-section">
            <button type="submit" className="submit-button">Register</button>
          </div>

          {/* Links Section */}
          <div className="links-section">
            <p>
              Already have an account? <Link to="/loginM">Login</Link>
            </p>
          </div>
        </form>
      </div>

      {/* Right Section - Image with Green Background */}
      <div className="image-section">
        {/* Text overlay */}
        <div className="text-overlay">
          <h2>Let's Get Started</h2>
        </div>

        <div className="image-frame">
          <img src={img5} alt="Zeus Garden" className="plant-image" />
        </div>
      </div>

      <Row>
        <h4>{msg}</h4>
        <h4>{manager?.name}</h4>
        <h4>{manager?.email}</h4>
        <h4>{manager?.phoneNo}</h4>
      </Row>
    </div>
  );
};

export default RegisterM;
