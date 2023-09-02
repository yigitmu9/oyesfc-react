import React, {useState} from 'react';
import PlayerCards from "../components/PlayerCards";
import {TeamMembers} from "../constants/constants";
import classes from "../components/ScoreboardsGrid/scoreboards-grid.module.css";
import FilterButtons from "../components/FilterButtons";
import {databaseData} from "../firebase";

const IndividualStats = () => {

    console.log(Object.values(TeamMembers).map(x => x.name))

    const buttons = ['All', 'Rakipbul', 'Normal'];
    const [matchDetailsfilteredData, setMatchDetailsfilteredData] = useState(Object.values(databaseData));

    const applyFilter = (selectedButton) => {
        if (selectedButton === 'All') {
            setMatchDetailsfilteredData(Object.values(databaseData))
        } else if (selectedButton === 'Rakipbul') {
            setMatchDetailsfilteredData(Object.values(databaseData).filter(x => x.rakipbul === true))
        } else if (selectedButton === 'Normal') {
            setMatchDetailsfilteredData(Object.values(databaseData).filter(x => x.rakipbul === false))
        }
    };

    return (
        <div
            style={{
                height: '90vh',
                color: 'lightgray'
            }}
        >
            <div className={classes.filterButtons}>
                <FilterButtons data={buttons} applyFilter={applyFilter} />
            </div>
            <div style={{
                listStyleType: 'none',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                margin: '3rem 10rem 3rem',
            }}>
            {Object.values(TeamMembers)?.map((x, y) => (
                <PlayerCards
                    key={y}
                    playerName={x.name}
                    data={matchDetailsfilteredData}/>))}
            </div>
        </div>
    );
};

export default IndividualStats;