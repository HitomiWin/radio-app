import { useState } from "react"
import Login from "../components/Login";
import Register from "../components/Register";
import {loginPage, toggleText}from "../css/LoginPage.module.css";
const LoginPage = () => {

  const [showLogin, setShowLogin] =useState(true);

 const toggle = () => {
    setShowLogin(!showLogin)
  }
  // const handleOnclickLogin =()=>{
  //   setShowLogin(true)
  // }
  // const handleOnclickRegister =()=>{
  //   setShowLogin(false)
  // }

  return (
    <div className={loginPage}>
      {/* <ul className={ menuList} >
      <li className={listItem} onClick={()=>handleOnclickLogin()}><span className={` ${showLogin ? active: inactive}`}>Logga in</span></li>
      <li className={listItem} onClick={()=>handleOnclickRegister()}><span className={` ${showLogin ? inactive: active}`}>Bli Medlem</span></li>
    </ul>     */}
    <div>
      {showLogin? <Login /> : <Register />}
      <p className={toggleText} onClick={toggle}>{showLogin ? "Are you not a member yet?" : " Back to login"}</p>
    </div> 
    </div>
  );
};

export default LoginPage;
