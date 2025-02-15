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
import {createTheme, MenuItem, styled, TextField, ThemeProvider} from '@mui/material';
import { useState, useEffect } from "react";

import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
//Forms: Imports for Find, Add, Delete and List

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {FixedSizeList} from 'react-window';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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

  

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData( (prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const technician_select = [
    'Flower',
    'Linda',
    'John',
  ]

  

  

  {/* Separated Function */}
  

  

  
  
  function CollapsibleTable () {

    const [appointmentsByTech, setAppointmentsByTech] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [bookedAppointments, setBookedAppointments] = useState(new Set());
    
    const[formData, setFormData] = useState({
      date: null, technician: "",
    });

    const technicians = [
      {id:1, name: 'Flower'},
      {id:2, name: 'Linda'},
      {id:3, name: 'John'}
    ]

    const FindAppointment = async () => {
      const [error, setError] = useState(null);
      const correctTime = `${formData.date}`
      
      
      if(formData.date && formData.technician){
        const extractDate = formData.date.format('YYYY-MM-DD');
        const findAppointDto = {
          date: extractDate,
          name: formData.technician,
        }
        try {
          const response = await fetch("http://localhost:8080/api/admin/getBookedAppointments", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(findAppointDto),
          });
          if(!response.ok){
            const errorText = await response.json();
            const errorMessage = errorText.message || JSON.stringify(errorText);
            throw new Error(`Failed to search the appointment: ${response.status} - ${errorText}`);
          } else{
            //Response Okay: parse as text to check if the body is empty
            const text = await response.text();
            if(!text.trim()){//Every appointments are availables.
              setBookedAppointments(new Set());
            } else{ //Some appointments are booked
              const data = response.json();
              const dateObj = data.map( dateTimeString => {
                 const dateObj = new Date(dateTimeString);
                 const hour = dateObj.getHours();
                 return `${hour}:00`;
              });
              setBookedAppointments(new Set(dateObj));
            }
          }
        } catch (error){
          setError(error.message);
        };
      }; 
    };

    function renderRow(props){
      const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
      const {index, style} = props;
      {timeSlots.map( (slot) => {
        const isBooked = bookedAppointments.has(slot);
        return (
          <ListItem style={style} key={index} component="div" disablePadding >
            <ListItemButton disabled={isBooked}>
              <ListItemText primary={`Time: ${slot} ${isBooked ? '(Booked)' : '(Available)'}`} />
            </ListItemButton>
          </ListItem>
        )
      })}
    };

    function VirtualizedList(){
      return (
        <Box
        sx={{width: '100%', height: 400, maxWidth:360, bgcolor: 'background.paper'}}
        >
          <FixedSizeList
          height={400}
          width={360}
          itemSize={46}
          overscanCount={5}
          >
          {renderRow}
          </FixedSizeList>
        </Box>
      )
    };

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
      const socket = new SockJS('http://localhost:8080/ws');  //CHANGE HERE FOR PRODUCTION
      const stompClient = new Client({
        webSocketFactory : () => socket,
        onConnect: () => {
          stompClient.subscribe('http://localhost:8080/topic/appointments', (message) => {   //CHANGE THE URL FOR PRODUCTION
            const updatedorNewAppointment = JSON.parse(message.body);
            setAppointmentsByTech(  (prev) => {
              const techId = updatedorNewAppointment.technician.id; 
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


    {/* Separated Function */}
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
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker 
                  label="Select Date and Time"
                  views={['year', 'month', 'day', 'hours']}
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
          </LocalizationProvider>
          

          <TextField
            id="Select Technician"
            select
            label="Select Technician"
            helperText="Please select your currency"
            name="technician"
            onChange={handleChange}
            value={formData.technician}
          >
          {technician_select.map( (name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}  
          </TextField>
        </Box>

        {/*  THE Second Box: ADD Button, DELETE Button, FIND Button */}  
        <Box
        
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >
        <button className="button-38" onClick={FindAppointment}> Find </button>
        <button className="button-38"> Add </button>  
        <button className="button-38"> Delete </button>
        {/* Lists of the Available Appointments */}  
        </Box>

        <VirtualizedList />

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