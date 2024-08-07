import React from 'react';
import classes from "./facilities-individual-stats.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {FormControl} from "@mui/material";
import {ChartTypes, TeamMembers} from "../../constants/constants";
import ChartComponent from "../../shared/ChartComponent/chart-component";
import TableComponent from "../../shared/TableComponent/table-component";

const FacilitiesIndividualStats = ({data}) => {

    const tableColumnNames = ['Players', 'Matches', 'Goals', 'Rate of Attendance', 'Goals per Game']
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

    let playerTotalGoalFacilities = 0;
    let playerGoalPerGameData = [];

    let fullData = [];

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

        const playerData = [member.name, playerTotalMatch, playerTotalGoalFacilities, attendanceRate, goalsPerGame]
        playerGoalPerGameData.push(goalsPerGame)
        fullData.push(playerData)
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
                        <TableComponent
                            columns={tableColumnNames}
                            rows={fullData}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FacilitiesIndividualStats;
