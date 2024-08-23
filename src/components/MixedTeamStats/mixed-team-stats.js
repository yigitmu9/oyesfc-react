import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ChartTypes, Jerseys} from "../../constants/constants";
import ChartComponent from "../../shared/ChartComponent/chart-component";
import TableComponent from "../../shared/TableComponent/table-component";
import SelectionComponent from "../../shared/SelectionComponent/selection-component";
import CardGrid from "../../shared/CardGrid/card-grid";
import {calculateTeamStats, getCategoryValues} from "../../utils/utils";

const MixedTeamStats = ({data}) => {

    const options = useMemo(() => ['Facilities', 'Jerseys', 'Number of Players', 'Rival', 'Weather'], []);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const tableColumnNames =  useMemo(() => [selectedOption, 'Matches', 'Wins', 'Draws', 'Losses', 'Scored', 'Per Game', 'Conceded', 'Per Game'], [selectedOption]);
    const [winRateState, setWinRateState] = useState([]);
    const [labels, setLabels] = useState([]);
    const [fullDataState, setFullDataState] = useState(null);
    const categoryValues = useMemo(() => getCategoryValues(data), [data]);

    const fetchData = useCallback((option) => {
        let result = [];
        let rates = [];
        if (option === options[0]) {
            setLabels(categoryValues.facilities)
            categoryValues.facilities?.forEach(x => {
                const filteredData = Object.values(data)?.filter(item => item.place === x)
                const calculatedData = calculateTeamStats(filteredData)
                const winRate = ((calculatedData.win / calculatedData.matches) * 100)?.toFixed(0);
                const arrayData = Object.values(calculatedData).slice(0, -2);
                const facilityData = [x, ...arrayData]
                result.push(facilityData)
                rates.push(winRate)
            })
        } else if (option === options[1]) {
            setLabels(Jerseys)
            Jerseys.forEach(x => {
                const filteredData = Object.values(data)?.filter(item => item.oyesfc.jersey === x)
                const calculatedData = calculateTeamStats(filteredData)
                const winRate = ((calculatedData.win / calculatedData.matches) * 100)?.toFixed(0);
                const arrayData = Object.values(calculatedData).slice(0, -2);
                const jerseyData = [x, ...arrayData]
                result.push(jerseyData)
                rates.push(winRate)
            })
        } else if (option === options[2]) {
            setLabels(categoryValues.playerNumbers)
            categoryValues.playerNumbers?.forEach(x => {
                const filteredData = Object.values(data)?.filter(item => Object.keys(item?.oyesfc?.squad)?.length === x)
                const calculatedData = calculateTeamStats(filteredData)
                const winRate = ((calculatedData.win / calculatedData.matches) * 100)?.toFixed(0);
                const arrayData = Object.values(calculatedData).slice(0, -2);
                const numberOfPlayersData = [x, ...arrayData]
                result.push(numberOfPlayersData)
                rates.push(winRate)
            })
        } else if (option === options[3]) {
            setLabels(categoryValues.rivals)
            categoryValues.rivals?.forEach(x => {
                const filteredData = Object.values(data)?.filter(item => item.rival.name === x)
                const calculatedData = calculateTeamStats(filteredData)
                const winRate = ((calculatedData.win / calculatedData.matches) * 100)?.toFixed(0);
                const arrayData = Object.values(calculatedData).slice(0, -2);
                const rivalData = [x, ...arrayData]
                result.push(rivalData)
                rates.push(winRate)
            })
        } else if (option === options[4]) {
            setLabels(categoryValues.weathers)
            categoryValues.weathers?.forEach(x => {
                const filteredData = Object.values(data)?.filter(item => item?.weather?.weather === x || item?.weather?.sky === x)
                const calculatedData = calculateTeamStats(filteredData)
                const winRate = ((calculatedData.win / calculatedData.matches) * 100)?.toFixed(0);
                const arrayData = Object.values(calculatedData).slice(0, -2);
                const weatherData = [x, ...arrayData]
                result.push(weatherData)
                rates.push(winRate)
            })
        }
        setFullDataState(result)
        setWinRateState(rates)
    }, [categoryValues.facilities, categoryValues.playerNumbers, categoryValues.rivals, categoryValues.weathers, data, options]);

    useEffect(() => {
        if (selectedOption) {
            fetchData(selectedOption);
        }
    }, [fetchData, selectedOption]);

    const handleOptionChange = (data) => {
        setSelectedOption(data);
    };

    const cardContent = (
        <>
            <ChartComponent
                type={ChartTypes.bar}
                color={'rgb(255, 0, 255)'}
                data={winRateState}
                customStyle={{height: '500px'}}
                graphLabels={labels}
                layout={'y'}
                title={'Win Rate'}
                maxValueBarGraph={100}/>
            <TableComponent
                columns={tableColumnNames}
                rows={fullDataState}
            />
        </>
    )

    const firstPart = (
        <>
            <SelectionComponent options={options} onSelectionChange={handleOptionChange} defaultSelectedValue={true}/>
        </>
    )

    return (
        <CardGrid title={'Category Statistics'} content={cardContent} firstPart={firstPart} />
    );
};

export default MixedTeamStats;

