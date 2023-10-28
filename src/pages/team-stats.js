import React, {useState} from 'react';
import {databaseData} from "../firebase";
import FilterButtons from "../components/FilterButtons";
import TeamStatsGrid from "../components/TeamStatsGrid";

const TeamStats = () => {

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
        <div>
            <div style={{height: '90vh', color: 'lightgray'}}>
                <FilterButtons data={buttons} applyFilter={applyFilter}/>
                <TeamStatsGrid matchData={matchDetailsfilteredData}/>
            </div>
        </div>
    );
};

export default TeamStats;