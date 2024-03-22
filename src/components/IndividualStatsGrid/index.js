import React, {useState} from 'react';
import PlayerCardsGrid from "../PlayerCardsGrid";
import ChartsGrid from "../ChartsGrid/charts-grid.js";
import FacilitiesIndividualStats from "../FacilitiesIndividualStats";
import WeatherIndividualStats from "../WeatherIndividualStats";
import RakipbulPlayerStats from "../RakipbulPlayerStats";
import FilterButtons from "../FilterButtons";
import classes from "./individual-stats-grid.module.css";
import {Divider} from "@mui/material";
import RivalsIndividualStats from "../RivalsIndividualStats";

const IndividualStatsGrid = ({databaseData}) => {

    const [matchDetailsFilteredData, setMatchDetailsFilteredData] = useState(Object.values(databaseData));

    const setAdvancedFilters = (filteredData) => {
        setMatchDetailsFilteredData(filteredData);
    };

    return (
        <div className={classes.grid}>
            <div className={classes.generalStyle}>
                <FilterButtons databaseData={databaseData} setAdvancedFilters={setAdvancedFilters}></FilterButtons>
                <div className={classes.divStyle}>
                    <PlayerCardsGrid matchData={matchDetailsFilteredData}/>
                </div>
                <div className={classes.divStyle}>
                    <ChartsGrid matchData={matchDetailsFilteredData} databaseData={databaseData}/>
                </div>
                <div className={classes.divStyle}>
                    <FacilitiesIndividualStats data={matchDetailsFilteredData}/>
                </div>
                <div className={classes.divStyle}>
                    <RivalsIndividualStats data={matchDetailsFilteredData}/>
                </div>
                <div className={classes.divStyle}>
                    <WeatherIndividualStats data={matchDetailsFilteredData}/>
                </div>
                <div className={classes.divStyle}>
                    <RakipbulPlayerStats/>
                </div>
                <div className={classes.divStyle}>
                    <div className={classes.spanDivStyle}>
                        <span className={classes.spanStyle}>*Does not work with filters.</span>
                        <Divider sx={{bgcolor: "rgb(80,80,80)", margin: "7px 0 7px"}} variant="middle"/>
                        <span className={classes.spanStyle}>**These statistics are only valid for 10 specific
                            Rakipbul matches for which position data is available.
                            Does not work with filters.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualStatsGrid;