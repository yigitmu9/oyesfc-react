import classes from "./scoreboards-grid.module.css";
import Scoreboard from "../Scoreboard";
import React, {useState} from "react";
import {MatchDetails} from "../MatchDetails";
import AdvancedFilters from "../AdvancedFilters";
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import Filter6Icon from '@mui/icons-material/Filter6';

const ScoreboardsGrid = ({databaseData}) => {

    const [matchDetailsfilteredData, setMatchDetailsfilteredData] = useState(Object.values(databaseData));
    const [countFilter, setCountFilter] = useState(0);
    const [advancedFiltersModal, setAdvancedFiltersModal] = useState(false);
    const [applyFilters, setApplyFilters] = useState(null);
    const sortedData = matchDetailsfilteredData?.slice().sort((a, b) => {
        if (a.day && b.day) {
            const [dayA, monthA, yearA] = a.day.split('-').map(Number);
            const [dayB, monthB, yearB] = b.day.split('-').map(Number);
            if (yearA !== yearB) {
                return yearB - yearA;
            }
            if (monthA !== monthB) {
                return monthB - monthA;
            }
            return dayB - dayA;
        } else {
            return null
        }
    });
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [matchDetailsData, setMatchDetailsData] = useState(null);

    const openPopup = ({x}) => {
        document.body.style.overflow = 'hidden';
        setPopupOpen(true);
        setMatchDetailsData(x);
    };

    const handleXClick = (matchDetailsData) => {
        setMatchDetailsData(matchDetailsData);
    };

    const setFilters = (filteredData) => {
        setMatchDetailsfilteredData(filteredData);
    };

    const openFiltersModal = () => {
        document.body.style.overflow = 'hidden';
        setAdvancedFiltersModal(true)
    };

    const sendAppliedFilters = (appliedFilters) => {
        let count = 0;
        if (appliedFilters?.appliedFacilities?.length > 0) count = count + 1
        if (appliedFilters?.appliedMonths?.length > 0) count = count + 1
        if (appliedFilters?.appliedPlayers?.length > 0) count = count + 1
        if (appliedFilters?.appliedRivals?.length > 0) count = count + 1
        if (appliedFilters?.appliedYears?.length > 0) count = count + 1
        if (appliedFilters?.appliedType === 'rakipbul' || appliedFilters?.appliedType === 'normal') count = count + 1
        setCountFilter(count)
        setApplyFilters(appliedFilters)
    };

    return (
        <>
            <div className={classes.buttonDivStyle}>
                {
                    countFilter === 1 ? <Filter1Icon className={classes.filteredIconStyle} style={{height: "70px", width: "70px"}} onClick={openFiltersModal}></Filter1Icon>
                        : countFilter === 2 ? <Filter2Icon className={classes.filteredIconStyle} style={{height: "70px", width: "70px"}} onClick={openFiltersModal}></Filter2Icon>
                            : countFilter === 3 ? <Filter3Icon className={classes.filteredIconStyle} style={{height: "70px", width: "70px"}} onClick={openFiltersModal}></Filter3Icon>
                                : countFilter === 4 ? <Filter4Icon className={classes.filteredIconStyle} style={{height: "70px", width: "70px"}} onClick={openFiltersModal}></Filter4Icon>
                                    : countFilter === 5 ? <Filter5Icon className={classes.filteredIconStyle} style={{height: "70px", width: "70px"}} onClick={openFiltersModal}></Filter5Icon>
                                        : countFilter === 6 ? <Filter6Icon className={classes.filteredIconStyle} style={{height: "70px", width: "70px"}} onClick={openFiltersModal}></Filter6Icon>
                                            : <FilterListIcon className={classes.iconStyle} style={{height: "70px", width: "70px"}} onClick={openFiltersModal}></FilterListIcon>
                }
            </div>
            <div className={classes.grid}>
                {matchDetailsfilteredData.length > 0 ?
                    sortedData?.map((x, y) => (
                        <Scoreboard
                            key={y}
                            value={x}
                            openPopup={() => openPopup(x)}
                            matchDetailsData={(matchDetailsData) => handleXClick(matchDetailsData)}/>))
                :
                <h1 className={classes.title}>No Match found</h1>}
                {isPopupOpen && <MatchDetails matchDetailsData={matchDetailsData} onClose={() => setPopupOpen(false)} />}
                {advancedFiltersModal && <AdvancedFilters databaseData={databaseData} onClose={() => setAdvancedFiltersModal(false)}
                                                          setFilters={setFilters} sendAppliedFilters={sendAppliedFilters}
                                                          applyFilters={applyFilters}/>}
            </div>
        </>
    );

};

export default ScoreboardsGrid;