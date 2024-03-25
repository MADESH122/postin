import React from 'react'
import './styles/allpost.css'
import { useEffect, useState } from 'react';
import axios from 'axios'

const Allpost = ({ username }) => {

  // const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.onerror = (error) => {
      console.log(error)
    }
  };

  // ------------------handle uplode------------------//
  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("base64", image);
      formData.append('username', username);

      await axios.post('https://server-3-eyql.onrender.com/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: "application/json",
          "Accept-control-Allow-Origin": ""
        }
      });
      alert("Image uploaded successfully")

    } catch (error) {
      console.error('Image upload failed:', error.response.data.message);
      alert("Field value too long choose another")
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://server-3-eyql.onrender.com/allimages');
        setImages(response.data.images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);



  return (
    <div className='displaypost'>
      {images.length > 0 ? (
        <div  className='displaypost'>
          {images.map((image, index) => (
            <div key={index} className='showimages'>
              {/* Render the image using the Base64-encoded string */}
              <img src={image.image} alt={`${index}`} />
            </div>
          ))}
        </div>
      ) : (
        <div className="spinner"></div>
      )}
      <div className='Uplodes'>
        <div className='getimage'>
          <input type="file" accept='image/*' onChange={handleImageChange} />
          <button onClick={handleImageUpload}>UplodeImage</button>
        </div>
      </div>
    </div>
  )
}

export default Allpost