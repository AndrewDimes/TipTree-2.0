import React, { useState } from 'react';
import './LoginPage.scss';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Logo from '../../img/money-tree9.png';
import userService from '../../utils/userService';
import { useNavigate, Link } from 'react-router-dom';
import Btn from '../../components/Buttons/Btn';

export default function LoginPage(props) {
  const [invalidForm, setValidForm] = useState(false);
  const [error, setError] = useState('');
  const [state, setState] = useState({
    email: '',
    password: '',
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
      await userService.login(state);
      // Route to wherever you want!
      props.handleSignUpOrLogin();
      history('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      setError(err.message);
    }
  }

  return (
    <>
      <section className="login-page">
        <div className="login-page__header">
          <img src={Logo} alt="" />
          <h1>Log-in</h1>
        </div>

        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            required
          />
          <Btn type="submit" label="Login" disabled={invalidForm} />
          {/* <button type="submit" className="btn" disabled={invalidForm}>
            Login
          </button> */}
        </form>
        {error ? <ErrorMessage error={error} /> : null}
        <small>
          New to us?{' '}
          <Link to="/signup">
            <span>Sign Up</span>
          </Link>
        </small>
        {/* <Message>
          New to us? <Link to="/signup">Sign Up</Link>
        </Message> */}
      </section>
    </>
  );
}
