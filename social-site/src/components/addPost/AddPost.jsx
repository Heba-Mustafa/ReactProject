import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddPost = () => {
  const [inputValue, setInputValue] = useState({
    content: "",
    imageUrl: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("fine");

    const tokenFromLocalStorage = localStorage.getItem("token");
    const idFromLocalStorage = localStorage.getItem("id");
    const emailFromLocalStorage = localStorage.getItem("email");
    const nameFromLocalStorage = localStorage.getItem("name");

    console.log(
      idFromLocalStorage,
      nameFromLocalStorage,
      emailFromLocalStorage
    );

    axios
      .post("http://localhost:3000/posts", {
        ...inputValue,
        userId: idFromLocalStorage,
      })
      .then((response) => {
        console.log("Response:", response.data);
        //   const accessToken = response.data.accessToken; // Access the access token property
        // console.log("Access token:", accessToken);
        // navigate('/home')
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    alert("Post has been added Successfully! ❤");
  };

  const handleChange = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setInputValue({ ...inputValue, imageUrl });
    setSelectedImage(imageUrl); 
  };

  return (
    <div
      className=" min-h-screen flex items-center justify-center"
      //   style={{ height: "100vh" }}
    >
      <div className="bg-white p-4 shadow-md rounded-md w-1/2  flex flex-col justify-between pe-14 ps-10 py-8 h-3/4">
        <div className="flex items-center justify-between mb-4 h-full">
          <div className="flex h-full flex-col w-full gap-10">
            <div className="flex flex-col gap-10">
              <Link to={`/home`}>
                <h1
                  className=" w-8 flex items-center justify-center rounded hover:bg-gray-100 hover:color-white"
                  style={{ height: "30px" }}
                >
                  <i
                    className="fa-solid fa-arrow-left"
                    style={{ fontSize: "20px" }}
                  ></i>
                </h1>
              </Link>

              <img
                src="https://via.placeholder.com/50"
                alt="Profile"
                className="w-20 h-20 rounded-full mr-4"
              />
            </div>

            <form onSubmit={handleSubmit} className="flex  flex-col w-full ">
              <div className="flex">
                <input
                  className="flex-grow border-b border-gray-300 focus:outline-none w-3/4  "
                  onChange={handleChange}
                  type="text"
                  placeholder="What's on your mind?"
                  value={inputValue.content}
                  name="content"
                />

                <label htmlFor="imageUpload" className="cursor-pointer flex items-center" style={{fontSize:"25px"}}>
                  <i
                    className="fa-solid fa-camera"
                  ></i>
                  
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* to display the selected image in the same img afrer choose it */}
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="mt-4 rounded"
                  style={{ width: "50%", height: "auto" }}
                />
              )}

              <div>
                <button
                  className="bg-blue-500 text-white px-6 py-2  rounded-md mb-10"
                  type="submit"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
