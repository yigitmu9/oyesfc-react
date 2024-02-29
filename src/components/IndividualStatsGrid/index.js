import React, {useState} from 'react';
import PlayerCardsGrid from "../PlayerCardsGrid";
import ChartsGrid from "../ChartsGrid";
import FacilitiesIndividualStats from "../FacilitiesIndividualStats";
import WeatherIndividualStats from "../WeatherIndividualStats";
import RakipbulPlayerStats from "../RakipbulPlayerStats";
import FilterButtons from "../FilterButtons";
import classes from "./individual-stats-grid.module.css";

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
                    <WeatherIndividualStats data={matchDetailsFilteredData}/>
                </div>
                <div className={classes.divStyle}>
                    <RakipbulPlayerStats/>
                </div>
            </div>
        </div>
    );
};

export default IndividualStatsGrid;