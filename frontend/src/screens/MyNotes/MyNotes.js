import React, { useEffect } from "react";
import { Accordion, Badge, Card, useAccordionButton } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import {deleteNoteAction, listNotes} from '../../actions/noteAction';
import { useDispatch, useSelector } from 'react-redux'


const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const noteList = useSelector(state => state.noteList);
  const { loading, notes, error } = noteList
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;
  
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteNoteAction(id));
    }
  };
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );
    return (
      <Card.Header as={Card.Text}
        style={{backgroundColor:"transparent"}}
      onClick={decoratedOnClick}
    >
      {children}
    </Card.Header>
    );
  }
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(listNotes())
    if (!userInfo) {
      navigate("/")
    }
  }, [dispatch, navigate, userInfo,successCreate, successUpdate, loadingDelete, successDelete])
  return (
    <>
      
      <MainScreen title={`Welcome ${userInfo.name}....`}>

        <Link to="/createnote">
          <Button
            style={{ marginLeft: 10, marginBottom: 6 }}
            size="lg"
            variant="outline-dark"
          >
            Create New Note
          </Button>
        </Link>
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
        {error && <ErrorMessage variant='danger'>{ error }</ErrorMessage>}
        {loading && <Loading />}
        {notes?.reverse().filter(filteredNote => (
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )).map((note) => (
          <Accordion key={note._id}>
            <Card style={{ margin: 10 }} key={note._id}>
            <CustomToggle eventKey="0">
            <Card.Header
              style={{ display: "flex", backgroundColor:"transparent", borderBottom:"none" }} 
            >
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
              {note.title}
              </span>
              <div>
                <Button href={`/note/${note._id}`}>
                  {" "}
                  <ModeEditOutlineIcon />{" "}
                </Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  <DeleteOutlineIcon />
                </Button>
              </div>
                </Card.Header>
              </CustomToggle>
              <Accordion.Collapse eventKey="0">
          <Card.Body>
                  <p>
                    <Badge bg="success">Category - { note.category}</Badge>
                </p>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                    <footer className="blockquote-footer">Created on {" "}
                      <cite title="Source Title">
                        { note.createdAt.substring(0,10)}
                    </cite>
                    </footer>
                </blockquote>
                </Card.Body>
                </Accordion.Collapse>
          </Card>
          </Accordion>
        ))}
        
      </MainScreen>
    </>
  );
};

export default MyNotes;
