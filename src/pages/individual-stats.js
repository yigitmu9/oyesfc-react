import React, {useState} from 'react';
import FilterButtons from "../components/FilterButtons";
import {databaseData} from "../firebase";
import PlayerCardsGrid from "../components/PlayerCardsGrid";
import ChartsGrid from "../components/ChartsGrid";
import FacilitiesIndividualStats from "../components/FacilitiesIndividualStats";
import WeatherIndividualStats from "../components/WeatherIndividualStats";
import RakipbulIndividualStats from "../components/RakipbulIndividualStats";

const IndividualStats = () => {

    const buttons = ['All', 'Rakipbul', 'Normal'];
    const [matchDetailsfilteredData, setMatchDetailsfilteredData] = useState(Object.values(databaseData));

    const applyFilter = (selectedButton) => {
        if (selectedButton === 'All') {
            setMatchDetailsfilteredData(Object.values(databaseData))
        } else if (selectedButton === 'Rakipbul') {
            setMatchDetailsfilteredData(Object.values(databaseData)?.filter(x => x.rakipbul === true))
        } else if (selectedButton === 'Normal') {
            setMatchDetailsfilteredData(Object.values(databaseData)?.filter(x => x.rakipbul === false))
        }
    };

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{height: '90vh', color: 'lightgray', maxWidth: "100%"}}>
                <FilterButtons data={buttons} applyFilter={applyFilter}/>
                <div style={{display: "flex", width: "95%"}}>
                    <PlayerCardsGrid matchData={matchDetailsfilteredData}/>
                    <ChartsGrid matchData={matchDetailsfilteredData}/>
                </div>
                <div style={{display: "flex", width: "100%"}}>
                    <FacilitiesIndividualStats data={matchDetailsfilteredData}/>
                </div>
                <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                    <WeatherIndividualStats data={matchDetailsfilteredData}/>
                </div>
                <div style={{display: "flex", width: "100%"}}>
                    <RakipbulIndividualStats/>
                </div>
            </div>
        </div>
    );
};

export default IndividualStats;