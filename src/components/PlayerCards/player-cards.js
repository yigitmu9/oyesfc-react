import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Divider, List, ListItem} from "@mui/material";
import {TeamMembers} from "../../constants/constants";
import classes from "../PlayerCards/player-cards.module.css"

const PlayerCards = ({playerName, data}) => {

    let playerTotalGoal = 0;

    const numberOfMatches = Object.values(data).length;

    Object.values(data).forEach(item => {
        if (item?.oyesfc?.squad[playerName] && playerName !== TeamMembers.can.name) {
            playerTotalGoal += item.oyesfc.squad[playerName].goal;
        }
    });

    const playerTotalMatch = Object.values(data).filter(item =>
        Object.keys(item.oyesfc.squad).includes(playerName)).length;

    const playerNumber = Object.values(TeamMembers).find(x => x.name === playerName).number;

    const imageUrl = Object.entries(TeamMembers).find(x => x[1].name === playerName)[0];

    const getPlayerName = () => {
        if (playerName === TeamMembers.yigit.name) {
            return playerName + ' (C) ';
        } else if (playerName === TeamMembers.can.name) {
            return playerName + ' (GK) ';
        }
        return playerName
    };

    return (
        <Card sx={{ maxHeight: "389px", borderRadius: "25px", width: "278px", marginBottom: "50px" }} style={{backgroundColor: "#242424"}}>
            <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={require(`../../images/${imageUrl}.jpeg`)}
            />
            <CardContent style={{backgroundColor: "#242424"}}>
                <div style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end", width: "94%", margin: "8px"}}>
                    <h3 className={classes.titleStyle}>{getPlayerName()}</h3>
                    <h3 className={classes.titleStyle}>{playerNumber}</h3>
                </div>
                <List  component="nav" aria-label="mailbox folders" style={{backgroundColor: "#242424"}}>
                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                        <p className={classes.fontStyle}>Matches</p>
                        <p className={classes.fontStyle}>{playerTotalMatch}</p>
                    </ListItem>
                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" color="red"/>
                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                        <p className={classes.fontStyle}>Goals</p>
                        <p className={classes.fontStyle}>{playerTotalGoal}</p>
                    </ListItem>
                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                        <p className={classes.fontStyle}>Rate of Attendance</p>
                        <p className={classes.fontStyle}>{((playerTotalMatch / numberOfMatches) * 100).toFixed(0)}%</p>
                    </ListItem>
                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                        <p className={classes.fontStyle}>Goal per Game</p>
                        <p className={classes.fontStyle}>{(playerTotalGoal / playerTotalMatch).toFixed(2)}</p>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}

export default PlayerCards;
