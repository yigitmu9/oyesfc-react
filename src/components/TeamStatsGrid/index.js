import React from 'react';
import classes from "./team-stats-grid.module.css";
import GeneralResults from "../GeneralResults";
import FacilitiesStats from "../FacilitiesStats";
import WeatherTeamStats from "../WeatherTeamStats";
import RakipbulTeamStats from "../RakipbulTeamStats";

const TeamStatsGrid = ({matchData}) => {

    return (
        <div className={classes.grid}>
            <GeneralResults data={matchData}/>
            <FacilitiesStats data={matchData}/>
            <WeatherTeamStats data={matchData}/>
            <RakipbulTeamStats/>
        </div>
    );
};

export default TeamStatsGrid;