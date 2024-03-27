import React from 'react';
import './App.css';
import Navbar from "./components/navbar/navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './pages/main-page';
import MatchesPage from "./pages/matches-page";
import IndividualStatsPage from "./pages/individual-stats-page";
import TeamStatsPage from "./pages/team-stats-page";
import {loadWebsite} from "./firebase";
import LoadingPage from "./pages/loading-page";
import SignIn from "./components/SignIn/sign-in";

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
                    <Navbar databaseData={data}/>
                    <Routes>
                        <Route path='oyesfc-react/' element={<MainPage/>}/>
                        <Route path='oyesfc-react/matches' element={<MatchesPage databaseData={data}/>}/>
                        <Route path='oyesfc-react/individual-stats' element={<IndividualStatsPage databaseData={data}/>}/>
                        <Route path='oyesfc-react/team-stats' element={<TeamStatsPage databaseData={data}/>}/>
                        <Route path='oyesfc-react/sign-in' element={<SignIn/>}/>
                    </Routes>
                </Router>
                :
                <LoadingPage/>
        )
    );
}

export default App;