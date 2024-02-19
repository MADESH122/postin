import React from 'react'
import './styles/yourac.css'
import { useState } from 'react'

const YourAC = () => {

  const [name, getName] = useState('')
  const [password, getPassword] = useState('')
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  // ------------------handle submit------------------//
  async function handleSubmit() {
    if (name === '') {
      alert('Enter name')
    }
    if (password === '') {
      alert('Enter Password')
    }
    else {
      try {
        const response = await fetch('https://node-server-app-d7vw.onrender.com/visitpost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, password })
        });

        const data = await response.json();
        if (data.success) {
          setUserData((data.data));
          setError(null)
        } else {
          setUserData([])
          setError(data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setError('Internal Server Error');
      }
    }

  }


  return (
    <div className='visitpost'>
      <div className='login'>
        <h4><u>Visit Your Post</u></h4>
        <input
          placeholder='Enter name'
          type='text'
          onChange={e => getName(e.target.value)
          }
        />
        <input
          placeholder='password'
          type='text'
          onChange={e => getPassword(e.target.value)
          }
        />
        <div className='Submit'>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='imagevesit'>
        {userData.length > 0 ? (
          <div className='userimage'>
            <p>Name : {name}</p>
            {userData.map((user) => (
              <div key={user._id} className='datas'>
                <div className='images'>
                  <img src={`https://node-server-app-d7vw.onrender.com/${user.image}`} alt="User" />
                  <h4>Like : {user.likes}</h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Matching Users Found</p>

        )}
      </div>
    </div>
  )
}

export default YourAC