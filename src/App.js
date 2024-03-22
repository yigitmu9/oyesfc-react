import React from 'react';
import './App.css';
import Navbar from "./components/navbar/navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './pages/main-page';
import Matches from "./pages/matches";
import IndividualStats from "./pages/individual-stats";
import TeamStats from "./pages/team-stats";
import {loadWebsite} from "./firebase";
import Loading from "./pages/loading";
import SignIn from "./components/SignIn";

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
                        <Route path='oyesfc-react/matches' element={<Matches databaseData={data}/>}/>
                        <Route path='oyesfc-react/individual-stats' element={<IndividualStats databaseData={data}/>}/>
                        <Route path='oyesfc-react/team-stats' element={<TeamStats databaseData={data}/>}/>
                        <Route path='oyesfc-react/sign-in' element={<SignIn/>}/>
                    </Routes>
                </Router>
                :
                <Loading/>
        )
    );
}

export default App;