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
type RegisterProps = {
  setAuth(authBoolean: boolean): React.SetStateAction<boolean>;
};

const Register = ({ setAuth }: RegisterProps) => {
  // Redux
  const registerAuthenticationInputs = useSelector(
    (state: RootState) => state.authenticationInputs.register
  );
  const dispatch = useDispatch();

  /**
   * On click handler that runs the register API
   * @param {Object} e - The event target
   */
  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { name, email, password } = registerAuthenticationInputs;
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
        dispatch(resetInputs({ auth: 'register' }));
      }
    } catch (error) {
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
          value={registerAuthenticationInputs.name}
          onChange={({ target: { value, name } }) =>
            dispatch(changeInput({ auth: 'register', value, name }))
          }
        />

        <label htmlFor="emailInput">Email</label>
        <input
          className="form-control my-3"
          type="email"
          name="email"
          id="emailInput"
          value={registerAuthenticationInputs.email}
          onChange={({ target: { value, name } }) =>
            dispatch(changeInput({ auth: 'register', value, name }))
          }
        />

        <label htmlFor="passwordInput">password</label>
        <input
          className="form-control my-3"
          type="password"
          name="password"
          id="passwordInput"
          value={registerAuthenticationInputs.password}
          onChange={({ target: { value, name } }) =>
            dispatch(changeInput({ auth: 'register', value, name }))
          }
        />

        <div className="buttons d-flex flex-column">
          <button className="btn btn-success btn-block">Register</button>
          <Link className="my-3" to="/login">
            Log in
          </Link>
        </div>
      </form>
    </>
  );
};

export default Register;
