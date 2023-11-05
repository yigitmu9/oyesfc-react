import React from 'react';
import classes from "./rakipbul-individual-stats.module.css";
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
import {DetailedRakipbulMatches, StadiumNames, TeamMembers} from "../../constants/constants";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";

const RakipbulIndividualStats = () => {

    const [match, setMatch] = React.useState('Total of All Matches');

    const handleChange = (event) => {
        setMatch(event.target.value);
    };

    const data = match === 'Total of All Matches' ?
        Object.values(DetailedRakipbulMatches) :
        Object.values(DetailedRakipbulMatches).filter(x => x.rival.name === match)

    const rows = Object.values(TeamMembers).map(x => x.name);
    let playerTotalGoal = 0;
    let playerTotalPosition = 0;
    let playerGoalData = [];
    let playerPositionData = [];
    let goalPositionData = [];

    Object.values(TeamMembers).forEach(member => {
        playerTotalGoal = 0;
        playerTotalPosition = 0;
        Object.values(data).forEach(item => {
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
                    fontSize: 10,
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
                    fontSize: 10
                },
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    color: 'lightgray',
                    fontSize: 10
                },
            },
        },
    };

    Chart.register(CategoryScale);
    linear.register(CategoryScale);

    return (
        <div className={classes.grid}>
            <Card sx={{ borderRadius: "25px", width: "100%", height: "600px", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                <h1 style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", marginTop: "20px"}}>Statistics of 10 Specific Rakipbul Matches</h1>
                <div style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", textAlign: "center", marginTop: "30px", marginBottom: "30px"}}>
                    <div style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", width: "500px", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", textAlign: "center"}}>
                        <FormControl style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} fullWidth>
                            <label style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                Select a Match:
                                <select className={classes.select} onChange={handleChange}>
                                    <option value='Total of All Matches'>Total of All Matches</option>
                                    {Object.values(DetailedRakipbulMatches).map(x => (
                                        <option value={x.rival.name}>{x.rival.name}</option>
                                    ))}
                                </select>
                            </label>
                        </FormControl>
                    </div>
                </div>
                <CardContent style={{backgroundColor: "#242424"}}>
                    <div style={{display: "flex", backgroundColor: "#242424"}}>
                        <div style={{display: "block", width: "60%", marginRight:"30px", height: "350px", backgroundColor: "#242424"}}>
                            <Bar
                                data={chartDatasets}
                                width={"100%"}
                                className={classes.chart}
                                options={options}
                            />
                        </div>
                        <div style={{display: "flex", width: "40%", height: "330px", backgroundColor: "#242424", textAlign: "center", justifyContent: "center", marginRight: "30px"}}>
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
                <span style={{backgroundColor: "rgb(36, 36, 36)", color: "gray", textAlign: "center", marginTop: "20px", marginLeft: "20px", fontSize: "15px"}}>
                    *Note: These statistic tables are only valid for 10 specific Rakipbul matches for which position data is available.
                    The data is static and cannot work with filters.
                </span>
            </Card>
        </div>
    );
};

export default RakipbulIndividualStats;