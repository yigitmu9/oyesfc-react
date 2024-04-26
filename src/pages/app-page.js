import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from '../pages/main-page';
import MatchesPage from "../pages/matches-page";
import IndividualStatsPage from "../pages/individual-stats-page";
import TeamStatsPage from "../pages/team-stats-page";
import {loadWebsite} from "../firebase";
import LoadingPage from "../pages/loading-page";
import ErrorPage from "../pages/error-page";
import Navbar from '../components/Navbar/navbar';

const AppPage = () => {

    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [key, setKey] = useState(0);

    const fetchData = async () => {
        try {
            const response = await loadWebsite('matches');
            setData(response);
            setFilteredData(response)
            setKey(prevKey => prevKey + 1);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleReload = (data) => {
        if (data) fetchData().then(() => setKey(prevKey => prevKey + 1));
    }

    const setAdvancedFilters = (filteredData) => {
        setFilteredData(filteredData);
        setKey(prevKey => prevKey + 1);
    };

    if (!data) {
        fetchData().then(r => r);
    }

    if (loading) {
        return <LoadingPage/>;
    }

    if (error) {
        return <ErrorPage/>;
    }

    return (
        <Router>
            <Navbar databaseData={data} reloadData={handleReload} setAdvancedFilters={setAdvancedFilters}/>
            <Routes key={key}>
                <Route path='oyesfc-react/' element={<MainPage/>}/>
                <Route path='oyesfc-react/matches' element={<MatchesPage databaseData={filteredData} reloadData={handleReload}/>}/>
                <Route path='oyesfc-react/individual-stats' element={<IndividualStatsPage databaseData={filteredData}/>}/>
                <Route path='oyesfc-react/team-stats' element={<TeamStatsPage databaseData={filteredData}/>}/>
            </Routes>
        </Router>
    );
}

export default AppPage;
