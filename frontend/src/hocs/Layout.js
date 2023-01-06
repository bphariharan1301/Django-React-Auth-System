import React, { useEffect } from "react";
import Navbar from '../components/Navbar';
import { connect } from 'react-redux'
import { checkAuthenticated, load_user } from '../actions/auth'


const Layout = (props) => {

  useEffect(() => {

  }, []);

  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  )
}

export default connect(null, { checkAuthenticated, load_user })(Layout);