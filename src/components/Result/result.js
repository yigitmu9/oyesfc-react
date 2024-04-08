import React from 'react';
import classes from "./result.module.css";

const Result = ({ homeTeamScore, awayTeamScore, bgColor, isDetails, fixture, time }) => {
    const result = fixture !== 'upcoming' ? (homeTeamScore + ' - ' + awayTeamScore) : time?.split('-')[0];
    return (
        <span className={isDetails ? classes.resultDetails: classes.result} style={{background: bgColor}}>{result}</span>
    );
};

export default Result;