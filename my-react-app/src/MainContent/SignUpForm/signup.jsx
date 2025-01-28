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

    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setUser({...user, [name]: value})
    };

    //Check if any input field is empty
    const isFormValid = Object.values(user).every((value) => value.trim() !== "");

    const handleSubmit = (e) => {
      e.preventDefault();
      if(isFormValid){
        console.log("Form submitted");
      } else{
        alert("Form is incomplete!");
      }
    }

  {/* saveUser function
    
    */}
    

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
          const errorMessage = errorText.message || JSON.stringify(errorText)
          throw new Error(`Failed to save user: ${response.status} - ${errorText}`);
        } else {
          // Navigate to log in and sign in to receive the token
          navigate("/login");
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

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput className='label-text' labelClass='custom-label' wrapperClass='mb-4' label='Full Name' id='form1' type='text' name="fullName" value={user.fullName} onChange={handleInputChange}  />
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput className='label-text' labelClass='custom-label' wrapperClass='mb-4' label='Phone Number' id='form2' type='tel' name="phoneNumber" value={user.phoneNumber}  onChange={handleInputChange}  />
                </MDBCol>
              </MDBRow>

              <MDBInput className='label-text' labelClass='custom-label' wrapperClass='mb-4' label='Email' id='form3' type='email' name="username" value={user.username}  onChange={handleInputChange}   />
              <MDBInput className='label-text' labelClass='custom-label' wrapperClass='mb-4' label='Password' id='form4' type='password' name="password" value={user.password} onChange={handleInputChange}  />

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <button className='submit-button' onClick={saveUser} size='md'>
                  Sign Up
              </button>
              

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
