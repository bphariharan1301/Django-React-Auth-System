import React from "react";
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => (

    <div className="container">
      {/* Jumbotron systax */}
      <div class="jumbotron container-fluid text-dark mt-5 p-5">
        <div class="container p-5">
          <h1 class="display-4">
            Auth system Using Djoser, which consists (most of) DRF + React API. 
          </h1>
          <hr className="my-4" />
          <p>
            Click the Log In button!
          </p>
          <Link to="/login" class="btn btn-primary">
            Log In
          </Link>
        </div>
      </div>
    </div>

)

export default Home;