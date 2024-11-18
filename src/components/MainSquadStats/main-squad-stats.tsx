import React from 'react';
import CardGrid from "../../shared/CardGrid/card-grid";
import TubeGraph from "../../shared/TubeGraph/tube-graph";
import {calculateTeamStats, calculateRateInfo, OYesFCPlayersArray, calculateForeignData} from "../../utils/utils";
import {useSelector} from "react-redux";

const MainSquadStats = () => {

    const { filteredData } = useSelector((state: any) => state.databaseData);
    let foreignDataIndex = calculateForeignData(filteredData)
    let foreignersTotalGoal = 0;
    const mainData = Object.values(filteredData).filter((x, y) => !foreignDataIndex.includes(y))
    const foreignData = Object.values(filteredData).filter((x, y) => foreignDataIndex.includes(y))
    const calculatedMainData = calculateTeamStats(mainData)
    const calculatedForeignData = calculateTeamStats(foreignData)
    Object.values(filteredData).forEach((item: any) => {
        Object.entries(item?.oyesfc?.squad).forEach((x: any) => {
            if (!OYesFCPlayersArray.includes(x[0])) {
                foreignersTotalGoal += x[1].goal
            }
        })
    });
    const foreignersGoalPerMatch = foreignersTotalGoal !== 0 ? (foreignersTotalGoal / calculatedForeignData.matches)?.toFixed(2) : '0';
    const mainWinRateStat = calculatedMainData.win !== 0 ? ((calculatedMainData.win / calculatedMainData.matches) * 100)?.toFixed(0) : '0';
    const foreignWinRateStat = calculatedForeignData.win !== 0 ? ((calculatedForeignData.win / calculatedForeignData.matches) * 100)?.toFixed(0) : '0';


    const readyData = [
        [mainWinRateStat, 'Win Rate (%)', foreignWinRateStat,
            calculateRateInfo(mainWinRateStat, foreignWinRateStat),
            100 - Number(calculateRateInfo(mainWinRateStat, foreignWinRateStat))],

        [calculatedMainData.matches, 'Matches', calculatedForeignData.matches,
            calculateRateInfo(calculatedMainData.matches, calculatedForeignData.matches),
            100 - Number(calculateRateInfo(calculatedMainData.matches, calculatedForeignData.matches))],

        [calculatedMainData.win, 'Wins', calculatedForeignData.win,
            calculateRateInfo(calculatedMainData.win, calculatedForeignData.win),
            100 - Number(calculateRateInfo(calculatedMainData.win, calculatedForeignData.win))],

        [calculatedMainData.draw, 'Draws', calculatedForeignData.draw,
            calculateRateInfo(calculatedMainData.draw, calculatedForeignData.draw),
            100 - Number(calculateRateInfo(calculatedMainData.draw, calculatedForeignData.draw))],

        [calculatedMainData.lose, 'Losses', calculatedForeignData.lose,
            calculateRateInfo(calculatedMainData.lose, calculatedForeignData.lose),
            100 - Number(calculateRateInfo(calculatedMainData.lose, calculatedForeignData.lose))],

        [calculatedMainData.scoredGoal, 'Goals Scored', calculatedForeignData.scoredGoal,
            calculateRateInfo(calculatedMainData.scoredGoal, calculatedForeignData.scoredGoal),
            100 - Number(calculateRateInfo(calculatedMainData.scoredGoal, calculatedForeignData.scoredGoal))],

        [calculatedMainData.concededGoal, 'Goals Conceded', calculatedForeignData.concededGoal,
            calculateRateInfo(calculatedMainData.concededGoal, calculatedForeignData.concededGoal),
            100 - Number(calculateRateInfo(calculatedMainData.concededGoal, calculatedForeignData.concededGoal))],

        [calculatedMainData.goalDifference, 'Goal Difference', calculatedForeignData.goalDifference,
            calculateRateInfo(calculatedMainData.goalDifference, calculatedForeignData.goalDifference),
            100 - Number(calculateRateInfo(calculatedMainData.goalDifference, calculatedForeignData.goalDifference))],

        [calculatedMainData.scoredGoalsPerGame, 'Scored per Match', calculatedForeignData.scoredGoalsPerGame,
            calculateRateInfo(calculatedMainData.scoredGoalsPerGame, calculatedForeignData.scoredGoalsPerGame),
            100 - Number(calculateRateInfo(calculatedMainData.scoredGoalsPerGame, calculatedForeignData.scoredGoalsPerGame))],

        [calculatedMainData.concededGoalsPerGame, 'Conceded per Match', calculatedForeignData.concededGoalsPerGame,
            calculateRateInfo(calculatedMainData.concededGoalsPerGame, calculatedForeignData.concededGoalsPerGame),
            100 - Number(calculateRateInfo(calculatedMainData.concededGoalsPerGame, calculatedForeignData.concededGoalsPerGame))],

        [calculatedMainData.goalDifferencePerGame, 'Goal Difference per Match', calculatedForeignData.goalDifferencePerGame,
            calculateRateInfo(calculatedMainData.goalDifferencePerGame, calculatedForeignData.goalDifferencePerGame),
            100 - Number(calculateRateInfo(calculatedMainData.goalDifferencePerGame, calculatedForeignData.goalDifferencePerGame))],

        ['-', 'Scored by Foreigners', foreignersTotalGoal, 0, 100],

        ['-', 'Scored by Foreigners per Match', foreignersGoalPerMatch, 0, 100],

    ]

    const content = (
        <TubeGraph data={readyData}
                   rightColor={'darkturquoise'}
                   rightName={'Squad Including Foreigners'}
                   leftName={'Main Squad'}
                   leftColor={'orangered'}/>
    )

    return (
        <CardGrid title={'Main Squad'} firstPart={content}/>
    )
};

export default MainSquadStats;
