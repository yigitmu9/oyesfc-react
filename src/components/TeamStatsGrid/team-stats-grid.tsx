import React from 'react';
import classes from "./team-stats-grid.module.css";
import GeneralResults from "../GeneralResults/general-results";
import WeatherTeamStats from "../WeatherTeamStats/weather-team-stats";
import RakipbulTeamStats from "../RakipbulTeamStats/rakipbul-team-stats";
import MainSquadStats from "../MainSquadStats/main-squad-stats";
import MainTitle from "../../shared/MainTitle/main-title";
import MixedTeamStats from "../MixedTeamStats/mixed-team-stats";
import {useSelector} from "react-redux";

const TeamStatsGrid = () => {

    const { signedIn } = useSelector((state: any) => state.credentials);

    return (
        <div className={classes.grid}>
            <MainTitle title={'Team'}/>
            <GeneralResults/>
            <MixedTeamStats/>
            {signedIn && <MainSquadStats/>}
            <WeatherTeamStats/>
            <RakipbulTeamStats/>
        </div>
    );
};

export default TeamStatsGrid;
