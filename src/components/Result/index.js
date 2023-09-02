import React from 'react';
import classes from "./result.module.css";

const Result = ({ homeTeamScore, awayTeamScore, bgColor, fontSize }) => {
    return (
        <span className={classes.result} style={{background: bgColor, fontSize: fontSize}}>{homeTeamScore} - {awayTeamScore}</span>
    );
};

export default Result;