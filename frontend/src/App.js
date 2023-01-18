import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Activate from './containers/Activate';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import SignUp from './containers/SignUp';
import Layout from "./hocs/Layout";
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store={store} >
    <Router>
      <Layout>
        <Routes>
          <Route exact path="" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/reset-password" element={<ResetPassword/>} />
          <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
          <Route exact path="/auth/activate/:uid/:token" element={<Activate/>} />
        </Routes>
      </Layout>
    </Router>
  </Provider>
);

export default App

