import React, { useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    navigator("/");
  };
  useEffect(() => {}, [userInfo]);
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">iNoteBook-Mern</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {userInfo ? (
            <Nav>
              <Nav.Link>
                <Link to="/mynotes">My Notes</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/profile">{userInfo?.name}</Link>
                {/* <Link to="/profile">{userInfo?.name}</Link> */}
              </Nav.Link>
              <Nav.Link>
                <Nav.Item onClick={logoutHandler}>Logout</Nav.Item>
                </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              {" "}
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
