import React from 'react'
import "../login.css"
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../helper/Context';
import { useNavigate } from 'react-router-dom';
import { UserEmail } from '../helper/Context';
import { useEffect } from 'react';
function LogInForm() {
    const navigate = useNavigate()
  const {loggedIn,setLoggedIn} = React.useContext(UserContext)
  const {userEmail,setUserEmail} = React.useContext(UserEmail)
    function isEmail(input) {
        // Regular expression for a basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Test if the input matches the email regex
        if (emailRegex.test(input)) {
          return true
        } else {
          return false
        }
      }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const emailInput = useRef()
    const passwordInput = useRef()

    const handleEmail = (e) => {
        setEmail(e.target.value)
        console.log(email)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
        console.log(password)
    } 
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password.length < 8) {
        toast.error('Password Must Be At least 8 Characters!');
      } else if (!isEmail(email)) {
        toast.error('Enter A Valid Email!');
      } else {
        try {
          const data = { email, password };
          const response = await axios.post("http://localhost:3001/login", data);
          console.log(response, "-----------------------------------------------");
          console.log(response.data.state, "-----------------------------------------------success");
    
          setLoggedIn(response.data.state);
    
          if (response.data.state === true) {
            toast.success("Authentication Succeeded");
            setUserEmail(email);
          } else {
            toast.error("Authentication Failed");
          }
        } catch (error) {
          console.log(error);
        } finally {
          emailInput.current.value = "";
          passwordInput.current.value = "";
        }
      }
    };
    
    // useEffect to wait for userEmail to update before navigating
    useEffect(() => {
      if (userEmail) {
        navigate("/todo", { state: { userEmail } });
      }
    }, [userEmail, navigate]);
    return (
      <div className='container'>
      <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sample image"/>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control form-control-lg"
                  placeholder="Enter a valid email address" onChange={handleEmail} pattern=".+@example\.com" ref={emailInput}/>
                <label className="form-label" for="form3Example3">Email address</label>
              </div>
    
              <div className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                  placeholder="Enter password" onChange={handlePassword} ref={passwordInput}/>
                <label className="form-label" for="form3Example4">Password</label>
              </div>
    
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                  <label className="form-check-label" for="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">Forgot password?</a>
              </div>
    
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg"
                  style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}} onClick={handleSubmit}>Login</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup"
                    className="link-danger">Register</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </section>
    </div>
    )
  }
  
  export default LogInForm