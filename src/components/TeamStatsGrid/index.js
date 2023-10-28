import React from 'react';
import classes from "./team-stats-grid.module.css";
import GeneralResults from "../GeneralResults";
import FacilitiesStats from "../FacilitiesStats";

const TeamStatsGrid = ({matchData}) => {

    return (
        <div className={classes.grid}>
            <GeneralResults data={matchData}/>
            <FacilitiesStats data={matchData}/>
        </div>
    );
};

export default TeamStatsGrid;