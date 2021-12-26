import React, { useState } from 'react'
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignupScreen from './screens/SignupScreen/SignupScreen'; 
import CreateNote from './screens/CreateNoteScreen/CreateNote';
import UpdateScreen from './screens/UpdateNoteScreen/UpdateScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/signup" element={<SignupScreen />}></Route>
          <Route path="/profile" element={<ProfileScreen/>}></Route>
          <Route path="/createnote" element={<CreateNote/>}></Route>
          <Route path="/note/:id" element={<UpdateScreen/>}></Route>
          <Route path="/mynotes" element={<MyNotes search={ search }/>}></Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
