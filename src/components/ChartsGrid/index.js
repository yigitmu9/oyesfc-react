import React from 'react';
import {TeamMembers} from "../../constants/constants";
import classes from "./charts-grid.module.css";
import {Bar, Line, Pie, Radar} from "react-chartjs-2";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";
import {databaseData} from "../../firebase";


const ChartsGrid = ({matchData}) => {

    let goals = 0;
    let goalsPerGameData = []
    let game = 0;
    let attendedMatches = 0;
    let rateOfAttendanceData = [];
    let oyesfcTotalGoal = 0;
    let goalPercentData = [];
    let rakipbulGame = 0;
    let normalGame = 0;
    let normalGoals = 0;
    let rakipbulGoals = 0;
    let performanceRateData = [];

    const numberOfMatches = Object.values(matchData)?.length;

    Object.values(matchData)?.forEach(item => {
        oyesfcTotalGoal += item?.oyesfc?.goal;
    });

    Object.values(TeamMembers)?.map(x => x.name)?.map((z, y) => {
        rakipbulGoals = 0;
        normalGoals = 0;
        rakipbulGame = Object.values(databaseData)?.filter(x => x.rakipbul === true)?.filter(item =>
            Object.keys(item.oyesfc.squad)?.includes(z))?.length;
        Object.values(databaseData)?.filter(x => x.rakipbul === true)?.forEach(item => {
            if (item?.oyesfc?.squad[z]) {
                rakipbulGoals += item?.oyesfc?.squad[z]?.goal;
            }
        });
        normalGame = Object.values(databaseData)?.filter(x => x.rakipbul === false)?.filter(item =>
            Object.keys(item.oyesfc.squad)?.includes(z))?.length;
        Object.values(databaseData)?.filter(x => x.rakipbul === false)?.forEach(item => {
            if (item?.oyesfc?.squad[z]) {
                normalGoals += item?.oyesfc?.squad[z]?.goal;
            }
        });
        if (rakipbulGame !== 0  || z !== TeamMembers.can.name || z !== TeamMembers.oguzhan.name || z !== TeamMembers.mehmet.name) {
            const rakipbulGoalsPerGame = (rakipbulGoals / rakipbulGame)?.toFixed(2)
            const normalGoalsPerGame = (normalGoals / normalGame)?.toFixed(2)
            const performanceRate = (((normalGoalsPerGame - rakipbulGoalsPerGame) / rakipbulGoalsPerGame) * 100)?.toFixed(0)
            performanceRateData.push(performanceRate)
        } else {
            performanceRateData.push(0)
        }

    })

    Object.values(TeamMembers)?.map(x => x.name)?.map((z, y) => {
        goals = 0;
        game = Object.values(matchData)?.filter(item =>
            Object.keys(item.oyesfc.squad)?.includes(z))?.length;
        Object.values(matchData)?.forEach(item => {
            if (item?.oyesfc?.squad[z] && z !== TeamMembers.can.name) {
                goals += item?.oyesfc?.squad[z]?.goal;
            }
        });
        const goalsPerGame = (goals / game)?.toFixed(2)
        const goalPercent = ((goals / oyesfcTotalGoal) * 100)?.toFixed(0)
        goalsPerGameData.push(goalsPerGame)
        goalPercentData.push(goalPercent)
    })

    Object.values(TeamMembers)?.map(x => x.name)?.map((z, y) => {
        attendedMatches = 0;
        attendedMatches = Object.values(matchData)?.filter(item =>
            Object.keys(item.oyesfc.squad)?.includes(z))?.length;
        const rateOfAttendance = ((attendedMatches / numberOfMatches) * 100)?.toFixed(0)
        rateOfAttendanceData.push(rateOfAttendance)
    });

    const goalsPerGameDatasets = {
        labels: Object.values(TeamMembers)?.map(x => x.name),
        classes: classes.yes,
        labelColor: 'red',
        datasets: [
            {
                label: 'Goal per Game',
                backgroundColor: 'darkred',
                borderColor: 'darkred',
                borderWidth: 2,
                data: goalsPerGameData,
            }
        ]
    }

    const attendanceRateDatasets = {
        labels: Object.values(TeamMembers)?.map(x => x.name),
        datasets: [
            {
                label: 'Rate of Attendance (%)',
                backgroundColor: 'darkred',
                borderColor: 'darkred',
                borderWidth: 4,
                data: rateOfAttendanceData,
            }
        ]
    }

    let yes = [];
    yes.push(Object.values(TeamMembers)?.map(x => x.name))
    yes.push('Other')

    const goalPercentDatasets = {
        labels: Object.values(TeamMembers)?.map(x => x.name),
        datasets: [
            {
                data: goalPercentData,
                borderColor: 'black',
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 0, 0)',
                    'rgb(0, 255, 0)',
                    'rgb(0, 0, 255)',
                    'rgb(255, 255, 0)',
                    'rgb(255, 0, 255)',
                ],
                label: '(%)'
            }
        ]
    }

    const performanceRateDatasets = {
        labels: Object.values(TeamMembers)?.map(x => x.name),
        datasets: [
            {
                label: 'Performance Increase Percentage (%)',
                backgroundColor: 'rgba(139, 0, 0, 0.2)',
                borderColor: 'red',
                borderWidth: 1,
                data: performanceRateData,
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray',
                    fontSize: 10,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'lightgray',
                    fontSize: 10
                },
            },
            y: {
                ticks: {
                    color: 'lightgray',
                    fontSize: 10
                },
            },
        },
    };

    const pieOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray',
                    fontSize: 10,
                },
            },
        }
    };

    const radarOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray',
                    fontSize: 10,
                },
            },
        },
        scales: {
            r: {
                pointLabels: {
                    color: 'lightgray',
                },
            },
        },
    };

    Chart.register(CategoryScale);
    linear.register(CategoryScale)


    return (
        <div className={classes.grid}>
            <div className={classes.goalsPerGameDiv}>
                <h3 style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center"}}>Goals per Game</h3>
                <Bar
                    data={goalsPerGameDatasets}
                    width={"100%"}
                    className={classes.goalsPerGameChart}
                    options={options}
                />
            </div>
            <div className={classes.goalsPerGameDiv}>
                <h3 style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center"}}>Rate of Attendance</h3>
                <Line
                    data={attendanceRateDatasets}
                    width={"100%"}
                    className={classes.goalsPerGameChart}
                    options={options}
                />
            </div>
            <div className={classes.goalsPerGameDiv}>
                <h3 style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center"}}>Goal Percentage Compared to Total O Yes FC Goal</h3>
                <Pie
                    data={goalPercentDatasets}
                    width={"100%"}
                    className={classes.goalsPerGameChart}
                    options={pieOptions}
                />
            </div>
            <div className={classes.goalsPerGameDiv}>
                <h3 style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center"}}>Regular Matches Compared to the Rakipbul</h3>
                <Radar
                    data={performanceRateDatasets}
                    width={"100%"}
                    className={classes.goalsPerGameChart}
                    options={radarOptions}
                />
            </div>
        </div>
    );
};

export default ChartsGrid;