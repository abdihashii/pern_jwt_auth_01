import React, { useState, useEffect } from 'react';

// Libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

// Components
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';

// Styles
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isUserAuthenticated = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/isVerified', {
        method: 'GET',
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      const isVerified = await response.json();
      if (!response.ok) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(isVerified);
      }
    } catch (error) {
      console.error(error.message);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  return (
    <>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                !isAuthenticated ? (
                  <Redirect to="/login" />
                ) : (
                  <Dashboard {...props} {...{ setAuth }} />
                )
              }
            ></Route>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} {...{ setAuth }} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            ></Route>
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} {...{ setAuth }} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>
          </Switch>
        </div>
      </Router>

      <ToastContainer
        position="bottom-center"
        pauseOnFocusLoss={false}
        transition={Slide}
      />
    </>
  );
}

export default App;
