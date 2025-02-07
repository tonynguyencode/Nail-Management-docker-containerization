import "./barStyles.css";
import * as React from 'react';
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import '@fontsource/roboto/700.css';
import {createTheme, TextField, ThemeProvider} from '@mui/material';
import { useState, useEffect } from "react";

import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
//Forms: Imports
import DateTimeContainer from './BasicDateTimePicker/DateTimePicker';

  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
      <ThemeProvider theme={theme}>

        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell >
            {row.technician.name}
          </TableCell>
          
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">

                  <TableHead>
                    <TableRow>
                      <TableCell>Appointment Date</TableCell>
                      <TableCell>Customer Name</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Customer ID</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {row.appointments.map((appointmentRow) => (
                      <TableRow key={appointmentRow.appointmentDateTime}>
                        <TableCell component="th" scope="row">
                          {appointmentRow.appointmentDateTime}
                        </TableCell>
                        <TableCell>{appointmentRow.user.fullName}</TableCell>
                        <TableCell align="right">{appointmentRow.status}</TableCell>
                        <TableCell align="right">
                            {appointmentRow.user.username}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>

      </ThemeProvider>
      </React.Fragment>
    );
  }
  
  
  
  
  
  
  const theme = createTheme({
      components:{
          MuiTableCell: {
              styleOverrides: {
                  root: {
                      fontSize: '20px',
                      color: 'grey',
                      fontWeight: 'bolder'
                  },
              },
          },
      },
  });
  
  const themeBottom = createTheme({
      components:{
          MuiTableCell: {
              styleOverrides: {
                  root: {
                      fontSize: '17px',
                      color: 'grey',
                  },
              },
          },
      },
  });
  






  
  
  function CollapsibleTable () {

    const [appointmentsByTech, setAppointmentsByTech] = useState([]);
    const [stompClient, setStompClient] = useState(null);

    const technicians = [
      {id:1, name: 'Flower'},
      {id:2, name: 'Linda'},
      {id:3, name: 'John'}
    ]

    useEffect(() => {
      async function fetchAppointments() {
        try {
          const promises = technicians.map( (tech) =>
            fetch(`http://localhost:8080/api/admin/getTechAppointments?technician_name=${encodeURIComponent(tech.name)}`).then((res) => res.json())  //parses the response into JSON format.
          );                                                                         // this results in an array of promises
          const results = await Promise.all(promises);   
          const grouped = technicians.reduce( (acc, tech, index) => {
            acc[tech.id] = {
              technician: tech,
              appointments: results[index],
            }
            return acc;
          }, {});
          setAppointmentsByTech(grouped);

        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      }
  
      fetchAppointments();
    }, []);


  
    useEffect( () => {
      const socket = new SockJS('/ws');
      const stompClient = new Client({
        webSocketFactory : () => socket,
        onConnect: () => {
          stompClient.subscribe('http://localhost:8080/topic/appointments', (message) => {
            const updatedorNewAppointment = JSON.parse(message.body);
            setAppointmentsByTech(  (prev) => {
              const techId = updatedorNewAppointment.technician.id; //GET the ID of the new Appointment
              const techData = prev[techId];                        //Assigning the data(technician, appointments) to techData variable
              
              // Updated a specific appointment Feature
              const updatedAppointments = techData.appointments.map ( (appt) =>
                appt.id === updatedorNewAppointment.id ? updatedAppointment : appt
              ); // Note: this approach only handles updaring existing appointments. If updatedAppointment
              // has an id that does not exist in the current appointments. To handle both updating and adding,
              // need to perform an existence check.
              

              // If appointment does not exist in the client, add it
              if(!techData.appointments.find(appt => appt.id === updatedorNewAppointment.id)){
                updatedAppointments.push(updatedorNewAppointment);
              }

              // return statement
              return{
                ...prev,
                [techId]: {
                  ...techData,
                  appointments: updatedAppointments,
                },
              };

            });

          });

        },
        onDisconnect: () => {
          console.log('WebSocket disconnected');
        },
        onStompError: (frame) => {
          console.error('STOMP error:', frame);
        },
      });

      stompClient.activate();
      return () => {
        stompClient.deactivate();
      };

    }, []);


   

    const rows = Object.values(appointmentsByTech).map( (group) => ({
        technician: group.technician,
        appointments: group.appointments,
    }), [])
   

    return (
     <Box
     sx={{
               
     }}
     
     >
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" style={{marginBottom: '40px'}} >
          <TableHead >
            <TableRow>
              <TableCell />
              <TableCell>Technician Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.technician.id} row={row} />
            ))}
          </TableBody>
        </Table>

        {/*  
        Bottom Part: Manually add an Appointment
        
        */}
        <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >
          <TextField
            id="fullname-input"
            label="Full Name"
            type="text" 
          />
          <TextField
            required
            id="username-input"
            label="Email Address"
            type="email" 
          />
          <TextField
            id="phoneNumber-input"
            label="Phone Number"
            type="tel" 
          />
          
          <DateTimeContainer />

          <TextField
            id="select-technician"
            select
            label="Select Technician"
            helperText="Please select your currency"
          >
          </TextField>
        </Box>

        {/*  THE SECOND BOX: Add Button, Delete Button, Find Button */}  
        <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >
          

        </Box>

      </TableContainer>
     
      </ThemeProvider>
  </Box>
    );
  };
  
  const MyPage = () => {
      return (
          <div >
              <CollapsibleTable />
          </div>
      );
  };
  
  export default MyPage;