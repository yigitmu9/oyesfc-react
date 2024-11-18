import React from 'react';
import ChartsGrid from "../ChartsGrid/charts-grid";
import WeatherIndividualStats from "../WeatherIndividualStats/weather-individual-stats";
import RakipbulPlayerStats from "../RakipbulPlayerStats/rakipbul-player-stats";
import classes from "./individual-stats-grid.module.css";
import UltimateTeam from "../UltimateTeam/ultimate-team";
import BootBrands from "../BootBrands/boot-brands";
import MixedStats from "../MixedStats/mixed-stats";
import MainTitle from "../../shared/MainTitle/main-title";
import {useNavigate} from "react-router-dom";

const IndividualStatsGrid = () => {

    const navigate = useNavigate()

    const openPlayerDetails = (player?: any) => {
        navigate('/oyesfc-react/player-details', {state: player})
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
        </div>
    );
};

export default IndividualStatsGrid;
