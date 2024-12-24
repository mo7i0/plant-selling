import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Features/UserSlice';
import { userSchemaValidation } from '../Validations/UserValidations';
import './RegisterCust.css';
import img5 from "./assets/HomeImg/5.png";

const RegisterCust = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonNo, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfirmPass] = useState('');

  const { msg, user } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit = () => {
    const userData = { name, email, phoneNo: phonNo, password };
    dispatch(registerUser(userData));
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}>
        <div style={styles.textOverlay}>
          <h2 style={styles.title}>Let's Get Started</h2>
        </div>
        <img src={img5} alt="Zeus Garden" style={styles.image} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h2 style={styles.header}>Register</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name:</label>
          <input
            type="text"
            {...register('name', { onChange: (e) => setName(e.target.value) })}
            placeholder="Enter your name"
            style={styles.input}
          />
          <p style={styles.error}>{errors.name?.message}</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address:</label>
          <input
            type="email"
            {...register('email', { onChange: (e) => setEmail(e.target.value) })}
            placeholder="Enter your email"
            style={styles.input}
          />
          <p style={styles.error}>{errors.email?.message}</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number:</label>
          <input
            type="tel"
            {...register('phonNo', { onChange: (e) => setPhone(e.target.value) })}
            placeholder="Enter your phone number"
            style={styles.input}
          />
          <p style={styles.error}>{errors.phonNo?.message}</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            {...register('password', { onChange: (e) => setPassword(e.target.value) })}
            placeholder="Enter your password"
            style={styles.input}
          />
          <p style={styles.error}>{errors.password?.message}</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm Password:</label>
          <input
            type="password"
            {...register('confirmPassword', { onChange: (e) => setConfirmPass(e.target.value) })}
            placeholder="Confirm your password"
            style={styles.input}
          />
          <p style={styles.error}>{errors.confirmPassword?.message}</p>
        </div>

        <button type="submit" style={styles.button}>Register</button>

        <p style={styles.links}>
          Already have an account? <Link to="/Home">Login</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    maxWidth: "800px",
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  imageSection: {
    textAlign: "center",
    marginBottom: "20px",
  },
  textOverlay: {
    marginBottom: "10px",
  },
  title: {
    color: "#4CAF50",
  },
  image: {
    maxWidth: "100%",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  header: {
    textAlign: "center",
    color: "#4CAF50",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
  links: {
    textAlign: "center",
    marginTop: "10px",
  },
};

export default RegisterCust;
