import React, { useState, useEffect, useContext } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './profileStyles.css';
import {AuthContext} from '../../AuthContext';


  

function Profile(){
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);    
    const {isAuthenticated, logout} = useContext(AuthContext);
    

    useEffect( () => {
        const fetchProfile = async () => {
            const response = await fetch('/users/me',{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
            });

            if(response.ok){
                const data = await response.json();
                setProfile(data);
            } else {
              const errorText = await response.json();
              const errorMessage = errorText.message || JSON.stringify(errorText);
              alert(`Failed to load your data: ${response.status} - ${errorText}`);
              throw new Error(`Failed to load your data: ${response.status} - ${errorText}`);
            }

        };
        
        if(isAuthenticated){
          fetchProfile();
        }
        
    }, []);

    
    

    return (


        <section className="" style={{ backgroundColor: '#f4f5f7' }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="6" className="mb-4 mb-lg-0">
    
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem', width:'750px' }}>
                  <MDBRow className="g-0">
                    <MDBCol md="4" className="gradient-custom text-center text-white"
                      style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                      <MDBTypography tag="h5">{profile?.fullName || ""}</MDBTypography>
                      <MDBCardText>User Profile</MDBCardText>
                      <MDBIcon far icon="edit mb-5" />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Full Name</MDBTypography>
                            <MDBCardText className="text-muted">{profile?.fullName || ""}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">{profile?.phoneNumber || ""}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
    
                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">{profile?.username || ""}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Identification</MDBTypography>
                            <MDBCardText className="text-muted"></MDBCardText>
                          </MDBCol>
                        </MDBRow>
    
                        <div className="d-flex justify-content-start">
                          <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                          <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                          <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                        </div>

                        <button onClick={logout}>Logout</button>
                      </MDBCardBody>

                    </MDBCol>
    
                  </MDBRow>
                </MDBCard>
    
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
    );

}


export default Profile;
  


