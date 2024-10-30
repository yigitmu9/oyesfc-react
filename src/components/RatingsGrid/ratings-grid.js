import React, {useCallback, useEffect, useMemo, useState} from 'react';
import classes from "./ratings-grid.module.css";
import {useSelector} from "react-redux";
import {OYesFCPlayersArray} from "../../utils/utils";
import {Facilities, FifaCalculations, SnackbarTypes} from "../../constants/constants";
import SelectionComponent from "../../shared/SelectionComponent/selection-component";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import matchDetailsClasses from '../MatchDetails/match-details.module.css'
import {ref, set} from "firebase/database";
import {dataBase, loadWebsite} from "../../firebase";
import MainTitle from "../../shared/MainTitle/main-title";
import {Alert, Snackbar} from "@mui/material";

const RatingsGrid = () => {

    const { userName, id } = useSelector((state) => state.credentials);
    const initialFacilitiesFormData = {};
    const statTypes = useMemo(() => ['Facilities', 'Players'], []);
    const [statType, setStatType] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const isMobile = window.innerWidth <= 768;
    const [facilitiesFormData, setFacilitiesFormData] = useState(initialFacilitiesFormData);
    const facilitiesRateCategories = ['Ground', 'Locker Room', 'Location', 'Goal Size', 'Field Size', 'Cafe']
    const [snackbarData, setSnackbarData] = useState(null);
    const [facilityRatingInfoData, setFacilityRatingInfoData] = useState(null);

    const updateSecondOptions = useCallback((type) => {
        let optionsArray = [];
        if (type === statTypes[0]) {
            optionsArray = Facilities.map(x => x.name).sort()
        } else if (type === statTypes[1]) {
            optionsArray = OYesFCPlayersArray.filter(x => x !== userName);
        }
        setOptions(optionsArray);
        setSelectedOption('');
    }, [statTypes, userName]);

    useEffect(() => {
        if (statType) {
            updateSecondOptions(statType);
        }
    }, [statType, updateSecondOptions]);

    const handleDetailChange = (data) => {
        setFacilitiesFormData(initialFacilitiesFormData)
        setSelectedOption(data);
        if (facilityRatingInfoData) setFacilityRatingInfoData(null)
        if (statType === statTypes[0]) fetchFacilityRatingData(data).then(r => r)
    };

    const handleCategoryChange = (data) => {
        setFacilitiesFormData(initialFacilitiesFormData)
        setStatType(data);
        if (facilityRatingInfoData) setFacilityRatingInfoData(null)
        if (selectedOption) setSelectedOption('')
    };

    const handleStarChange = (player, rating) => {
        if (selectedOption) {
            setFacilitiesFormData((prevData) => ({
                ...prevData,
                [player]: parseInt(rating)
            }));
        }
    };

    const handleStarDetailChange = (player, operation) => {
        const playerRating = facilitiesFormData[player]
        if (playerRating &&
            ((playerRating !== 1 && operation === 'minus') || (playerRating !== 10 && operation === 'plus'))) {
            const newRating = operation === 'plus' ? parseFloat((playerRating + 0.1).toFixed(1)) :
                parseFloat((playerRating - 0.1).toFixed(1));
            setFacilitiesFormData((prevData) => ({
                ...prevData,
                [player]: newRating
            }));
        }
    };

    const handleStarDetailChangeForPlayerRatings = (player, operation) => {
        const playerRating = facilitiesFormData[player]
        if (playerRating &&
            ((playerRating !== 1 && operation === 'minus') || (playerRating !== 99 && operation === 'plus'))) {
            const newRating = operation === 'plus' ? parseFloat((playerRating + 1).toFixed(1)) :
                parseFloat((playerRating - 1).toFixed(1));
            setFacilitiesFormData((prevData) => ({
                ...prevData,
                [player]: newRating
            }));
        }
    };

    const facilityStarsSubmit = async () => {
        if (statType === statTypes[0] && selectedOption && Object.values(facilitiesFormData)?.length === 6) {
            try {
                await set(ref(dataBase, `facilityRatings/${selectedOption}/${userName}`), facilitiesFormData);
                const successResponse = {
                    open: true,
                    status: SnackbarTypes.success,
                    message: 'Your ratings have been saved successfully!',
                    duration: 3000
                }
                setSnackbarData(successResponse)
            } catch (error) {
                const successResponse = {
                    open: true,
                    status: SnackbarTypes.error,
                    message: error?.message,
                    duration: 3000
                }
                setSnackbarData(successResponse)
            }
        }
    };

    const playerStarsSubmit = async () => {
        console.log(facilitiesFormData)
        if (statType === statTypes[1] && selectedOption && Object.values(facilitiesFormData)?.length === FifaCalculations.length) {
            try {
                await set(ref(dataBase, `playerRatings/${selectedOption}/${id}`), facilitiesFormData);
                const successResponse = {
                    open: true,
                    status: SnackbarTypes.success,
                    message: 'Your ratings have been saved successfully!',
                    duration: 3000
                }
                setSnackbarData(successResponse)
            } catch (error) {
                const successResponse = {
                    open: true,
                    status: SnackbarTypes.error,
                    message: error?.message,
                    duration: 3000
                }
                setSnackbarData(successResponse)
            }
        }
    };

    const fetchFacilityRatingData = async (facility) => {
        try {
            const response = await loadWebsite(`facilityRatings/${facility}`);
            if (response) {
                if (response[userName]) setFacilitiesFormData(response[userName])
                const infoData = Object.entries(response)?.filter(x => x[0] !== userName)
                setFacilityRatingInfoData(infoData)
            }
        } catch (error) {
            const successResponse = {
                open: true,
                status: SnackbarTypes.error,
                message: error?.message,
                duration: 3000
            }
            setSnackbarData(successResponse)
        }
    }

    const facilityRatingContent = (
        <>
            {facilitiesRateCategories?.map((x, y) => (
                <section key={y} className={classes.starSection}>
                    <span className={classes.starSpan}>{x}</span>
                    {
                        facilityRatingInfoData?.map((z, i) => (
                            <span className={matchDetailsClasses.starDetailSpan} key={i}>
                                {z[0]?.split(' ')[0] + '\'s rating for ' + selectedOption + '\'s ' + x + ': ' + z[1][x]}
                            </span>
                        ))
                    }
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
                                        onChange={() =>
                                            handleStarChange(x, currentRating)}
                                    />
                                    <span
                                        className={matchDetailsClasses.star}
                                        style={{
                                            color:
                                                currentRating <= (facilitiesFormData[x]) ? "#ffc107" : "#e4e5e9",
                                        }}>
                                                        &#9733;
                                                    </span>
                                </label>
                            );
                        })}
                    </div>
                    <div className={matchDetailsClasses.ratingStarDetailsDiv}>
                        <ArrowBackIosNewIcon fontSize={isMobile ? 'medium' : 'large'}
                                             className={matchDetailsClasses.ratingStarIconDiv}
                                             onClick={() => handleStarDetailChange(x, 'minus')}>
                        </ArrowBackIosNewIcon>
                        <h1 className={matchDetailsClasses.ratingStarSpanDiv}>
                            {facilitiesFormData[x] ? facilitiesFormData[x]?.toFixed(1) : 'Rate'}
                        </h1>
                        <ArrowForwardIosIcon fontSize={isMobile ? 'medium' : 'large'}
                                             className={matchDetailsClasses.ratingStarIconDiv}
                                             onClick={() => handleStarDetailChange(x, 'plus')}>
                        </ArrowForwardIosIcon>
                    </div>
                </section>
            ))}
            <div className={matchDetailsClasses.submitButtonDiv}>
                <button className={matchDetailsClasses.mapsButtons}
                        onClick={facilityStarsSubmit}>{'Submit'}</button>
            </div>
        </>
    )

    const playerRatingContent = (
        <>
            {FifaCalculations?.map((x, y) => (
                <section key={y} className={classes.starSection}>
                    <span className={classes.starSpan}>{x.name}</span>
                    <span className={matchDetailsClasses.starDetailSpan} key={y}>
                        {x.category}
                    </span>
                    <div className={matchDetailsClasses.starDiv}>
                        {[...Array(10)].map((star, index) => {
                            const currentRating = index === 9 ? ((index + 1) * 10) - 1 : (index + 1) * 10;
                            return (

                                <label key={index} className={matchDetailsClasses.starLabel}>
                                    <input
                                        key={star}
                                        type="radio"
                                        name="rating"
                                        value={facilitiesFormData[x.name]}
                                        onChange={() =>
                                            handleStarChange(x.name, currentRating)}
                                    />
                                    <span
                                        className={matchDetailsClasses.star}
                                        style={{
                                            color:
                                                currentRating <= (facilitiesFormData[x.name]) ? "#ffc107" : "#e4e5e9",
                                        }}>
                                                        &#9733;
                                                    </span>
                                </label>
                            );
                        })}
                    </div>
                    <div className={matchDetailsClasses.ratingStarDetailsDiv}>
                        <ArrowBackIosNewIcon fontSize={isMobile ? 'medium' : 'large'}
                                             className={matchDetailsClasses.ratingStarIconDiv}
                                             onClick={() => handleStarDetailChangeForPlayerRatings(x.name, 'minus')}>
                        </ArrowBackIosNewIcon>
                        <h1 className={matchDetailsClasses.ratingStarSpanDiv}>
                            {facilitiesFormData[x.name] ? facilitiesFormData[x.name]?.toFixed(0) : 'Rate'}
                        </h1>
                        <ArrowForwardIosIcon fontSize={isMobile ? 'medium' : 'large'}
                                             className={matchDetailsClasses.ratingStarIconDiv}
                                             onClick={() => handleStarDetailChangeForPlayerRatings(x.name, 'plus')}>
                        </ArrowForwardIosIcon>
                    </div>
                </section>
            ))}
            <div className={matchDetailsClasses.submitButtonDiv}>
                <button className={matchDetailsClasses.mapsButtons}
                        onClick={playerStarsSubmit}>{'Submit'}</button>
            </div>
        </>
    )

    const firstPart = (
        <>
            <section className={classes.starSection}>
                <span className={classes.starSpan}>Select Category</span>
                <SelectionComponent options={statTypes} onSelectionChange={handleCategoryChange}
                                    defaultSelectedValue={false}/>
            </section>
            {
                statType &&
                <section className={classes.starSection}>
                    <span className={classes.starSpan}>
                        {statType === statTypes[0] ? 'Select Facility' : 'Select Player'}
                    </span>
                    <SelectionComponent options={options} onSelectionChange={handleDetailChange}
                                        defaultSelectedValue={false}/>
                </section>
            }
        </>
    )

    const secondPart = (
        <>
            {
                statType && (
                    statType === statTypes[0] && selectedOption ?
                        facilityRatingContent :
                        statType === statTypes[1] && selectedOption ?
                            playerRatingContent :
                            null
                )
            }
        </>
    )

    return (
        <div style={{minHeight: '70vh'}}>
            <MainTitle title={'Ratings'}/>
            {firstPart}
            {secondPart}
            <Snackbar open={snackbarData?.open} autoHideDuration={snackbarData?.duration}>
                <Alert
                    severity={snackbarData?.status}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {snackbarData?.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default RatingsGrid;
