import React from 'react'
import './styles/home.css'
import { FcLike } from "react-icons/fc";
import { useState, useEffect } from 'react';
import axios from 'axios'
import { FaUserCircle } from "react-icons/fa";

const Home = () => {

  const [images, setImage] = useState([])
  const [commentText, setCommentText] = useState('')
  useEffect(() => {
    axios.get('https://node-server-app-d7vw.onrender.com/getImage')
      .then(res => setImage(res.data))
      .catch(err => console.log(err))
  }, [])

// ------------------handle like------------------//
  const handleLike = async (imageId) => {
    try {
      const response = await axios.post(`https://node-server-app-d7vw.onrender.com//${imageId}`);
      const updatedImages = images.map(image =>
        image._id === imageId ? { ...image, likes: response.data.likes } : image
      );
      setImage(updatedImages);
    } catch (error) {
      console.error('Error liking image:', error);
    }
  };

// ------------------handle comment------------------//
  const handleComment = async (imageId, text, user) => {
    try {
      if (commentText === '') {
        return undefined
      }
      else {
        const response = await axios.post(`https://node-server-app-d7vw.onrender.com/comment/${imageId}`, { text, user });
        const updatedImages = images.map(image =>
          image._id === imageId ? { ...image, comments: response.data.comments } : image
        );
        setImage(updatedImages)
        setCommentText('')
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className='posts'>
      {images.map(image => (
        <div key={image._id} className='userpost'>
          <h4> <FaUserCircle /><p>{image.name ? image.name : "Unknown"}</p></h4>
          <img src={`http://localhost:8000/images/${image.image}`} alt={image.image} />
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
              <button type='submit' onClick={() => handleComment(image._id, commentText, "UnKnown")}>+</button>
            </div>
          </div>
          <div className='displayCommants'>
            <h5>Comments:</h5>
            <div className='disCommants'>
              {image.comments.map((comment, index) => (
                <p key={index}>{comment.user}: {comment.text}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home