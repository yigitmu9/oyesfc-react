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

const IndividualStatsGrid = () => {

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [player, setPlayer] = useState(null);

    const openPlayerDetails = (data) => {
        setPlayer(data)
        document.body.style.overflow = 'hidden';
        setPopupOpen(true)
    }

    return (
        <div className={classes.grid}>
            <MainTitle title={'Individual'}/>
            <UltimateTeam onClickCard={openPlayerDetails}/>
            <ChartsGrid/>
            <MixedStats/>
            <BootBrands/>
            <WeatherIndividualStats/>
            <RakipbulPlayerStats/>
            {isPopupOpen &&
                <PlayerDetails onClose={() => setPopupOpen(false)}
                               player={player}/>}
        </div>
    );
};

export default IndividualStatsGrid;
