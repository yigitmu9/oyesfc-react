import React, {useState} from 'react';
import FilterButtons from "../components/FilterButtons";
import PlayerCardsGrid from "../components/PlayerCardsGrid";
import ChartsGrid from "../components/ChartsGrid";
import FacilitiesIndividualStats from "../components/FacilitiesIndividualStats";
import WeatherIndividualStats from "../components/WeatherIndividualStats";
import RakipbulPlayerStats from "../components/RakipbulPlayerStats";

const IndividualStats = ({databaseData}) => {

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
            <div style={{color: 'lightgray', maxWidth: "100%"}}>
                <FilterButtons data={buttons} applyFilter={applyFilter}/>
                <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                    <PlayerCardsGrid matchData={matchDetailsfilteredData}/>
                </div>
                <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                    <ChartsGrid matchData={matchDetailsfilteredData} databaseData={databaseData}/>
                </div>
                <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                    <FacilitiesIndividualStats data={matchDetailsfilteredData}/>
                </div>
                <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                    <WeatherIndividualStats data={matchDetailsfilteredData}/>
                </div>
                <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                    <RakipbulPlayerStats/>
                </div>
                <div style={{marginTop: "50px", textAlign: "center"}}>
                    <span style={{color: "gray", textAlign: "center"}}>O Yes FC</span>
                </div>
            </div>
        </div>
    );
};

export default IndividualStats;