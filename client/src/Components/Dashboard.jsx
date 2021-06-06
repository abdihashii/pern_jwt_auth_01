import React, { useState, useEffect } from 'react';

// Libraries
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../slices/counter/counterSlice';

const Dashboard = ({ setAuth }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  // Redux
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

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
      <h1 className="my-3">Dashboard</h1>
      <div className="my-3">Hello, {user.name}</div>

      <div className="my-3" style={{ width: 'max-content' }}>
        <button
          className="btn btn-outline-success"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className="mx-3">{count}</span>
        <button
          className="btn btn-outline-danger"
          aria-label="Increment value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="btn btn-outline-primary d-block w-100 my-3"
          aria-label="Reset value"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
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
