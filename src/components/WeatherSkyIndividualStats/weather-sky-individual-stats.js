import React from 'react';
import classes from "./weather-sky-individual-stats.module.css";
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
import {TeamMembers, WeatherSky} from "../../constants/constants";
import weatherTeamClasses from "../WeatherTeamStats/weather-team-stats.module.css"
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const WeatherSkyIndividualStats = ({data, selectedSky}) => {

    const secondWeather = Object.values(data).filter(item => item?.weather?.sky === selectedSky[1]);
    const firstWeather = Object.values(data).filter(item => item?.weather?.sky === selectedSky[0]);
    const rows = Object.values(TeamMembers).map(x => x.name);
    let playerTotalGoal = 0;
    let playerGoalData = [];
    let playerAttendanceData = [];
    let playerGoalPerGameData = [];
    let playerMatchData = [];

    const numberOfMatches = Object.values(secondWeather).length;

    Object.values(TeamMembers).forEach(member => {
        playerTotalGoal = 0;
        Object.values(secondWeather).forEach(item => {
            if (item?.oyesfc?.squad[member.name] && member.name !== TeamMembers.can.name) {
                playerTotalGoal += item.oyesfc.squad[member.name].goal;
            }
        });

        const playerTotalMatch = Object.values(secondWeather).filter(item =>
            Object.keys(item.oyesfc.squad).includes(member.name)).length;

        const attendanceRate = ((playerTotalMatch / numberOfMatches) * 100)?.toFixed(0);
        const goalsPerGame = (playerTotalGoal / playerTotalMatch)?.toFixed(2)

        playerGoalData.push(playerTotalGoal)
        playerAttendanceData.push(attendanceRate)
        playerMatchData.push(playerTotalMatch)
        playerGoalPerGameData.push(goalsPerGame)
    });

    let playerTotalGoalCold = 0;
    let playerGoalDataCold = [];
    let playerAttendanceDataCold = [];
    let playerGoalPerGameDataCold = [];
    let playerMatchDataCold = [];

    const numberOfMatchesCold = Object.values(firstWeather).length;

    Object.values(TeamMembers).forEach(member => {
        playerTotalGoalCold = 0;
        Object.values(firstWeather).forEach(item => {
            if (item?.oyesfc?.squad[member.name] && member.name !== TeamMembers.can.name) {
                playerTotalGoalCold += item.oyesfc.squad[member.name].goal;
            }
        });

        const playerTotalMatchCold = Object.values(firstWeather).filter(item =>
            Object.keys(item.oyesfc.squad).includes(member.name)).length;

        const attendanceRateCold = ((playerTotalMatchCold / numberOfMatchesCold) * 100)?.toFixed(0);
        const goalsPerGameCold = (playerTotalGoalCold / playerTotalMatchCold)?.toFixed(2)

        playerGoalDataCold.push(playerTotalGoalCold)
        playerAttendanceDataCold.push(attendanceRateCold)
        playerMatchDataCold.push(playerTotalMatchCold)
        playerGoalPerGameDataCold.push(goalsPerGameCold)
    });

    const firstIcon = selectedSky[0] === WeatherSky[1] ?
        (
            <div className={classes.iconDivStyle}>
                <WbSunnyIcon sx={{width: "200px", height: "200px"}} className={weatherTeamClasses.iconStyle}>
                </WbSunnyIcon>
            </div>
        )
        :
        (
            <div className={classes.iconDivStyle}>
                <ThunderstormIcon sx={{width: "200px", height: "200px"}} className={weatherTeamClasses.iconStyle}>
                </ThunderstormIcon>
            </div>
        )

    const secondIcon = selectedSky[1] === WeatherSky[0] ?
        (
            <div className={classes.iconDivStyle}>
                <NightlightRoundIcon sx={{width: "200px", height: "200px"}} className={weatherTeamClasses.iconStyle}>
                </NightlightRoundIcon>
            </div>
        )
        :
        (
            <div className={classes.iconDivStyle}>
                <AcUnitIcon sx={{width: "200px", height: "200px"}} className={weatherTeamClasses.iconStyle}>
                </AcUnitIcon>
            </div>
        )

    return (
        <div className={classes.grid}>
            <div className={classes.cardGrid}>
                <Card sx={{borderRadius: "25px", width: "100%", height: "100%", backgroundColor: "#242424"}}
                      style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                    <h1 className={classes.titleStyle}>{selectedSky[0]}</h1>
                    <CardContent style={{backgroundColor: "#242424"}}>
                        <div className={classes.cardAlign}>
                            {firstIcon}
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
                    <h1 className={classes.titleStyle}>{selectedSky[1]}</h1>
                    <CardContent style={{backgroundColor: "#242424"}}>
                        <div className={classes.cardAlign}>
                            {secondIcon}
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

export default WeatherSkyIndividualStats;