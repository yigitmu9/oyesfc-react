import React, { useEffect, useState } from 'react';
import classes from './general-results.module.css';
import CardGrid from '../../shared/CardGrid/card-grid';
import ChartComponent from '../../shared/ChartComponent/chart-component';
import ListComponent from '../../shared/ListComponent/list-component';
import { ChartTypes } from '../../constants/constants';
import { calculateTeamStats } from '../../utils/utils';
import { useSelector } from 'react-redux';

const GeneralResults = () => {
    const { filteredData } = useSelector((state: any) => state.databaseData);
    const [generalData, setGeneralData] = useState<any>(null);

    useEffect(() => {
        if (filteredData) {
            const calculatedData = calculateTeamStats(filteredData);
            const winRate = Number(((calculatedData?.win / calculatedData?.matches) * 100)?.toFixed(0));
            const drawRate = Number(((calculatedData?.draw / calculatedData?.matches) * 100)?.toFixed(0));
            const loseRate = Number(((calculatedData?.lose / calculatedData?.matches) * 100)?.toFixed(0));
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
            ];
            const finalData = {
                winRate: winRate,
                drawRate: drawRate,
                loseRate: loseRate,
                dataForList: dataForList
            }
            setGeneralData(finalData)
        }
    }, [filteredData]);


    const content = (
        <div className={classes.cardInsideDiv}>
            <ChartComponent
                data={[generalData?.winRate, generalData?.drawRate, generalData?.loseRate]}
                title={'Win Rate'}
                type={ChartTypes.doughnut}
                color={['green', 'yellow', 'red']}
            />
            <ListComponent data={generalData?.dataForList} loadingLineNumber={10}/>
        </div>
    );

    return <CardGrid title={'General'} firstPart={content} />;
};

export default GeneralResults;
