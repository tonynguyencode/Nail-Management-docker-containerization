import React, {useState} from 'react';
import './signUpStyles.css';
import { AuthContext } from '../../AuthContext';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { Modal,Box, Button} from '@mui/material';

function App() {
  const navigate = useNavigate();
  
  {/*
    Initial user State: {name: "", username: "", password:"", phoneNumber:"" }
    
    */}
    const[user, setUser] = useState({
      fullName: "", username: "", password:"", phoneNumber:"" 
    });


  {/* handleInputChange 
    it captures the value entered into an input field by accessing the event.target.value
    it determines which input field

    e.target.name : the name of the input field
    e.target.value: the value entered into the input field
    Create a new user object with the updated field while preserving the existing
    values for other field

    */}

    const handleSubmit = (e) => {
      e.preventDefault();
      if(!isFormValid){
        alert("Please fill in all details");
      } else {
        saveUser();
      }
      return;
    };


    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setUser({...user, [name]: value})
    };

    //Check if any input field is empty

      const isFormValid = Object.values(user).every((value) => value.trim() !== "");

       {/*Modal State for Successful attempt*/}
      const [open, setOpen] = useState(false);
      const [errorOpen, setErrorOpen] = useState(false);

      const handleOpen = () => setOpen(true);
      const handleClose = () => {
        setOpen(false);
        navigate("/login");
      };
    
      const [errorText, setErrorText] = useState("");
    
      const handleErrorOpen = (message) => {
        setErrorText(message);
        setErrorOpen(true);
      };
      const handleErrorClose = () => {
        setErrorOpen(false);
      };

  
    

    const saveUser = async () => {
      
      try {
        const response = await fetch('/auth/signup', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if(!response.ok){
          //Log response status and message for better debugging
          const errorText = await response.json();
          // what if 'errorText' is an object without a 'messsage' property
          // Fix => fallback to plain response text if parsing fails.
          const errorMessage = errorText.message;
          handleErrorOpen(errorMessage);
        } else {
          // Navigate to log in and sign in to receive the token
          handleOpen();
        }

        
      } catch (error){
        console.error("error saving user: ", error);
      };


    };




  return (
    <MDBContainer fluid className='my-5'  >

      <MDBRow className='g-0 align-items-center'>
        
        <MDBCol col='6' className='custom-column'>

          <MDBCard className="my-5 cascading-right custom-card">
            <MDBCardBody className='p-5 shadow-5 text-center'>

              <h2 className="fw-bold mb-5" style={{color:'rgb(104, 104, 104)'}}>Sign up now</h2>
              <form onSubmit={handleSubmit} >
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput required className='label-text' labelClass='custom-label' wrapperClass='mb-4' label='Full Name' id='form1' type='text' name="fullName" value={user.fullName} onChange={handleInputChange}  />
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput required className='label-text' labelClass='custom-label' wrapperClass='mb-4' label='Phone Number' id='form2' type='tel' name="phoneNumber" value={user.phoneNumber}  onChange={handleInputChange}  />
                </MDBCol>
              </MDBRow>

              <MDBInput required className='label-text' labelClass='custom-label' wrapperClass='mb-4' label='Email' id='form3' type='email' name="username" value={user.username}  onChange={handleInputChange}   />
              <MDBInput required className='label-text' labelClass='custom-label' wrapperClass='mb-4' autoComplete='new-password'  label='Password' id='form4' type='password' name="password" value={user.password} onChange={handleInputChange}  />

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <button type='submit' className='submit-button' disabled={!isFormValid} onClick={saveUser} size='md'>
                  Sign Up
              </button>
              </form>

              <div className="text-center">

                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>

              </div>

            {/* Modal for the user to see */}
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
                <h2 id="modal-title">Sign Up Successfully.</h2>
                <p id="modal-description">You will be directing to Login Page</p>
                <Button onClick={handleClose} variant="contained" color="secondary">Close</Button>

                </Box>
            </Modal>

            <Modal
              open={errorOpen}
              onClose={handleErrorClose}
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
                <h2 id="modal-title">Invalid</h2>
                <p id="modal-description">{errorText}</p>
                <Button onClick={handleErrorClose} variant="contained" color="secondary">Close</Button>

              </Box>
          </Modal>


            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
        
          <img src="/draw2.svg" class="img-fluid" alt="Phone image" />
        
        </MDBCol>

      </MDBRow>


      

        

    </MDBContainer>
  );
};

export default App;
