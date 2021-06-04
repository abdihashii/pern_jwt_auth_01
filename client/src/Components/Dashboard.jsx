import React, { useState, useEffect } from 'react';

// Libraries
import { toast } from 'react-toastify';

const Dashboard = ({ setAuth }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  const onLogOut = (e) => {
    e.preventDefault();

    localStorage.removeItem('token');

    setAuth(false);

    toast.info('Logged out successfully');
  };

  const getName = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: {
          token: localStorage.token,
        },
      });

      const json = await response.json();

      const { user_email: email, user_name: name } = json;

      setUser({ name, email });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <div>Hello, {user.name}</div>

      <button className="btn btn-primary btn-block" onClick={onLogOut}>
        Log out
      </button>
    </>
  );
};

export default Dashboard;
