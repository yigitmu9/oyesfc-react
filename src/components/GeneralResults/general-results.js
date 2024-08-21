import React from 'react';
import classes from "./general-results.module.css";
import CardGrid from "../../shared/CardGrid/card-grid";
import ChartComponent from "../../shared/ChartComponent/chart-component";
import ListComponent from "../../shared/ListComponent/list-component";
import {ChartTypes} from "../../constants/constants";
import {calculateTeamStats} from "../../utils/utils";

const GeneralResults = ({data}) => {

    const calculatedData = calculateTeamStats(data)
    const winRate = Number(((calculatedData?.win / calculatedData?.matches) * 100)?.toFixed(0))
    const drawRate = Number(((calculatedData?.draw / calculatedData?.matches) * 100)?.toFixed(0))
    const loseRate = Number(((calculatedData?.lose / calculatedData?.matches) * 100)?.toFixed(0))
    const dataForList = [
        ['Matches', calculatedData.matches],
        ['Wins', calculatedData.win],
        ['Draws', calculatedData.draw],
        ['Losses', calculatedData.lose],
        ['Goals Scored', calculatedData.scoredGoal],
        ['Goals Conceded', calculatedData.concededGoal],
        ['Goal Difference', calculatedData.goalDifference],
        ['Scored per Match', calculatedData.scoredGoalsPerGame],
        ['Conceded per Match', calculatedData.concededGoalsPerGame],
        ['Goal Difference per Match', calculatedData.goalDifferencePerGame],
    ]

    const content = (
        <div className={classes.cardInsideDiv}>
            <ChartComponent data={[winRate, drawRate, loseRate]}
                            title={'Win Rate'}
                            type={ChartTypes.doughnut}
                            color={['green', 'yellow', 'red']}/>
            <ListComponent data={dataForList}/>
        </div>
    )

    return (
        <CardGrid title={'General'} firstPart={content}/>
    );
};

export default GeneralResults;
