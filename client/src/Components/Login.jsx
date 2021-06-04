import React, { useState } from 'react';

// Libraries
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setAuth }) => {
  // States
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputs;

  const onInputChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  const onLogIn = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await response.json();

      if (!response.ok) {
        setAuth(false);
        toast.error(json);
      } else {
        localStorage.setItem('token', json.token);
        setAuth(true);
        toast.success('Logged in successfully');
      }
    } catch (error) {
      console.error(error.message);
      setAuth(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={onLogIn}>
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

        <button type="submit" className="btn btn-success btn-block">
          Log in
        </button>
      </form>

      <Link to="/register">Register</Link>
    </>
  );
};

export default Login;
