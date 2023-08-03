import Navbar from './Component/Navbar';
import DisplayTask from './Component/DisplayTask';
import About from './Component/About';
import Login from './Component/Login';
import Signup from './Component/Signup';
import CreateTask from './Component/CreateTask';
import {
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<DisplayTask />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/createtask" element={<CreateTask />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/user" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
