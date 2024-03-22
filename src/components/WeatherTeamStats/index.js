import React from 'react';
import classes from "./weather-team-stats.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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