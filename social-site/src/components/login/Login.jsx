import axios from "axios";
// import { response } from "express";
import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Validate the token on page load
      axios
        .post("http://localhost:3000/users", { token })
        .then((response) => {
          if (response.data.valid) {
            // If token is valid, navigate to the home page
            navigate("/Home");
          } else {
            // If token is invalid, prompt user to log in
            localStorage.removeItem("token");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });




  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(inputValue);
    let isvalid = true;
    let validationError = {};
  
   
    
    let currentUser;

    axios
      .get("http://localhost:3000/users")
      .then((response) => {
         currentUser = response.data.find(
          (ele) =>
            ele.email === inputValue.email &&
            ele.name === inputValue.name &&
            ele.password === inputValue.password
        );

        if (currentUser) {
          // If user exists, generate token and save it
          generateAndSaveToken(currentUser.id);
          localStorage.setItem('name', currentUser.name);
          localStorage.setItem('email', currentUser.email);

        } else {
          isvalid = false;
          validationError.general = "Invalid credentials";
          setError(validationError);
          setValid(isvalid);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const generateAndSaveToken = async (userId, userName) => {
    try {
      // Generate access token
      const accessToken = generateAccessToken(32);

      // Send a PATCH request to update user with the access token
      await axios.patch(`http://localhost:3000/users/${userId}`, { accessToken });
      localStorage.setItem('token', accessToken);
      localStorage.setItem('id', userId);
      
      console.log('Access token saved for user with ID:', userId);
      // Navigate to "/Home"
      navigate("/home");
    } catch (error) {
      console.error('Error saving access token:', error);
    }
  
}

  const generateAccessToken = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?';
    const tokenArray = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      tokenArray.push(characters[randomIndex]);
    }
    return tokenArray.join('');
  };

  const handeleChange = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  return (
    <div>
      {/* whole bg */}
      <div
        className="w-full flex justify-center items-center"
        style={{ background: "#eee", height: "100vh" }}
      >
        {/* component bg */}
        <div
          style={{ borderRadius: "16px" }}
          className="w-full xl:w-2/4 lg:w-3/5 md:w-4/5  p-14 shadow-lg sm:w-4/5 mx-auto bg-white p-4 transition-width duration-500 h-full sm:h-full md:h-3/4 flex items-center"
        >
          {/* right */}
          {/* img */}
          <div className="right -100 h-full w-1/2 p-12 mt-14">
            <img src="/login.jpg" />

            <Link to="/signup">
              <h3 className="hover:underline font-roundy text-center mt-14">
                Create an account{" "}
              </h3>
            </Link>
          </div>
          {/* inputs container */}

          {/* left */}
          <div className="left h-full w-1/2 p-12 mt-14 ">
            <h1 className="text-2xl text-zinc-800 font-bold font-custom">
              Log In
            </h1>
            <form onSubmit={handleSubmit}>
            <div className="name mt-10 flex  outline-none">
                <i className="fa-solid fa-user pt-4 pe-6"></i>
                <div className="flex flex-col">
                  <input
                    onChange={handeleChange}
                    type="text"
                    placeholder=" Your name"
                    value={inputValue.name}
                    name="name"
                  />
                  {
                    valid ? (
                      <></>
                    ) : (
                      // <div className="bg-red-100  rounded-xl	border-2 border-rose-600">
                        <span className="text-red-700  ">{error.name}</span>
                      // </div>
                    )
                    // <span className='text-danger'>
                    //  {error.name};
                    // </span>
                  }
                </div>
              </div>
              <div className="email flex ">
                <i className="fa-solid fa-envelope pt-4 pe-6"></i>{" "}
                <div className="flex flex-col">
                  <input
                    onChange={handeleChange}
                    type="email"
                    placeholder=" Your e-mail"
                    value={inputValue.email}
                    name="email"
                  />
                  {valid ? (
                    <></>
                  ) : (
                    // <div className="bg-red-100  rounded-xl	border-2 border-rose-600">
                      <span className="text-red-700 ">{error.email}</span>
                    // </div>
                  )}
                </div>
              </div>
              <div className="password flex ">
                <i className="fa-solid fa-lock pt-4 pe-6"></i>{" "}
                <div className="flex flex-col">
                  <input
                    onChange={handeleChange}
                    type="password"
                    placeholder="Password"
                    value={inputValue.password}
                    name="password"
                  />
                  {valid ? (
                    <></>
                  ) : (
                    // <div className="bg-red-100  rounded-xl	border-2 border-rose-600">
                      <span className="text-red-700  ">
                        {error.password}
                      </span>
                    // </div>
                  )}
                </div>
              </div>
              <button
                className="btn text-white py-2 px-4 rounded-lg mt-14 w-1/2 "
                style={{ background: "#33aba0" }}
                type="submit"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
