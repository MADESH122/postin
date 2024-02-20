import React from 'react'
import './styles/allpost.css'
// import { IoAddCircleSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
import axios from 'axios'

const Allpost = () => {

  const [file, setFile] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [images, setImage] = useState([])

  // ------------------handle uplode------------------//
  function handleUplode(e) {
    try {
      if (file === '') {
        return alert('Choose file and click Uplode Image')
      }
      if (name === '') {
        return alert('Enter Name')
      }
      if (password === '') {
        return alert('Enter Password')
      }
      else {
        const formdata = new FormData()
        formdata.append('file', file)
        formdata.append('name', name)
        formdata.append('password', password)

        axios.post('http://localhost:8000/upload', formdata)
        setTimeout(function(){window.location.reload()},3000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8000/getImage')
      .then(res => setImage(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='displaypost'>
      {images.map(image => (
        <div key={image._id} className='showimages'>
          <img src={`http://localhost:8000/images/${image.image}`} alt={image.image} />
        </div>
      ))}
      <div className='Uplodes'>
        <div className='getuser'>
          <input type='text'
            placeholder='Enter your Name'
            onChange={e => { setName(e.target.value) }}
            value={name}
          />
          <input type='text'
            placeholder='Enter Password'
            onChange={e => { setPassword(e.target.value) }}
            value={password}
          />
        </div>
        <div className='getimage'>
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button onClick={handleUplode}>UplodeImage</button>
        </div>
      </div>
    </div>
  )
}

export default Allpost