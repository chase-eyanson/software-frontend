import {BrowserRouter, Routes, Route} from 'react-router-dom'
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
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/:id/profile" element={<Profile />} />
          <Route path="/:id/fuel-form" element={<FuelForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
