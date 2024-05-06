import React, {useState} from 'react';
import ChartsGrid from "../ChartsGrid/charts-grid.js";
import FacilitiesIndividualStats from "../FacilitiesIndividualStats/facilities-individual-stats";
import WeatherIndividualStats from "../WeatherIndividualStats/weather-individual-stats";
import RakipbulPlayerStats from "../RakipbulPlayerStats/rakipbul-player-stats";
import classes from "./individual-stats-grid.module.css";
import {Divider} from "@mui/material";
import RivalsIndividualStats from "../RivalsIndividualStats/rivals-individual-stats";
import teamStatsClasses from "../TeamStatsGrid/team-stats-grid.module.css"
import UltimateTeam from "../UltimateTeam/ultimate-team";
import PlayerDetails from "../PlayerDetails/player-details";
import JerseysIndividualStats from "../JerseysIndividualStats/jerseys-individual-stats";
import WeatherSkyIndividualStats from "../WeatherSkyIndividualStats/weather-sky-individual-stats";

const IndividualStatsGrid = ({databaseData, credentials, allData, reloadData}) => {

    const filteredData = Object.values(databaseData);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [player, setPlayer] = useState(null);

    const openPlayerDetails = (data) => {
        setPlayer(data)
        document.body.style.overflow = 'hidden';
        setPopupOpen(true)
    }

    const handleReload = (data) => {
        reloadData(data)
    }

    return (
        <div className={classes.grid}>
            <h1 className={classes.firstTitle}>Lineup</h1>
            <UltimateTeam onClickCard={openPlayerDetails}/>
            <h1 className={classes.secondTitle}>Individual Statistics</h1>
            <ChartsGrid matchData={filteredData} databaseData={databaseData}/>
            <FacilitiesIndividualStats data={filteredData}/>
            <RivalsIndividualStats data={filteredData}/>
            <JerseysIndividualStats data={filteredData}/>
            <WeatherIndividualStats data={filteredData}/>
            <WeatherSkyIndividualStats data={filteredData} selectedSky={['Daytime', 'Night']}/>
            <WeatherSkyIndividualStats data={filteredData} selectedSky={['Rain', 'Snow']}/>
            <RakipbulPlayerStats/>
            <div className={teamStatsClasses.divStyle}>
                <div className={teamStatsClasses.spanDivStyle}>
                    <span className={teamStatsClasses.spanStyle}>*Does not work with filters.</span>
                    <Divider sx={{bgcolor: "rgb(80,80,80)", margin: "7px 0 7px"}} variant="middle"/>
                    <span className={teamStatsClasses.spanStyle}>**These statistics are only valid for 10 specific
                            Rakipbul matches for which position data is available.
                            Does not work with filters.</span>
                </div>
            </div>
            {isPopupOpen &&
                <PlayerDetails data={filteredData}
                               onClose={() => setPopupOpen(false)} player={player}
                               credentials={credentials} allData={allData} reloadData={handleReload}/>}
        </div>
    );
};

export default IndividualStatsGrid;