import React from 'react';
import classes from "../MatchDetails/match-details.module.css";
import {Divider} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import SoccerLineUp from "react-soccer-lineup";
import {FootballRoles, Jerseys, TeamMembers} from "../../constants/constants";

const SquadTab = ({matchDetailsData, squadRatings}) => {

    const isMobile = window.innerWidth <= 768;
    let oyesfcSquad;
    let playerColor;
    let playerNumberColor;
    let gkColor;
    let gkNumberColor;

    if (matchDetailsData.oyesfc?.jersey === Jerseys[0]) {
        playerColor = 'dodgerblue';
        playerNumberColor = 'white';
        gkColor = 'royalblue';
        gkNumberColor = 'black';
    } else if (matchDetailsData.oyesfc?.jersey === Jerseys[1]) {
        playerColor = 'black';
        playerNumberColor = 'dodgerblue';
        gkColor = 'yellow';
        gkNumberColor = 'black';
    } else if (matchDetailsData.oyesfc?.jersey === Jerseys[2]) {
        playerColor = 'darkslateblue';
        playerNumberColor = 'white';
        gkColor = 'yellow';
        gkNumberColor = 'black';
    } else if (matchDetailsData.oyesfc?.jersey === Jerseys[3]) {
        playerColor = 'red';
        playerNumberColor = 'black';
        gkColor = 'dodgerblue';
        gkNumberColor = 'white';
    } else if (matchDetailsData.oyesfc?.jersey === Jerseys[4]) {
        playerColor = 'black';
        playerNumberColor = 'gold';
        gkColor = 'darkred';
        gkNumberColor = 'black';
    } else {
        const inputDateParts = matchDetailsData.day.split('-');
        const inputDateObject = new Date(Number(inputDateParts[2]), Number(inputDateParts[1]) - 1, Number(inputDateParts[0]));
        const redKitReleaseDate = new Date(2019, 4, 13);
        const tenthYearKitReleaseDate = new Date(2023, 7, 14);
        if (inputDateObject < redKitReleaseDate) {
            playerColor = 'black';
            playerNumberColor = 'dodgerblue';
            gkColor = 'yellow';
            gkNumberColor = 'black';
        } else if (inputDateObject > redKitReleaseDate && inputDateObject < tenthYearKitReleaseDate) {
            playerColor = 'red';
            playerNumberColor = 'black';
            gkColor = 'dodgerblue';
            gkNumberColor = 'white';
        } else if (inputDateObject > tenthYearKitReleaseDate) {
            playerColor = 'black';
            playerNumberColor = 'gold';
            gkColor = 'darkred';
            gkNumberColor = 'black';
        }
    }

    oyesfcSquad = {
        squad: {
            gk: {},
            df: [],
            cm: [],
            fw: [],
        },
        style: {
            color: playerColor,
            numberColor: playerNumberColor,
            nameColor: 'black',
        }
    }

    if (Object.values(matchDetailsData.oyesfc.squad).every(x => x?.hasOwnProperty('role'))) {
        Object.entries(matchDetailsData.oyesfc.squad)?.forEach(x => {
            let player;
            if (x[1]?.role !== FootballRoles[0]) {
                player = {
                    name: Object.values(TeamMembers)?.some(item => item?.name === x[0]) ? x[0]?.split(' ')[0] : x[0],
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number
                }
            } else {
                player = {
                    name: Object.values(TeamMembers)?.some(item => item?.name === x[0]) ? x[0]?.split(' ')[0] : x[0],
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number,
                    color: gkColor,
                    numberColor: gkNumberColor
                }
            }

            if (x[1]?.role === FootballRoles[0]) {
                oyesfcSquad.squad.gk = player
            } else if (x[1]?.role === FootballRoles[1]) {
                oyesfcSquad.squad.df.push(player)
            } else if (x[1]?.role === FootballRoles[2]) {
                oyesfcSquad.squad.cm.push(player)
            } else if (x[1]?.role === FootballRoles[3]) {
                oyesfcSquad.squad.fw.push(player)
            }
        })
    } else {
        Object.entries(matchDetailsData.oyesfc.squad)?.forEach(x => {
            let player;
            if (Object.values(TeamMembers)?.find(member => member?.name === x[0])?.role !== FootballRoles[0]) {
                player = {
                    name: Object.values(TeamMembers)?.some(item => item?.name === x[0]) ? x[0]?.split(' ')[0] : x[0],
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number ?
                        Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number :
                        Math.floor(Math.random() * (98 - 19 + 1)) + 19
                }
            } else {
                player = {
                    name: Object.values(TeamMembers)?.some(item => item?.name === x[0]) ? x[0]?.split(' ')[0] : x[0],
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number,
                    numberColor: gkNumberColor,
                    color: gkColor,
                }
            }

            if (Object.values(TeamMembers).find(member => member?.name === x[0])?.role === FootballRoles[0]) {
                oyesfcSquad.squad.gk = player
            } else if (Object.values(TeamMembers).find(member => member?.name === x[0])?.role === FootballRoles[2]) {
                oyesfcSquad.squad.cm.push(player)
            } else if (Object.values(TeamMembers).find(member => member?.name === x[0])?.role === FootballRoles[3]) {
                oyesfcSquad.squad.fw.push(player)
            } else {
                oyesfcSquad.squad.df.push(player)
            }
        })
    }


    if (oyesfcSquad.squad.gk === {} || !oyesfcSquad?.squad?.gk?.name) {
        oyesfcSquad.squad.gk = null
    }
    if (oyesfcSquad.squad.df.length === 0) {
        oyesfcSquad.squad.df = null
    }
    if (oyesfcSquad.squad.cm.length === 0) {
        oyesfcSquad.squad.cm = null
    }
    if (oyesfcSquad.squad.fw.length === 0) {
        oyesfcSquad.squad.fw = null
    }


    return (
        <>
            <section className={classes.squadSection}>
                <div className={classes.generalInfoDiv}>
                    <GroupsIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.generalInfoIcon}>
                    </GroupsIcon>
                    <span className={classes.generalInfoSpan}>
                            Squad
                        </span>
                </div>
                <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                {
                    Object.keys(matchDetailsData?.oyesfc?.squad).map((x, y) => (
                        <div key={y} className={classes.generalInfoDiv}>
                            {
                                squadRatings ?
                                    <span
                                        className={squadRatings?.find(rating => rating?.name === x)?.rating >= 7 ? classes.goodRating :
                                            squadRatings?.find(rating => rating?.name === x)?.rating < 5 ? classes.badRating : classes.midRating}>
                                                    {squadRatings?.find(rating => rating?.name === x)?.rating.toFixed(1)}
                                            </span>
                                    :
                                    <PersonIcon fontSize={isMobile ? 'medium' : 'large'}
                                                className={classes.generalInfoIcon}>
                                    </PersonIcon>
                            }
                            <span className={classes.generalInfoSpan}>
                                        {x}
                                    </span>
                        </div>
                    ))
                }
            </section>
            <div className={classes.pitchStyleDiv}>
                <SoccerLineUp
                    size={"responsive"}
                    homeTeam={oyesfcSquad}
                    color={'green'}
                />
            </div>
        </>
    );
};

export default SquadTab;