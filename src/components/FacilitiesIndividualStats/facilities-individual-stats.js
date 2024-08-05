import React from 'react';
import classes from "./facilities-individual-stats.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {ChartTypes, TeamMembers} from "../../constants/constants";
import ChartComponent from "../../shared/ChartComponent/chart-component";

const FacilitiesIndividualStats = ({data}) => {

    const players = Object.values(TeamMembers).map(x => x.name)
    let facilities = [];
    Object.values(data)?.forEach((x) => {
        if (!facilities.includes(x.place)) {
            facilities.push(x.place)
        }
    } )
    const [facility, setFacility] = React.useState(null);

    const handleChange = (event) => {
        setFacility(event.target.value);
    };

    const facilityData = Object.values(data).filter(x => x.place === facility)

    const rows = Object.values(TeamMembers).map(x => x.name);
    let playerTotalGoalFacilities = 0;
    let playerGoalDataFacilities = [];
    let playerAttendanceDataFacilities = [];
    let playerGoalPerGameData = [];
    let playerMatchData = [];

    const numberOfMatches = Object.values(facilityData).length;

    Object.values(TeamMembers).forEach(member => {
        playerTotalGoalFacilities = 0;
        Object.values(facilityData).forEach(item => {
            if (item?.oyesfc?.squad[member.name] && member.name !== TeamMembers.can.name) {
                playerTotalGoalFacilities += item.oyesfc.squad[member.name].goal;
            }
        });

        const playerTotalMatch = Object.values(facilityData).filter(item =>
            Object.keys(item.oyesfc.squad).includes(member.name)).length;

        const attendanceRate = ((playerTotalMatch / numberOfMatches) * 100)?.toFixed(0);
        const goalsPerGame = (playerTotalGoalFacilities / playerTotalMatch)?.toFixed(2)

        playerGoalDataFacilities.push(playerTotalGoalFacilities)
        playerAttendanceDataFacilities.push(attendanceRate)
        playerMatchData.push(playerTotalMatch)
        playerGoalPerGameData.push(goalsPerGame)
    });

    return (
        <div className={classes.grid}>
            <Card sx={{ borderRadius: "25px", width: "100%", height: "auto", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center" }}>
                <h1 className={classes.titleStyle}>Facilities</h1>
                <div className={classes.selectionGrid}>
                    <div className={classes.selectionInsideGrid}>
                        <FormControl className={classes.colorStyle} fullWidth>
                            <label className={classes.colorStyle}>
                                <select className={classes.select} onChange={handleChange}>
                                    <option>Select Facility</option>
                                    {facilities.map((x, y) => (
                                        <option key={y} value={x}>{x}</option>
                                    ))}
                                </select>
                            </label>
                        </FormControl>
                    </div>
                </div>
                <CardContent style={{backgroundColor: "#242424"}}>
                    <div className={classes.cardContentInsideStyle}>
                        <ChartComponent
                            type={ChartTypes.bar}
                            color={'darkred'}
                            data={playerGoalPerGameData}
                            customStyle={{height: '500px'}}
                            graphLabels={players}
                            layout={'y'}
                            title={'Goals per Game'}/>
                        <div className={classes.tableStyle}>
                            <TableContainer style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table" style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                    <TableHead style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                        <TableRow style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>Players</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Matches</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Goals</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Rate of Attendance</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Goals per Game</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, number) => (
                                            <TableRow
                                                key={row}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}
                                            >
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} component="th" scope="row">
                                                    {row}
                                                </TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerMatchData[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerGoalDataFacilities[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerAttendanceDataFacilities[number]}%</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerGoalPerGameData[number]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FacilitiesIndividualStats;
