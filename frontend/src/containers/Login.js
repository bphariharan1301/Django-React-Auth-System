import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/auth';

const Login = ({ login }) => {

  const [formData, setFormData] = useState({
    email: '',
    password:''
  })

  const { email, password } = formData
  const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

  const onSubmit = e => {
    e.preventDefault()

    login(email,password)
  }

  // Is the user authenticated
  // Redirect them to home page

  return (
    <div className="container mt-5">
      <h1>
        Sign In
      </h1>
      <p>
        Sign In to your Account
      </p>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control mt-3"
            type='email'
            placeholder = 'Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control mt-3"
            type='password'
            placeholder = 'Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='8'
            required
          />
        </div>
        <button className="btn btn-primary mt-3" type="submit" >Login</button>
      </form>
      <p className="mt-3">
        Don't have an Account? <Link to='/signup'> Sign Up </Link>
      </p>
      <p className="mt-3">
      <Link to='/reset-password'> Forgot Password? </Link>
      </p>
    </div>
  )
}

// const mapStateToProps = state => ({
//   // is authenticated?
// })

export default connect(null, { login })(Login);