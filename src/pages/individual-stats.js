import React, {useState} from 'react';
import PlayerCards from "../components/PlayerCards";
import {TeamMembers} from "../constants/constants";
import classes from "../components/ScoreboardsGrid/scoreboards-grid.module.css";
import FilterButtons from "../components/FilterButtons";
import {databaseData} from "../firebase";
import {Bar} from "react-chartjs-2";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";

const IndividualStats = () => {

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

    let test = 0;
    let test2 = []
    let test3 = 0;

    Object.values(TeamMembers)?.map(x => x.name).map((z, y) => {
        test = 0;
        test3 = Object.values(matchDetailsfilteredData).filter(item =>
            Object.keys(item.oyesfc.squad).includes(z)).length;
        Object.values(matchDetailsfilteredData).forEach(item => {
            if (item?.oyesfc?.squad[z] && z !== TeamMembers.can.name) {
                test += item.oyesfc.squad[z].goal;
            }
        });
        const test4 = (test / test3).toFixed(2)
        test2.push(test4)
    })

    const state = {
        labels: Object.values(TeamMembers)?.map(x => x.name),
        datasets: [
            {
                label: 'Goal per Game',
                backgroundColor: 'darkred',
                borderColor: 'darkred',
                borderWidth: 2,
                data: test2,
                textColor: 'lightgray'
            }
        ]
    }
    Chart.register(CategoryScale);
    linear.register(CategoryScale)

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
            <div style={{ height: "70%", width: "70%" }}>
                <Bar
                    data={state}
                    width={"100%"}
                    options={{
                        maintainAspectRatio: false,
                        title:{
                            display:true,
                            text:'Goal per Game',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right',
                        }
                    }}
                />
            </div>

        </div>
    );
};

export default IndividualStats;