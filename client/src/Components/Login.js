import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoginValidation } from '../Validations/loginValidation';
import { login } from '../Features/UserSlice'; // Action for user login
import pi from './assets/images/pi.png'; // Replace with your user-specific image
import './LoginM'; // Add this import for custom styles

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLogin, isError, msg } = useSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });

  const onSubmit = (data) => {
    dispatch(login(data)); // Dispatch login action
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
          <img src={pi} alt="User Login" />
        </div>
        <h2 className="centered-heading">User Login</h2>
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
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
