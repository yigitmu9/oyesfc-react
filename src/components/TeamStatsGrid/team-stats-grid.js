import React from 'react';
import classes from "./team-stats-grid.module.css";
import GeneralResults from "../GeneralResults/general-results";
import FacilitiesStats from "../FacilitiesStats/facilities-stats";
import WeatherTeamStats from "../WeatherTeamStats/weather-team-stats";
import RakipbulTeamStats from "../RakipbulTeamStats/rakipbul-team-stats";
import MainSquadStats from "../MainSquadStats/main-squad-stats";
import RivalComparison from "../RivalComparison/rival-comparison";
import JerseyTeamStats from "../JerseyTeamStats/jersey-team-stats";
import WeatherSkyTeamStats from "../WeatherSkyTeamStats/weather-sky-team-stats";
import {Divider} from "@mui/material";

const TeamStatsGrid = ({databaseData, credentials}) => {

    const matchDetailsFilteredData = Object.values(databaseData);

    return (
        <div className={classes.grid}>
            <h1 className={classes.title}>Team Statistics</h1>
            <GeneralResults data={matchDetailsFilteredData}/>
            <FacilitiesStats data={matchDetailsFilteredData}/>
            <RivalComparison data={matchDetailsFilteredData}/>
            <JerseyTeamStats data={matchDetailsFilteredData}/>
            {credentials?.signedIn && <MainSquadStats data={matchDetailsFilteredData}/>}
            <WeatherTeamStats data={matchDetailsFilteredData}/>
            <WeatherSkyTeamStats data={matchDetailsFilteredData} selectedSky={['Daytime', 'Night']}/>
            <WeatherSkyTeamStats data={matchDetailsFilteredData} selectedSky={['Rain', 'Snow']}/>
            <RakipbulTeamStats data={databaseData}/>
            <div className={classes.divStyle}>
                <div className={classes.spanDivStyle}>
                    <span className={classes.spanStyle}>*These statistics are only valid for 10 specific
                            Rakipbul matches for which position data is available.
                            Does not work with filters.
                    </span>
                    {
                        credentials?.signedIn &&
                        <>
                            <Divider sx={{bgcolor: "rgb(80,80,80)", margin: "7px 0 7px"}} variant="middle"/>
                            <span className={classes.spanStyle}>**This statistic is only for signed in users.
                            </span>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default TeamStatsGrid;