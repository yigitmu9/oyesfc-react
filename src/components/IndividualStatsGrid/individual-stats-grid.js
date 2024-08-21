import React, {useState} from 'react';
import ChartsGrid from "../ChartsGrid/charts-grid.js";
import WeatherIndividualStats from "../WeatherIndividualStats/weather-individual-stats";
import RakipbulPlayerStats from "../RakipbulPlayerStats/rakipbul-player-stats";
import classes from "./individual-stats-grid.module.css";
import UltimateTeam from "../UltimateTeam/ultimate-team";
import PlayerDetails from "../PlayerDetails/player-details";
import BootBrands from "../BootBrands/boot-brands";
import MixedStats from "../MixedStats/mixed-stats";
import MainTitle from "../../shared/MainTitle/main-title";

const IndividualStatsGrid = ({databaseData, credentials, allData, reloadData, selectedEra}) => {

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
            <MainTitle title={'Individual'}/>
            <UltimateTeam onClickCard={openPlayerDetails}/>
            <ChartsGrid data={filteredData}/>
            <MixedStats data={filteredData}/>
            <BootBrands data={filteredData}/>
            <WeatherIndividualStats data={filteredData}/>
            <RakipbulPlayerStats/>
            {isPopupOpen &&
                <PlayerDetails data={filteredData}
                               onClose={() => setPopupOpen(false)} player={player}
                               credentials={credentials} allData={allData} reloadData={handleReload}
                               selectedEra={selectedEra}/>}
        </div>
    );
};

export default IndividualStatsGrid;
