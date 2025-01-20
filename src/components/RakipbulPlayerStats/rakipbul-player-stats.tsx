import React, { useCallback, useEffect, useState } from 'react';
import { ChartTypes, TeamMembers } from '../../constants/constants';
import { loadWebsite } from '../../firebase';
import ChartComponent from '../../shared/ChartComponent/chart-component';
import { OYesFCPlayersArray } from '../../utils/utils';
import TableComponent from '../../shared/TableComponent/table-component';
import SelectionComponent from '../../shared/SelectionComponent/selection-component';
import CardGrid from '../../shared/CardGrid/card-grid';

const RakipbulPlayerStats = () => {
    const [match, setMatch] = React.useState('Total of All Teams');
    const [rakipbulData, setRakipbulData] = React.useState(null);
    const tableColumnNames = ['Players', 'Number of Positions', 'Goals'];
    const [options, setOptions] = useState(['Total of All Teams']);
    const [playersGoalConvertRate, setPlayersGoalConvertRate] = useState([]);
    const [tableData, setTableData] = useState([]);

    const fetchRakipbulData = async () => {
        try {
            const response: any = await loadWebsite(`rakipbul`);
            setRakipbulData(response);
            let rakipbulRivals = ['Total of All Teams'];
            Object.values(response).forEach((x: any) => {
                if (!rakipbulRivals?.includes(x?.rival?.name)) rakipbulRivals.push(x?.rival?.name);
            });
            setOptions(rakipbulRivals);
        } catch (error: any) {
            alert(error?.message);
        }
    };

    useEffect(() => {
        if (!rakipbulData) {
            fetchRakipbulData().then((r) => r);
        }
    }, [rakipbulData]);

    const calculateStats = useCallback((matchData: any) => {
        let playersRakipbulData: any = [];
        let goalPositionData: any = [];
        Object.values(TeamMembers).forEach((member) => {
            let playerTotalGoal = 0;
            let playerTotalPosition = 0;
            Object.values(matchData).forEach((item: any) => {
                if (item?.oyesfc?.squad[member.name]) {
                    const goal = item?.oyesfc?.squad[member.name]?.goal ? item?.oyesfc?.squad[member.name]?.goal : 0;
                    const position = item?.oyesfc?.squad[member.name]?.position
                        ? item?.oyesfc?.squad[member.name]?.position
                        : 0;
                    playerTotalGoal += goal;
                    playerTotalPosition += position;
                }
            });

            const goalPositionRate = ((playerTotalGoal / playerTotalPosition) * 100)?.toFixed(0);
            const playerData = [member.name, playerTotalPosition, playerTotalGoal];
            playersRakipbulData.push(playerData);
            goalPositionData.push(goalPositionRate);
        });
        setTableData(playersRakipbulData);
        setPlayersGoalConvertRate(goalPositionData);
    }, []);

    useEffect(() => {
        if (rakipbulData && match) {
            const matchData =
                match === 'Total of All Teams'
                    ? rakipbulData
                    : Object.values(rakipbulData).filter((x: any) => x.rival.name === match);
            calculateStats(matchData);
        }
    }, [calculateStats, match, rakipbulData]);

    const handleChange = (data?: any) => {
        setMatch(data);
    };

    const cardContent = (
        <>
            <ChartComponent
                type={ChartTypes.bar}
                color={'green'}
                data={playersGoalConvertRate}
                customStyle={{ height: '400px' }}
                graphLabels={OYesFCPlayersArray}
                layout={'x'}
                title={'Rate of Converting Positions into Goals (%)'}
                maxValueBarGraph={100}
            />
            <TableComponent columns={tableColumnNames} rows={tableData} />
        </>
    );

    const firstPart = (
        <>
            <SelectionComponent options={options} onSelectionChange={handleChange} defaultSelectedValue={true} />
        </>
    );

    return (
        <>
            {rakipbulData ? (
                <CardGrid
                    title={'Goal Conversion Stats Against 7 Rakipbul Teams'}
                    content={cardContent}
                    firstPart={firstPart}
                    customStyle={{ marginBottom: '0' }}
                />
            ) : (
                <h1>ERROR 404</h1>
            )}
        </>
    );
};

export default RakipbulPlayerStats;
