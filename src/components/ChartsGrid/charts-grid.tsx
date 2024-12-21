import React from 'react';
import {ChartTypes} from "../../constants/constants";
import MainTitle from "../../shared/MainTitle/main-title";
import ChartComponent from "../../shared/ChartComponent/chart-component";
import {calculateIndividualStats, calculateTeamStats, OYesFCPlayersArray} from "../../utils/utils";
import CardGrid from "../../shared/CardGrid/card-grid";
import {useSelector} from "react-redux";


const ChartsGrid = () => {

    const { filteredData } = useSelector((state: any) => state.databaseData);
    const isMobile = window.innerWidth <= 768;
    const calculatedData = calculateIndividualStats(filteredData)
    const goalPerGameData = calculatedData?.map(x => x[4])
    const attendanceData = calculatedData?.map(x => x[3])
    const totalTeamGoal = calculateTeamStats(filteredData)?.scoredGoal
    const goalPercent = calculatedData?.map(x => ((x[2] / totalTeamGoal) * 100)?.toFixed(0))
    const rakipbulGames = filteredData ? Object.values(filteredData)?.filter((x: any) => x.rakipbul === true) : []
    const normalGames = filteredData ? Object.values(filteredData)?.filter((x: any) => x.rakipbul === false) : []
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
                type={ChartTypes.bar}
                color={'rgb(255, 205, 86)'}
                data={attendanceData}
                customStyle={{height: '330px'}}
                graphLabels={OYesFCPlayersArray}
                title={'Rate of Attendance'}/>
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
                    type={ChartTypes.bar}
                    color={'rgb(54, 162, 235, 0.5)'}
                    data={performance}
                    customStyle={{height: '330px'}}
                    graphLabels={OYesFCPlayersArray}
                    title={'Performance Increase'}/>
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
