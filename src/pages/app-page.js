import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from '../pages/main-page';
import MatchesPage from "../pages/matches-page";
import IndividualStatsPage from "../pages/individual-stats-page";
import TeamStatsPage from "../pages/team-stats-page";
import {loadWebsite} from "../firebase";
import LoadingPage from "../pages/loading-page";
import ErrorPage from "../pages/error-page";
import Navbar from '../components/Navbar/navbar';
import {useDispatch, useSelector} from "react-redux";
import {changeEra} from "../redux/eraSlice";
import {updateData} from "../redux/databaseDataSlice";
import {hasAppliedFilters, returnFilteredData} from "../utils/utils";
import RatingsPage from "./ratings-page";
import AccountPage from "./account-page";
import FiltersPage from "./filters-page";
import CalendarPage from "./calendar-page";
import AddMatchPage from "./add-match-page";

const AppPage = () => {

    const dispatch = useDispatch();
    const { selectedEra } = useSelector((state) => state.era);
    const { allData } = useSelector((state) => state.databaseData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const localEra = localStorage.getItem('era')
        const era = localEra ? localEra : 'Golden Age';
        if (selectedEra !== era) dispatch(changeEra({selectedEra: era}))
    }, [dispatch, selectedEra]);

    const fetchData = useCallback(async () => {
        try {
            const response = await loadWebsite('matches');
            const filtersInStorage = JSON.parse(localStorage.getItem('filters'));
            const hasFilter = hasAppliedFilters(filtersInStorage)
            if (hasFilter) {
                const videosResponse = await loadWebsite(`videos`);
                const ratingsResponse = await loadWebsite(`rates`);
                const filterData = returnFilteredData(response, filtersInStorage, videosResponse, ratingsResponse)
                dispatch(updateData({allData: response, filteredData: filterData}))
            } else {
                dispatch(updateData({allData: response, filteredData: response}))
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        if (!allData) {
            fetchData().then(r => r);
        }
    }, [allData, fetchData]);

    if (loading) {
        return <LoadingPage/>;
    }

    if (error) {
        return <ErrorPage/>;
    }

    return (
        <Router>
            <Navbar/>
            <Routes key={0}>
                <Route path='oyesfc-react/' element={<MainPage/>}/>
                <Route path='oyesfc-react/matches' element={<MatchesPage/>}/>
                <Route path='oyesfc-react/individual-stats' element={<IndividualStatsPage/>}/>
                <Route path='oyesfc-react/team-stats' element={<TeamStatsPage/>}/>
                <Route path='oyesfc-react/ratings' element={<RatingsPage/>}/>
                <Route path='oyesfc-react/account' element={<AccountPage/>}/>
                <Route path='oyesfc-react/filters' element={<FiltersPage/>}/>
                <Route path='oyesfc-react/calendar' element={<CalendarPage/>}/>
                <Route path='oyesfc-react/add-match' element={<AddMatchPage/>}/>
            </Routes>
        </Router>
    );
}

export default AppPage;
