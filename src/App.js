import React from 'react';
import './App.css';
import Navbar from "./components/navbar/navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './pages/main-page';
import Matches from "./pages/matches";
import IndividualStats from "./pages/individual-stats";
import TeamStats from "./pages/team-stats";
import AddMatch from "./pages/add-match";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/matches' element={<Matches/>}/>
                <Route path='/individual-stats' element={<IndividualStats/>}/>
                <Route path='/team-stats' element={<TeamStats/>}/>
                <Route path='/add-match' element={<AddMatch/>}/>
            </Routes>
        </Router>
    );
}

export default App;