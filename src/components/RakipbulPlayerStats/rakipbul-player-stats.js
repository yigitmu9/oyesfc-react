import React from 'react';
import classes from "./rakipbul-player-stats.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Bar} from "react-chartjs-2";
import {
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {TeamMembers} from "../../constants/constants";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";
import facilitiesIndividualStatsClasses from "../FacilitiesIndividualStats/facilities-individual-stats.module.css";
import facilitiesStatsClasses from "../FacilitiesStats/facilities-stats.module.css";

const RakipbulPlayerStats = ({data}) => {

    const [match, setMatch] = React.useState('Total of All Matches');
    let rakipbulData = Object.values(data).filter(x => x?.oyesfc?.position);

    const handleChange = (event) => {
        setMatch(event.target.value);
    };

    const matchData = match === 'Total of All Matches' ?
        rakipbulData :
        rakipbulData.filter(x => x.rival.name === match)

    const rows = Object.values(TeamMembers).map(x => x.name);
    let playerTotalGoal = 0;
    let playerTotalPosition = 0;
    let playerGoalData = [];
    let playerPositionData = [];
    let goalPositionData = [];

    Object.values(TeamMembers).forEach(member => {
        playerTotalGoal = 0;
        playerTotalPosition = 0;
        Object.values(matchData).forEach(item => {
            if (item?.oyesfc?.squad[member.name] && member.name !== TeamMembers.can.name) {
                playerTotalGoal += item.oyesfc.squad[member.name].goal;
                playerTotalPosition += item.oyesfc.squad[member.name].position;
            }
        });

        const goalPositionRate = ((playerTotalGoal / playerTotalPosition) * 100)?.toFixed(0);

        playerGoalData.push(playerTotalGoal)
        playerPositionData.push(playerTotalPosition)
        goalPositionData.push(goalPositionRate)
    });

    const chartDatasets = {
        labels: Object.values(TeamMembers).map(x => x.name),
        datasets: [
            {
                label: 'Rate of converting positions into goals (%)',
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 2,
                data: goalPositionData,
            }
        ]
    }

    const options = {
        indexAxis: 'x',
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray',
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    color: 'lightgray',
                },
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    color: 'lightgray',
                },
            },
        },
    };

    Chart.register(CategoryScale);
    linear.register(CategoryScale);

    return (
        <div className={classes.grid}>
            <Card sx={{ borderRadius: "25px", width: "100%", height: "auto", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                <h1 className={classes.titleStyle}>Statistics of 10 Specific Rakipbul Matches**</h1>
                <div className={classes.selectionGrid}>
                    <div className={classes.selectionInsideGrid}>
                        <FormControl className={classes.colorStyle} fullWidth>
                            <label className={classes.colorStyle}>
                                Select a Match:
                                <select className={facilitiesStatsClasses.select} onChange={handleChange}>
                                    <option value='Total of All Matches'>Total of All Matches</option>
                                    {rakipbulData.map((x, y) => (
                                        <option key={y} value={x.rival.name}>{x.rival.name}</option>
                                    ))}
                                </select>
                            </label>
                        </FormControl>
                    </div>
                </div>
                <CardContent style={{backgroundColor: "#242424"}}>
                    <div className={classes.cardContentInsideStyle}>
                        <div className={facilitiesIndividualStatsClasses.chartStyle}>
                            <Bar
                                data={chartDatasets}
                                width={"100%"}
                                className={classes.chart}
                                options={options}
                            />
                        </div>
                        <div className={classes.tableStyle}>
                            <TableContainer style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table" style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                    <TableHead style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                        <TableRow style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>Players</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Number of Position</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Goals</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, number) => (
                                            <TableRow
                                                key={row}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}
                                            >
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} component="th" scope="row">
                                                    {row}
                                                </TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerPositionData[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerGoalData[number]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RakipbulPlayerStats;