import React, { useState } from 'react';
import './technicianPageStyles.css';

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

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from '../SignUpForm/signup';

const AddTechnicianPage = () => {

    {/*Initial User State */}
    const[user, setUser] = useState({
        name: "", description: ""
    });

    {/* handle Input change */}
    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setUser({...user, [name]:value })
    }

    {/* Adding Technician Function */}
    const addTechnician = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await fetch("http://localhost:8080/technician/addTechnician", {
            method: "POST",
            headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type" : "application/json",
            },
            body: JSON.stringify(user),
          });

          if(!response.ok){
            //Log the response status and message.
            const errorText = await response.json();
            const errorMessage = errorText.message || JSON.stringify(errorText)
            throw new Error(`Failed to save the technician: ${response.status} - ${errorText}`);
          } else {
            // response is 200 OK
            const responseText = await response.text();
            console.log("Successful" + responseText);

          }


        } catch (error) {
          console.log("error adding technician: ", error);
        }


    }

    return (

    
      <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Add Technician</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Please input the Technician Information</h5>

                <MDBInput wrapperClass='mb-4' label='Name' id='formControlLg' type='text' size="lg" name='name' value={user.name} onChange={handleInputChange} />
                <MDBInput wrapperClass='mb-4' label='Description' id='formControlLg' type='text' size="lg" name='description' value={user.description} onChange={handleInputChange}  />

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={addTechnician}   >Add Technician</MDBBtn>
              

              

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  
    );

};





export default AddTechnicianPage;