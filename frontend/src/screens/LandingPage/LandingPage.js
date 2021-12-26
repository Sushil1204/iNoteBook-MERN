/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './landingPage.css'
import { Button, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const LandingPage = () => {
    let navigate = useNavigate();
    useEffect(() => {
        let userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          console.log(userInfo);
          navigate("/mynotes");
        }
      }, [navigate]);
    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className='title'>Welcome to iNonteBook App </h1>
                            <p className='subtitle'>One safe place for your notes</p>
                        </div>
                        <div className="buttonContainer">
                            <Link to="/login">
                                <Button size='lg' className='landingbutton' variant="info">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button size='lg' className='landingbutton' variant="primary">Register</Button>
                            </Link>
                        </div>
                    </div>
                </Row>
           </Container>
        </div>
    )
}

export default LandingPage
