
import { useState } from 'react'
import React from 'react';
import './App.css'
import SimpleBar from 'simplebar-react'


import {CSSTransition} from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';

import { DefaultSidebar } from './components/SideBar/Sidebar';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MyPage from './components/AppointmentBar/AppointmentBar';
import { styled } from '@mui/material';
import { WidthFull } from '@mui/icons-material';











function App() {
  

  return (
    
      <BrowserRouter>

        <div className="App">

          
          <DefaultSidebar />
          
          

          {/* Main content: USING  */}
          <main className="main-content">

            <Routes>
              <Route path="/" element={<MyPage />} />
            </Routes>
              
          </main>

          

          
        </div>


      </BrowserRouter>


      
    
  );
}

export default App;
