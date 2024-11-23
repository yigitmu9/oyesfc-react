import {DirectionList, Facilities, matchType, TeamMembers, WeatherSky} from "../constants/constants";

export const OYesFCPlayersArray: string[] = Object.values(TeamMembers).map((x: any) => x.name)

export function calculateIndividualStats(data: any) {
    let playerData: any[] = [];
    Object.values(TeamMembers).forEach((member: any) => {
        let playerTotalGoal = 0;
        Object.values(data).forEach((item: any) => {
            if (item?.oyesfc?.squad[member.name]) {
                const goal = item?.oyesfc?.squad[member.name]?.goal ? item?.oyesfc?.squad[member.name]?.goal : 0;
                playerTotalGoal += goal;
            }
        });

        const playerTotalMatch = Object.values(data)?.filter((item: any) =>
            Object.keys(item?.oyesfc?.squad)?.includes(member?.name))?.length;

        const attendanceRate = ((playerTotalMatch / Object.values(data).length) * 100)?.toFixed(0);
        const goalsPerGame = (playerTotalGoal / playerTotalMatch)?.toFixed(2)

        const statsOfPlayer = [member.name, playerTotalMatch, playerTotalGoal, attendanceRate, goalsPerGame]
        playerData.push(statsOfPlayer)
    });
    return playerData
}

export function calculateTeamStats(data: any) {
    const numberOfMatches = Object.values(data)?.length;
    const wonMatches = Object.values(data)?.filter((x: any) => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const lostMatches = Object.values(data)?.filter((x: any) => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const drawMatches = Object.values(data)?.filter((x: any) => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    let goalsScored = 0
    Object.values(data)?.forEach((item: any) => {
        goalsScored += item?.oyesfc?.goal;
    });
    let goalsConceded = 0
    Object.values(data)?.forEach((item: any) => {
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

export function getCategoryValues(data: any) {
    let facilitiesArray:any[] = [];
    let weatherArray:any[] = [];
    let playerNumbersArray:any[] = [];
    let rivalsArray:any[] = [];
    Object.values(data)?.forEach((x: any) => {
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

export const calculateRateInfo = (mainData: any, otherData: any) => {
    return Number(mainData) !== 0 ? ((Number(mainData) / (Number(mainData) + Number(otherData))) * 100)?.toFixed(0) : '0';
}

export const calculateRate = (first: any, second: any) => {
    return ((first / second) * 100)?.toFixed(0)
}

export function returnFilteredData(databaseData: any, confirmedFilters: any, videosData: any, ratingsData: any) {
    let filteredData;

    if (confirmedFilters?.appliedType === 'rakipbul') {
        filteredData = Object.values(databaseData).filter((x: any) => x.rakipbul)
    } else if (confirmedFilters?.appliedType === 'normal') {
        filteredData = Object.values(databaseData).filter((x: any) => !x.rakipbul)
    } else {
        filteredData = Object.values(databaseData);
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedPlayers?.length > 0) {
        filteredData = filteredData?.filter((x: any) =>
            confirmedFilters?.appliedPlayers?.every((v: any) =>
                typeof v === 'string' &&
                Object.keys(x?.oyesfc?.squad || {}).includes(v)
            )
        );
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedFacilities?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedFacilities?.includes(x?.place))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedYears?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedYears?.includes(x.day.substring(x.day.lastIndexOf("-") + 1)))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedMonths?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedMonths?.includes(x.day.split('-')[1]))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedRivals?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedRivals?.includes(x?.rival.name))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedJersey?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedJersey?.includes(x?.oyesfc?.jersey))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedSky?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedSky?.includes(x?.weather?.sky))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedTemperature?.length > 0) {
        if (confirmedFilters?.appliedTemperature?.includes('Hot Weather')) {
            filteredData = Object.values(filteredData).filter((x: any) => x?.weather?.temperature > 15)
        }
        if (confirmedFilters?.appliedTemperature?.includes('Cold Weather')) {
            filteredData = Object.values(filteredData).filter((x: any) => x?.weather?.temperature < 16)
        }
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedNumberOfPlayers?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedNumberOfPlayers?.includes(Object.keys(x?.oyesfc?.squad)?.length?.toString()))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedSquad !== 'All') {
        let foreignDataIndex = calculateForeignData(databaseData)
        if (confirmedFilters?.appliedSquad === 'Main Squad') {
            filteredData = Object.values(filteredData).filter((x: any, y: number) => !foreignDataIndex.includes(y))
        } else if (confirmedFilters?.appliedSquad === 'Squad Including Foreigners') {
            filteredData = Object.values(filteredData).filter((x: any, y: number) => foreignDataIndex.includes(y))
        }
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedMatchVideos) {
        filteredData = Object.values(filteredData).filter((x: any) => Object.keys(videosData).includes(x?.day))
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedRatingMatches) {
        filteredData = Object.values(filteredData).filter((x: any) => Object.keys(ratingsData).includes(x?.day))
    }

    return filteredData;
}

export const hasAppliedFilters = (filters: any) => {
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

export const calculateForeignData = (data: any) => {
    let foreignDataIndex: any[] = [];
    Object.values(data).forEach((item: any, index: number) => {
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

export const sortData = (data: any) => {
    return Object.values(data)?.slice().sort((x: any, y: any): any => {
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

export const findMatchType = (match: any) => {
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

export const returnAverageData = (data: any) => {
    const calculatedAverages: any = {};
    for (const user in data) {
        for (const key in data[user]) {
            if (calculatedAverages[key]) {
                calculatedAverages[key].push(data[user][key]);
            } else {
                calculatedAverages[key] = [data[user][key]];
            }
        }
    }
    const averagesResult: any = {};
    for (const key in calculatedAverages) {
        const values = calculatedAverages[key];
        const avg = values.reduce((a: any, b: any) => a + b, 0) / values.length;
        averagesResult[key] = avg.toFixed(2);
    }
    return averagesResult;
}

export const redirect = (direction: any) => {
    if (direction === DirectionList.instagram) window.open("https://www.instagram.com/oyesfc?igsh=MXRrbmp1a3lvdW4wNg==", "_blank");
    if (direction === DirectionList.twitter) window.open("https://x.com/oyesfc?s=21", "_blank");
    if (direction === DirectionList.reddit) window.open("https://www.reddit.com/r/a:t5_4r4dfa/", "_blank");
    if (direction === DirectionList.youtube) window.open("https://youtube.com/@oyesfc?si=ER9YlrYaittkOeRu", "_blank");
    if (direction === DirectionList.email) window.location.href = "mailto:oyesfc@gmail.com";
}

export const getGeoCoordinates = (place: any) => {
    const xLocation = Facilities.find((x: any) => x?.name === place)?.xAppleLocation
    const xLocationWithoutSpaces = xLocation?.replace(/\s+/g, '');
    const match = xLocationWithoutSpaces?.match(/geo:[\d.,]+/);
    return match ? match[0]?.split(':')[1] : 'Geo coordinates not found';
};

export const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
