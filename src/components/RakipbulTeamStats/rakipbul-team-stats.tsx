import React, {useEffect} from 'react';
import {ChartTypes} from "../../constants/constants";
import {loadWebsite} from "../../firebase";
import ChartComponent from "../../shared/ChartComponent/chart-component";
import CardGrid from "../../shared/CardGrid/card-grid";
import ListComponent from "../../shared/ListComponent/list-component";
import {calculateRate} from "../../utils/utils";

const RakipbulTeamStats = () => {

    const [rakipbulData, setRakipbulData] = React.useState(null);
    let goalsScored = 0
    let ourPositions = 0
    let goalsConceded = 0
    let theirPositions = 0

    useEffect(() => {
        if (!rakipbulData) fetchRakipbulData().then(r => r)
    });

    const fetchRakipbulData = async () => {
        try {
            const response: any = await loadWebsite(`rakipbul`);
            setRakipbulData(response)
        } catch (error: any) {
            alert(error?.message);
        }
    }

    if (rakipbulData) {
        Object.values(rakipbulData)?.forEach((item: any) => {
            goalsScored += item?.oyesfc?.goal;
            ourPositions += item?.oyesfc?.position;
            goalsConceded += item?.rival?.goal;
            theirPositions += item?.rival?.position;
        });
    }

    const labels = ['Goal Threats', 'Goals', 'Opponent\'s Goal Threats', 'Opponent\'s Goals']
    const graphData = [ourPositions, goalsScored, theirPositions, goalsConceded]

    const dataForList = [
        ['O Yes FC Created Chances', ourPositions],
        ['O Yes FC Goals', goalsScored],
        ['O Yes FC Goal Conversion Rate', calculateRate(goalsScored, ourPositions) + '%'],
        ['Opponent\'s Goal Threats', theirPositions],
        ['Opponent\'s Goals', goalsConceded],
        ['Opponent\'s Goal Conversion Rate', calculateRate(goalsConceded, theirPositions) + '%'],
    ]

    const cardContent = (
        <>
            <ListComponent data={dataForList}/>
        </>
    )

    const firstPart = (
        <>
            <ChartComponent
                type={ChartTypes.bar}
                color={'green'}
                data={graphData}
                customStyle={{height: '300px'}}
                graphLabels={labels}
                layout={'x'}
                title={'Win Rate'}/>
        </>
    )

    return (
        <>
            {
                rakipbulData ?
                    <CardGrid title={'Goal Threats in 10 Specific Rakipbul Matches'}
                              content={cardContent}
                              firstPart={firstPart}
                              customStyle={{marginBottom: '0'}}/> :
                    <h1>ERROR 404</h1>
            }
        </>

    );
};

export default RakipbulTeamStats;
