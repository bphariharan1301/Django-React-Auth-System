import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import axios from 'axios';

const SignUp = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false)
  const [formData, setFormData] = useState({
        name:'',
        email: '',
    password: '',
        re_password:''
  });
    
  const continueWithGoogle = async () => {
    try {
        const res = await axios.get("http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:8000");
        window.location.replace(res.data.authorization_url)
    } catch (error) {
        
    }
}

  const { name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();

      if (password===re_password) {
        signup(name, email, password, re_password);
        setAccountCreated(true)
      }
  };
  
  // Is the user authenticated
  // Navigate them to home page

  if (isAuthenticated) {
      return <Navigate to='/' />
  }
  
  if (accountCreated) {
    return <Navigate to='/login' />
  }

    return (
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Create your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Name *'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <br />
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email *'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <br />
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password *'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <br />
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password *'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <br />
                <button className='btn btn-primary' type='submit'>Register</button>
            </form>
            <button className='btn btn-danger mt-3' onClick={ continueWithGoogle } >
                Continue with Google
            </button>
            <p className='mt-3'>
                Have an account? <Link to='/login'>Log In</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUp);