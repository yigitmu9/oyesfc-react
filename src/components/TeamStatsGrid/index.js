import React, {useState} from 'react';
import classes from "./team-stats-grid.module.css";
import GeneralResults from "../GeneralResults";
import FacilitiesStats from "../FacilitiesStats";
import WeatherTeamStats from "../WeatherTeamStats";
import RakipbulTeamStats from "../RakipbulTeamStats";
import FilterButtons from "../FilterButtons";

const TeamStatsGrid = ({databaseData}) => {

    const [matchDetailsFilteredData, setMatchDetailsFilteredData] = useState(Object.values(databaseData));

    const setAdvancedFilters = (filteredData) => {
        setMatchDetailsFilteredData(filteredData);
    };

    return (
        <div className={classes.grid}>
            <FilterButtons databaseData={databaseData} setAdvancedFilters={setAdvancedFilters}></FilterButtons>
            <GeneralResults data={matchDetailsFilteredData}/>
            <FacilitiesStats data={matchDetailsFilteredData}/>
            <WeatherTeamStats data={matchDetailsFilteredData}/>
            <RakipbulTeamStats/>
        </div>
    );
};

export default TeamStatsGrid;