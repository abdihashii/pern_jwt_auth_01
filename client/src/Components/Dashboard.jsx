import React, { useState, useEffect } from 'react';

// Libraries
import { toast } from 'react-toastify';

// Components
import IncrementButtons from './IncrementButtons';
import UsersTable from './UsersTable';

// Styling
import './styles/dashboard.scss';

const Dashboard = ({ setAuth }) => {
  // States
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [users, setUsers] = useState([]);

  const onLogOut = (e) => {
    e.preventDefault();

    localStorage.removeItem('token');

    setAuth(false);

    toast.info('Logged out successfully');
  };

  /**
   * Asynchronous function that gets the user's name based on their jwt
   */
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
      toast.error(error.message);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');

      const json = await response.json();

      setUsers(json);
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Runs the functions on load/init
   */
  useEffect(() => {
    getName();
    getUsers();
  }, []);

  return (
    <>
      <h1 className="my-3">Dashboard</h1>
      <div className="my-3">Hello, {user.name}</div>

      <div className="my-3" style={{ width: '300px' }}>
        <IncrementButtons />
      </div>

      <div className="my-3">
        <UsersTable {...{ users }} />
      </div>

      <button className="btn btn-primary btn-block" onClick={onLogOut}>
        Log out
      </button>
    </>
  );
};

export default Dashboard;
