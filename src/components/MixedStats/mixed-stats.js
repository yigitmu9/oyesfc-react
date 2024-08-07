/*
import React, {useEffect, useState} from 'react';
import classes from "./facilities-individual-stats.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Chip, FormControl} from "@mui/material";
import {ChartTypes, Jerseys, TeamMembers} from "../../constants/constants";
import ChartComponent from "../../shared/ChartComponent/chart-component";
import TableComponent from "../../shared/TableComponent/table-component";

const MixedStats = ({data}) => {

    const players = Object.values(TeamMembers).map(x => x.name)
    const tableColumnNames = ['Players', 'Matches', 'Goals', 'Rate of Attendance', 'Goals per Game']
    const statTypes = ['Facilities', 'Rival', 'Jerseys', 'Number of Players']
    const [statType, setStatType] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        if (statType) {
            updateSecondOptions(statType);
        }
    }, [statType]);

    useEffect(() => {
        if (statType && selectedOption) {
            fetchData(statType, selectedOption);
        }
    }, [statType, selectedOption]);

    let playerTotalGoal = 0;
    let playerGoalPerGameData = [];
    let fullData = [];

    const fetchData = (type, option) => {
        const fetchedData = type === statTypes[0] ? Object.values(data).filter(x => x.place === option) :
            type === statTypes[1] ? Object.values(data).filter(x => x.rival.name === option) :
                type === statTypes[2] ? Object.values(data).filter(x => x.oyesfc.jersey === option) :
                    type === statTypes[3] ? Object.values(data).filter(x => Object.keys(x?.oyesfc?.squad)?.length?.toString() === option) : [];

        Object.values(TeamMembers).forEach(member => {
            playerTotalGoal = 0;
            Object.values(fetchedData).forEach(item => {
                if (item?.oyesfc?.squad[member.name] && member.name !== TeamMembers.can.name) {
                    playerTotalGoal += item.oyesfc.squad[member.name].goal;
                }
            });

            const playerTotalMatch = Object.values(fetchedData)?.filter(item =>
                Object.keys(item?.oyesfc?.squad)?.includes(member?.name))?.length;

            const attendanceRate = ((playerTotalMatch / Object.values(fetchedData).length) * 100)?.toFixed(0);
            const goalsPerGame = (playerTotalGoal / playerTotalMatch)?.toFixed(2)

            const playerData = [member.name, playerTotalMatch, playerTotalGoal, attendanceRate, goalsPerGame]
            playerGoalPerGameData.push(goalsPerGame)
            fullData.push(playerData)
        });
    };

    const updateSecondOptions = (type) => {
        let optionsArray = [];
        if (type === statTypes[0]) {
            Object.values(data)?.forEach((x) => {
                if (!optionsArray.includes(x.place)) {
                    optionsArray.push(x.place)
                }
            })
        } else if (type === statTypes[1]) {
            Object.values(data)?.forEach((x) => {
                if (!optionsArray.includes(x.rival.name)) {
                    optionsArray.push(x.rival.name)
                }
            })
        } else if (type === statTypes[2]) {
            optionsArray = Jerseys
        } else if (type === statTypes[3]) {
            Object.values(data)?.forEach((x) => {
                const playerLength = Object.keys(x?.oyesfc?.squad)?.length
                if (!optionsArray.includes(playerLength)) optionsArray.push(playerLength)
            })
        }
        setOptions(optionsArray);
        setSelectedOption('');
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className={classes.grid}>
            <Card sx={{ borderRadius: "25px", width: "100%", height: "auto", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center" }}>
                <h1 className={classes.titleStyle}>Player Stats</h1>
                <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '30px'}}>
                    {statTypes?.map((x, i) => (
                        <Chip key={i}
                              sx={{bgcolor: statType === x ? 'lightgray' : '#404040', color:  statType === x ? 'black' : 'lightgray'}}
                              label={x}
                              onClick={() => setStatType(statTypes[i])} />
                    ))}
                </div>

                <div className={classes.selectionGrid}>
                    <div className={classes.selectionInsideGrid}>
                        <FormControl className={classes.colorStyle} fullWidth>
                            <label className={classes.colorStyle}>
                                <select className={classes.select} onChange={handleChange}>
                                    {options.map((x, y) => (
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

export default MixedStats;

 */
