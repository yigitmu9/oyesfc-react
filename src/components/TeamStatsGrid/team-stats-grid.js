import React from 'react';
import classes from "./team-stats-grid.module.css";
import GeneralResults from "../GeneralResults/general-results";
import FacilitiesStats from "../FacilitiesStats/facilities-stats";
import WeatherTeamStats from "../WeatherTeamStats/weather-team-stats";
import RakipbulTeamStats from "../RakipbulTeamStats/rakipbul-team-stats";
import MainSquadStats from "../MainSquadStats/main-squad-stats";
import RivalComparison from "../RivalComparison/rival-comparison";

const TeamStatsGrid = ({databaseData}) => {

    const matchDetailsFilteredData = Object.values(databaseData);

    return (
        <div className={classes.grid}>
            <h1 className={classes.title}>Team Statistics</h1>
            <GeneralResults data={matchDetailsFilteredData}/>
            <FacilitiesStats data={matchDetailsFilteredData}/>
            <RivalComparison data={matchDetailsFilteredData}/>
            <WeatherTeamStats data={matchDetailsFilteredData}/>
            <MainSquadStats data={matchDetailsFilteredData}/>
            <RakipbulTeamStats data={databaseData}/>
            <div className={classes.divStyle}>
                <div className={classes.spanDivStyle}>
                    <span className={classes.spanStyle}>*These statistics are only valid for 10 specific
                            Rakipbul matches for which position data is available.
                            Does not work with filters.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TeamStatsGrid;