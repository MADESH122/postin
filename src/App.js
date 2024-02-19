import './App.css';
import Home from './components/Home'
import Allpost from './components/Allpost'
import YourAC from './components/YourAC'
import { IoMenu } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <div className='navebar'>
        <h3><button><IoMenu /></button>POST.in</h3>
        <h3>@</h3>
      </div>
      <div className='container-fluid'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Allpoct' element={<Allpost />}></Route>
          <Route path='/YourAc' element={<YourAC />}></Route>
        </Routes>
      </div>
      <div className='navebarlast'>
        <h5><NavLink to={"/"} > <i><IoHome /></i>Home</NavLink></h5>
        <h5><NavLink to={"/Allpoct"} > <i><FaTelegramPlane /></i>Add Image</NavLink></h5>
        <h5><NavLink to={"/YourAc"} > <i><FaUserCircle /></i> YourAC</NavLink></h5>
      </div>
    </div>
  );
}

export default App;
