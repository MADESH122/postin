import React from 'react'
import './styles/home.css'
import { FcLike } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios'

const Home = ({ username }) => {

  const [images, setImages] = useState([])
  const [commentText, setCommentText] = useState('')
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

  // ------------------handle like------------------//
  const handleLike = async (imageId) => {
    try {
      const response = await axios.post(`https://server-3-eyql.onrender.com/like/${imageId}`);
      const updatedImages = images.map(image =>
        image._id === imageId ? { ...image, likes: response.data.likes } : image
      );
      setImages(updatedImages);
    } catch (error) {
      console.error('Error liking image:', error);
    }
  };

  // ------------------handle comment------------------//
  const handleComment = async (imageId, text, username) => {
    try {
      if (commentText === '') {
        return undefined
      }
      else {
        const response = await axios.post(`https://server-3-eyql.onrender.com/comment/${imageId}`, { text, username });
        const updatedImages = images.map(image =>
          image._id === imageId ? { ...image, comments: response.data.comments } : image
        );
        setImages(updatedImages)
        setCommentText('')
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className='posts'>
      {images.length > 0 ? (
        <div className='posts'>
          {images.map(image => (
            <div key={image._id} className='userpost'>
              <h4> <FaUserCircle /><p>{image.username ? image.username : "Unknown"}</p></h4>
              <div className='images'>
                <img src={image.image} alt={image.image} />
              </div>
              <div className='inbox'>
                <div className='like'>
                  <FcLike className='likebtn' type='button' onClick={() => handleLike(image._id)} />
                  <h4>{image.likes}</h4>
                </div>
                <div className='comment'>
                  <input
                    type="text"
                    placeholder="Add a comment"
                    onChange={e => setCommentText(e.target.value)
                    }
                  />
                  <button type='submit' onClick={() => handleComment(image._id, commentText, username)}>+</button>
                </div>
              </div>
              <div className='displayCommants'>
                <h5>Comments:</h5>
                <div className='disCommants'>
                  {image.comments.map((comment, index) => (
                    <p key={index}>{comment.username} : {comment.text}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  )
}

export default Home