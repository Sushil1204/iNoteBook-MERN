/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate,  } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../actions/userActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

    let navigate = useNavigate();
    useEffect(() => {
        let userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          console.log(userInfo);
          navigate("/mynotes");
        }
      }, [navigate, userInfo]);


  const submitHandler = async(e) => {
    e.preventDefault();
    dispatch(login(email, password));
    }
  return (
    <MainScreen title="LOGIN">
      <div className="LoginContainer">
        {error && <ErrorMessage variant='danger'>{ error }</ErrorMessage>}
        {loading && <Loading/> }
        <Card
          style={{
            width: "400px",
            display: "flex",
            margin: "auto",
            marginTop: "10px",
          }}
        >
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="userPass">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                New User ? <Link to="/signup">Sign Up</Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
