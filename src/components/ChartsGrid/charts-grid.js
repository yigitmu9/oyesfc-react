import React from 'react';
import {TeamMembers} from "../../constants/constants";
import classes from "./charts-grid.module.css";
import {Bar, Line, Pie, Radar} from "react-chartjs-2";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";
import PropTypes from "prop-types";


const ChartsGrid = ({matchData, databaseData}) => {

    let goals = 0;
    let goalsPerGameData = [];
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

    Object.values(TeamMembers)?.map(x => x.name)?.map(z => {
        rakipbulGoals = 0;
        normalGoals = 0;
        rakipbulGame = Object.values(databaseData)?.filter(x => x.rakipbul === true)?.filter(item =>
            typeof z === 'string' &&
            Object.keys(item.oyesfc.squad || {}).includes(z)
        )?.length;
        Object.values(databaseData)?.filter(x => x.rakipbul === true)?.forEach(item => {
            if (item?.oyesfc?.squad[z]) {
                rakipbulGoals += item?.oyesfc?.squad[z]?.goal;
            }
        });
        normalGame = Object.values(databaseData)?.filter(x => x.rakipbul === false)?.filter(item =>
            typeof z === 'string' &&
            Object.keys(item.oyesfc.squad || {}).includes(z)
        )?.length;
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
        return null
    })

    Object.values(TeamMembers)?.map(x => x.name)?.map(z => {
        goals = 0;
        game = Object.values(matchData)?.filter(item =>
            typeof z === 'string' &&
            Object.keys(item.oyesfc.squad || {}).includes(z)
        )?.length;
        Object.values(matchData)?.forEach(item => {
            if (item?.oyesfc?.squad[z] && z !== TeamMembers.can.name) {
                goals += item?.oyesfc?.squad[z]?.goal;
            }
        });
        const goalsPerGame = (goals / game)?.toFixed(2)
        const goalPercent = ((goals / oyesfcTotalGoal) * 100)?.toFixed(0)
        goalsPerGameData.push(goalsPerGame)
        goalPercentData.push(goalPercent)
        return null
    })

    Object.values(TeamMembers)?.map(x => x.name)?.map(z => {
        attendedMatches = 0;
        attendedMatches = Object.values(matchData)?.filter(item =>
            typeof z === 'string' &&
            Object.keys(item.oyesfc.squad || {}).includes(z)
        )?.length;
        const rateOfAttendance = ((attendedMatches / numberOfMatches) * 100)?.toFixed(0)
        rateOfAttendanceData.push(rateOfAttendance)
        return null
    });

    const goalsPerGameDatasets = {
        labels: Object.values(TeamMembers)?.map(x => x.name),
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
                data: rateOfAttendanceData,
                backgroundColor: 'darkred',
                borderColor: 'darkred',
                borderWidth: 2,
            }
        ]
    }

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
                display: false
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'lightgray',
                },
            },
            y: {
                ticks: {
                    color: 'lightgray',
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
                },
            },
        }
    };

    const radarOptions = {
        locale: 'en-US',
        scale: {},
        scales: {
            r: {
                angleLines: {
                    color: 'black'
                },
                grid: {
                    color: 'black'
                },
                pointLabels: {
                    color: 'lightgray'
                },
                ticks: {
                    color: 'transparent',
                    backdropColor: 'transparent'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
        }
    }

    Chart.register(CategoryScale);
    linear.register(CategoryScale)

    const CustomLine = (props) => {
        return <Line {...props} />;
    };

    CustomLine.propTypes = {
        backgroundcolor: PropTypes.string,
        bordercolor: PropTypes.string,
        borderwidth: PropTypes.number,
    };

    return (
        <div className={classes.grid}>
            <div className={classes.insideGrid}>
                <div className={classes.goalsPerGameDiv}>
                    <h3 className={classes.titleStyle}>Goals per Game</h3>
                    <Bar
                        data={goalsPerGameDatasets}
                        width={"100%"}
                        className={classes.goalsPerGameChart}
                        options={options}
                    />
                </div>
                <div className={classes.goalsPerGameDiv}>
                    <h3 className={classes.titleStyle}>Rate of Attendance</h3>
                    <CustomLine
                        data={attendanceRateDatasets}
                        width={"100%"}
                        className={classes.goalsPerGameChart}
                        options={options}
                        backgroundcolor="darkred"
                        bordercolor="darkred"
                        borderwidth={2}
                    />
                </div>
            </div>
            <div className={classes.insideGrid}>
                <div className={classes.goalsPerGameDiv}>
                    <h3 className={classes.titleStyle}>Goal Percentage Compared to Total O Yes FC Goal</h3>
                    <div className={classes.chartStyle}>
                        <Pie
                            data={goalPercentDatasets}
                            width={"100%"}
                            className={classes.goalsPerGameChart}
                            options={pieOptions}
                        />
                    </div>
                </div>
                <div className={classes.goalsPerGameDiv}>
                    <h3 className={classes.titleStyle}>Regular Matches Compared to the Rakipbul Performance Increase Percentage</h3>
                    <div className={classes.radarChartStyle}>
                        <Radar
                            data={performanceRateDatasets}
                            width={"100%"}
                            className={classes.realRadarChartStyle}
                            options={radarOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartsGrid;