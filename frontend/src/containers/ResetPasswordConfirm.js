import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPasswordConfirm } from '../actions/auth';

const ResetPasswordConfirm = ({ resetPasswordConfirm }) => {
  const [requestSent, setRequestSent] = useState(false)
  const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
  });
  
  const { uid } = useParams()
  const { token } = useParams()
  
  const { new_password, re_new_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
      e.preventDefault();

      console.log('uid Params: ', uid)
      console.log('token Params: ', token)
      resetPasswordConfirm(uid, token, new_password, re_new_password);
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
            <h1>Change Password Reset</h1>
            <form onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <input
                  className='form-control'
                  type='password'
                  placeholder='New Password'
                  name='new_password'
                  value={new_password}
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
                  placeholder='Confirm New Password'
                  name='re_new_password'
                  value={re_new_password}
                  onChange={e => onChange(e)}
                  minLength='6'
                  required
                />
              </div>
              <br />
              <button className='btn btn-primary' type='submit'>
                Reset Password
              </button>
            </form>
        </div>
    );
};

export default connect(null, { resetPasswordConfirm })(ResetPasswordConfirm);