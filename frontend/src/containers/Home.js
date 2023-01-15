import React from "react";
import { Link } from 'react-router-dom'
import './Home.css'

const Home = (  ) => {
  
  return (
    <div className="container">
      {/* Jumbotron systax */}
      <div className="jumbotron container-fluid text-dark mt-5 p-5">
        <div className="container p-5">
          <h1 className="display-4">
            Auth system Using Djoser, which consists (most of) DRF + React API. 
          </h1>
          <hr className="my-4" />
          <p>
        Click the Log In button!
      </p>
      <Link to="/login" className="btn btn-primary">
        Log In
      </Link>
        </div>
      </div>
    </div>

  )}

export default Home;