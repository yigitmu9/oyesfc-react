import React, {useState} from 'react';
import {calculateIndividualStats, OYesFCPlayersArray, calculateRateInfo} from "../../utils/utils";
import CardGrid from "../../shared/CardGrid/card-grid";
import TubeGraph from "../../shared/TubeGraph/tube-graph";
import SelectionComponent from "../../shared/SelectionComponent/selection-component";
import {useSelector} from "react-redux";

const WeatherIndividualStats = () => {

    const { filteredData } = useSelector((state) => state.databaseData);
    const hotWeather = Object.values(filteredData).filter(item => item?.weather?.temperature > 15);
    const coldWeather = Object.values(filteredData).filter(item => item?.weather?.temperature < 16);

    const emptyData = [
        [0, 'Matches', 0, 0, 100],
        [0, 'Goals', 0, 0, 100],
        [0, 'Rate of Attendance', 0, 0, 100],
        [0, 'Goals per Game', 0, 0, 100],
    ]
    const [value, setValue] = useState(emptyData)
    const calculatedColdWeatherData = calculateIndividualStats(coldWeather)
    const calculatedHotWeatherData = calculateIndividualStats(hotWeather)

    const readyData = (player) => {
        const playerColdData = calculatedColdWeatherData?.find(x => x?.includes(player))
        const playerHotData = calculatedHotWeatherData?.find(x => x?.includes(player))

        return [
            [playerHotData[1], 'Matches', playerColdData[1],
                calculateRateInfo(playerHotData[1], playerColdData[1]),
                100 - Number(calculateRateInfo(playerHotData[1], playerColdData[1]))],
            [Number(playerHotData[2]), 'Goals', playerColdData[2],
                calculateRateInfo(playerHotData[2], playerColdData[2]),
                100 - Number(calculateRateInfo(playerHotData[2], playerColdData[2]))],
            [playerHotData[3], 'Rate of Attendance', playerColdData[3],
                calculateRateInfo(playerHotData[3], playerColdData[3]),
                100 - Number(calculateRateInfo(playerHotData[3], playerColdData[3]))],
            [playerHotData[4], 'Goals per Game', playerColdData[4],
                calculateRateInfo(playerHotData[4], playerColdData[4]),
                100 - Number(calculateRateInfo(playerHotData[4], playerColdData[4]))],
        ]
    }

    const handleSelect = (data) => {
        const graphData = readyData(data)
        setValue(graphData)
    }

    const selectionContent = (
        <SelectionComponent defaultSelectedValue={false}
                            onSelectionChange={handleSelect}
                            options={OYesFCPlayersArray}/>
    )

    const graphContent = (
        <TubeGraph data={value}
                   leftColor={'red'}
                   leftName={'Hot Weather'}
                   rightName={'Cold Weather'}
                   rightColor={'blue'}/>
    )

    return (
        <CardGrid title={'Temperature Stats'} firstPart={selectionContent} content={graphContent}/>
    );
};

export default WeatherIndividualStats;
