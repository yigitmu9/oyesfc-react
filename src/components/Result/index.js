import React from 'react';
import classes from "./result.module.css";

const Result = ({ homeTeamScore, awayTeamScore, bgColor }) => {
    return (
        <span className={classes.result} style={{background: bgColor}}>{homeTeamScore} - {awayTeamScore}</span>
    );
};

export default Result;