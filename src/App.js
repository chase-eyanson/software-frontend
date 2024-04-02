import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Profile from './pages/Profile'
import FuelForm from './pages/FuelForm'
import './styles.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fuel-form/:id" element={<FuelForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
