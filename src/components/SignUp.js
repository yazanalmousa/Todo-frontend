import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  function isEmail(input) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test if the input matches the email regex
    if (emailRegex.test(input)) {
      return true;
    } else {
      return false;
    }
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();
  const password2Input = useRef();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    console.log(password2);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password Must Be At least 8 Characters !");
    } else if (!isEmail(email)) {
      toast.error("Enter A Valid Email !");
    } else if (password !== password2) {
      toast.error("Passwords Do Not Match !");
    } else {
      const data = { email, password }; // Create an object with email and password
      axios
        .post("http://localhost:3001/register", data) // Send the data object in the post request
        .then((res) => {
          console.log(
            res.data.state,
            "-----------------------------------------------success"
          );
          console.log(
            res.data.message,
            "-----------------------------------------------"
          );
          navigate("/");
          toast.success(res.data.message);
        })
        .catch((err) => console.log(err));
      emailInput.current.value = "";
      passwordInput.current.value = "";
      password2Input.current.value = "";
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee;" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black"
                style={{ borderRadius: "25px;" }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              ref={emailInput}
                              onChange={handleEmailChange}
                            />
                            <label className="form-label" for="form3Example3c">
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              ref={passwordInput}
                              onChange={handlePasswordChange}
                            />
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              ref={password2Input}
                              onChange={handlePassword2Change}
                            />
                            <label className="form-label" for="form3Example4cd">
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <p className="small fw-bold mt-2 pt-1 mb-0">
                            Already have an account ?{" "}
                            <a href="/" className="link-danger">
                              Sign in
                            </a>
                          </p>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handleRegister}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
