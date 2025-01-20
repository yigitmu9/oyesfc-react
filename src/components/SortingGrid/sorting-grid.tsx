import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './sorting-grid.module.css';
import {
    calculateOverall,
    calculatePlayerRatings,
    getPlayerStats,
    OYesFCPlayersArray,
    returnAverageData,
} from '../../utils/utils';
import SelectionComponent from '../../shared/SelectionComponent/selection-component';
import { loadWebsite } from '../../firebase';
import BackButton from '../../shared/BackButton/back-button';
import Box from '@mui/material/Box';
import sharedClasses from '../../shared/Styles/shared-styles.module.css';
import matchDetailsClasses from '../MatchDetails/match-details.module.css';
import playerCardsClasses from '../PlayerCards/player-cards.module.css';
import { Alert } from '@mui/material';
import { FifaCalculations, TeamMembers } from '../../constants/constants';
import { useSelector } from 'react-redux';

interface SortingGridProps {
    category?: string;
    handlePreviousPage?: any;
}

const SortingGrid: React.FC<SortingGridProps> = ({ category, handlePreviousPage }) => {
    const { allData, filteredData } = useSelector((state: any) => state.databaseData);
    const statTypes = useMemo(() => ['Facilities', 'Players'], []);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const facilitiesCategories = useMemo(
        () => ['Overall', 'Ground', 'Locker Room', 'Location', 'Goal Size', 'Field Size', 'Cafe'],
        []
    );
    const fifaCategories = useMemo(() => FifaCalculations.map((x) => x.name).sort(), []);
    const playerCategories = useMemo(
        () => [
            'Matches',
            'Goals',
            'Goals per Game',
            'Attendance Rate',
            'MOTM Awards',
            'Average Match Rating',
            'Overall',
            ...fifaCategories,
        ],
        [fifaCategories]
    );
    const [warnings, setWarnings] = useState<any>(null);
    const [calculatedFacilityData, setCalculatedFacilityData] = useState<any>(null);
    const [calculatedPlayerData, setCalculatedPlayerData] = useState<any>(null);

    const updateOptions = useCallback(
        (type: string) => {
            let optionsArray: any = [];
            if (type === statTypes[0]) {
                optionsArray = facilitiesCategories;
            } else if (type === statTypes[1]) {
                optionsArray = playerCategories;
            }
            setOptions(optionsArray);
            setSelectedOption('');
        },
        [facilitiesCategories, playerCategories, statTypes]
    );

    const handleChange = (data?: any) => {
        setSelectedOption(data);
    };

    const fetchFacilityRatingData = useCallback(async () => {
        try {
            const response: any = await loadWebsite(`facilityRatings`);
            if (response) {
                let data: any = [];
                Object.entries(response)?.forEach((x: any) => {
                    const points = returnAverageData(x[1]);
                    const values = Object.values(points)?.map(Number);
                    const average = (values.reduce((sum: any, val: any) => sum + val, 0) / values.length)?.toFixed(2);
                    const overallPoints = { ...points, Overall: average };
                    data = [...data, { name: x[0], ratings: overallPoints }];
                });
                setCalculatedFacilityData(data);
            }
        } catch (error: any) {
            showWarning(error?.message, 'error');
        }
    }, []);

    const fetchPlayerRatingData = useCallback(async () => {
        try {
            const response: any = await loadWebsite(`playerRatings`);
            const ratesResponse: any = await loadWebsite(`rates`);
            if (response && ratesResponse) {
                let data: any = [];
                OYesFCPlayersArray?.forEach((player: any) => {
                    const mvpData = calculatePlayerRatings(ratesResponse, allData, filteredData, player);
                    const notEnoughData = Object.values(response[player])?.length < 4;
                    const points = returnAverageData(response[player], notEnoughData);
                    const playerStats = getPlayerStats(filteredData, player);
                    const playerOverall =
                        calculateOverall(
                            Object.values(TeamMembers)
                                .find((z) => z?.name === player)
                                ?.fifaRole?.toLowerCase(),
                            points
                        ) || 0;
                    const overallPoints = {
                        ...points,
                        Overall: playerOverall,
                        Matches: playerStats?.totalMatch,
                        Goals: playerStats?.totalGoal,
                        'Goals per Game': playerStats?.goalPerGame,
                        'Attendance Rate': playerStats?.attendanceRate,
                        'Average Match Rating': Number(mvpData?.rating)?.toFixed(2),
                        'MOTM Awards': mvpData?.mvp?.toString(),
                    };
                    data = [...data, { name: player, ratings: overallPoints }];
                });
                setCalculatedPlayerData(data);
            }
        } catch (error: any) {
            showWarning(error?.message, 'error');
        }
    }, [allData, filteredData]);

    useEffect(() => {
        if (category) {
            updateOptions(category);
            if (category === statTypes[0]) fetchFacilityRatingData().then((r) => r);
            if (category === statTypes[1]) fetchPlayerRatingData().then((r) => r);
        }
    }, [category, fetchFacilityRatingData, fetchPlayerRatingData, statTypes, updateOptions]);

    const showWarning = (message?: any, severity?: any) => {
        const warningData: any = [
            {
                message: message,
                severity: severity,
            },
        ];
        setWarnings(warningData);
    };

    const handleBack = (data?: any) => {
        if (data) {
            handlePreviousPage(true);
        }
    };

    const returnPlayerStatColors = (data: any) => {
        if (
            selectedOption === 'Goals per Game' ||
            selectedOption === 'Matches' ||
            selectedOption === 'Goals' ||
            selectedOption === 'Goals per Game' ||
            selectedOption === 'Attendance Rate' ||
            selectedOption === 'MOTM Awards'
        ) {
            return 'royalblue';
        }
        if (selectedOption === 'Average Match Rating') {
            return Number(Number(data[selectedOption])?.toFixed(0)) >= 7
                ? 'darkgreen'
                : Number(Number(data[selectedOption])?.toFixed(0)) < 6
                  ? 'darkred'
                  : 'darkgoldenrod';
        }
        return Number(Number(data[selectedOption])?.toFixed(0)) >= 80
            ? 'darkgreen'
            : Number(Number(data[selectedOption])?.toFixed(0)) < 60
              ? 'darkred'
              : 'darkgoldenrod';
    };

    const returnPlayerStatLabel = (data: any) => {
        if (selectedOption === 'Goals per Game' || selectedOption === 'Average Match Rating') {
            return data[selectedOption];
        }
        return Number(data[selectedOption])?.toFixed(0);
    };

    const facilityRatingContent = (
        <>
            {calculatedFacilityData?.length > 0 && selectedOption && (
                <>
                    {[...calculatedFacilityData]
                        ?.sort(
                            (a, b) =>
                                parseFloat(b?.ratings?.[selectedOption]) - parseFloat(a?.ratings?.[selectedOption])
                        )
                        .map((item, index) => (
                            <div key={index}>
                                <section
                                    className={matchDetailsClasses.generalTabSection}
                                    style={{ padding: '0' }}
                                    key={index}
                                >
                                    <div className={matchDetailsClasses.generalInfoDiv}>
                                        <span
                                            className={playerCardsClasses.ratingSpan}
                                            style={{
                                                background: 'lightgray',
                                                color: 'black',
                                                marginRight: '10px',
                                            }}
                                        >
                                            {index + 1}
                                        </span>
                                        <span
                                            className={playerCardsClasses.ratingSpan}
                                            style={{
                                                background:
                                                    Number(Number(item.ratings[selectedOption])?.toFixed(0)) >= 7
                                                        ? 'darkgreen'
                                                        : Number(Number(item.ratings[selectedOption])?.toFixed(0)) < 5
                                                          ? 'darkred'
                                                          : 'darkgoldenrod',
                                            }}
                                        >
                                            {Number(item.ratings[selectedOption])?.toFixed(1)}
                                        </span>
                                        <span className={matchDetailsClasses.generalInfoSpan}>{item.name}</span>
                                    </div>
                                </section>
                                <div className={sharedClasses.emptyHeightSpace}></div>
                            </div>
                        ))}
                </>
            )}
        </>
    );

    const playerRatingContent = (
        <>
            {calculatedPlayerData?.length > 0 && selectedOption && (
                <>
                    {[...calculatedPlayerData]
                        ?.sort(
                            (a, b) =>
                                parseFloat(b?.ratings?.[selectedOption]) - parseFloat(a?.ratings?.[selectedOption])
                        )
                        .map((item, index) => (
                            <div key={index}>
                                <section
                                    className={matchDetailsClasses.generalTabSection}
                                    style={{ padding: '0' }}
                                    key={index}
                                >
                                    <div className={matchDetailsClasses.generalInfoDiv}>
                                        <span
                                            className={playerCardsClasses.ratingSpan}
                                            style={{
                                                background: 'lightgray',
                                                color: 'black',
                                                marginRight: '10px',
                                            }}
                                        >
                                            {index + 1}
                                        </span>
                                        <span
                                            className={playerCardsClasses.ratingSpan}
                                            style={{
                                                background: returnPlayerStatColors(item.ratings),
                                            }}
                                        >
                                            {returnPlayerStatLabel(item.ratings)}
                                        </span>
                                        <span className={matchDetailsClasses.generalInfoSpan}>{item.name}</span>
                                    </div>
                                </section>
                                <div className={sharedClasses.emptyHeightSpace}></div>
                            </div>
                        ))}
                </>
            )}
        </>
    );

    const firstPart = (
        <>
            {category && (
                <section className={classes.starSection}>
                    <span className={classes.starSpan}>{'Select attribute'}</span>
                    <SelectionComponent
                        options={options}
                        onSelectionChange={handleChange}
                        defaultSelectedValue={false}
                    />
                </section>
            )}
        </>
    );

    const secondPart = (
        <>
            {category &&
                (category === statTypes[0] && selectedOption
                    ? facilityRatingContent
                    : category === statTypes[1] && selectedOption
                      ? playerRatingContent
                      : null)}
        </>
    );

    return (
        <div style={{ minHeight: '70vh' }}>
            <BackButton handleBackButton={handleBack} generalTitle={`Sort ${category}`} />
            <Box sx={{ display: { xs: 'flex', md: 'none' }, height: '30px' }}></Box>
            {firstPart}
            {secondPart}
            {warnings &&
                warnings?.map((x: any, y: number) => (
                    <Alert
                        key={y}
                        sx={{
                            padding: 1,
                            marginBottom: '20px',
                            borderRadius: '15px',
                            bgcolor: '#1C1C1E',
                            color: 'lightgray',
                        }}
                        variant="outlined"
                        severity={x?.severity}
                    >
                        {x?.message}
                    </Alert>
                ))}
        </div>
    );
};

export default SortingGrid;
