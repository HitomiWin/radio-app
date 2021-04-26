import { useState, useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import Login from "../components/Login";
import Register from "../components/Register";
import {loginPage, toggleText}from "../css/LoginPage.module.css";
import { Container } from "react-bootstrap" 
const LoginPage = () => {

const {showLogin, setShowLogin} =useContext( UserContext )

 const toggle = () => {
    setShowLogin(!showLogin)
  }

  return (
    <Container className={loginPage}>

    <div>
      {showLogin? <Login /> : <Register />}
      <p className={toggleText} onClick={toggle}>{showLogin ? "Are you not a member yet?" : " Back to login"}</p>
    </div> 
    </Container>
  );
};

export default LoginPage;
