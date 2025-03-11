import {
    DirectionList,
    Facilities,
    FifaCalculations,
    matchType,
    TeamMembers,
    WeatherSky,
} from '../constants/constants';

export const OYesFCPlayersArray: string[] = Object.values(TeamMembers).map((x: any) => x.name);

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
            Object.keys(item?.oyesfc?.squad)?.includes(member?.name)
        )?.length;

        const attendanceRate = ((playerTotalMatch / Object.values(data).length) * 100)?.toFixed(0);
        const goalsPerGame = (playerTotalGoal / playerTotalMatch)?.toFixed(2);

        const statsOfPlayer = [member.name, playerTotalMatch, playerTotalGoal, attendanceRate, goalsPerGame];
        playerData.push(statsOfPlayer);
    });
    return playerData;
}

export function calculateTeamStats(data: any) {
    const numberOfMatches = Object.values(data)?.length;
    const wonMatches = Object.values(data)?.filter((x: any) => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const lostMatches = Object.values(data)?.filter((x: any) => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const drawMatches = Object.values(data)?.filter((x: any) => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    let goalsScored = 0;
    Object.values(data)?.forEach((item: any) => {
        goalsScored += item?.oyesfc?.goal;
    });
    let goalsConceded = 0;
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
        goalDifferencePerGame: goalDifferencePerGame,
    };
}

export function getCategoryValues(data: any) {
    let facilitiesArray: any[] = [];
    let weatherArray: any[] = [];
    let playerNumbersArray: any[] = [];
    let rivalsArray: any[] = [];
    Object.values(data)?.forEach((x: any) => {
        if (!facilitiesArray.includes(x.place)) {
            facilitiesArray.push(x.place);
        }
        if (!weatherArray.includes(x?.weather?.weather) && x?.weather?.weather) {
            weatherArray.push(x?.weather?.weather);
        }
        if (!weatherArray.includes(x?.weather?.sky) && x?.weather?.sky === WeatherSky[2]) {
            weatherArray.push(x?.weather?.sky);
        }
        if (!rivalsArray.includes(x.rival.name)) {
            rivalsArray.push(x.rival.name);
        }
        const playerLength = Object.keys(x?.oyesfc?.squad)?.length;
        if (!playerNumbersArray.includes(playerLength)) playerNumbersArray.push(playerLength);
    });
    return {
        facilities: facilitiesArray,
        weathers: weatherArray,
        playerNumbers: playerNumbersArray,
        rivals: rivalsArray,
    };
}

export const calculateRateInfo = (mainData: any, otherData: any) => {
    return Number(mainData) !== 0
        ? ((Number(mainData) / (Number(mainData) + Number(otherData))) * 100)?.toFixed(0)
        : '0';
};

export const calculateRate = (first: any, second: any) => {
    return ((first / second) * 100)?.toFixed(0);
};

export function returnFilteredData(databaseData: any, confirmedFilters: any, videosData: any, ratingsData: any) {
    let filteredData;

    if (confirmedFilters?.appliedType === 'rakipbul') {
        filteredData = Object.values(databaseData).filter((x: any) => x.rakipbul);
    } else if (confirmedFilters?.appliedType === 'normal') {
        filteredData = Object.values(databaseData).filter((x: any) => !x.rakipbul);
    } else {
        filteredData = Object.values(databaseData);
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedPlayers?.length > 0) {
        filteredData = filteredData?.filter((x: any) =>
            confirmedFilters?.appliedPlayers?.every(
                (v: any) => typeof v === 'string' && Object.keys(x?.oyesfc?.squad || {}).includes(v)
            )
        );
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedFacilities?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedFacilities?.includes(x?.place));
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedYears?.length > 0) {
        filteredData = filteredData?.filter((x: any) =>
            confirmedFilters?.appliedYears?.includes(x.day.substring(x.day.lastIndexOf('-') + 1))
        );
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedMonths?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedMonths?.includes(x.day.split('-')[1]));
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedRivals?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedRivals?.includes(x?.rival.name));
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedJersey?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedJersey?.includes(x?.oyesfc?.jersey));
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedSky?.length > 0) {
        filteredData = filteredData?.filter((x: any) => confirmedFilters?.appliedSky?.includes(x?.weather?.sky));
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedTemperature?.length > 0) {
        if (confirmedFilters?.appliedTemperature?.includes('Hot Weather')) {
            filteredData = Object.values(filteredData).filter((x: any) => x?.weather?.temperature > 15);
        }
        if (confirmedFilters?.appliedTemperature?.includes('Cold Weather')) {
            filteredData = Object.values(filteredData).filter((x: any) => x?.weather?.temperature < 16);
        }
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedNumberOfPlayers?.length > 0) {
        filteredData = filteredData?.filter((x: any) =>
            confirmedFilters?.appliedNumberOfPlayers?.includes(Object.keys(x?.oyesfc?.squad)?.length?.toString())
        );
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedSquad !== 'All') {
        let foreignDataIndex = calculateForeignData(databaseData);
        if (confirmedFilters?.appliedSquad === 'Main Squad') {
            filteredData = Object.values(filteredData).filter((x: any, y: number) => !foreignDataIndex.includes(y));
        } else if (confirmedFilters?.appliedSquad === 'Squad Including Foreigners') {
            filteredData = Object.values(filteredData).filter((x: any, y: number) => foreignDataIndex.includes(y));
        }
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedMatchVideos) {
        filteredData = Object.values(filteredData).filter((x: any) => Object.keys(videosData).includes(x?.day));
    }

    if (filteredData?.length > 0 && confirmedFilters?.appliedRatingMatches) {
        filteredData = Object.values(filteredData).filter((x: any) => Object.keys(ratingsData).includes(x?.day));
    }

    return filteredData;
}

export const hasAppliedFilters = (filters: any) => {
    return !!(
        filters?.appliedType ||
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
        filters?.appliedSquad
    );
};

export const calculateForeignData = (data: any) => {
    let foreignDataIndex: any[] = [];
    Object.values(data).forEach((item: any, index: number) => {
        for (let i = 0; i < Object.keys(item.oyesfc.squad).length; i++) {
            if (!OYesFCPlayersArray.includes(Object.keys(item.oyesfc.squad)[i])) {
                if (!foreignDataIndex.includes(index)) {
                    foreignDataIndex.push(index);
                }
            }
        }
    });
    return foreignDataIndex;
};

export const sortData = (data: any) => {
    return Object.values(data)
        ?.slice()
        .sort((x: any, y: any): any => {
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
                return null;
            }
        });
};

export const findMatchType = (match: any) => {
    const today = new Date();
    const [day, month, year] = match?.day?.split('-')?.map(Number);
    const [startTime, endTime] = match?.time?.split('-');
    const [startHour, startMinute] = startTime?.split(':')?.map(Number);
    const [endHour, endMinute] = endTime === '00:00' ? [23, 59] : endTime?.split(':')?.map(Number);
    const startDateTime = new Date(year, month - 1, day, startHour, startMinute);
    const endDateTime = new Date(year, month - 1, day, endHour, endMinute);

    if (endDateTime > today && today >= startDateTime) return matchType.live;
    else if (startDateTime > today) return matchType.upcoming;
    else if (endDateTime <= today) return matchType.previous;
    return null;
};

export const returnAverageData = (data: any, notEnoughData?: boolean) => {
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
        averagesResult[key] = notEnoughData ? '0' : avg.toFixed(2);
    }
    return averagesResult;
};

export const redirect = (direction: any) => {
    if (direction === DirectionList.instagram)
        window.open('https://www.instagram.com/oyesfc?igsh=MXRrbmp1a3lvdW4wNg==', '_blank');
    if (direction === DirectionList.twitter) window.open('https://x.com/oyesfc?s=21', '_blank');
    if (direction === DirectionList.reddit) window.open('https://www.reddit.com/r/a:t5_4r4dfa/', '_blank');
    if (direction === DirectionList.youtube) window.open('https://youtube.com/@oyesfc?si=ER9YlrYaittkOeRu', '_blank');
    if (direction === DirectionList.email) window.location.href = 'mailto:oyesfc@gmail.com';
};

export const getGeoCoordinates = (place: any) => {
    const xLocation = Facilities.find((x: any) => x?.name === place)?.xAppleLocation;
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

export const calculateOverall = (role: any, playerRatingData: any) => {
    let overallScore = 0;
    let totalWeight = 0;

    FifaCalculations.forEach(({ name, calculation }: any) => {
        const weight = calculation[role] || 0;

        if (weight > 0) {
            overallScore += playerRatingData?.[name] * weight;
            totalWeight += weight;
        }
    });

    return (overallScore / totalWeight)?.toFixed(2);
};

export const calculateAttributes = (playerRatingData: any, playerName: string) => {
    if (playerRatingData) {
        const PAC = ((Number(playerRatingData['Acceleration']) + Number(playerRatingData['Sprint speed'])) / 2).toFixed(
            2
        );
        const SHO = (
            (Number(playerRatingData['Finishing']) +
                Number(playerRatingData['Long Shots']) +
                Number(playerRatingData['Penalties']) +
                Number(playerRatingData['Shot Power']) +
                Number(playerRatingData['Volleys'])) /
            5
        ).toFixed(2);
        const PAS = (
            (Number(playerRatingData['Crossing']) +
                Number(playerRatingData['Curve']) +
                Number(playerRatingData['Free Kick Accuracy']) +
                Number(playerRatingData['Long Passing']) +
                Number(playerRatingData['Short Passing']) +
                Number(playerRatingData['Vision'])) /
            6
        ).toFixed(2);
        const DRI = (
            (Number(playerRatingData['Agility']) +
                Number(playerRatingData['Balance']) +
                Number(playerRatingData['Ball Control']) +
                Number(playerRatingData['Composure']) +
                Number(playerRatingData['Dribbling']) +
                Number(playerRatingData['Reactions'])) /
            6
        ).toFixed(2);
        const DEF = (
            (Number(playerRatingData['Defensive Awareness']) +
                Number(playerRatingData['Interceptions']) +
                Number(playerRatingData['Sliding Tackle']) +
                Number(playerRatingData['Standing Tackle']) +
                Number(playerRatingData['Heading Accuracy'])) /
            5
        ).toFixed(2);
        const PHY = (
            (Number(playerRatingData['Aggression']) +
                Number(playerRatingData['Jumping']) +
                Number(playerRatingData['Stamina']) +
                Number(playerRatingData['Strength'])) /
            4
        ).toFixed(2);

        const DIV = Number(playerRatingData['GK Diving']).toFixed(2);
        const HAN = Number(playerRatingData['GK Handling']).toFixed(2);
        const KIC = Number(playerRatingData['GK Kicking']).toFixed(2);
        const REF = Number(playerRatingData['GK Reflexes']).toFixed(2);
        const POS = Number(playerRatingData['GK Positioning']).toFixed(2);

        if (playerName === TeamMembers.can.name)
            return [Number(DIV), Number(HAN), Number(KIC), Number(REF), Number(PAC), Number(POS)];
        return [Number(PAC), Number(SHO), Number(PAS), Number(DRI), Number(DEF), Number(PHY)];
    }
};

export const calculatePlayerRatings = (rates: any, allData: any, filteredData: any, playerName: any) => {
    const superFilteredData: any = Object.entries(rates)?.filter((x: any) => {
        const oyesfcMemberLengthFirst: any = Object.values(allData)?.find((match: any) => match?.day === x[0]);
        const oyesfcMemberLength: any = Object.entries(oyesfcMemberLengthFirst?.oyesfc?.squad)
            ?.map((a: any) => a[0])
            ?.filter((b) => OYesFCPlayersArray?.includes(b))?.length;
        const showRatingsFirst: any = Object.values(allData)?.find((match: any) => match?.day === x[0]);
        const showRatings: any = showRatingsFirst?.showRatings;
        const differenceInHoursFirst: any = Object.values(allData)?.find((match: any) => match?.day === x[0]);
        const differenceInHoursSecond: any = Object.values(allData)?.find((match: any) => match?.day === x[0]);
        const differenceInHours: any = hourDifference(differenceInHoursFirst?.day, differenceInHoursSecond?.time);
        return (
            Object.values(filteredData)
                ?.map((x: any) => x?.day)
                ?.includes(x[0]) &&
            (Object.values(x[1]?.rates)?.length >= oyesfcMemberLength ||
                showRatings === 'enable' ||
                (differenceInHours >= 48 && Object.values(x[1]?.rates)?.length >= 4)) &&
            showRatings !== 'disable'
        );
    });
    const matchCount = superFilteredData.filter((superMatch: any) => {
        const first: any = Object.values(allData)?.find((match: any) => match?.day === superMatch[0]);
        return Object.keys(first?.oyesfc?.squad)?.includes(playerName);
    })?.length;
    let totalRating: any = 0;
    let eachMatchRatings: any = [];
    let eachMatchRatingsTotal: any = 0;

    if (superFilteredData.length > 0) {
        superFilteredData?.forEach((matchData: any) => {
            totalRating = 0;
            const ratings = Object.values(matchData[1]?.rates)
                .filter((y: any) => Object.keys(y).includes(playerName))
                .map((x: any) => x[playerName]);
            ratings.forEach((x) => {
                totalRating += x;
            });
            totalRating = ratings?.length ? totalRating / ratings?.length : 0;
            eachMatchRatings.push(totalRating);
        });
        eachMatchRatings.forEach((x: any) => {
            eachMatchRatingsTotal += x;
        });
        const averageRating = matchCount ? eachMatchRatingsTotal / matchCount : 0;
        if (averageRating !== 0) {
            const mvpCount = calculateAverageRatings(superFilteredData, playerName);
            return {
                rating: averageRating ? Number(averageRating.toFixed(2)) : '-',
                mvp: mvpCount,
            };
        }
    }
    return {
        rating: '0',
        mvp: '0',
    };
};

export const calculateAverageRatings = (data: any, playerName: any) => {
    let averageRatings: any = {};
    let bestOfMatches: any = [];
    let count = 0;

    data?.forEach((matchData: any) => {
        averageRatings = {};
        if (!matchData || !matchData[1]?.rates) return;
        const matchRatings = matchData[1]?.rates;
        Object.keys(matchRatings)?.forEach((key) => {
            const ratings = matchRatings[key];
            Object.keys(ratings)?.forEach((player) => {
                const rating = ratings[player];
                averageRatings[player] = (averageRatings[player] || 0) + rating;
            });
        });
        Object.keys(averageRatings)?.forEach((player) => {
            averageRatings[player] /= Object.values(matchRatings)?.filter((x: any) =>
                Object.keys(x)?.includes(player)
            )?.length;
        });
        const topPlayerOfThisMatch = findTopPlayers(averageRatings);
        bestOfMatches.push(topPlayerOfThisMatch[0]);
    });

    bestOfMatches?.forEach((name: any) => {
        if (name === playerName) {
            count++;
        }
    });

    return count;
};

export const findTopPlayers = (averageRatings?: any) => {
    const values: any = Object.values(averageRatings);
    const maxAverage = Math.max(...values);
    return Object.keys(averageRatings)?.filter((player) => averageRatings[player] === maxAverage);
};

export const hourDifference = (matchDay?: any, time?: any) => {
    const [day, month, year] = matchDay.split('-');
    const matchTime = time.split('-');
    const endTime = matchTime[1] === '00:00' ? '23:59' : matchTime[1];
    const [hour, minute] = endTime.split(':');
    const inputDateTime: any = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
    const now: any = new Date();
    return (now - inputDateTime) / (1000 * 60 * 60);
};

export const getPlayerStats = (data: any, playerName: any) => {
    const playerTotalMatch = Object.values(data).filter((item: any) =>
        Object.keys(item.oyesfc.squad).includes(playerName)
    ).length;
    let playerTotalGoal = 0;
    let oldBootGoals = 0;
    let newBootGoals = 0;
    let bootGoalsData: any;
    let hattrickCount = 0;
    let longestGoalStreak = 0;
    let currentStreak = 0;
    let maxGoalsInOneMatch = 0;
    const player: any = Object.values(TeamMembers).find(x => x.name === playerName)
    const sortedMatches: any = Object.values(data).sort((a: any, b: any) => {
        return new Date(a.day.split("-").reverse().join("-")).getTime() -
            new Date(b.day.split("-").reverse().join("-")).getTime();
    });
    sortedMatches.forEach((item: any) => {
        if (item?.oyesfc?.squad[playerName]) {
            playerTotalGoal += item.oyesfc.squad[playerName].goal;
            hattrickCount += item.oyesfc.squad[playerName].goal > 2 ? 1 : 0
            const goals = item.oyesfc.squad[playerName].goal;
            const matchDate = item.day.split("-").reverse().join("-");

            if (goals > 0) {
                currentStreak++;
                longestGoalStreak = Math.max(longestGoalStreak, currentStreak);
            } else {
                currentStreak = 0;
            }

            if (goals > 0 && goals > maxGoalsInOneMatch) {
                maxGoalsInOneMatch = goals;
            }

            if (player.oldBootData?.length) {
                let currentBoot = player.oldBootData[0];

                for (const boot of player.oldBootData) {
                    if (matchDate < boot.changeDate.split("-").reverse().join("-")) break;
                    currentBoot = boot;
                }

                if (matchDate < currentBoot.changeDate.split("-").reverse().join("-")) {
                    oldBootGoals += goals;
                } else {
                    newBootGoals += goals;
                }
            } else {
                newBootGoals += goals;
            }
        }
    });
    const numberOfMatches = Object.values(data).length;
    if (player?.oldBootData) {
        bootGoalsData = [
            [`${player?.oldBootData?.[0]?.bootBrand} ${player?.oldBootData?.[0]?.bootCollection} ${player?.oldBootData?.[0]?.bootModel} Goals`, oldBootGoals],
            [`${player?.bootBrand} ${player?.bootCollection} ${player?.bootModel} Goals`, newBootGoals],
        ];
    } else {
        bootGoalsData = [
            [`${player?.bootBrand} ${player?.bootCollection} ${player?.bootModel} Goals`, newBootGoals],
        ];
    }
    return {
        totalMatch: playerTotalMatch,
        totalGoal: playerTotalGoal,
        goalPerGame: (playerTotalGoal / playerTotalMatch).toFixed(2),
        attendanceRate: ((playerTotalMatch / numberOfMatches) * 100).toFixed(0),
        bootGoalsData: bootGoalsData,
        hattrickCount: hattrickCount,
        longestGoalStreak: longestGoalStreak,
        maxGoalsInOneMatch: maxGoalsInOneMatch
    };
};

export const extractYoutubeVideoId = (url?: any) => {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    if (hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
    }
    if (hostname === 'www.youtube.com' || hostname === 'youtube.com') {
        if (urlObj.pathname.includes('/shorts/')) {
            return urlObj.pathname.split('/shorts/')[1];
        }
        return urlObj.searchParams.get('v');
    }
    return null;
};

export const extractGoogleDriveFileId = (url?: any) => {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    if (pathname.includes('/file/d/')) {
        return pathname.split('/file/d/')[1].split('/')[0];
    }
    if (urlObj.searchParams.get('id')) {
        return urlObj.searchParams.get('id');
    }
    return null;
};
