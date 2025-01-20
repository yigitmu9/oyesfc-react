import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './ratings-grid.module.css';
import { useSelector } from 'react-redux';
import { OYesFCPlayersArray } from '../../utils/utils';
import { Facilities, FifaCalculations } from '../../constants/constants';
import SelectionComponent from '../../shared/SelectionComponent/selection-component';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import matchDetailsClasses from '../MatchDetails/match-details.module.css';
import { ref, set } from 'firebase/database';
import { dataBase, loadWebsite } from '../../firebase';
import { Alert } from '@mui/material';
import BackButton from '../../shared/BackButton/back-button';
import Box from '@mui/material/Box';
import ButtonComponent from '../../shared/ButtonComponent/button-component';

interface RatingsGridProps {
    category?: string;
    handlePreviousPage?: any;
}

const RatingsGrid: React.FC<RatingsGridProps> = ({ category, handlePreviousPage }) => {
    const { userName, id } = useSelector((state: any) => state.credentials);
    const initialFacilitiesFormData = {};
    const statTypes = useMemo(() => ['Facilities', 'Players'], []);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const isMobile = window.innerWidth <= 768;
    const [facilitiesFormData, setFacilitiesFormData] = useState<any>(initialFacilitiesFormData);
    const facilitiesRateCategories = ['Ground', 'Locker Room', 'Location', 'Goal Size', 'Field Size', 'Cafe'];
    const [facilityRatingInfoData, setFacilityRatingInfoData] = useState<any>(null);
    const [warnings, setWarnings] = useState<any>(null);

    const updateSecondOptions = useCallback(
        (type: string) => {
            let optionsArray: any = [];
            if (type === statTypes[0]) {
                optionsArray = Facilities.map((x) => x.name).sort();
            } else if (type === statTypes[1]) {
                optionsArray = OYesFCPlayersArray.filter((x) => x !== userName);
            }
            setOptions(optionsArray);
            setSelectedOption('');
        },
        [statTypes, userName]
    );

    useEffect(() => {
        if (category) {
            updateSecondOptions(category);
        }
    }, [category, updateSecondOptions]);

    const handleDetailChange = (data?: any) => {
        setFacilitiesFormData(initialFacilitiesFormData);
        setSelectedOption(data);
        if (facilityRatingInfoData) setFacilityRatingInfoData(null);
        if (warnings) setWarnings(null);
        if (category === statTypes[0]) fetchFacilityRatingData(data).then((r) => r);
        if (category === statTypes[1]) fetchPlayerRatingData(data).then((r) => r);
    };

    const handleStarChange = (player?: any, rating?: any) => {
        if (selectedOption) {
            if (warnings) setWarnings(null);
            setFacilitiesFormData((prevData: any) => ({
                ...prevData,
                [player]: parseInt(rating),
            }));
        }
    };

    const handleStarDetailChange = (player?: any, operation?: any) => {
        const playerRating = facilitiesFormData[player];
        if (
            playerRating &&
            ((playerRating !== 1 && operation === 'minus') || (playerRating !== 10 && operation === 'plus'))
        ) {
            if (warnings) setWarnings(null);
            const newRating =
                operation === 'plus'
                    ? parseFloat((playerRating + 0.1).toFixed(1))
                    : parseFloat((playerRating - 0.1).toFixed(1));
            setFacilitiesFormData((prevData: any) => ({
                ...prevData,
                [player]: newRating,
            }));
        }
    };

    const handleStarDetailChangeForPlayerRatings = (player?: any, operation?: any) => {
        const playerRating = facilitiesFormData[player];
        if (
            playerRating &&
            ((playerRating !== 1 && operation === 'minus') || (playerRating !== 99 && operation === 'plus'))
        ) {
            if (warnings) setWarnings(null);
            const newRating =
                operation === 'plus'
                    ? parseFloat((playerRating + 1).toFixed(1))
                    : parseFloat((playerRating - 1).toFixed(1));
            setFacilitiesFormData((prevData: any) => ({
                ...prevData,
                [player]: newRating,
            }));
        }
    };

    const facilityStarsSubmit = async () => {
        if (category === statTypes[0] && selectedOption && Object.values(facilitiesFormData)?.length === 6) {
            try {
                await set(ref(dataBase, `facilityRatings/${selectedOption}/${userName}`), facilitiesFormData);
                showWarning('Your ratings have been saved successfully!', 'success');
            } catch (error: any) {
                showWarning(error?.message, 'error');
            }
        } else {
            showWarning('Some fields were skipped without a rating, please check again!', 'warning');
        }
    };

    const playerStarsSubmit = async () => {
        if (
            category === statTypes[1] &&
            selectedOption &&
            Object.values(facilitiesFormData)?.length === FifaCalculations.length
        ) {
            try {
                await set(ref(dataBase, `playerRatings/${selectedOption}/${id}`), facilitiesFormData);
                showWarning('Your ratings have been saved successfully!', 'success');
            } catch (error: any) {
                showWarning(error?.message, 'error');
            }
        } else {
            showWarning('Some fields were skipped without a rating, please check again!', 'warning');
        }
    };

    const fetchFacilityRatingData = async (facility?: any) => {
        try {
            const response: any = await loadWebsite(`facilityRatings/${facility}`);
            if (response) {
                if (response[userName]) setFacilitiesFormData(response[userName]);
                const infoData: any = Object.entries(response)?.filter((x) => x[0] !== userName);
                setFacilityRatingInfoData(infoData);
            }
        } catch (error: any) {
            showWarning(error?.message, 'error');
        }
    };

    const fetchPlayerRatingData = async (player?: any) => {
        try {
            const response: any = await loadWebsite(`playerRatings/${player}`);
            if (response) {
                if (response[id]) setFacilitiesFormData(response[id]);
            }
        } catch (error: any) {
            showWarning(error?.message, 'error');
        }
    };

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

    const facilityRatingContent = (
        <>
            {facilitiesRateCategories?.map((x, y) => (
                <section key={y} className={classes.starSection}>
                    <span className={classes.starSpan}>{x}</span>
                    {facilityRatingInfoData?.map((z: any, i: number) => (
                        <span className={matchDetailsClasses.starDetailSpan} key={i}>
                            {z[0] + ': ' + z[1][x]}
                        </span>
                    ))}
                    <div className={matchDetailsClasses.starDiv}>
                        {[...Array(10)].map((star, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={index} className={matchDetailsClasses.starLabel}>
                                    <input
                                        key={star}
                                        type="radio"
                                        name="rating"
                                        value={facilitiesFormData[x]}
                                        onChange={() => handleStarChange(x, currentRating)}
                                    />
                                    <span
                                        className={matchDetailsClasses.star}
                                        style={{
                                            color: currentRating <= facilitiesFormData[x] ? '#ffc107' : '#e4e5e9',
                                        }}
                                    >
                                        &#9733;
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                    <div className={matchDetailsClasses.ratingStarDetailsDiv}>
                        <ArrowBackIosNewIcon
                            fontSize={isMobile ? 'medium' : 'large'}
                            className={matchDetailsClasses.ratingStarIconDiv}
                            onClick={() => handleStarDetailChange(x, 'minus')}
                        ></ArrowBackIosNewIcon>
                        <h1 className={matchDetailsClasses.ratingStarSpanDiv}>
                            {facilitiesFormData[x] ? facilitiesFormData[x]?.toFixed(1) : 'Rate'}
                        </h1>
                        <ArrowForwardIosIcon
                            fontSize={isMobile ? 'medium' : 'large'}
                            className={matchDetailsClasses.ratingStarIconDiv}
                            onClick={() => handleStarDetailChange(x, 'plus')}
                        ></ArrowForwardIosIcon>
                    </div>
                </section>
            ))}
            <Alert
                sx={{
                    padding: 1,
                    marginBottom: '20px',
                    borderRadius: '15px',
                    bgcolor: '#1C1C1E',
                    color: 'lightgray',
                }}
                variant="outlined"
                severity="info"
            >
                You can change and submit the ratings you gave whenever you want.
            </Alert>
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
            <ButtonComponent onClick={() => facilityStarsSubmit()} name={`Submit`} />
        </>
    );

    const playerRatingContent = (
        <>
            <section className={classes.starSection}>
                <span className={classes.starSpan}>Rating Helper</span>
                <div className={matchDetailsClasses.facilityRatingStyle}>
                    <div
                        className={classes.facilityRatingDiv}
                        style={{
                            background: 'darkred',
                        }}
                    >
                        <span className={classes.facilityRating}>60-</span>
                        <span className={classes.facilityRatingName}>Very Bad</span>
                    </div>
                    <div
                        className={classes.facilityRatingDiv}
                        style={{
                            background: 'firebrick',
                        }}
                    >
                        <span className={classes.facilityRating}>60-70</span>
                        <span className={classes.facilityRatingName}>Bad</span>
                    </div>
                    <div
                        className={classes.facilityRatingDiv}
                        style={{
                            background: 'darkgoldenrod',
                        }}
                    >
                        <span className={classes.facilityRating}>70-80</span>
                        <span className={classes.facilityRatingName}>Ok</span>
                    </div>
                    <div
                        className={classes.facilityRatingDiv}
                        style={{
                            background: 'green',
                        }}
                    >
                        <span className={classes.facilityRating}>80-90</span>
                        <span className={classes.facilityRatingName}>Good</span>
                    </div>
                    <div
                        className={classes.facilityRatingDiv}
                        style={{
                            background: 'darkgreen',
                        }}
                    >
                        <span className={classes.facilityRating}>90+</span>
                        <span className={classes.facilityRatingName}>Very Good</span>
                    </div>
                </div>
            </section>
            {FifaCalculations?.map((x, y) => (
                <section key={y} className={classes.starSection}>
                    <span className={classes.starSpan}>{x.name}</span>
                    <span className={matchDetailsClasses.starDetailSpan} key={y}>
                        {x.category}
                    </span>
                    <div className={matchDetailsClasses.starDiv}>
                        {[...Array(10)].map((star, index) => {
                            const currentRating = index === 9 ? (index + 1) * 10 - 1 : (index + 1) * 10;
                            return (
                                <label key={index} className={matchDetailsClasses.starLabel}>
                                    <input
                                        key={star}
                                        type="radio"
                                        name="rating"
                                        value={facilitiesFormData[x.name]}
                                        onChange={() => handleStarChange(x.name, currentRating)}
                                    />
                                    <span
                                        className={matchDetailsClasses.star}
                                        style={{
                                            color: currentRating <= facilitiesFormData[x.name] ? '#ffc107' : '#e4e5e9',
                                        }}
                                    >
                                        &#9733;
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                    <div className={matchDetailsClasses.ratingStarDetailsDiv}>
                        <ArrowBackIosNewIcon
                            fontSize={isMobile ? 'medium' : 'large'}
                            className={matchDetailsClasses.ratingStarIconDiv}
                            onClick={() => handleStarDetailChangeForPlayerRatings(x.name, 'minus')}
                        ></ArrowBackIosNewIcon>
                        <h1 className={matchDetailsClasses.ratingStarSpanDiv}>
                            {facilitiesFormData[x.name] ? facilitiesFormData[x.name]?.toFixed(0) : 'Rate'}
                        </h1>
                        <ArrowForwardIosIcon
                            fontSize={isMobile ? 'medium' : 'large'}
                            className={matchDetailsClasses.ratingStarIconDiv}
                            onClick={() => handleStarDetailChangeForPlayerRatings(x.name, 'plus')}
                        ></ArrowForwardIosIcon>
                    </div>
                </section>
            ))}
            <Alert
                sx={{
                    padding: 1,
                    marginBottom: '20px',
                    borderRadius: '15px',
                    bgcolor: '#1C1C1E',
                    color: 'lightgray',
                }}
                variant="outlined"
                severity="info"
            >
                You can change and submit the ratings you gave whenever you want.
            </Alert>
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
            <ButtonComponent onClick={() => playerStarsSubmit()} name={`Submit`} />
        </>
    );

    const firstPart = (
        <>
            {category && (
                <section className={classes.starSection}>
                    <span className={classes.starSpan}>
                        {category === statTypes[0] ? 'Select Facility' : 'Select Player'}
                    </span>
                    <SelectionComponent
                        options={options}
                        onSelectionChange={handleDetailChange}
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
            <BackButton handleBackButton={handleBack} generalTitle={`Rate ${category}`} />
            <Box sx={{ display: { xs: 'flex', md: 'none' }, height: '30px' }}></Box>
            {firstPart}
            {secondPart}
        </div>
    );
};

export default RatingsGrid;
