import React from 'react';
import PlayerCardsGrid from "../PlayerCardsGrid/player-cards-grid";
import ChartsGrid from "../ChartsGrid/charts-grid.js";
import FacilitiesIndividualStats from "../FacilitiesIndividualStats/facilities-individual-stats";
import WeatherIndividualStats from "../WeatherIndividualStats/weather-individual-stats";
import RakipbulPlayerStats from "../RakipbulPlayerStats/rakipbul-player-stats";
import classes from "./individual-stats-grid.module.css";
import {Divider} from "@mui/material";
import RivalsIndividualStats from "../RivalsIndividualStats/rivals-individual-stats";
import teamStatsClasses from "../TeamStatsGrid/team-stats-grid.module.css"

const IndividualStatsGrid = ({databaseData}) => {

    const matchDetailsFilteredData= Object.values(databaseData);

    return (
        <div className={classes.grid}>
            <div className={classes.generalStyle}>
                <h1 className={classes.firstTitle}>Players</h1>
                <div className={classes.divStyle}>
                    <PlayerCardsGrid matchData={matchDetailsFilteredData}/>
                </div>
                <h1 className={classes.secondTitle}>Individual Statistics</h1>
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
                    <RakipbulPlayerStats data={databaseData}/>
                </div>
                <div className={classes.divStyle}>
                    <div className={teamStatsClasses.spanDivStyle}>
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