import React, { useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoginValidation } from '../Validations/loginValidation';
import { loginM } from '../Features/ManagerSlice'; // Action for manager login
import pi from './assets/images/pi.png'; // Replace with your image path
import './LoginM.css';  // Add this import at the top of your LoginM.js file

const LoginM = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLogin, isError, msg } = useSelector((state) => state.managers);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });

  const onSubmit = (data) => {
    dispatch(loginM(data)); // Dispatch login action
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/'); // Redirect to the Home page after successful login
    }
  }, [isLogin, navigate]);

  return (
    <div className="login-container">
      <div className="form-section">
        <div className="image-section">
          <img src={pi} alt="Manager Login" />
        </div>
        <h2 className="centered-heading">Manager Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              {...register('email')}
            />
            <p className="error-text">{errors.email?.message}</p>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              {...register('password')}
            />
            <p className="error-text">{errors.password?.message}</p>
          </div>

          <div className="submit-section">
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {isError && <p className="error-text">{msg}</p>} {/* Display error message if login fails */}

          <div className="links-section">
            <p className="signup-text">
              Don't have an account? <Link to="/registerM">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginM;
