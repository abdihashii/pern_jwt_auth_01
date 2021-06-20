import React from 'react';

// Libraries
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeInput,
  resetInputs,
} from '../slices/authentication/authenticationSlice';
import { RootState } from '../app/store';

// Types
type LoginProps = {
  setAuth(authBoolean: boolean): React.SetStateAction<boolean>;
};

const Login = ({ setAuth }: LoginProps) => {
  // Redux
  const loginAuthenticationInputs = useSelector(
    (state: RootState) => state.authenticationInputs.login
  );
  const dispatch = useDispatch();

  /**
   * On click handler that runs the register API
   * @param {Object} e - The event target
   */
  const onLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = {
        email: loginAuthenticationInputs.email,
        password: loginAuthenticationInputs.password,
      };

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
        dispatch(resetInputs({ auth: 'login' }));
      }
    } catch (error) {
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
          value={loginAuthenticationInputs.email}
          onChange={({ target: { name, value } }) =>
            dispatch(changeInput({ auth: 'login', name, value }))
          }
        />

        <label htmlFor="passwordInput">password</label>
        <input
          className="form-control my-3"
          type="password"
          name="password"
          id="passwordInput"
          value={loginAuthenticationInputs.password}
          onChange={({ target: { name, value } }) =>
            dispatch(changeInput({ auth: 'login', name, value }))
          }
        />

        <div className="buttons d-flex flex-column">
          <button type="submit" className="btn btn-success btn-block">
            Log in
          </button>
          <Link className="my-3" to="/register">
            Register
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
