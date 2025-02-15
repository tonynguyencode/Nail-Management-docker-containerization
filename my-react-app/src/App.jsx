
import './App.css';


import HomeBody from './MainContent/Dashboard/Home';

import Icon from './assets/MyIcon';
import SignUpPage from './MainContent/SignUpForm/signup';
import Appointment from './MainContent/AppointmentPage/appointmentPage';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ProfilePage from './MainContent/LoginForm/ProfilePage';

import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import DashBoardLogin from './AdminContent/LoginPage';
import LoginPage from './MainContent/LoginForm/Login';

import ProtectedRoute from './ProtectedRoute';

const App = () =>  {


  return (
  
  <BrowserRouter>
    
    <div className="App">

      <header className="App-header">

        <div className="store-name">
          <button class="button" data-text="Awesome">
            <span class="actual-text">VIP&nbsp;Nails&nbsp;</span>
            <span aria-hidden="true" class="hover-text">VIP&nbsp;Nails&nbsp;</span>
          </button>
        </div>

        <div>
            <nav className='navbar'>
              <Link to="/home" className='nav-link'><p>Home</p></Link>
              
              <Link to="/appointment" className='nav-link'><p>Appointment</p></Link>

              <Link to="/adminLogin" className='nav-link'>
                 <SupervisorAccountIcon style={{color:"white", fontSize: "36px", marginBottom: "10px"}} />
              </Link>

              <Link to="/profile" className='nav-link'>
                  <Icon />
              </Link>
            </nav>
        </div>
        
      </header>

      <main className="content">
        {/* Render Body part for "/" */}
        <Routes>

          <Route path="/" element={<HomeBody />} />

          <Route path="/home" element={<HomeBody />} />

          <Route path="/login" element={<DashBoardLogin /> } />

          <Route path="/adminLogin" element={<LoginPage />} />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                 <ProfilePage />
              </ProtectedRoute>
            }

          />

          <Route path="/signup" element={<SignUpPage />} />


          <Route path="/appointment" element={<Appointment />} />

          

        </Routes>


        {/* Render Body part for "/login" */}
        

      </main>
      
      

    </div>

    
  </BrowserRouter>
  
  );
  
};






export default App;
