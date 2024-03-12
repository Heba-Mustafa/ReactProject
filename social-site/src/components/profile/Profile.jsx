import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../nav/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's name and image from localStorage
    const nameFromLocalStorage = localStorage.getItem('name');
    const imageFromLocalStorage = localStorage.getItem('image');
    if (nameFromLocalStorage) setUserName(nameFromLocalStorage);
    if (imageFromLocalStorage) setUserImage(imageFromLocalStorage);

    // Fetch all posts
    axios.get('http://localhost:3000/posts')
      .then(response => {
        // Filter posts based on user's ID from localStorage
        const postsByUser = response.data.filter(post => post.userId === localStorage.getItem('id'));
        setUserPosts(postsByUser);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []); // Empty dependency array ensures this effect runs only once

  const handleDelete = (postId) => {
    // Implement delete functionality as needed
    console.log('Deleting post with ID:', postId);
  };

  return (
    <div>
      <ToastContainer />

      <div className="container mx-auto px-4 py-8" style={{ paddingTop: '64px' }}>
        <h1 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'cursive', color: '#d58f87', fontSize: '30px' }}>
          Welcome, {userName || 'User'}..❤
        </h1>

        <div className="flex flex-col gap-8 items-end">
          {userPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden w-2/3">
              {post.imageUrl && (
                <img src={post.imageUrl} className="w-full h-88 object-cover object-center" />
              )}
              <div className="p-4">
                <div className="flex items-center mb-4">
                  {userImage && (
                    <img
                      src={userImage}
                      alt="Profile"
                      className="w-20 h-20 rounded-full mr-2"
                    />
                  )}
                  <div className="flex flex-col m-4">
                    <span className="text-gray-800 font-semibold" style={{ fontSize: '23px' }}>{userName || 'User'}</span>
                    <span className="text-gray-500 font-semibold" style={{ fontSize: '16px' }}>{localStorage.getItem('email') || 'example@example.com'}</span>
                  </div>
                  {post.userId === localStorage.getItem('id') && (
                    <div className="ml-auto flex">
                      <Link to={`/editpost/${post.id}`}>
                        <div className="py-2 px-3 hover:bg-gray-200 rounded">
                          <i className="fa-solid fa-pen-to-square" style={{ fontSize: '27px' }}></i>
                        </div>
                      </Link>

                      <button
                        className="hover:bg-gray-200 text-white font-bold py-2 px-3 rounded"
                        onClick={() => handleDelete(post.id)}
                      >
                        <i className="fa-solid fa-trash" style={{ color: 'red', fontSize: '27px' }}></i>
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 font-custom" style={{ fontSize: '18px' }}>
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

export default Profile;
