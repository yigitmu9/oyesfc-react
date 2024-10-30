import React from 'react';
import classes from "../MatchDetails/match-details.module.css";
import {Jerseys} from "../../constants/constants";

const JerseyTab = ({matchDetailsData}) => {

    let jerseyImage;

    if (matchDetailsData.oyesfc?.jersey) {
        const jerseyIndex = Jerseys.findIndex(x => x === matchDetailsData.oyesfc?.jersey) + 1
        jerseyImage = require(`../../images/kit${jerseyIndex}.PNG`)
    } else {
        const inputDateParts = matchDetailsData.day.split('-');
        const inputDateObject = new Date(Number(inputDateParts[2]), Number(inputDateParts[1]) - 1, Number(inputDateParts[0]));
        const redKitReleaseDate = new Date(2019, 4, 13);
        const tenthYearKitReleaseDate = new Date(2023, 7, 14);
        if (inputDateObject < redKitReleaseDate) {
            jerseyImage = require(`../../images/kit2.PNG`)
        } else if (inputDateObject > redKitReleaseDate && inputDateObject < tenthYearKitReleaseDate) {
            jerseyImage = require(`../../images/kit4.PNG`)
        } else if (inputDateObject > tenthYearKitReleaseDate) {
            jerseyImage = require(`../../images/kit5.PNG`)
        }
    }

    return (
        <>
            <img
                key={'1'}
                className={classes.kitImage}
                src={jerseyImage}
                alt={`1`}
            />
        </>
    );
};

export default JerseyTab;