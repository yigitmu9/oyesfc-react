import React from 'react';
import classes from "./team-stats-grid.module.css";
import GeneralResults from "../GeneralResults/general-results";
import WeatherTeamStats from "../WeatherTeamStats/weather-team-stats";
import RakipbulTeamStats from "../RakipbulTeamStats/rakipbul-team-stats";
import MainSquadStats from "../MainSquadStats/main-squad-stats";
import MainTitle from "../../shared/MainTitle/main-title";
import MixedTeamStats from "../MixedTeamStats/mixed-team-stats";

const TeamStatsGrid = ({databaseData, credentials}) => {

    const matchDetailsFilteredData = Object.values(databaseData);

    return (
        <div className={classes.grid}>
            <MainTitle title={'Team'}/>
            <GeneralResults data={matchDetailsFilteredData}/>
            <MixedTeamStats data={matchDetailsFilteredData}/>
            {credentials?.signedIn && <MainSquadStats data={matchDetailsFilteredData}/>}
            <WeatherTeamStats data={matchDetailsFilteredData}/>
            <RakipbulTeamStats/>
        </div>
    );
};

export default TeamStatsGrid;
