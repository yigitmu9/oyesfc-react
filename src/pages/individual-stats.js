import React, {useState} from 'react';
import FilterButtons from "../components/FilterButtons";
import {databaseData} from "../firebase";
import PlayerCardsGrid from "../components/PlayerCardsGrid";
import ChartsGrid from "../components/ChartsGrid";
import TeamStatsGrid from "../components/TeamStatsGrid";
import FacilitiesStats from "../components/FacilitiesStats";
import FacilitiesIndividualStats from "../components/FacilitiesIndividualStats";

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
            <div style={{height: '90vh', color: 'lightgray'}}>
                <FilterButtons data={buttons} applyFilter={applyFilter}/>
                <div style={{display: "flex"}}>
                    <PlayerCardsGrid matchData={matchDetailsfilteredData}/>
                    <ChartsGrid matchData={matchDetailsfilteredData}/>
                </div>
                <div>
                    <FacilitiesIndividualStats data={matchDetailsfilteredData}/>
                </div>
            </div>
        </div>
    );
};

export default IndividualStats;