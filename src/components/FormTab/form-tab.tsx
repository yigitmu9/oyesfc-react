import React, { useCallback, useEffect, useState } from 'react';
import matchDetailsClasses from '../MatchDetails/match-details.module.css';
import { loadWebsite } from '../../firebase';
import {
    calculateOverall,
    calculatePlayerRatings,
    getPlayerStats,
    OYesFCPlayersArray,
    returnAverageData,
    sortData,
} from '../../utils/utils';
import { ChartTypes, TeamMembers } from '../../constants/constants';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import { Alert, Divider } from '@mui/material';
import playerCardsClasses from '../PlayerCards/player-cards.module.css';
import ChartComponent from '../../shared/ChartComponent/chart-component';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import TimelineIcon from '@mui/icons-material/Timeline';

interface FormTabProps {
    matchDetailsData?: any;
    matchIndex?: any;
    squadRatings?: any;
}

const FormTab: React.FC<FormTabProps> = ({ matchDetailsData, matchIndex, squadRatings }) => {
    const { allData, filteredData } = useSelector((state: any) => state.databaseData);
    const isMobile = window.innerWidth <= 768;
    const sortedFilteredData = sortData(filteredData);
    const lastFiveGames: any = Object.keys(matchDetailsData?.oyesfc?.squad)
        .filter((x) => OYesFCPlayersArray?.includes(x))
        ?.map((x) => {
            return Object.values(sortedFilteredData)
                .slice(matchIndex + 1)
                .filter((item: any) => Object.keys(item?.oyesfc?.squad)?.includes(x))
                .slice(0, 5);
        });
    const [calculatedPlayerData, setCalculatedPlayerData] = useState<any>(null);
    const [calculatedPlayerDataForGraph, setCalculatedPlayerDataForGraph] = useState<any>(null);

    const calculateDifference = (number1: number, number2: number) => {
        if (number2 !== 0) {
            const difference = ((number1 - number2) / number2) * 100;
            return difference.toFixed(0);
        }
        return '';
    };

    const getColor = (data: any) => {
        if (Number(data) > 0) return 'darkgreen';
        if (Number(data) === 0) return 'darkgoldenrod';
        return 'darkred';
    };

    const calculateComparisonData = useCallback(
        (generalRatings: any) => {
            let data: any = [];
            Object.keys(matchDetailsData?.oyesfc?.squad)
                .filter((x) => OYesFCPlayersArray?.includes(x))
                ?.forEach((player) => {
                    let playerDataBefore: any = [];
                    let playerDataAfter: any = [];
                    const playerGeneralRatings = Object.entries(
                        generalRatings?.find((x: any) => x?.name === player)?.ratings
                    );
                    playerGeneralRatings?.forEach((a) => {
                        playerDataBefore = [
                            ...playerDataBefore,
                            {
                                label: a[0],
                                value: a[1],
                                color: 'lightgray',
                            },
                        ];
                    });
                    const goalPerGameDifferenceFiveGame = calculateDifference(
                        Number(
                            playerDataBefore?.find((x: any) => x.label === 'Goals per match in last five games')?.value
                        ),
                        Number(
                            playerDataBefore?.find((x: any) => x.label === 'Goals per match across all matches')?.value
                        )
                    );
                    const goalPerGameDifferenceFiveGameObject = {
                        label: 'Percentage difference in goals per game rate in the last 5 games compared to all games',
                        value: goalPerGameDifferenceFiveGame + '%',
                        color: getColor(goalPerGameDifferenceFiveGame),
                    };
                    playerDataBefore.push(goalPerGameDifferenceFiveGameObject);

                    const expectedRatingDifferenceFiveGame = calculateDifference(
                        Number(
                            playerDataBefore?.find((x: any) => x.label === 'Average match rating in last five games')
                                ?.value
                        ),
                        Number(playerDataBefore?.find((x: any) => x.label === 'Expected rating')?.value)
                    );
                    const expectedRatingDifferenceFiveGameObject = {
                        label: 'Difference in last 5 match performance compared to expected',
                        value: expectedRatingDifferenceFiveGame + '%',
                        color: getColor(expectedRatingDifferenceFiveGame),
                    };
                    playerDataBefore.push(expectedRatingDifferenceFiveGameObject);

                    const allRatingDifferenceFiveGame = calculateDifference(
                        Number(
                            playerDataBefore?.find((x: any) => x.label === 'Average match rating in last five games')
                                ?.value
                        ),
                        Number(
                            playerDataBefore?.find((x: any) => x.label === 'Average Match Rating across all matches')
                                ?.value
                        )
                    );
                    const allRatingDifferenceFiveGameObject = {
                        label: 'Difference in last 5 match performance compared to all matches',
                        value: allRatingDifferenceFiveGame + '%',
                        color: getColor(allRatingDifferenceFiveGame),
                    };
                    playerDataBefore.push(allRatingDifferenceFiveGameObject);

                    if (squadRatings) {
                        const goalPerGameDifferenceThisMatchAndAllMatch = calculateDifference(
                            matchDetailsData?.oyesfc?.squad?.[player]?.goal,
                            Number(
                                playerDataBefore?.find((x: any) => x.label === 'Goals per match across all matches')
                                    ?.value
                            )
                        );
                        const goalPerGameDifferenceThisMatchAndAllMatchObject = {
                            label: 'The ratio of the number of goals scored in this match to the average number of goals scored in all matches',
                            value: goalPerGameDifferenceThisMatchAndAllMatch + '%',
                            color: getColor(goalPerGameDifferenceThisMatchAndAllMatch),
                        };
                        playerDataAfter.push(goalPerGameDifferenceThisMatchAndAllMatchObject);

                        const goalPerGameDifferenceThisMatchAndLastFiveMatch = calculateDifference(
                            matchDetailsData?.oyesfc?.squad?.[player]?.goal,
                            Number(
                                playerDataBefore?.find((x: any) => x.label === 'Goals per match in last five games')
                                    ?.value
                            )
                        );
                        const goalPerGameDifferenceThisMatchAndLastFiveMatchObject = {
                            label: 'The ratio of the number of goals scored in this match to the average number of goals scored in last five matches',
                            value: goalPerGameDifferenceThisMatchAndLastFiveMatch + '%',
                            color: getColor(goalPerGameDifferenceThisMatchAndLastFiveMatch),
                        };
                        playerDataAfter.push(goalPerGameDifferenceThisMatchAndLastFiveMatchObject);

                        const ratingDifferenceThisMatchAndLastFiveMatch = calculateDifference(
                            squadRatings?.find((z: any) => z.name === player)?.rating,
                            Number(
                                playerDataBefore?.find(
                                    (x: any) => x.label === 'Average match rating in last five games'
                                )?.value
                            )
                        );
                        const ratingDifferenceThisMatchAndLastFiveObject = {
                            label: 'The ratio of the rating received in this match to the average rating of the last 5 matches',
                            value: ratingDifferenceThisMatchAndLastFiveMatch + '%',
                            color: getColor(ratingDifferenceThisMatchAndLastFiveMatch),
                        };
                        playerDataAfter.push(ratingDifferenceThisMatchAndLastFiveObject);

                        const ratingDifferenceThisMatchAndAllMatch = calculateDifference(
                            squadRatings?.find((z: any) => z.name === player)?.rating,
                            Number(
                                playerDataBefore?.find(
                                    (x: any) => x.label === 'Average Match Rating across all matches'
                                )?.value
                            )
                        );
                        const ratingDifferenceThisMatchAndAllMatchObject = {
                            label: 'The ratio of the rating received in this match to the average rating of the all matches',
                            value: ratingDifferenceThisMatchAndAllMatch + '%',
                            color: getColor(ratingDifferenceThisMatchAndAllMatch),
                        };
                        playerDataAfter.push(ratingDifferenceThisMatchAndAllMatchObject);

                        const ratingDifferenceThisMatchAndExpected = calculateDifference(
                            squadRatings?.find((z: any) => z.name === player)?.rating,
                            Number(playerDataBefore?.find((x: any) => x.label === 'Expected rating')?.value)
                        );
                        const ratingDifferenceThisMatchAndExpectedObject = {
                            label: 'The ratio of the rating received in this match to the expected rating',
                            value: ratingDifferenceThisMatchAndExpected + '%',
                            color: getColor(ratingDifferenceThisMatchAndExpected),
                        };
                        playerDataAfter.push(ratingDifferenceThisMatchAndExpectedObject);
                    }

                    const ready = {
                        name: player,
                        dataBefore: playerDataBefore,
                        dataAfter: playerDataAfter,
                    };
                    data.push(ready);
                });
            setCalculatedPlayerData(data);
        },
        [matchDetailsData?.oyesfc?.squad, squadRatings]
    );

    const getData = useCallback(async () => {
        try {
            const response: any = await loadWebsite(`playerRatings`);
            const ratesResponse: any = await loadWebsite(`rates`);
            if (response && ratesResponse) {
                let data: any = [];
                let dataForGraph: any = [];
                Object.keys(matchDetailsData?.oyesfc?.squad)
                    .filter((x) => OYesFCPlayersArray?.includes(x))
                    ?.forEach((player: any, playerIndex: number) => {
                        const mvpData = calculatePlayerRatings(ratesResponse, allData, filteredData, player);
                        const lastFiveGameMvpData = calculatePlayerRatings(
                            ratesResponse,
                            allData,
                            lastFiveGames?.[playerIndex],
                            player
                        );
                        const notEnoughData = Object.values(response[player])?.length < 4;
                        const points = returnAverageData(response[player], notEnoughData);
                        const playerStats = getPlayerStats(filteredData, player);
                        const lastFiveGamePlayerStats = getPlayerStats(lastFiveGames?.[playerIndex], player);
                        const playerOverall =
                            calculateOverall(
                                Object.values(TeamMembers)
                                    .find((z) => z?.name === player)
                                    ?.fifaRole?.toLowerCase(),
                                points
                            ) || 0;
                        const overallPoints = {
                            'Expected rating': (Number(playerOverall) / 10)?.toFixed(1),
                            'Goals per match across all matches': playerStats?.goalPerGame,
                            'Goals per match in last five games': lastFiveGamePlayerStats?.goalPerGame,
                            'Average Match Rating across all matches': Number(mvpData?.rating)?.toFixed(2),
                            'Average match rating in last five games': Number(lastFiveGameMvpData?.rating)?.toFixed(2),
                        };
                        data = [...data, { name: player, ratings: overallPoints }];
                        let graphData: any[] = [];
                        for (let i = 0; i < lastFiveGames?.[playerIndex].length; i++) {
                            const mvpDataGraph = calculatePlayerRatings(
                                ratesResponse,
                                allData,
                                [lastFiveGames?.[playerIndex][i]],
                                player
                            );
                            graphData.push(mvpDataGraph?.rating);
                        }
                        dataForGraph = [...dataForGraph, { name: player, ratings: graphData }];
                    });
                setCalculatedPlayerDataForGraph(dataForGraph);
                calculateComparisonData(data);
            }
        } catch (error: any) {
            alert(error?.message);
        }
    }, [allData, calculateComparisonData, filteredData, lastFiveGames, matchDetailsData?.oyesfc?.squad]);

    useEffect(() => {
        if (!calculatedPlayerData) {
            getData().then((r) => r);
        }
    });

    const getDataForGraph = (name: any) => {
        const arrayOne = calculatedPlayerDataForGraph?.find((y: any) => y?.name === name)?.ratings;
        return [...arrayOne].reverse();
    };

    return (
        <>
            {lastFiveGames?.[0]?.length > 0 ? (
                Object.keys(matchDetailsData?.oyesfc?.squad)
                    .filter((x) => OYesFCPlayersArray?.includes(x))
                    ?.map((player: any, index: number) => (
                        <div key={index}>
                            <div style={{ height: '20px' }}></div>
                            <section className={matchDetailsClasses.generalTabSection}>
                                <div className={matchDetailsClasses.generalInfoDiv}>
                                    <PersonIcon
                                        fontSize={isMobile ? 'medium' : 'large'}
                                        className={matchDetailsClasses.generalInfoIcon}
                                    ></PersonIcon>
                                    <span className={matchDetailsClasses.generalInfoSpan}>{player}</span>
                                </div>
                                {calculatedPlayerData?.find((x: any) => x?.name === player)?.dataAfter?.length > 0 && (
                                    <Divider
                                        sx={{
                                            bgcolor: 'gray',
                                            margin: '10px',
                                        }}
                                    />
                                )}
                                {calculatedPlayerData?.find((x: any) => x?.name === player)?.dataAfter?.length > 0 && (
                                    <div className={matchDetailsClasses.generalInfoDiv}>
                                        <ArrowCircleRightIcon
                                            fontSize={isMobile ? 'medium' : 'large'}
                                            className={matchDetailsClasses.generalInfoIcon}
                                        ></ArrowCircleRightIcon>
                                        <span className={matchDetailsClasses.generalInfoSpan}>Post Match</span>
                                    </div>
                                )}
                                {calculatedPlayerData?.find((x: any) => x?.name === player)?.dataAfter?.length > 0 &&
                                    calculatedPlayerData
                                        ?.find((x: any) => x?.name === player)
                                        ?.dataAfter?.map((a: any, i: any) => (
                                            <div className={matchDetailsClasses.generalInfoDiv} key={i}>
                                                <span
                                                    className={playerCardsClasses.ratingSpan}
                                                    style={{
                                                        background: a?.color,
                                                        color: a?.color === 'lightgray' ? 'black' : 'lightgray',
                                                        marginRight: '10px',
                                                        minWidth: '60px',
                                                    }}
                                                >
                                                    {a?.value}
                                                </span>
                                                <span className={matchDetailsClasses.generalInfoSpan}>{a?.label}</span>
                                            </div>
                                        ))}
                                <Divider
                                    sx={{
                                        bgcolor: 'gray',
                                        margin: '10px',
                                    }}
                                />
                                {calculatedPlayerData?.find((x: any) => x?.name === player)?.dataBefore && (
                                    <div className={matchDetailsClasses.generalInfoDiv}>
                                        <ArrowCircleLeftIcon
                                            fontSize={isMobile ? 'medium' : 'large'}
                                            className={matchDetailsClasses.generalInfoIcon}
                                        ></ArrowCircleLeftIcon>
                                        <span className={matchDetailsClasses.generalInfoSpan}>Pre Match</span>
                                    </div>
                                )}
                                {calculatedPlayerData?.find((x: any) => x?.name === player)?.dataBefore &&
                                    calculatedPlayerData
                                        ?.find((x: any) => x?.name === player)
                                        ?.dataBefore?.map((a: any, i: any) => (
                                            <div className={matchDetailsClasses.generalInfoDiv} key={i}>
                                                <span
                                                    className={playerCardsClasses.ratingSpan}
                                                    style={{
                                                        background: a?.color,
                                                        color: a?.color === 'lightgray' ? 'black' : 'lightgray',
                                                        marginRight: '10px',
                                                        minWidth: '60px',
                                                    }}
                                                >
                                                    {a?.value}
                                                </span>
                                                <span className={matchDetailsClasses.generalInfoSpan}>{a?.label}</span>
                                            </div>
                                        ))}
                                {calculatedPlayerDataForGraph && (
                                    <>
                                        <Divider
                                            sx={{
                                                bgcolor: 'gray',
                                                margin: '10px',
                                            }}
                                        />
                                        <div className={matchDetailsClasses.generalInfoDiv}>
                                            <TimelineIcon
                                                fontSize={isMobile ? 'medium' : 'large'}
                                                className={matchDetailsClasses.generalInfoIcon}
                                            ></TimelineIcon>
                                            <span className={matchDetailsClasses.generalInfoSpan}>
                                                Ratings in Last 5 Matches
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                height: '20px',
                                            }}
                                        ></div>
                                        <ChartComponent
                                            type={ChartTypes.customLine}
                                            color={'rgb(153, 102, 255)'}
                                            data={getDataForGraph(player)}
                                            customStyle={{
                                                width: '100%',
                                                height: '330px',
                                                padding: '10px',
                                            }}
                                            graphLabels={['1', '2', '3', '4', 'Last']}
                                            layout={'x'}
                                            title={'Ratings in Last 5 Matches'}
                                            maxValueBarGraph={10}
                                        />
                                    </>
                                )}
                            </section>
                        </div>
                    ))
            ) : (
                <Alert
                    sx={{
                        padding: 1,
                        marginTop: '20px',
                        borderRadius: '15px',
                        bgcolor: '#1C1C1E',
                        color: 'lightgray',
                    }}
                    variant="outlined"
                    severity="warning"
                >
                    Not enough matches!
                </Alert>
            )}
        </>
    );
};

export default FormTab;
