import './App.css';
import { useState } from 'react';
import axios from 'axios'
import Home from './components/Home'
import Allpost from './components/Allpost'
import { IoMenu } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSignup = async () => {
    try {
      if (username === '') {
        alert('invalid username or password')
      }
      if (password === '') {
        alert('invalid username or password')
      } else {
        const response = await axios.post('https://server-3-eyql.onrender.com/signup', { username, password });
        console.log(response.data.message);
        alert('Sign up Successfully You can login now')
        setPassword('')
        setUsername('')
      }
    } catch (error) {
      console.error('Signup failed:', error.response.data.message);
      alert('Username already taken try another name')
      setPassword('')
      setUsername('')
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://server-3-eyql.onrender.com/login', { username, password });
      alert(response.data.message);
      setLoggedIn(true);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  function handleLogout() {
    window.location.reload();
  }
  function handleName(e) {
    setUsername(e.target.value)
  }
  function handlePassword(e) {
    setPassword(e.target.value)
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          {
            <div className='main'>
              <div className='navebar'>
                <h3><button className="dropbtn"><IoMenu /></button>POST.in</h3>
                <h3>@{username}</h3>
              </div>
              <div className='container-fluid'>
                <Routes>
                  <Route path='/' element={<Home username={username} />}></Route>
                  <Route path='/Allpoct' element={<Allpost username={username} />}></Route>
                </Routes>
              </div>
              <div className='navebarlast'>
                <h5><NavLink to={"/"} > <i><IoHome /></i>Home</NavLink></h5>
                <h5><NavLink to={"/Allpoct"} > <i><FaTelegramPlane /></i>Add Image</NavLink></h5>
                <h5 className='logout' onClick={handleLogout}><i><FiLogOut /></i>LOGOUT</h5>
              </div>
            </div>
          }
        </div>
      ) : (
        <div className='loginpage'>
          <div className='loginbox'>
            <div className='login'>
              <form>
                <h3>Login</h3>
                <p>! login  your Account</p>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <div className='btn'><button onClick={handleLogin}>Login</button></div>
              </form>
            </div>
            <div className='signup'>
              <form>
                <h3>Sign Up</h3>
                <p>! Create a Account & login</p>
                <input type="text" placeholder="Username" onChange={handleName} value={username} />
                <input type="password" placeholder="Password" onChange={handlePassword} value={password} />
                <div className='btn'><button onClick={handleSignup}>Submit</button></div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
