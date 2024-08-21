import React from 'react';
import {ChartTypes} from "../../constants/constants";
import MainTitle from "../../shared/MainTitle/main-title";
import ChartComponent from "../../shared/ChartComponent/chart-component";
import {calculateIndividualStats, calculateTeamStats, OYesFCPlayersArray} from "../../utils/utils";
import CardGrid from "../../shared/CardGrid/card-grid";


const ChartsGrid = ({data}) => {

    const isMobile = window.innerWidth <= 768;
    const calculatedData = calculateIndividualStats(data)
    const goalPerGameData = calculatedData?.map(x => x[4])
    const attendanceData = calculatedData?.map(x => x[3])
    const totalTeamGoal = calculateTeamStats(data)?.scoredGoal
    const goalPercent = calculatedData?.map(x => ((x[2] / totalTeamGoal) * 100)?.toFixed(0))
    const rakipbulGames = data && data !== {} ? Object.values(data)?.filter(x => x.rakipbul === true) : []
    const normalGames = data && data !== {} ? Object.values(data)?.filter(x => x.rakipbul === false) : []
    const calculatedRakipbulData = calculateIndividualStats(rakipbulGames)
    const calculatedNormalData = calculateIndividualStats(normalGames)
    const performance = calculatedRakipbulData?.map((x, y) => (((calculatedNormalData[y][4] - x[4]) / x[4]) * 100)?.toFixed(0))

    const firstCard = (
        <>
            <MainTitle title={'Goals per Game'} size={'mid'}/>
            <ChartComponent
                type={ChartTypes.bar}
                color={'rgb(153, 102, 255)'}
                data={goalPerGameData}
                customStyle={{height: '330px'}}
                graphLabels={OYesFCPlayersArray}
                layout={'x'}
                title={'Goals per Game'}/>
        </>
    )

    const secondCard = (
        <>
            <MainTitle title={'Rate of Attendance'} size={'mid'}/>
            <ChartComponent
                type={ChartTypes.customLine}
                color={'rgb(255, 205, 86)'}
                data={attendanceData}
                customStyle={{height: '330px'}}
                graphLabels={OYesFCPlayersArray}
                title={''}/>
        </>
    )

    const thirdCard = (
        <>
            <MainTitle title={'Goal Percentage Compared to Total O Yes FC Goal'} size={'mid'}/>
            <ChartComponent
                type={ChartTypes.pie}
                data={goalPercent}
                color={[
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 0, 0)',
                    'rgb(0, 255, 0)',
                    'rgb(0, 0, 255)',
                    'rgb(255, 255, 0)',
                    'rgb(255, 0, 255)',
                ]}
                customStyle={{height: '330px'}}
                graphLabels={OYesFCPlayersArray}
                title={''}/>
        </>
    )

    const fourthCard = (
        <>
            <MainTitle title={'Regular Matches Compared to the Rakipbul Performance Increase Percentage'} size={'mid'}/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ChartComponent
                    type={ChartTypes.radar}
                    color={'rgb(54, 162, 235, 0.5)'}
                    data={performance}
                    customStyle={{height: isMobile ? '330px' : '450px', justifyContent: 'center', width: isMobile ? '330px' : '450px',
                        display: 'flex', marginTop: '-50px', marginBottom: '-50px'}}
                    graphLabels={OYesFCPlayersArray}
                    title={''}/>
            </div>

        </>
    )

    return (
        <>
            <CardGrid smallCards={true}
                      firstPart={firstCard}
                      content={secondCard}
                      customStyle={{justifyContent: 'center', display: 'block', textAlign: 'center', height: 'auto'}}/>
            <CardGrid smallCards={true}
                      firstPart={thirdCard}
                      content={fourthCard}
                      customStyle={{justifyContent: 'center', display: 'block', textAlign: 'center', height: 'auto'}}/>
        </>
    );
};

export default ChartsGrid;
