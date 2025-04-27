import React from 'react';
import classes from './result.module.css';
import { matchType } from '../../constants/constants';

interface ResultProps {
    homeTeamScore?: any;
    awayTeamScore?: any;
    isDetails?: any;
    fixture?: any;
    time?: any;
    abandonment?: boolean;
}

const Result: React.FC<ResultProps> = ({ homeTeamScore, awayTeamScore, isDetails, fixture, time, abandonment }) => {
    const result = fixture !== matchType.upcoming ? homeTeamScore + ' - ' + awayTeamScore : time?.split('-')[0];
    return <span className={isDetails ? classes.resultDetails : classes.result}>{abandonment ? 'ABN' : result}</span>;
};

export default Result;
