import {TeamMembers, WeatherSky} from "../constants/constants";

export const OYesFCPlayersArray = Object.values(TeamMembers).map(x => x.name)

export function calculateIndividualStats(data) {
    let playerData = [];
    Object.values(TeamMembers).forEach(member => {
        let playerTotalGoal = 0;
        Object.values(data).forEach(item => {
            if (item?.oyesfc?.squad[member.name]) {
                const goal = item?.oyesfc?.squad[member.name]?.goal ? item?.oyesfc?.squad[member.name]?.goal : 0;
                playerTotalGoal += goal;
            }
        });

        const playerTotalMatch = Object.values(data)?.filter(item =>
            Object.keys(item?.oyesfc?.squad)?.includes(member?.name))?.length;

        const attendanceRate = ((playerTotalMatch / Object.values(data).length) * 100)?.toFixed(0);
        const goalsPerGame = (playerTotalGoal / playerTotalMatch)?.toFixed(2)

        const statsOfPlayer = [member.name, playerTotalMatch, playerTotalGoal, attendanceRate, goalsPerGame]
        playerData.push(statsOfPlayer)
    });
    return playerData
}

export function calculateTeamStats(data) {
    const numberOfMatches = Object.values(data)?.length;
    const wonMatches = Object.values(data)?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const lostMatches = Object.values(data)?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const drawMatches = Object.values(data)?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    let goalsScored = 0
    Object.values(data)?.forEach(item => {
        goalsScored += item?.oyesfc?.goal;
    });
    let goalsConceded = 0
    Object.values(data)?.forEach(item => {
        goalsConceded += item?.rival?.goal;
    });
    const goalDifference = goalsScored - goalsConceded;
    const scoredGoalsPerGame = (goalsScored / numberOfMatches)?.toFixed(2);
    const concededGoalsPerGame = (goalsConceded / numberOfMatches)?.toFixed(2);
    const goalDifferencePerGame = (goalDifference / numberOfMatches)?.toFixed(2);
    return {
        matches: numberOfMatches,
        win: wonMatches,
        draw: drawMatches,
        lose: lostMatches,
        scoredGoal: goalsScored,
        scoredGoalsPerGame: scoredGoalsPerGame,
        concededGoal: goalsConceded,
        concededGoalsPerGame: concededGoalsPerGame,
        goalDifference: goalDifference,
        goalDifferencePerGame: goalDifferencePerGame
    }
}

export function getCategoryValues(data) {
    let facilitiesArray = [];
    let weatherArray = [];
    let playerNumbersArray = [];
    let rivalsArray = [];
    Object.values(data)?.forEach((x) => {
        if (!facilitiesArray.includes(x.place)) {
            facilitiesArray.push(x.place)
        }
        if (!weatherArray.includes(x?.weather?.weather) && x?.weather?.weather) {
            weatherArray.push(x?.weather?.weather)
        }
        if (!weatherArray.includes(x?.weather?.sky) && x?.weather?.sky === WeatherSky[2]) {
            weatherArray.push(x?.weather?.sky)
        }
        if (!rivalsArray.includes(x.rival.name)) {
            rivalsArray.push(x.rival.name)
        }
        const playerLength = Object.keys(x?.oyesfc?.squad)?.length
        if (!playerNumbersArray.includes(playerLength)) playerNumbersArray.push(playerLength)
    })
    return {
        facilities: facilitiesArray,
        weathers: weatherArray,
        playerNumbers: playerNumbersArray,
        rivals: rivalsArray
    }
}

export const calculateRateInfo = (mainData, otherData) => {
    return Number(mainData) !== 0 ? ((Number(mainData) / (Number(mainData) + Number(otherData))) * 100)?.toFixed(0) : '0';
}

export const calculateRate = (first, second) => {
    return ((first / second) * 100)?.toFixed(0)
}
