import React, { useEffect } from "react";
import Navbar from '../components/Navbar';
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom";
import { checkAuthenticated, load_user, googleAuthenticate } from '../actions/auth'
import queryString from 'query-string';


const Layout = (props) => {

  let location = useLocation()

  useEffect(() => {
    const values = queryString.parse(location.search) 
    const state = values.state ? values.state : null
    const code = values.code ? values.code : null

    console.log('STATE IS: '+ state)
    console.log('CODE IS: '+code)


    if (state && code) {
      props.googleAuthenticate(state, code)
    } else {
        props.checkAuthenticated();
        props.load_user();
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  )
}

export default connect(null, { checkAuthenticated, load_user, googleAuthenticate })(Layout);