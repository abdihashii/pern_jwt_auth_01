import React, { useState } from 'react';

// Libraries
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ setAuth }) => {
  // States
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = inputs;

  const onInputChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  const onRegister = async (e) => {
    e.preventDefault();

    try {
      const body = { name, email, password };

      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const json = await response.json();

      if (!response.ok) {
        setAuth(false);
        toast.error(json);
      } else {
        localStorage.setItem('token', json.token);
        setAuth(true);
        toast.success('Registered successfully');
      }
    } catch (error) {
      console.error(error.message);
      setAuth(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onRegister}>
        <label htmlFor="nameInput">Name</label>
        <input
          className="form-control my-3"
          type="text"
          name="name"
          id="nameInput"
          value={name}
          onChange={onInputChange}
        />

        <label htmlFor="emailInput">Email</label>
        <input
          className="form-control my-3"
          type="email"
          name="email"
          id="emailInput"
          value={email}
          onChange={onInputChange}
        />

        <label htmlFor="passwordInput">password</label>
        <input
          className="form-control my-3"
          type="password"
          name="password"
          id="passwordInput"
          value={password}
          onChange={onInputChange}
        />

        <button className="btn btn-success btn-block">Register</button>
      </form>

      <Link to="/login">Log in</Link>
    </>
  );
};

export default Register;
