import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Activate = ({ verify }) => {

  console.log('INSIDE ACTIVATE BLOCK')

  const [Verified, SetVerified] = useState(false)
  const { uid } = useParams()
  const { token } = useParams()
  const verify_account = e => {
      console.log('UID: ', uid)
      console.log('Token: ', token)
      verify(uid, token);
      SetVerified(true)
  };
  

  if (Verified) {
      console.log('Inside isAuthenticated if block')
      return <Navigate to='/' />
    }

    return (
        <div className='container'>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ marginTop: '200px' }}
          >
            <h1>
              Verify Account
            </h1>
            <button
              onClick={verify_account}
              style={{ marginTop:'50px' }}
              type='button'
              className='btn btn-primary'
            >
              Verify
            </button>
          </div>
        </div>
    );
};


export default connect(null, { verify })(Activate);