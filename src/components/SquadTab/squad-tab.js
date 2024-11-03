import React from 'react';
import {Avatar, Badge} from "@mui/material";
import {FootballRoles, Jerseys, TeamMembers} from "../../constants/constants";
import squadTabClasses from './squad-tab.module.css'
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import classes from "../MatchDetails/match-details.module.css";
import StarIcon from "@mui/icons-material/Star";

const SquadTab = ({matchDetailsData, squadRatings, bestOfMatch}) => {
    const { signedIn } = useSelector((state) => state.credentials);
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
    }  else if (matchDetailsData.oyesfc?.jersey === Jerseys[5]) {
        playerColor = 'lightgray';
        playerNumberColor = 'green';
        gkColor = 'dodgerblue';
        gkNumberColor = 'white';
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
                    name: (Object.values(TeamMembers)?.some(item => item?.name === x[0]) || !x[0]?.includes('Arkadaşı')) ? x[0]?.split(' ')[0] : x[0],
                    fullName: x[0],
                    picture: (Object.values(TeamMembers)?.some(item => item?.name === x[0]) || !x[0]?.includes('Arkadaşı')) ?
                        `../../images/${x[0]?.split(' ')[0].toLowerCase()}.jpeg` :
                        `../../images/unknown.png`,
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number ?
                        Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number :
                        Math.floor(Math.random() * (98 - 19 + 1)) + 19,
                    position: x[1]?.position
                }
            } else {
                player = {
                    name: (Object.values(TeamMembers)?.some(item => item?.name === x[0]) || !x[0]?.includes('Arkadaşı')) ? x[0]?.split(' ')[0] : x[0],
                    fullName: x[0],
                    picture: (Object.values(TeamMembers)?.some(item => item?.name === x[0]) || !x[0]?.includes('Arkadaşı')) ?
                        `../../images/${x[0]?.split(' ')[0].toLowerCase()}.jpeg` :
                        `../../images/unknown.png`,
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number ?
                        Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number :
                        Math.floor(Math.random() * (98 - 19 + 1)) + 19,
                    color: gkColor,
                    numberColor: gkNumberColor,
                    position: x[1]?.position
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
                    name: (Object.values(TeamMembers)?.some(item => item?.name === x[0]) || !x[0]?.includes('Arkadaşı'))
                        ? x[0]?.split(' ')[0] : x[0],
                    fullName: x[0],
                    picture: (Object.values(TeamMembers)?.some(item => item?.name === x[0]) || !x[0]?.includes('Arkadaşı')) ?
                        `../../images/${x[0]?.split(' ')[0].toLowerCase()}.jpeg` :
                        `../../images/unknown.png`,
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number ?
                        Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number :
                        Math.floor(Math.random() * (98 - 19 + 1)) + 19
                }
            } else {
                player = {
                    name: (Object.values(TeamMembers)?.some(item => item?.name === x[0]) || !x[0]?.includes('Arkadaşı'))
                        ? x[0]?.split(' ')[0] : x[0],
                    fullName: x[0],
                    picture: (Object.values(TeamMembers)?.some(item => item?.name === x[0]) || !x[0]?.includes('Arkadaşı')) ?
                        `../../images/${x[0]?.split(' ')[0].toLowerCase()}.jpeg` :
                        `../../images/unknown.png`,
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number ?
                        Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number :
                        Math.floor(Math.random() * (98 - 19 + 1)) + 19,
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
            <Box className={squadTabClasses.footballField}>
                <Box className={squadTabClasses.goalkeeper}>
                    {oyesfcSquad?.squad?.gk &&
                        <div className={squadTabClasses.playerDesign}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                badgeContent={(squadRatings && signedIn) &&
                                    <span
                                        style={{
                                            background: bestOfMatch?.name === oyesfcSquad?.squad?.gk?.fullName ? 'royalblue' :
                                                squadRatings?.find(rating => rating?.name === oyesfcSquad?.squad?.gk?.fullName)?.rating >= 7 ? 'darkgreen' :
                                                    squadRatings?.find(rating => rating?.name === oyesfcSquad?.squad?.gk?.fullName)?.rating < 5 ? 'darkred' : 'darkgoldenrod'
                                        }}
                                        className={bestOfMatch?.name === oyesfcSquad?.squad?.gk?.fullName ? squadTabClasses.momRating : squadTabClasses.rating}>
                                        {squadRatings?.find(rating => rating?.name === oyesfcSquad?.squad?.gk?.fullName)?.rating.toFixed(1)}
                                        {bestOfMatch?.name === oyesfcSquad?.squad?.gk?.fullName ?
                                            <StarIcon sx={{height: {xs: '12px', md: '15px'}, width: {xs: '12px', md: '15px'}}} className={classes.momStarIcon}>
                                            </StarIcon> :
                                            null}
                                    </span>
                                }
                            >
                                <Avatar alt="Travis Howard"
                                        src={Object.values(TeamMembers)?.some(item => item?.name === oyesfcSquad?.squad?.gk?.fullName) ? require(`../../images/number${oyesfcSquad?.squad?.gk?.number}.png`) : require("../../images/unknown.png")}
                                        sx={{
                                            height: {xs: '60px', md: '70px'},
                                            width: {xs: '60px', md: '70px'},
                                            border: '3px solid #555'
                                        }}/>
                            </Badge>
                            <div style={{display: 'flex', textAlign: 'center'}}>
                                <span className={squadTabClasses.playerNameStyle}
                                      style={{fontWeight: 'normal', marginRight: '5px'}}>{oyesfcSquad?.squad?.gk?.number}</span>
                                <span className={squadTabClasses.playerNameStyle}>{oyesfcSquad?.squad?.gk?.name}</span>
                            </div>
                        </div>
                    }
                </Box>
                <Box className={squadTabClasses.defense}>
                    {oyesfcSquad?.squad?.df?.sort((a, b) => b?.position - a?.position)?.map((x, y) => (
                        <div key={y} className={squadTabClasses.playerDesign}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                badgeContent={(squadRatings && signedIn) &&
                                    <span
                                        style={{
                                            background: bestOfMatch?.name === x?.fullName ? 'royalblue' :
                                                squadRatings?.find(rating => rating?.name === x?.fullName)?.rating >= 7 ? 'darkgreen' :
                                                    squadRatings?.find(rating => rating?.name === x?.fullName)?.rating < 5 ? 'darkred' : 'darkgoldenrod'
                                        }}
                                        className={bestOfMatch?.name === x?.fullName ? squadTabClasses.momRating : squadTabClasses.rating}>
                                        {squadRatings?.find(rating => rating?.name === x?.fullName)?.rating.toFixed(1)}
                                        {bestOfMatch?.name === x?.fullName ?
                                            <StarIcon sx={{height: {xs: '12px', md: '15px'}, width: {xs: '12px', md: '15px'}}} className={classes.momStarIcon}>
                                            </StarIcon> :
                                            null}
                                    </span>
                                }
                            >
                                <Avatar alt="Travis Howard"
                                        src={Object.values(TeamMembers)?.some(item => item?.name === x?.fullName) ? require(`../../images/number${x?.number}.png`) : require("../../images/unknown.png")}
                                        sx={{
                                            height: {xs: '60px', md: '70px'},
                                            width: {xs: '60px', md: '70px'},
                                            border: '3px solid #555'
                                        }}/>
                            </Badge>
                            <div style={{display: 'flex', textAlign: 'center'}}>
                                <span className={squadTabClasses.playerNameStyle}
                                      style={{fontWeight: 'normal', marginRight: '5px'}}>{x?.number}</span>
                                <span className={squadTabClasses.playerNameStyle}>{x?.name}</span>
                            </div>
                        </div>
                    ))}
                </Box>
                {oyesfcSquad?.squad?.cm?.sort((a, b) => b?.position - a?.position)?.length > 0 &&
                    <Box className={squadTabClasses.midfield}>
                        {oyesfcSquad?.squad?.cm?.map((x, y) => (
                            <div key={y} className={squadTabClasses.playerDesign}>
                            <Badge
                                    overlap="circular"
                                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                    badgeContent={(squadRatings && signedIn) &&
                                        <span
                                            style={{
                                                background: bestOfMatch?.name === x?.fullName ? 'royalblue' :
                                                    squadRatings?.find(rating => rating?.name === x?.fullName)?.rating >= 7 ? 'darkgreen' :
                                                        squadRatings?.find(rating => rating?.name === x?.fullName)?.rating < 5 ? 'darkred' : 'darkgoldenrod'
                                            }}
                                            className={bestOfMatch?.name === x?.fullName ? squadTabClasses.momRating : squadTabClasses.rating}>
                                        {squadRatings?.find(rating => rating?.name === x?.fullName)?.rating.toFixed(1)}
                                            {bestOfMatch?.name === x?.fullName ?
                                                <StarIcon sx={{height: {xs: '12px', md: '15px'}, width: {xs: '12px', md: '15px'}}} className={classes.momStarIcon}>
                                                </StarIcon> :
                                                null}
                                    </span>
                                    }
                                >
                                    <Avatar alt="Travis Howard"
                                            src={Object.values(TeamMembers)?.some(item => item?.name === x?.fullName) ? require(`../../images/number${x?.number}.png`) : require("../../images/unknown.png")}
                                            sx={{
                                                height: {xs: '60px', md: '70px'},
                                                width: {xs: '60px', md: '70px'},
                                                border: '3px solid #555'
                                            }}/>
                                </Badge>
                                <div style={{display: 'flex', textAlign: 'center'}}>
                                    <span className={squadTabClasses.playerNameStyle}
                                          style={{fontWeight: 'normal', marginRight: '5px'}}>{x?.number}</span>
                                    <span className={squadTabClasses.playerNameStyle}>{x?.name}</span>
                                </div>
                            </div>
                        ))}
                    </Box>
                }
                <Box className={squadTabClasses.forward}>
                    {oyesfcSquad?.squad?.fw?.sort((a, b) => b?.position - a?.position)?.map((x, y) => (
                        <div key={y} className={squadTabClasses.playerDesign}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                badgeContent={ (squadRatings && signedIn) &&
                                    <span
                                        style={{
                                            background: bestOfMatch?.name === x?.fullName ? 'royalblue' :
                                                squadRatings?.find(rating => rating?.name === x?.fullName)?.rating >= 7 ? 'darkgreen' :
                                                squadRatings?.find(rating => rating?.name === x?.fullName)?.rating < 5 ? 'darkred' : 'darkgoldenrod'
                                        }}
                                        className={bestOfMatch?.name === x?.fullName ? squadTabClasses.momRating : squadTabClasses.rating}>
                                        {squadRatings?.find(rating => rating?.name === x?.fullName)?.rating.toFixed(1)}
                                        {bestOfMatch?.name === x?.fullName ?
                                            <StarIcon sx={{height: {xs: '12px', md: '15px'}, width: {xs: '12px', md: '15px'}}} className={classes.momStarIcon}>
                                            </StarIcon> :
                                            null}
                                    </span>
                                }
                            >
                                <Avatar alt="Travis Howard"
                                        src={Object.values(TeamMembers)?.some(item => item?.name === x?.fullName) ? require(`../../images/number${x?.number}.png`) : require("../../images/unknown.png")}
                                        sx={{height: {xs: '60px', md: '70px'}, width: {xs: '60px', md: '70px'}, border: '3px solid #555'}}/>
                            </Badge>
                            <div style={{display: 'flex', textAlign: 'center'}}>
                                <span className={squadTabClasses.playerNameStyle} style={{fontWeight: 'normal', marginRight: '5px'}}>{x?.number}</span>
                                <span className={squadTabClasses.playerNameStyle}>{x?.name}</span>
                            </div>
                        </div>
                    ))}
                </Box>
                <Box className={squadTabClasses.emptyField}>
                </Box>
            </Box>
        </>
    );
};

export default SquadTab;
