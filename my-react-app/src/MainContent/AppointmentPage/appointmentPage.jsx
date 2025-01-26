import React, { useEffect } from 'react';
import  {useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';


import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Modal, Box, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


import './appointmentPage.css';

function App() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/home");
  }
  
 

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const theme = useTheme();
  const names = [
    'Flower',
    'Linda',
    'John',
  ];

  {/* Need Status, CustomerID, and Technician ID */}
  const[formData, setFormData] = useState({
      date: "", time: "", technician: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  {/* Book Appointment Function */}
  const BookAppointment = async () => {
    
    const token = localStorage.getItem("authToken");

    {/* Combine the date and time values into an ISO 8601 string
      which is the format LocalDateTime expects when sent to the backend
      
      Send to Backend: Pass the combined value as part of your AppointmentRegisterDto
      in the API call to the Spring Boot backend.
      */}
    try {
      
      {/* All three field data need to be filled, to be able to send request. */}
      if(formData.date && formData.time){
        const localDateTime = `${formData.date}T${formData.time}:00`; //Combine date and time into ISO 8601

        
        const appointmentRegisterDto = {
          appointmentTime: localDateTime,
          status: "SCHEDULED",
          Note: "None",
          technician_name: formData.technician,
        }

        

        //Try to make the request now
        const response = await fetch("/api/appointment/schedule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(appointmentRegisterDto),
        });

        //Will console.log to check whether the request went through
        if(!response.ok){
          //Log response status and message for debugging
          const errorText = await response.json();    //what if 'errorText' is an object without a 'message' property
          //Fix => fallback to plain response text
          const errorMessage = errorText.message || JSON.stringify(errorText)
         throw new Error(`Failed to save user: ${response.status} - ${errorText} `);
        } else {
          //Navigating to log in and sign in to receive the token
          setOpen(true);
          {/* Using the useEffect (React), React to changes in `open` state 
            */}
          
          
          
        }
        
      }

      

    } catch (error) {
      

    }


  };





  return (
    <MDBContainer fluid  style={{width: "100%", height: "60vh", backgroundColor:"ghostwhite"}}      >

      <MDBRow className='d-flex justify-content-center align-items-center h-100 '>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: "700px", minHeight: "600px"}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Appoinment Booking</h2>
              <p className="text-white-50 mb-5">Book your appointment today!</p>


             {/* I have not set the VALUE FOR THE INPUT*/} 
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Date' id='formControlLg' type='date' size="lg" name='date' value={formData.date} onChange={handleChange} />

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Time' id='formControlLg' type='time' size="lg" name='time' value={formData.time} onChange={handleChange} />

              
              <FormControl sx={{ 
                m: 1, width: 600, backgroundColor: 'white',
                width: '100%',

                }}>
                
                <Select
                  labelId="technician-select-label"
                  id="name-select"
                  name="technician"
                  value={formData.technician}
                  onChange={handleChange}
                  input={<OutlinedInput label="Technician" />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem value={name}>
                    {name}
                   </MenuItem>
                  ))}
                </Select>
              </FormControl>



              

              <button className='submit-button mx-2 px-5 text-white-50 fw-bold' type='submit' 
              onClick={BookAppointment} >
                Book Your Appointment
              </button>
              
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
                <Box
                 sx={{
                position: 'absolute',
                 top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                 width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              <h2 id="modal-title">Appointment Scheduled</h2>
              <p id="modal-description">Your appointment has been scheduled. Thank you!</p>
            <Button onClick={handleClose} variant="contained" color="secondary">Close</Button>
            
          </Box>
        </Modal>

              


              
            </MDBCardBody>
          </MDBCard>  

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default App;