import React from 'react';
import classes from "../MatchDetails/match-details.module.css";
import {Divider} from "@mui/material";
import {Jerseys} from "../../constants/constants";

const JerseyTab = ({matchDetailsData}) => {

    let jerseyName;
    let jerseyImage;

    if (matchDetailsData.oyesfc?.jersey) {
        jerseyName = matchDetailsData.oyesfc?.jersey;
        const jerseyIndex = Jerseys.findIndex(x => x === matchDetailsData.oyesfc?.jersey) + 1
        jerseyImage = require(`../../images/kit${jerseyIndex}.PNG`)
    } else {
        const inputDateParts = matchDetailsData.day.split('-');
        const inputDateObject = new Date(Number(inputDateParts[2]), Number(inputDateParts[1]) - 1, Number(inputDateParts[0]));
        const redKitReleaseDate = new Date(2019, 4, 13);
        const tenthYearKitReleaseDate = new Date(2023, 7, 14);
        if (inputDateObject < redKitReleaseDate) {
            jerseyName= Jerseys[1]
            jerseyImage = require(`../../images/kit2.PNG`)
        } else if (inputDateObject > redKitReleaseDate && inputDateObject < tenthYearKitReleaseDate) {
            jerseyName= Jerseys[3]
            jerseyImage = require(`../../images/kit4.PNG`)
        } else if (inputDateObject > tenthYearKitReleaseDate) {
            jerseyName= Jerseys[4]
            jerseyImage = require(`../../images/kit5.PNG`)
        }
    }

    return (
        <>
            <section className={classes.squadSection}>
                <span className={classes.kitSpan}>{jerseyName}</span>
                <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                <img
                    key={'1'}
                    className={classes.kitImage}
                    src={jerseyImage}
                    alt={`1`}
                />
            </section>
        </>
    );
};

export default JerseyTab;