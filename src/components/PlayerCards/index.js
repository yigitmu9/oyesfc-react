import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Divider, List, ListItem} from "@mui/material";
import {TeamMembers} from "../../constants/constants";

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

    return (
        <Card sx={{ maxWidth: 1345, borderRadius: "25px", width: "265px" }} style={{backgroundColor: "#242424"}}>
            <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={require(`../../images/${imageUrl}.jpeg`)}
            />
            <CardContent style={{backgroundColor: "#242424"}}>
                <div style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end", width: "94%", margin: "8px"}}>
                    <h3 style={{backgroundColor: "#242424", color: "lightgray", marginBottom: "10px"}}>{playerName === TeamMembers.yigit.name ? playerName + ' (C) ' : playerName}</h3>
                    <h3 style={{backgroundColor: "#242424", color: "lightgray", marginBottom: "10px"}}>{playerNumber}</h3>
                </div>
                <List  component="nav" aria-label="mailbox folders" style={{backgroundColor: "#242424"}}>
                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                        <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 14}}>Matches</p>
                        <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 14}}>{playerTotalMatch}</p>
                    </ListItem>
                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" color="red"/>
                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                        <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 14}}>Goals</p>
                        <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 14}}>{playerTotalGoal}</p>
                    </ListItem>
                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                        <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 14}}>Rate of Attendance</p>
                        <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 14}}>{((playerTotalMatch / numberOfMatches) * 100).toFixed(0)}%</p>
                    </ListItem>
                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                        <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 14}}>Goal per Game</p>
                        <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 14}}>{(playerTotalGoal / playerTotalMatch).toFixed(2)}</p>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}

export default PlayerCards;
