import React from 'react';
import classes from "./weather-team-stats.module.css";
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

    const numberOfColdMatches = Object.values(coldWeatherData)?.length;
    const numberOfHotMatches = Object.values(hotWeatherData)?.length;
    const wonColdMatches = Object.values(coldWeatherData)?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const wonHotMatches = Object.values(hotWeatherData)?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const lostColdMatches = Object.values(coldWeatherData)?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const lostHotMatches = Object.values(hotWeatherData)?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const drawColdMatches = Object.values(coldWeatherData)?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    const drawHotMatches = Object.values(hotWeatherData)?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;

    return (
        <div className={classes.grid}>
            <div className={classes.cardGrid}>
                <Card sx={{ borderRadius: "25px", width: "100%", height: "100%", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                    <h1 className={classes.titleStyle}>Win Rate in Cold Weather</h1>
                    <CardContent style={{backgroundColor: "#242424"}}>
                        <div className={classes.cardAlign}>
                            <div className={classes.iconDivStyle}>
                                <AcUnitIcon sx={{width: "200px", height: "200px"}}
                                              className={classes.iconStyle}></AcUnitIcon>
                            </div>
                            <div className={classes.percentageDiv}>
                                <p className={classes.percentageGreen}>W: {((wonColdMatches / numberOfColdMatches) * 100)?.toFixed(0)}%</p>
                                <p className={classes.percentageYellow}>D: {((drawColdMatches / numberOfColdMatches) * 100)?.toFixed(0)}%</p>
                                <p className={classes.percentageRed}>L: {((lostColdMatches / numberOfColdMatches) * 100)?.toFixed(0)}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className={classes.cardGrid}>
                <Card sx={{ borderRadius: "25px", width: "100%", height: "100%", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                    <h1 className={classes.titleStyle}>Win Rate in Hot Weather</h1>
                    <CardContent style={{backgroundColor: "#242424"}}>
                        <div className={classes.cardAlign}>
                            <div className={classes.iconDivStyle}>
                                <LocalFireDepartmentIcon sx={{width: "200px", height: "200px"}}
                                                           className={classes.iconStyle}></LocalFireDepartmentIcon>
                            </div>
                            <div className={classes.percentageDiv}>
                                <p className={classes.percentageGreen}>W: {((wonHotMatches / numberOfHotMatches) * 100)?.toFixed(0)}%</p>
                                <p className={classes.percentageYellow}>D: {((drawHotMatches / numberOfHotMatches) * 100)?.toFixed(0)}%</p>
                                <p className={classes.percentageRed}>L: {((lostHotMatches / numberOfHotMatches) * 100)?.toFixed(0)}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WeatherIndividualStats;