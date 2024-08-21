import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ChartTypes, Jerseys} from "../../constants/constants";
import ChartComponent from "../../shared/ChartComponent/chart-component";
import TableComponent from "../../shared/TableComponent/table-component";
import SelectionComponent from "../../shared/SelectionComponent/selection-component";
import CardGrid from "../../shared/CardGrid/card-grid";
import {calculateIndividualStats, getCategoryValues, OYesFCPlayersArray} from "../../utils/utils";

const MixedStats = ({data}) => {

    const tableColumnNames = ['Players', 'Matches', 'Goals', 'Rate of Attendance', 'Goals per Game']
    const statTypes = useMemo(() => ['Facilities', 'Jerseys', 'Number of Players', 'Rival', 'Weather'], []);
    const [statType, setStatType] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [playerGoalPerGameDataState, setPlayerGoalPerGameDataState] = useState([]);
    const emptyData = OYesFCPlayersArray.map(x => [x, 0, 0, 0, 0])
    const [fullDataState, setFullDataState] = useState(emptyData);

    const updateSecondOptions = useCallback((type) => {
        let optionsArray = [];
        if (type === statTypes[0]) {
            optionsArray = getCategoryValues(data)?.facilities
        } else if (type === statTypes[1]) {
            optionsArray = getCategoryValues(data)?.rivals
        } else if (type === statTypes[2]) {
            optionsArray = Jerseys
        } else if (type === statTypes[3]) {
            optionsArray = getCategoryValues(data)?.playerNumbers
        } else if (type === statTypes[4]) {
            optionsArray = getCategoryValues(data)?.weathers
        }
        setOptions(optionsArray);
        setSelectedOption('');
    }, [data, statTypes]);

    useEffect(() => {
        if (statType) {
            updateSecondOptions(statType);
        }
    }, [statType, updateSecondOptions]);

    const fetchData = useCallback((type, option) => {
        const fetchedData = type === statTypes[0] ? Object.values(data).filter(x => x.place === option) :
            type === statTypes[1] ? Object.values(data).filter(x => x.rival.name === option) :
                type === statTypes[2] ? Object.values(data).filter(x => x.oyesfc.jersey === option) :
                    type === statTypes[3] ? Object.values(data).filter(x => Object.keys(x?.oyesfc?.squad)?.length?.toString() === option) :
                        type === statTypes[4] ? Object.values(data).filter(x => x?.weather?.weather === option || x?.weather?.sky === option) : [];

        const playerStats = calculateIndividualStats(fetchedData);
        const graphData = playerStats?.map(x => x[4])
        setPlayerGoalPerGameDataState(graphData)
        setFullDataState(playerStats)
    }, [data, statTypes]);

    useEffect(() => {
        if (statType && selectedOption) {
            fetchData(statType, selectedOption);
        }
    }, [statType, selectedOption, fetchData]);

    const handleDetailChange = (data) => {
        setSelectedOption(data);
    };

    const handleCategoryChange = (data) => {
        setStatType(data);
    };

    const cardContent = (
        <>
            <ChartComponent
                type={ChartTypes.bar}
                color={'rgb(255, 99, 132)'}
                data={playerGoalPerGameDataState}
                customStyle={{height: '500px'}}
                graphLabels={OYesFCPlayersArray}
                layout={'y'}
                title={'Goals per Game'}/>
            <TableComponent
                columns={tableColumnNames}
                rows={fullDataState}
            />
        </>
    )

    const firstPart = (
        <>
            <SelectionComponent options={statTypes} onSelectionChange={handleCategoryChange} defaultSelectedValue={false}/>
            <SelectionComponent options={options} onSelectionChange={handleDetailChange} defaultSelectedValue={false}/>
        </>
    )

    return (
        <CardGrid title={'Category Statistics'} content={cardContent} firstPart={firstPart} />
    );
};

export default MixedStats;

