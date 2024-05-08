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
import {returnFilteredData} from "../components/AdvancedFilters/advanced-filters";

const AppPage = () => {

    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [key, setKey] = useState(0);
    const [credentials, setCredentials] = useState(null);

    const fetchData = async () => {
        try {
            const response = await loadWebsite('matches');
            setData(response);
            const filtersInStorage = JSON.parse(localStorage.getItem('filters'));
            if (filtersInStorage?.appliedType ||
                filtersInStorage?.appliedPlayers ||
                filtersInStorage?.appliedFacilities ||
                filtersInStorage?.appliedYears ||
                filtersInStorage?.appliedMonths ||
                filtersInStorage?.appliedRivals ||
                filtersInStorage?.appliedJersey ||
                filtersInStorage?.appliedSky ||
                filtersInStorage?.appliedTemperature ||
                filtersInStorage?.appliedNumberOfPlayers ||
                filtersInStorage?.appliedSquad) {
                const filterData = returnFilteredData(response, filtersInStorage)
                setFilteredData(filterData)
            } else {
                setFilteredData(response);
            }
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

    const setUpCredentials = (credentialsData) => {
        setCredentials(credentialsData);
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
            <Navbar databaseData={data} reloadData={handleReload} setAdvancedFilters={setAdvancedFilters} sendCredentials={setUpCredentials} />
            <Routes key={key}>
                <Route path='oyesfc-react/' element={<MainPage/>}/>
                <Route path='oyesfc-react/matches' element={<MatchesPage databaseData={filteredData} reloadData={handleReload} credentials={credentials} allData={data}/>}/>
                <Route path='oyesfc-react/individual-stats' element={<IndividualStatsPage databaseData={filteredData} credentials={credentials} allData={data} reloadData={handleReload}/>}/>
                <Route path='oyesfc-react/team-stats' element={<TeamStatsPage databaseData={filteredData} credentials={credentials}/>}/>
            </Routes>
        </Router>
    );
}

export default AppPage;
