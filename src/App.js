import React from 'react';
import './App.css';
import Navbar from "./components/navbar/navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './pages/main-page';
import Matches from "./pages/matches";
import IndividualStats from "./pages/individual-stats";
import TeamStats from "./pages/team-stats";
import AddMatch from "./pages/add-match";
import {loadWebsite} from "./firebase";
import Loading from "./pages/loading";

function App() {

    const [data, setData] = React.useState(null);
    if (!data) {
        const unresolvedData = loadWebsite();
        unresolvedData.then(resolvedData => (
            setData(resolvedData)
        ))
    }

    return (
        (
            data ?
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/matches' element={<Matches databaseData={data}/>}/>
                        <Route path='/individual-stats' element={<IndividualStats databaseData={data}/>}/>
                        <Route path='/team-stats' element={<TeamStats databaseData={data}/>}/>
                        <Route path='/add-match' element={<AddMatch/>}/>
                    </Routes>
                </Router>
                :
                <Loading/>
        )
    );
}

export default App;