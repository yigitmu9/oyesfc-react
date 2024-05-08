import React from 'react';
import classes from "./player-radar-chart.module.css";
import matchDetailsClasses from "../MatchDetails/match-details.module.css";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";
import {Radar} from "react-chartjs-2";
import {TeamMembers} from "../../constants/constants";
import HexagonIcon from '@mui/icons-material/Hexagon';
import {Divider} from "@mui/material";

const PlayerRadarChart = ({playerName}) => {

    const isMobile = window.innerWidth <= 768;
    const performanceRateDatasets = {
        labels: ['ATT', 'TEC', 'STA', 'DEF', 'POW', 'SPD'],
        datasets: [
            {
                label: playerName,
                backgroundColor: 'rgba(139, 0, 0, 0)',
                borderColor: 'red',
                borderWidth: isMobile ? 3 : 4,
                data: Object.values(TeamMembers).find(x => x.name === playerName).ratings,
            }
        ]
    }

    const radarOptions = {
        locale: 'en-US',
        scale: {},
        scales: {
            r: {
                beginAtZero: true,
                max: 10,
                backgroundColor: '#424242',
                angleLines: {
                    color: 'transparent'
                },
                grid: {
                    color: 'transparent'
                },
                pointLabels: {
                    color: 'lightgray',
                    font: {
                        size: isMobile ? 14 : 18
                    }
                },
                ticks: {
                    color: 'transparent',
                    backdropColor: 'transparent',
                    stepSize: 1,
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false,
            },
        },
        elements: {
            point: {
                radius: 0
            }
        }
    }

    Chart.register(CategoryScale);
    linear.register(CategoryScale)

    return (
        <>
            <div className={matchDetailsClasses.generalTabDiv}>
                <section className={matchDetailsClasses.generalTabSection}>
                    <div className={matchDetailsClasses.generalInfoDiv}>
                        <HexagonIcon fontSize={isMobile ? 'medium' : 'large'}
                                     className={matchDetailsClasses.generalInfoIcon}>
                        </HexagonIcon>
                        <span className={matchDetailsClasses.generalInfoSpan}>
                            Rating Chart
                        </span>
                    </div>
                    <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                    <div className={classes.chartDiv}>
                        <Radar
                            data={performanceRateDatasets}
                            width={"100%"}
                            className={classes.chartStyle}
                            options={radarOptions}
                        />
                    </div>
                </section>
            </div>
        </>
    );
};

export default PlayerRadarChart;