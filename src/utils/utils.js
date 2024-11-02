import {matchType, TeamMembers, WeatherSky} from "../constants/constants";

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

export function returnFilteredData(databaseData, confirmedFilters, videosData, ratingsData) {
    let filteredData;

    if (confirmedFilters?.appliedType === 'rakipbul') {
        filteredData = Object.values(databaseData).filter(x => x.rakipbul === true)
    } else if (confirmedFilters?.appliedType === 'normal') {
        filteredData = Object.values(databaseData).filter(x => x.rakipbul === false)
    } else {
        filteredData = Object.values(databaseData);
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedPlayers?.length > 0) {
        filteredData = filteredData?.filter(x =>
            confirmedFilters?.appliedPlayers?.every(v =>
                typeof v === 'string' &&
                Object.keys(x?.oyesfc?.squad || {}).includes(v)
            )
        );
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedFacilities?.length > 0) {
        filteredData = filteredData?.filter(x => confirmedFilters?.appliedFacilities?.includes(x?.place))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedYears?.length > 0) {
        filteredData = filteredData?.filter(x => confirmedFilters?.appliedYears?.includes(x.day.substring(x.day.lastIndexOf("-") + 1)))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedMonths?.length > 0) {
        filteredData = filteredData?.filter(x => confirmedFilters?.appliedMonths?.includes(x.day.split('-')[1]))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedRivals?.length > 0) {
        filteredData = filteredData?.filter(x => confirmedFilters?.appliedRivals?.includes(x?.rival.name))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedJersey?.length > 0) {
        filteredData = filteredData?.filter(x => confirmedFilters?.appliedJersey?.includes(x?.oyesfc?.jersey))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedSky?.length > 0) {
        filteredData = filteredData?.filter(x => confirmedFilters?.appliedSky?.includes(x?.weather?.sky))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedTemperature?.length > 0) {
        if (confirmedFilters?.appliedTemperature?.includes('Hot Weather')) {
            filteredData = Object.values(filteredData).filter(x => x?.weather?.temperature > 15)
        }
        if (confirmedFilters?.appliedTemperature?.includes('Cold Weather')) {
            filteredData = Object.values(filteredData).filter(x => x?.weather?.temperature < 16)
        }
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedNumberOfPlayers?.length > 0) {
        filteredData = filteredData?.filter(x => confirmedFilters?.appliedNumberOfPlayers?.includes(Object.keys(x?.oyesfc?.squad)?.length?.toString()))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedSquad !== 'All') {
        let foreignDataIndex = calculateForeignData(databaseData)
        if (confirmedFilters?.appliedSquad === 'Main Squad') {
            filteredData = Object.values(filteredData).filter((x, y) => !foreignDataIndex.includes(y))
        } else if (confirmedFilters?.appliedSquad === 'Squad Including Foreigners') {
            filteredData = Object.values(filteredData).filter((x, y) => foreignDataIndex.includes(y))
        }
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedMatchVideos) {
        filteredData = Object.values(filteredData).filter(x => Object.keys(videosData).includes(x?.day))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedRatingMatches) {
        filteredData = Object.values(filteredData).filter(x => Object.keys(ratingsData).includes(x?.day))
    }

    return filteredData;
}

export const hasAppliedFilters = (filters) => {
    return !!(filters?.appliedType ||
        filters?.appliedPlayers ||
        filters?.appliedFacilities ||
        filters?.appliedYears ||
        filters?.appliedMonths ||
        filters?.appliedRivals ||
        filters?.appliedJersey ||
        filters?.appliedSky ||
        filters?.appliedTemperature ||
        filters?.appliedNumberOfPlayers ||
        filters?.appliedRatingMatches ||
        filters?.appliedMatchVideos ||
        filters?.appliedSquad);
}

export const calculateForeignData = (data) => {
    let foreignDataIndex = [];
    Object.values(data).forEach((item, index) => {
        for (let i = 0; i < Object.keys(item.oyesfc.squad).length; i++) {
            if (!OYesFCPlayersArray.includes(Object.keys(item.oyesfc.squad)[i])) {
                if (!foreignDataIndex.includes(index)) {
                    foreignDataIndex.push(index)
                }
            }
        }
    });
    return foreignDataIndex
}

export const sortData = (data) => {
    return Object.values(data)?.slice().sort((x, y) => {
        if (x.day && y.day) {
            const [dayA, monthA, yearA] = x.day.split('-').map(Number);
            const [dayB, monthB, yearB] = y.day.split('-').map(Number);
            if (yearA !== yearB) {
                return yearB - yearA;
            }
            if (monthA !== monthB) {
                return monthB - monthA;
            }
            return dayB - dayA;
        } else {
            return null
        }
    });
}

export const findMatchType = (match) => {
    const today = new Date();
    const [day, month, year] = match?.day?.split('-')?.map(Number);
    const [startTime, endTime] = match?.time?.split('-');
    const [startHour, startMinute] = startTime?.split(':')?.map(Number);
    const [endHour, endMinute] = endTime === '00:00' ? [23, 59] : endTime?.split(':')?.map(Number);
    const startDateTime = new Date(year, month - 1, day, startHour, startMinute);
    const endDateTime = new Date(year, month - 1, day, endHour, endMinute);

    if (endDateTime > today && today >= startDateTime) return matchType.live
    else if (startDateTime > today) return matchType.upcoming
    else if (endDateTime <= today) return matchType.previous
    return null
}

export const returnAverageData = (data) => {
    const calculatedAverages = {};
    for (const user in data) {
        for (const key in data[user]) {
            if (calculatedAverages[key]) {
                calculatedAverages[key].push(data[user][key]);
            } else {
                calculatedAverages[key] = [data[user][key]];
            }
        }
    }
    const averagesResult = {};
    for (const key in calculatedAverages) {
        const values = calculatedAverages[key];
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        averagesResult[key] = avg.toFixed(2);
    }
    return averagesResult;
}