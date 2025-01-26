
import { useState } from 'react'
import React from 'react';
import './App.css'
import SimpleBar from 'simplebar-react'


import {CSSTransition} from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';


import { BrowserRouter } from 'react-router-dom';

import { styled } from '@mui/material';
import { WidthFull } from '@mui/icons-material';

import {Box, Stack} from '@mui/material';

import DefaultSidebar from './components/SideBar/Sidebar';
import MyPage from './components/AppointmentBar/AppointmentBar';






function App() {
  

  return (
    
    <BrowserRouter>

        <Stack 
        direction="row"
        sx={{
          width: '100%',  //full width of the screen
          height: '100vh',  // full height of the viewport
          
        }}
        >

          {/* Side Bar child */}
          <Box
            sx={{
              width: 350,           // Fixed sidebar width
              flexShrink: 0,        // do not shrink below 250px
              backgroundColor: 'lightgray',
            }}
          >
            <DefaultSidebar />

          </Box>


          {/* Main Content area */}
          <Box
            sx={{
              flexGrow: 1,    //takes up remaining space
              backgroundColor: 'aliceblue',
              p: 2,
              width: '100%',
              height: '100vh',
            }}
          >
            <MyPage />
          
          </Box>



        </Stack>
        


    </BrowserRouter>


      
    
  );
}

export default App;
