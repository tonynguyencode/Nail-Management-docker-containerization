import React, { useState, useContext } from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faEnvelope, faUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faGithub, faTwitter} from "@fortawesome/free-brands-svg-icons";

import {Col, Row, Form, Card, FormCheck, Container, InputGroup, Button} from '@themesberg/react-bootstrap';
import {Link} from 'react-router-dom';
 
import BgImage from "../assets/img/illustrations/signin.svg";
import '../scss/volt.scss';
import { useNavigate} from "react-router-dom";
import { AuthContext } from '../AuthContext';
import {Modal,Box} from '@mui/material';
import App from '../MainContent/SignUpForm/signup';

{/* Setting necessary dependencies to run like a normal Login Page */}

{/* ***************** */}

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

      {/*Handle Login Page Input, two input need to be filled */}
      const handleSubmit = (e) => {
        e.preventDefault();
        if(!isFormValid){
          alert("Please fill in all details");
        } 
        return;
      };
      const isFormValid = Object.values(user).every((value) => value.trim() !== "");


    {/* Request User */}
  const authenticateUser = async () => {

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
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
      <main>
        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <p className="text-center">
              <Card.Link  className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
              </Card.Link>
            </p>
            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Sign in to our platform</h3>
                  </div>
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Your Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control autoFocus required 
                        type="email" 
                        name='username' 
                        value={user.username} 
                        onChange={handleInputChange} 
                        placeholder="example@company.com" />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <Form.Group id="password" className="mb-4">
                        <Form.Label>Your Password</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control 
                          required type='password' 
                          name='password' 
                          value={user.password} 
                          onChange={handleInputChange}  
                          placeholder="Password" />
                        </InputGroup>
                      </Form.Group>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Form.Check type="checkbox">
                          <FormCheck.Input id="defaultCheck5" className="me-2" />
                          <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                        </Form.Check>
                        <Card.Link className="small text-end">Lost password?</Card.Link>
                      </div>
                    </Form.Group>
                    <Button variant="primary" onClick={authenticateUser} className="w-100" type="submit" disabled={!isFormValid} >
                      Sign in
                    </Button>
                  </Form>
  
                  <div className="mt-3 mb-4 text-center">
                    <span className="fw-normal">or login with</span>
                  </div>
                  <div className="d-flex justify-content-center my-4">
                    <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </Button>
                    <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                      <FontAwesomeIcon icon={faTwitter} />
                    </Button>
                    <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                      <FontAwesomeIcon icon={faGithub} />
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="fw-normal">
                      Not registered?
                      <Card.Link as={Link} to="/signup" className="fw-bold">
                        {` Create account `}
                      </Card.Link>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

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

          </Container>
        </section>
      </main>
    );

  };

  export default LoginPage;