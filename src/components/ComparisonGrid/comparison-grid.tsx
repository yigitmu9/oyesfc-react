import React, {useCallback, useEffect, useMemo, useState} from 'react';
import classes from "./comparison-grid.module.css";
import {
    calculateOverall,
    calculatePlayerRatings,
    getPlayerStats,
    OYesFCPlayersArray,
    returnAverageData
} from "../../utils/utils";
import SelectionComponent from "../../shared/SelectionComponent/selection-component";
import {loadWebsite} from "../../firebase";
import BackButton from "../../shared/BackButton/back-button";
import Box from "@mui/material/Box";
import sharedClasses from "../../shared/Styles/shared-styles.module.css";
import matchDetailsClasses from "../MatchDetails/match-details.module.css";
import playerCardsClasses from "../PlayerCards/player-cards.module.css";
import {Alert} from "@mui/material";
import {Facilities, FifaCalculations, TeamMembers} from "../../constants/constants";
import {useSelector} from "react-redux";

interface  ComparisonGridProps {
    category?: string;
    handlePreviousPage?: any
}

const ComparisonGrid: React.FC<ComparisonGridProps> = ({category, handlePreviousPage}) => {

    const {allData, filteredData} = useSelector((state: any) => state.databaseData);
    const statTypes = useMemo(() => ['Facilities', 'Players'], []);
    const [options, setOptions] = useState([]);
    const [selectedOptionOne, setSelectedOptionOne] = useState('');
    const [selectedOptionTwo, setSelectedOptionTwo] = useState('');
    const [warnings, setWarnings] = useState<any>(null);
    const [calculatedFacilityData, setCalculatedFacilityData] = useState<any>(null);
    const [calculatedPlayerData, setCalculatedPlayerData] = useState<any>(null);
    const facilitiesCategories = useMemo(() => ['Overall', 'Ground', 'Locker Room', 'Location', 'Goal Size', 'Field Size', 'Cafe'], []);
    const fifaCategories = useMemo(() => FifaCalculations.map(x => x.name).sort(), []);
    const playerCategories = useMemo(() => ['Matches', 'Goals', 'Goals per Game', 'Attendance Rate', 'MOTM Awards', 'Average Match Rating', 'Overall', ...fifaCategories], [fifaCategories]);

    const updateOptions = useCallback((type: string) => {
        let optionsArray: any = [];
        if (type === statTypes[0]) {
            optionsArray = Facilities.map(x => x.name).sort()
        } else if (type === statTypes[1]) {
            optionsArray = OYesFCPlayersArray
        }
        setOptions(optionsArray);
    }, [statTypes]);

    const handleChangeOne = (data?: any) => {
        setSelectedOptionOne(data);
    };

    const handleChangeTwo = (data?: any) => {
        setSelectedOptionTwo(data);
    };

    const fetchFacilityRatingData = useCallback(async () => {
        try {
            const response: any = await loadWebsite(`facilityRatings`);
            if (response) {
                let data: any = [];
                Object.entries(response)?.forEach((x: any) => {
                    const points = returnAverageData(x[1])
                    const values = Object.values(points)?.map(Number)
                    const average = (values.reduce((sum: any, val: any) => sum + val, 0) / values.length)?.toFixed(2);
                    const overallPoints = {...points, Overall: average}
                    data = [...data, {name: x[0], ratings: overallPoints}]
                })
                setCalculatedFacilityData(data)
            }
        } catch (error: any) {
            showWarning(error?.message, 'error')
        }
    }, [])

    const fetchPlayerRatingData = useCallback(async () => {
        try {
            const response: any = await loadWebsite(`playerRatings`);
            const ratesResponse: any = await loadWebsite(`rates`);
            if (response && ratesResponse) {
                let data: any = [];
                OYesFCPlayersArray?.forEach((player: any) => {
                    const mvpData = calculatePlayerRatings(ratesResponse, allData, filteredData, player)
                    const notEnoughData = Object.values(response[player])?.length < 4
                    const points = returnAverageData(response[player], notEnoughData)
                    const playerStats = getPlayerStats(filteredData, player)
                    const playerOverall = calculateOverall(Object.values(TeamMembers).find(z => z?.name === player)?.fifaRole?.toLowerCase(), points) || 0;
                    const overallPoints = {...points, Overall: playerOverall, Matches: playerStats?.totalMatch,
                        Goals: playerStats?.totalGoal, 'Goals per Game': playerStats?.goalPerGame, 'Attendance Rate': playerStats?.attendanceRate,
                        'Average Match Rating': (Number(mvpData?.rating)?.toFixed(2)), 'MOTM Awards': mvpData?.mvp?.toString()}
                    data = [...data, {name: player, ratings: overallPoints}]
                })
                setCalculatedPlayerData(data)
            }
        } catch (error: any) {
            showWarning(error?.message, 'error')
        }
    }, [allData, filteredData])

    useEffect(() => {
        if (category) {
            updateOptions(category);
            if (category === statTypes[0]) fetchFacilityRatingData().then(r => r)
            if (category === statTypes[1]) fetchPlayerRatingData().then(r => r)
        }
    }, [category, fetchFacilityRatingData, fetchPlayerRatingData, statTypes, updateOptions]);

    const showWarning = (message?: any, severity?: any) => {
        const warningData: any = [
            {
                message: message,
                severity: severity
            }
        ]
        setWarnings(warningData)
    }

    const handleBack = (data?: any) => {
        if (data) {
            handlePreviousPage(true)
        }
    }

    const returnValue = (data: any, categoryName: any, selectedOption: any, isFacility?: boolean) => {
        const value = data?.find((x: any) => x.name === selectedOption)?.ratings?.[categoryName] || '0'
        if (categoryName === 'Goals per Game' || categoryName === 'Average Match Rating') {
            return Number(value)?.toFixed(2)
        }
        if (isFacility) {
            return Number(value)?.toFixed(1)
        }
        return Number(value)?.toFixed(0)
    }

    const getColor = (selected: any, other: any) => {
        if (Number(selected) < Number(other)) return 'darkred'
        if (Number(selected) === Number(other)) return 'darkgoldenrod'
        if (Number(selected) > Number(other)) return 'darkgreen'
        return 'darkred'
    }

    const facilityRatingContent = (
        <>
            {
                calculatedFacilityData?.length > 0 && selectedOptionOne && selectedOptionTwo &&
                (
                    <>
                        <>
                            <section className={matchDetailsClasses.generalTabSection} style={{padding: '9.5px 0'}}>
                                <div className={matchDetailsClasses.generalInfoDiv}
                                     style={{justifyContent: 'space-between'}}>
                                    <span className={matchDetailsClasses.generalInfoSpan} style={{margin: 0}}>
                                        {selectedOptionOne}
                                    </span>
                                    <span className={matchDetailsClasses.generalInfoSpan} style={{margin: 0}}>
                                        {' '}
                                    </span>
                                    <span className={matchDetailsClasses.generalInfoSpan} style={{margin: 0}}>
                                        {selectedOptionTwo}
                                    </span>
                                </div>
                            </section>
                            <div className={sharedClasses.emptyHeightSpace}></div>
                        </>
                        {facilitiesCategories?.map((categoryName, index) => (
                            <div key={index}>
                                <section className={matchDetailsClasses.generalTabSection} style={{padding: '0'}}
                                         key={index}>
                                    <div className={matchDetailsClasses.generalInfoDiv}
                                         style={{justifyContent: 'space-between'}}>
                                    <span className={playerCardsClasses.ratingSpan} style={{
                                        background: getColor(returnValue(calculatedFacilityData, categoryName, selectedOptionOne, true),
                                            returnValue(calculatedFacilityData, categoryName, selectedOptionTwo, true))
                                    }}>
                                        {returnValue(calculatedFacilityData, categoryName, selectedOptionOne, true)}
                                    </span>
                                        <span className={matchDetailsClasses.generalInfoSpan}>
                                        {categoryName}
                                    </span>
                                        <span className={playerCardsClasses.ratingSpan} style={{
                                            background: getColor(returnValue(calculatedFacilityData, categoryName, selectedOptionTwo, true),
                                                returnValue(calculatedFacilityData, categoryName, selectedOptionOne, true))
                                        }}>
                                        {returnValue(calculatedFacilityData, categoryName, selectedOptionTwo, true)}
                                    </span>
                                    </div>
                                </section>
                                <div className={sharedClasses.emptyHeightSpace}></div>
                            </div>
                        ))}
                    </>
                )
            }
        </>
    )

    const playerRatingContent = (
        <>
            {
                calculatedPlayerData?.length > 0 && selectedOptionOne && selectedOptionTwo &&
                (
                    <>
                        <>
                            <section className={matchDetailsClasses.generalTabSection} style={{padding: '9.5px 0'}}>
                                <div className={matchDetailsClasses.generalInfoDiv}
                                     style={{justifyContent: 'space-between'}}>
                                    <span className={matchDetailsClasses.generalInfoSpan} style={{margin: 0}}>
                                        {selectedOptionOne}
                                    </span>
                                    <span className={matchDetailsClasses.generalInfoSpan} style={{margin: 0}}>
                                        {' '}
                                    </span>
                                    <span className={matchDetailsClasses.generalInfoSpan} style={{margin: 0}}>
                                        {selectedOptionTwo}
                                    </span>
                                </div>
                            </section>
                            <div className={sharedClasses.emptyHeightSpace}></div>
                        </>
                        {playerCategories?.map((categoryName, index) => (
                            <div key={index}>
                                <section className={matchDetailsClasses.generalTabSection} style={{padding: '0'}}
                                         key={index}>
                                    <div className={matchDetailsClasses.generalInfoDiv}
                                         style={{justifyContent: 'space-between'}}>
                                    <span className={playerCardsClasses.ratingSpan} style={{
                                        background: getColor(returnValue(calculatedPlayerData, categoryName, selectedOptionOne),
                                            returnValue(calculatedPlayerData, categoryName, selectedOptionTwo))
                                    }}>
                                        {returnValue(calculatedPlayerData, categoryName, selectedOptionOne)}
                                    </span>
                                        <span className={matchDetailsClasses.generalInfoSpan}>
                                        {categoryName}
                                    </span>
                                        <span className={playerCardsClasses.ratingSpan} style={{
                                            background: getColor(returnValue(calculatedPlayerData, categoryName, selectedOptionTwo),
                                                returnValue(calculatedPlayerData, categoryName, selectedOptionOne))
                                        }}>
                                        {returnValue(calculatedPlayerData, categoryName, selectedOptionTwo)}
                                    </span>
                                    </div>
                                </section>
                                <div className={sharedClasses.emptyHeightSpace}></div>
                            </div>
                        ))}
                    </>
                )
            }
        </>
    )

    const firstPart = (
        <>
            {
                category &&
                <section className={classes.starSection}>
                    <span className={classes.starSpan}>
                        {'Select first '}
                    </span>
                    <SelectionComponent options={options} onSelectionChange={handleChangeOne}
                                        defaultSelectedValue={false}/>
                </section>
            }
            {
                category &&
                <section className={classes.starSection}>
                    <span className={classes.starSpan}>
                        {'Select second '}
                    </span>
                    <SelectionComponent options={options} onSelectionChange={handleChangeTwo}
                                        defaultSelectedValue={false}/>
                </section>
            }
        </>
    )

    const secondPart = (
        <>
            {
                category && (
                    category === statTypes[0] && selectedOptionOne && selectedOptionTwo ?
                        facilityRatingContent :
                        category === statTypes[1] && selectedOptionOne && selectedOptionTwo ?
                            playerRatingContent :
                            null
                )
            }
        </>
    )

    return (
        <div style={{minHeight: '70vh'}}>
            <BackButton handleBackButton={handleBack} generalTitle={`Compare ${category}`}/>
            <Box sx={{display: {xs: 'flex', md: 'none'}, height: '30px'}}></Box>
            {firstPart}
            {secondPart}
            {
                warnings &&
                warnings?.map((x: any, y: number) => (
                    <Alert key={y}
                           sx={{
                               padding: 1,
                               marginBottom: '20px',
                               borderRadius: '15px',
                               bgcolor: '#1C1C1E',
                               color: 'lightgray'
                           }}
                           variant="outlined" severity={x?.severity}>{x?.message}</Alert>
                ))

            }
        </div>
    );
};

export default ComparisonGrid;
