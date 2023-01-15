import {
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  LOGOUT,
  PASSWORD_REST_CONFIRM_FAIL,
  PASSWORD_REST_CONFIRM_SUCESS,
  PASSWORD_REST_FAIL,
  PASSWORD_REST_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL
} from './types'
import axios from 'axios'

export const load_user = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me`, config)
  
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload:res.data
      })
    } catch (err) {
      dispatch({
        type:USER_LOADED_FAIL
      })
    }

  } else {
    dispatch({
      type:USER_LOADED_FAIL
    })
  }
}

export const checkAuthenticated = () => async dispatch => {
  if (localStorage.getItem('access')) {
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      }; 

      const body = JSON.stringify({ token: localStorage.getItem('access') });

      try {
          const res = await axios.post(`http://localhost:8000/auth/jwt/verify/`, body, config)

          if (res.data.code !== 'token_not_valid') {
              dispatch({
                  type: AUTHENTICATED_SUCCESS
              });
          } else {
              dispatch({
                  type: AUTHENTICATED_FAIL
              });
          }
      } catch (err) {
          dispatch({
              type: AUTHENTICATED_FAIL
          });
      }

  } else {
      dispatch({
          type: AUTHENTICATED_FAIL
      });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ email, password });

  try {
    console.log("Inside try block auth.js/login")
    const res = await axios.post(`http://localhost:8000/auth/jwt/create/`, body, config);
    
    console.log("Send Axios Value: ", res)

      dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
      });

      dispatch(load_user());
  } catch (err) {
    console.log('Inside catch block auth.js/login')
      dispatch({
          type: LOGIN_FAIL
      })
  }
};
export const signup = (name, email, password, re_password) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ name, email, password, re_password });

  try {
    console.log("Inside try block auth.js/login")
    const res = await axios.post(`http://localhost:8000/auth/users/`, body, config);
    
    console.log("Send Axios Value: ", res)

      dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data
      });

      dispatch(load_user());
  } catch (err) {
      dispatch({
          type: SIGNUP_FAIL
      })
  }
};

export const verify = (uid, token) => async dispatch => {
  const config = {
    headers: {
      'Content-Type':'application/json',
    }
  }
  const body = JSON.stringify({ uid, token })
  
  try {
    await axios.post(`http://localhost:8000/auth/users/activation/`, body, config);

      dispatch({
          type: ACTIVATION_SUCCESS,
      });

      dispatch(load_user());
  } catch (err) {
      dispatch({
          type: ACTIVATION_FAIL
      })
  }
}

export const resetPassword = (email) => async dispatch => {
  const config = {
    headers: {
      'Content-Type':'application/json',
    }
  }
  const body = JSON.stringify({email})
  try {
    await axios.post(`http://localhost:8000/auth/users/reset_password/`, body, config)
    dispatch({
      type:PASSWORD_REST_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: PASSWORD_REST_FAIL
    })
    
  }
}
export const resetPasswordConfirm = (uid, token, new_password, re_new_password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type':'application/json',
    }
  }
  const body = JSON.stringify({uid, token, new_password, re_new_password})
  try {
    await axios.post(`http://localhost:8000/auth/users/reset_password_confirm/`, body, config)
    dispatch({
      type:PASSWORD_REST_CONFIRM_SUCESS
    })
  } catch (error) {
    dispatch({
      type: PASSWORD_REST_CONFIRM_FAIL
    })
    
  }
}


export const logout = () => dispatch => {
  dispatch({
    type:LOGOUT
  })
}
