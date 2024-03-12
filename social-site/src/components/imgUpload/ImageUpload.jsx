import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setImageUrl(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToServer = async () => {
    try {
      await axios.post('http://localhost:3000/imgs', {
        image: imageUrl,
      });

      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    const fetchImageFromServer = async () => {
      try {
        const response = await axios.get('http://localhost:3000/imgs');
        // Assuming your JSON Server returns an array of image objects with a 'imageUrl' property
        const imageUrlFromServer = response.data[0].imageUrl; // Assuming you want the first image in the array

        console.log('Image fetched from server:', imageUrlFromServer);
        setUploadedImageUrl(imageUrlFromServer);
      } catch (error) {
        console.error('Error fetching image from server:', error);
      }
    };

    fetchImageFromServer();
  }, []);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <img src={imageUrl} alt="Uploaded" />
      <button onClick={uploadImageToServer}>Upload Image</button>
      <img src={uploadedImageUrl} alt="Fetched from server" />
    </div>
  );
};

export default ImageUpload;
