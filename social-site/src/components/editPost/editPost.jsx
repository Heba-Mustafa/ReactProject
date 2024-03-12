import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const EditPost = () => {

  const { postId } = useParams();

  const [inputValue, setInputValue] = useState({
    content: "",
    imageUrl: "",
  });

  // Add state for selected image
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${postId}`)
      .then((response) => {
        const postData = response.data;
        setInputValue({
          content: postData.content,
          imageUrl: postData.imageUrl, // Set initial imageUrl from fetched data
        });
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });
  }, [postId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted edited post:", inputValue);

    axios
      .patch(`http://localhost:3000/posts/${postId}`, inputValue) // Send updated data including imageUrl
      .then((response) => {
        console.log("Response:", response.data);
        toast.success('Post edited successfully!..✔')
    })
      .catch((error) => {
        console.error("Error updating post:", error);
        toast.failed('Post edited failed!')
      });
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
      className="flex items-center justify-center"
      style={{ height: "100vh" }}
    >
        <ToastContainer/>
      <div className="bg-white p-4 shadow-md rounded-md w-1/2 h-1/2 flex flex-col justify-between pe-14 ps-10 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-start gap-10 w-full">
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
              className="w-10 h-10 rounded-full mr-4"
            />
            <form onSubmit={handleSubmit} className="w-full ">
              <input
                className="flex-grow border-b border-gray-300 focus:outline-none w-full mb-4"
                onChange={handleChange}
                type="text"
                placeholder="What's on your mind?"
                value={inputValue.content}
                name="content"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex items-center"
                style={{ fontSize: "25px" }}
              >
                <i className="fa-solid fa-camera"></i>

                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </label>
              {/* Display selected image */}
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
                  className="bg-blue-500 text-white px-6 py-2 mt-20 rounded-md "
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
