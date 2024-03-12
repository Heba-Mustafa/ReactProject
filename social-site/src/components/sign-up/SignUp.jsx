import React, { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { CustomContext } from '../../components/MyContext'; 

const SignUp = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [valid, setValid] = useState(true);
  const {user,setUser} =useContext(CustomContext)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(inputValue);
    let isvalid = true;
    let validationError = {};

    if (inputValue.name === "" || inputValue.name === null) {
      isvalid = false;
      validationError.name = "Name is required";
    }

    if (inputValue.email === "" || inputValue.email === null) {
      isvalid = false;
      validationError.email = "E-mail is required";
    } else if (!/\S+@\S+\.\S+/.test(inputValue.email)) {
      isvalid = false;
      validationError.email = "E-mail pattern is not valid";
    }

    if (inputValue.password === "" || inputValue.password === null) {
      isvalid = false;
      validationError.password = "Password is required";
    } else if (inputValue.password.length < 6) {
      isvalid = false;
      validationError.password = "Password length must be at least 6 chars";
    }

    if (inputValue.confirmPassword !== inputValue.password) {
      isvalid = false;
      validationError.confirmPassword = "Not matching the previous password";
    }

    // console.log(validationError);

    setError(validationError);
    setValid(isvalid);

    if (Object.keys(validationError).length === 0) {
      const data  ={name:inputValue.name , email:inputValue.email , password:inputValue.password}

    axios.post("http://localhost:3000/users", {...data})
    .then(response => {
      console.log("Response:", response.data);
      
    //   const accessToken = response.data.accessToken; // Access the access token property
    // console.log("Access token:", accessToken);
    navigate('/login')
    })
    .catch(error => {
      console.error("Error:", error);
    });
  
      alert("Registered Successfully!");

    }
    
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
          {/* inputs container */}

          {/* left */}
          <div className="left h-full w-1/2 p-12 ">
            <h1 className="text-2xl text-zinc-800 font-bold font-custom">
              Sign up
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
              <div className="ins-password flex mb-8 ">
                <i
                  className="fa-solid fa-lock pt-4 pe-6 "
                  style={{ color: "#dce3e0" }}
                ></i>{" "}
                <div className="flex flex-col">
                  <input
                    type="password"
                    placeholder="Repeat your password"
                    onChange={handeleChange}
                    value={inputValue.confirmPassword}
                    name="confirmPassword"
                  />
                  {valid ? (
                    <></>
                  ) : (
                    // <div className="bg-red-100  rounded-xl	border-2 border-rose-600">
                      <span className="text-red-700  ">
                        {error.confirmPassword}
                      </span>
                    // </div>
                  )}
                </div>
              </div>

              <button
                className="btn text-white py-2 px-4 rounded-lg mt-14 w-1/2 ms-9"
                style={{ background: "#33aba0" }}
                // #18b89a
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
          {/* right */}

          {/* img */}
          <div className="right -100 h-full w-1/2 p-12">
            <img src="/signup.jpg" />

            <Link to="/login">
              <h3 className="hover:underline font-roundy text-center mt-10">
                I am already member{" "}
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
