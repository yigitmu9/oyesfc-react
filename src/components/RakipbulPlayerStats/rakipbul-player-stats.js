import React, {useCallback, useEffect, useState} from 'react';
import {ChartTypes, SnackbarTypes, TeamMembers} from "../../constants/constants";
import {loadWebsite} from "../../firebase";
import ChartComponent from "../../shared/ChartComponent/chart-component";
import {OYesFCPlayersArray} from "../../utils/utils";
import TableComponent from "../../shared/TableComponent/table-component";
import SelectionComponent from "../../shared/SelectionComponent/selection-component";
import CardGrid from "../../shared/CardGrid/card-grid";
import {Alert, Snackbar} from "@mui/material";

const RakipbulPlayerStats = () => {

    const [match, setMatch] = React.useState('Total of All Teams');
    const [rakipbulData, setRakipbulData] = React.useState(null);
    const [snackbarData, setSnackbarData] = useState(null);
    const tableColumnNames = ['Players', 'Number of Positions', 'Goals'];
    const [options, setOptions] = useState(['Total of All Teams']);
    const [playersGoalConvertRate, setPlayersGoalConvertRate] = useState([]);
    const [tableData, setTableData] = useState([]);

    const fetchRakipbulData = async () => {
        try {
            const response = await loadWebsite(`rakipbul`);
            setRakipbulData(response)
            let rakipbulRivals = ['Total of All Teams'];
            Object.values(response).forEach(x => {
                if (!rakipbulRivals?.includes(x?.rival?.name)) rakipbulRivals.push(x?.rival?.name)
            })
            setOptions(rakipbulRivals)
        } catch (error) {
            const errorResponse = {
                open: true,
                status: SnackbarTypes.error,
                message: error?.message,
                duration: 18000
            }
            setSnackbarData(errorResponse)
        }
    }

    useEffect(() => {
        if (!rakipbulData) {
            fetchRakipbulData().then(r => r)
        }
    }, [rakipbulData]);

    const calculateStats = useCallback((matchData) => {
        let playersRakipbulData = [];
        let goalPositionData = [];
        Object.values(TeamMembers).forEach(member => {
            let playerTotalGoal = 0;
            let playerTotalPosition = 0;
            Object.values(matchData).forEach(item => {
                if (item?.oyesfc?.squad[member.name]) {
                    const goal = item?.oyesfc?.squad[member.name]?.goal ? item?.oyesfc?.squad[member.name]?.goal : 0
                    const position = item?.oyesfc?.squad[member.name]?.position ? item?.oyesfc?.squad[member.name]?.position : 0
                    playerTotalGoal += goal;
                    playerTotalPosition += position;
                }
            });

            const goalPositionRate = ((playerTotalGoal / playerTotalPosition) * 100)?.toFixed(0);
            const playerData = [member.name, playerTotalPosition, playerTotalGoal]
            playersRakipbulData.push(playerData)
            goalPositionData.push(goalPositionRate)
        });
        setTableData(playersRakipbulData)
        setPlayersGoalConvertRate(goalPositionData)
    }, []);

    useEffect(() => {
        if (rakipbulData && match) {
            const matchData = match === 'Total of All Teams' ?
                rakipbulData :
                Object.values(rakipbulData).filter(x => x.rival.name === match)
            calculateStats(matchData)
        }
    }, [calculateStats, match, rakipbulData]);

    const handleChange = (data) => {
        setMatch(data);
    };

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarData(null);
    };

    const cardContent = (
        <>
            <ChartComponent
                type={ChartTypes.bar}
                color={'green'}
                data={playersGoalConvertRate}
                customStyle={{height: '400px'}}
                graphLabels={OYesFCPlayersArray}
                layout={'x'}
                title={'Rate of Converting Positions into Goals (%)'}
                maxValueBarGraph={100}/>
            <TableComponent
                columns={tableColumnNames}
                rows={tableData}
            />
        </>
    )

    const firstPart = (
        <>
            <SelectionComponent options={options} onSelectionChange={handleChange} defaultSelectedValue={true}/>
        </>
    )

    return (
        <>
            <CardGrid title={'Goal Conversion Stats Against 7 Rakipbul Teams'} content={cardContent}
                      firstPart={firstPart}
                      customStyle={{marginBottom: '0'}}/>
            <Snackbar open={snackbarData?.open} autoHideDuration={snackbarData?.duration} onClose={closeSnackbar}>
                <Alert
                    onClose={closeSnackbar}
                    severity={snackbarData?.status}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {snackbarData?.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default RakipbulPlayerStats;
