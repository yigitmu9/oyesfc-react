import React, { useEffect, useState } from 'react';
import classes from './weather-team-stats.module.css';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CardGrid from '../../shared/CardGrid/card-grid';
import MainTitle from '../../shared/MainTitle/main-title';
import ListComponent from '../../shared/ListComponent/list-component';
import { calculateRate, calculateTeamStats } from '../../utils/utils';
import { useSelector } from 'react-redux';

const WeatherTeamStats = () => {
    const { filteredData } = useSelector((state: any) => state.databaseData);
    const [fullDataState, setFullDataState] = useState<any>(null);

    useEffect(() => {
        if (filteredData) {
            const hotWeatherData = Object.values(filteredData).filter((item: any) => item?.weather?.temperature > 15);
            const coldWeatherData = Object.values(filteredData).filter((item: any) => item?.weather?.temperature < 16);
            const calculatedHotWeatherData = calculateTeamStats(hotWeatherData);
            const calculatedColdWeatherData = calculateTeamStats(coldWeatherData);

            const dataForHotWeather = [
                ['Matches', calculatedHotWeatherData.matches],
                [
                    'Wins (Rate)',
                    calculatedHotWeatherData.win +
                    ' (' +
                    calculateRate(calculatedHotWeatherData.win, calculatedHotWeatherData.matches) +
                    '%)',
                ],
                [
                    'Draws (Rate)',
                    calculatedHotWeatherData.draw +
                    ' (' +
                    calculateRate(calculatedHotWeatherData.draw, calculatedHotWeatherData.matches) +
                    '%)',
                ],
                [
                    'Losses (Rate)',
                    calculatedHotWeatherData.lose +
                    ' (' +
                    calculateRate(calculatedHotWeatherData.lose, calculatedHotWeatherData.matches) +
                    '%)',
                ],
                [
                    'Goals Scored (per Match)',
                    calculatedHotWeatherData.scoredGoal + ' (' + calculatedHotWeatherData.scoredGoalsPerGame + ')',
                ],
                [
                    'Goals Conceded (per Match)',
                    calculatedHotWeatherData.concededGoal + ' (' + calculatedHotWeatherData.concededGoalsPerGame + ')',
                ],
                [
                    'Goal Difference (per Match)',
                    calculatedHotWeatherData.goalDifference + ' (' + calculatedHotWeatherData.goalDifferencePerGame + ')',
                ],
            ];

            const dataForColdWeather = [
                ['Matches', calculatedColdWeatherData.matches],
                [
                    'Wins (Rate)',
                    calculatedColdWeatherData.win +
                    ' (' +
                    calculateRate(calculatedColdWeatherData.win, calculatedColdWeatherData.matches) +
                    '%)',
                ],
                [
                    'Draws (Rate)',
                    calculatedColdWeatherData.draw +
                    ' (' +
                    calculateRate(calculatedColdWeatherData.draw, calculatedColdWeatherData.matches) +
                    '%)',
                ],
                [
                    'Losses (Rate)',
                    calculatedColdWeatherData.lose +
                    ' (' +
                    calculateRate(calculatedColdWeatherData.lose, calculatedColdWeatherData.matches) +
                    '%)',
                ],
                [
                    'Goals Scored (per Match)',
                    calculatedColdWeatherData.scoredGoal + ' (' + calculatedColdWeatherData.scoredGoalsPerGame + ')',
                ],
                [
                    'Goals Conceded (per Match)',
                    calculatedColdWeatherData.concededGoal + ' (' + calculatedColdWeatherData.concededGoalsPerGame + ')',
                ],
                [
                    'Goal Difference (per Match)',
                    calculatedColdWeatherData.goalDifference + ' (' + calculatedColdWeatherData.goalDifferencePerGame + ')',
                ],
            ];
            const finalData = {
                dataForColdWeather: dataForColdWeather,
                dataForHotWeather: dataForHotWeather
            }
            setFullDataState(finalData)
        }
    }, [filteredData]);


    const firstCard = (
        <>
            <MainTitle title={'Hot Weather'} size={'mid'} />
            <div className={classes.cardAlign}>
                <div className={classes.iconDivStyle}>
                    <LocalFireDepartmentIcon
                        sx={{ width: '200px', height: '200px' }}
                        className={classes.iconStyle}
                    ></LocalFireDepartmentIcon>
                </div>
                <ListComponent data={fullDataState?.dataForHotWeather} />
            </div>
        </>
    );

    const secondCard = (
        <>
            <MainTitle title={'Cold Weather'} size={'mid'} />
            <div className={classes.cardAlign}>
                <div className={classes.iconDivStyle}>
                    <AcUnitIcon sx={{ width: '200px', height: '200px' }} className={classes.iconStyle}></AcUnitIcon>
                </div>
                <ListComponent data={fullDataState?.dataForColdWeather} />
            </div>
        </>
    );

    return (
        <>
            <CardGrid
                smallCards={true}
                firstPart={firstCard}
                content={secondCard}
                customStyle={{
                    justifyContent: 'center',
                    display: 'block',
                    textAlign: 'center',
                    height: 'auto',
                }}
            />
        </>
    );
};

export default WeatherTeamStats;
