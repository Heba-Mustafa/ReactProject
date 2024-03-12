import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../nav/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    
        toast.success('Welcome to our Blog..❤', {
        //   toastStyle: { background: '#d58f87', color: '#d58f87' },
          bodyClassName: 'custom-toast-body',
          className: 'custom-toast color-#7854',
          
        });
      
    // toast.success("Welcome to our Blog..❤");


    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    axios
      .get(`http://localhost:3000/users`)
      .then((result) => {
        setUser(result.data);
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const userId = localStorage.getItem("id");
  let userName = localStorage.getItem("name");
  let useremail = localStorage.getItem("email");
  console.log(userName);

  const handleEdit = (postId) => {
    // Implement your edit logic here
    console.log("Edit post with id:", postId);
    // navigate('/editpost')
  };

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:3000/posts/${postId}`)
      .then((response) => {
        // Remove the deleted post from the state
        setPosts(posts.filter((post) => post.id !== postId));
        console.log("Post deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
    console.log("Delete post with id:", postId);
  };

  return (
    <div>
    <ToastContainer />
      <Navbar />

      <div
        className="container mx-auto px-4 py-8"
        style={{ paddingTop: "64px" }}
      >
        <h1 className="text-3xl font-bold text-center mb-8 " style={{fontFamily:"cursive", color:"#d58f87", fontSize:"30px"}}>
          {/* Welcome to our Blog..❤ */}
        </h1>
        <div className="flex flex-col gap-8 items-end">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden w-2/3"
            >
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  className="w-full h-88 object-cover object-center"
                />
              ) : (
                ""
              )}
              <div className="p-4">
                <div className="flex items-center mb-4">
                  {users.find((user) => user.id === post.userId) && (
                    <img
                      src={users.find((user) => user.id === post.userId).image}
                      alt="Profile"
                      className="w-20 h-20 rounded-full mr-2"
                    />
                  )}
                  <div className="flex flex-col m-4">
                    <span
                      className="text-gray-800 font-semibold "
                      style={{ fontSize: "23px" }}
                    >
                      {users.find((user) => user.id === post.userId)?.name}
                    </span>
                    <span
                      className="text-gray-500 font-semibold "
                      style={{ fontSize: "16px" }}
                    >
                      {users.find((user) => user.id === post.userId)?.email}
                    </span>
                  </div>
                  {post.userId === userId && (
                    <div className="ml-auto flex ">
                      <Link to={`/editpost/${post.id}`}>
                        <div className="py-2 px-3 hover:bg-gray-200 rounded ">
                          <i
                            className="fa-solid fa-pen-to-square"
                            style={{ fontSize: "27px" }}
                          ></i>
                        </div>
                      </Link>

                      <button
                        className=" hover:bg-gray-200  text-white font-bold py-2 px-3 rounded"
                        onClick={() => handleDelete(post.id)}
                      >
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: "red", fontSize: "27px" }}
                        ></i>
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 font-custom" style={{ fontSize: "18px" }}>
                  {post.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
