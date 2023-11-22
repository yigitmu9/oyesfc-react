import React from 'react';
import classes from "./weather-individual-stats.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {TeamMembers} from "../../constants/constants";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const WeatherIndividualStats = ({data}) => {

    const hotWeatherData = Object.values(data).filter(item => {
        const parts = item.day.split('-');
        const month = parseInt(parts[1], 10);
        return month === 4 || month === 5 || month === 6 || month === 7 || month === 8 || month === 9;
    });
    const coldWeatherData = Object.values(data).filter(item => {
        const parts = item.day.split('-');
        const month = parseInt(parts[1], 10);
        return month === 1 || month === 2 || month === 3 || month === 10 || month === 11 || month === 12;
    });

    const rows = Object.values(TeamMembers).map(x => x.name);
    let playerTotalGoal = 0;
    let playerGoalData = [];
    let playerAttendanceData = [];
    let playerGoalPerGameData = [];
    let playerMatchData = [];

    const numberOfMatches = Object.values(hotWeatherData).length;

    Object.values(TeamMembers).forEach(member => {
        playerTotalGoal = 0;
        Object.values(hotWeatherData).forEach(item => {
            if (item?.oyesfc?.squad[member.name] && member.name !== TeamMembers.can.name) {
                playerTotalGoal += item.oyesfc.squad[member.name].goal;
            }
        });

        const playerTotalMatch = Object.values(hotWeatherData).filter(item =>
            Object.keys(item.oyesfc.squad).includes(member.name)).length;

        const attendenceRate = ((playerTotalMatch / numberOfMatches) * 100)?.toFixed(0);
        const goalsPerGame = (playerTotalGoal / playerTotalMatch)?.toFixed(2)

        playerGoalData.push(playerTotalGoal)
        playerAttendanceData.push(attendenceRate)
        playerMatchData.push(playerTotalMatch)
        playerGoalPerGameData.push(goalsPerGame)
    });

    let playerTotalGoalCold = 0;
    let playerGoalDataCold = [];
    let playerAttendanceDataCold = [];
    let playerGoalPerGameDataCold = [];
    let playerMatchDataCold = [];

    const numberOfMatchesCold = Object.values(coldWeatherData).length;

    Object.values(TeamMembers).forEach(member => {
        playerTotalGoalCold = 0;
        Object.values(coldWeatherData).forEach(item => {
            if (item?.oyesfc?.squad[member.name] && member.name !== TeamMembers.can.name) {
                playerTotalGoalCold += item.oyesfc.squad[member.name].goal;
            }
        });

        const playerTotalMatchCold = Object.values(coldWeatherData).filter(item =>
            Object.keys(item.oyesfc.squad).includes(member.name)).length;

        const attendenceRateCold = ((playerTotalMatchCold / numberOfMatchesCold) * 100)?.toFixed(0);
        const goalsPerGameCold = (playerTotalGoalCold / playerTotalMatchCold)?.toFixed(2)

        playerGoalDataCold.push(playerTotalGoalCold)
        playerAttendanceDataCold.push(attendenceRateCold)
        playerMatchDataCold.push(playerTotalMatchCold)
        playerGoalPerGameDataCold.push(goalsPerGameCold)
    });

    return (
        <div className={classes.grid}>
            <div className={classes.cardGrid}>
                <Card sx={{ borderRadius: "25px", width: "100%", height: "100%", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                    <h1 className={classes.titleStyle}>Cold Weather Statistics</h1>
                    <CardContent style={{backgroundColor: "#242424"}}>
                        <div className={classes.cardAlign}>
                            <div className={classes.iconDivStyle}>
                                <AcUnitIcon sx={{width: "200px", height: "200px"}}
                                            className={classes.iconStyle}></AcUnitIcon>
                            </div>
                            <div className={classes.tableStyle}>
                                <TableContainer style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table" style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                        <TableHead style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                            <TableRow style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>Players</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Matches</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Goals</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Rate of Attendance</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Goals per Game</TableCell>
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
                                                    <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerMatchDataCold[number]}</TableCell>
                                                    <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerGoalDataCold[number]}</TableCell>
                                                    <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerAttendanceDataCold[number]}%</TableCell>
                                                    <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerGoalPerGameDataCold[number]}</TableCell>
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
            <div className={classes.cardGrid}>
                <Card sx={{ borderRadius: "25px", width: "100%", height: "100%", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                    <h1 className={classes.titleStyle}>Hot Weather Statistics</h1>
                    <CardContent style={{backgroundColor: "#242424"}}>
                        <div className={classes.cardAlign}>
                            <div className={classes.iconDivStyle}>
                                <LocalFireDepartmentIcon sx={{width: "200px", height: "200px"}}
                                    className={classes.iconStyle}></LocalFireDepartmentIcon>
                            </div>
                            <div className={classes.tableStyle}>
                                <TableContainer style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table" style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                        <TableHead style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                            <TableRow style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>Players</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Matches</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Goals</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Rate of Attendance</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Goals per Game</TableCell>
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
                                                    <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerMatchData[number]}</TableCell>
                                                    <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerGoalData[number]}</TableCell>
                                                    <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerAttendanceData[number]}%</TableCell>
                                                    <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerGoalPerGameData[number]}</TableCell>
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
        </div>
    );
};

export default WeatherIndividualStats;