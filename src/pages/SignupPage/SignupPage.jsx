import React, { useState, useRef, useEffect } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import userService from '../../utils/userService';
import { useNavigate, Link } from 'react-router-dom';
import './SignupPage.scss';
import Logo from '../../img/money-tree9.png';
import Btn from '../../components/Buttons/Btn';

import { gsap } from 'gsap';

export default function SignUpPage(props) {
  const [invalidForm, setValidForm] = useState(false);
  const [error, setError] = useState('');
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const history = useNavigate();
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // refere to the utils/userService, to look at the signup fetch function
      await userService.signup(state);
      // setTheUser in our app
      props.handleSignUpOrLogin(); // gets the token from localstorage and updates the user state in our app.js
      // with the correct user object from the current token
      // then route to the homepage
      history('/'); // defined above from react-router-dom
      // after this we can go whereever
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  // animations

  let img1 = useRef(null);
  let img2 = useRef(null);

  // animations

  return (
    <>
      <section className="signup-page">
        <div className="signup-page__left">
          <div className="signup-page__top-logo">
            <img src={Logo} alt="" />
            <h1>TipTree</h1>
          </div>

          <div className="signup-page__header">
            <h1>Sign Up</h1>
          </div>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Btn
              className="btn"
              type="submit"
              label="Sign up"
              disabled={invalidForm}
            />

            {error ? <ErrorMessage error={error} /> : null}
            <small>
              Already have an account?{' '}
              <Link to="/login">
                {' '}
                <span>Log in</span>
              </Link>
            </small>
          </form>
        </div>
        <div className="signup-page__right">
          <h1>Track your income and take better control of your finances.</h1>
          <p>
            If your primary source of income is tips, financial planning can be
            challenging. <span>TipTree</span> is a simple, intuitive and free
            tool for you to track how much money you make to help you improve
            your financial life
          </p>
          <div
            ref={(el) => (img1 = el)}
            className="signup-page__right-img1"
          ></div>
          <div
            ref={(el) => (img2 = el)}
            className="signup-page__right-img2"
          ></div>
        </div>
      </section>
    </>
  );
}
