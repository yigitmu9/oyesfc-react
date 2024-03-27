import React from 'react';
import classes from "./result.module.css";

const Result = ({ homeTeamScore, awayTeamScore, bgColor, isDetails }) => {
    return (
        <span className={isDetails ? classes.resultDetails: classes.result} style={{background: bgColor}}>{homeTeamScore} - {awayTeamScore}</span>
    );
};

export default Result;