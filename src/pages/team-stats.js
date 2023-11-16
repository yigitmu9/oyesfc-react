import React, {useState} from 'react';
import FilterButtons from "../components/FilterButtons";
import TeamStatsGrid from "../components/TeamStatsGrid";

const TeamStats = ({databaseData}) => {

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
                <div style={{marginTop: "50px", textAlign: "center"}}>
                    <span style={{color: "gray", textAlign: "center"}}>O Yes FC</span>
                </div>
            </div>
        </div>
    );
};

export default TeamStats;