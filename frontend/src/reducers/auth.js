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
  ACTIVATION_FAIL,
  GOOGLE_AUTH_SUCESS,
  GOOGLE_AUTH_FAIL,
} from '../actions/types'

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated:null,
  user: null
}

export default function foo(state = initialState, action) {
  const { type, payload } = action

  switch (type) {

    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated:true
      }

    case LOGIN_SUCCESS:
      localStorage.setItem('access', payload.access)
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh
      }
    
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      }
    
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user:payload
      }
    
    case USER_LOADED_FAIL:
      return {
        ...state,
        user:null
      }
    
    case AUTHENTICATED_FAIL:
      return {
          ...state,
          isAuthenticated:false
      }
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
    case GOOGLE_AUTH_FAIL:
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
    
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user:null
      }
    case GOOGLE_AUTH_SUCESS:
      localStorage.getItem('access', payload.access)

      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh
      }

    case PASSWORD_REST_CONFIRM_FAIL:
    case PASSWORD_REST_CONFIRM_SUCESS:
    case PASSWORD_REST_FAIL:
    case PASSWORD_REST_SUCCESS:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state
      }
    
    default:
      return state
    
  };

};
