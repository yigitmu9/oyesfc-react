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
                        <Route path='oyesfc-react/' element={<MainPage/>}/>
                        <Route path='oyesfc-react/matches' element={<Matches databaseData={data}/>}/>
                        <Route path='oyesfc-react/individual-stats' element={<IndividualStats databaseData={data}/>}/>
                        <Route path='oyesfc-react/team-stats' element={<TeamStats databaseData={data}/>}/>
                        <Route path='oyesfc-react/add-match' element={<AddMatch/>}/>
                    </Routes>
                </Router>
                :
                <Loading/>
        )
    );
}

export default App;