import React, {useContext, useState} from 'react';
import './loginStyles.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthContext';

import {
	MDBBtn,
	MDBContainer,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBRow,
	MDBCol,
	MDBIcon,
	MDBInput
  }
  from 'mdb-react-ui-kit';
import {Modal,Box, Button} from '@mui/material';


import { Link } from 'react-router-dom';
import App from '../SignUpForm/signup';


const LoginPage = () => {
  
  const navigate = useNavigate();
  {/* */}
  const { login } = useContext(AuthContext);
  {/* Initial User State */}
  const[user, setUser] = useState({
    username: "", password:""
  });

  {/*Modal State for Successful attempt*/}
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const isFormValid = Object.values(user).every((value) => value.trim() !== "");
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isFormValid){
      alert("Please fill in all details");
    }
    return;
  };

  {/*Modal Functions: handleOPen and handleClose*/}
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/home");
  }

  const [errorText, setErrorText] = useState("");

  const handleErrorOpen = (message) => {
    setErrorText(message);
    setErrorOpen(true);
  }
  const handleErrorClose = () => {
    setErrorOpen(false);
  }


  {/* handle Input Change */}
  const handleInputChange = (e) => {
     const {name, value} = e.target;
     setUser({...user, [name]: value})
  };

  

  {/* Request User */}
  const authenticateUser = async () => {

      try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
            },
            body: JSON.stringify(user),
        });


        if(!response.ok){
          //Log the response status and message.
          const errorText = await response.json();
          const errorMessage = errorText.message;
          handleErrorOpen(errorMessage);
        } else {
          const data = await response.json();
          localStorage.setItem('tokenExpiration', data.expiresIn);
          login(data.token);
          handleOpen();
        }

        
      
      } catch (error) {
        console.log("error get user: ", error);
      }


  };



    return (

    
      <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='/login-Card.jpg' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Admin Login</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' name='username' value={user.username} onChange={handleInputChange} size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' name='password' value={user.password} onChange={handleInputChange}  size="lg"/>
                </form>
                
              <button className='submit-button' onClick={authenticateUser} type='submit'>
                  Login
              </button>
              
              <a className="small text-muted" href="#!">Forgot password?</a>

              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <Link to="/signup" style={{color: '#393f81'}}>Register here</Link> </p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

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
                <h2 id="modal-title">Log In Successfully.</h2>
                <p id="modal-description">You will be directing to Home</p>
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
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  
    );

};





export default LoginPage;