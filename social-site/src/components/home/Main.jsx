import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const userId = localStorage.getItem("id");

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:3000/posts/${postId}`)
      .then((response) => {
        setPosts(posts.filter((post) => post.id !== postId));
        console.log("Post deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div>
      <div
        className="container mx-auto px-4 py-8"
        style={{ paddingTop: "64px" }}
      >
        <h1 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: "cursive", color: "#d58f87", fontSize: "30px" }}>
          Welcome to our Blog..❤
        </h1>
        <div className="flex flex-col gap-8 items-end">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden w-2/3"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  className="w-full h-88 object-cover object-center"
                />
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
                    <span className="text-gray-800 font-semibold" style={{ fontSize: "23px" }}>
                      {users.find((user) => user.id === post.userId)?.name}
                    </span>
                    <span className="text-gray-500 font-semibold" style={{ fontSize: "16px" }}>
                      {users.find((user) => user.id === post.userId)?.email}
                    </span>
                  </div>
                  
                    </div>
                  
               
                <p className="text-gray-700 font-custom" style={{ fontSize: "18px" }}>
                  {post.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Sticky pink rounded div */}
      <div className="fixed bottom-8 right-8 bg-pink-500 p-4 rounded-full cursor-pointer" onClick={() => navigate('/signup')}>
        <span className="text-white text-lg font-bold">Sign Up</span>
      </div>
    </div>
  );
};

export default Main;
