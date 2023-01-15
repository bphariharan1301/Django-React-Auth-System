import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/auth';

const ResetPassword = ({ resetPassword }) => {
  const [requestSent, setRequestSent] = useState(false)
  const [formData, setFormData] = useState({
        email: '',
    });

  const { email } = formData;
  console.log('Email passed: ', email)

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();

      resetPassword(email);
      setRequestSent(true)
  };
  
  // Is the user authenticated
  // Navigate them to home page

  if (requestSent) {
      console.log('Inside isAuthenticated if block')
      return <Navigate to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Request Password Reset</h1>
            <p>A Reset Link will be sent to your email id if it's found in our site.</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <br />
                <button className='btn btn-primary' type='submit'>Send Request</button>
            </form>
        </div>
    );
};

export default connect(null, { resetPassword })(ResetPassword);