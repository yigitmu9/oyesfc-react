import classes from "./advanced-filters.module.css";
import React, {useEffect, useRef, useState} from "react";
import {Jerseys, TeamMembers, WeatherSky} from "../../constants/constants";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import matchDetailsClasses from '../MatchDetails/match-details.module.css'

const AdvancedFilters = ({onClose, databaseData, setFilters}) => {

    const filtersInStorage = JSON.parse(localStorage.getItem('filters'));
    document.body.style.overflow = 'hidden';
    const [matchType, setMatchType] = useState(!filtersInStorage?.appliedType ? 'all' : filtersInStorage?.appliedType);
    const popupRef = useRef(null);
    const [filteredPlayers, setFilteredPlayers] = useState(!filtersInStorage?.appliedPlayers ? [] : filtersInStorage?.appliedPlayers)
    const [filteredFacilities, setFilteredFacilities] = useState(!filtersInStorage?.appliedFacilities ? [] : filtersInStorage?.appliedFacilities)
    const [filteredYears, setFilteredYears] = useState(!filtersInStorage?.appliedYears ? [] : filtersInStorage?.appliedYears);
    const [filteredMonths, setFilteredMonths] = useState(!filtersInStorage?.appliedMonths ? [] : filtersInStorage?.appliedMonths);
    const [filteredRivals, setFilteredRivals] = useState(!filtersInStorage?.appliedRivals ? [] : filtersInStorage?.appliedRivals);
    const [filteredJersey, setFilteredJersey] = useState(!filtersInStorage?.appliedJersey ? [] : filtersInStorage?.appliedJersey);
    const [filteredSky, setFilteredSky] = useState(!filtersInStorage?.appliedSky ? [] : filtersInStorage?.appliedSky);
    const [filteredTemperature, setFilteredTemperature] = useState(!filtersInStorage?.appliedTemperature ? [] : filtersInStorage?.appliedTemperature);
    const [filteredSquad, setFilteredSquad] = useState(!filtersInStorage?.appliedSquad ? 'All' : filtersInStorage?.appliedSquad);
    const [filteredNumberOfPlayers, setFilteredNumberOfPlayers] = useState(!filtersInStorage?.appliedNumberOfPlayers ? [] : filtersInStorage?.appliedNumberOfPlayers);
    let facilities = [];
    let years = [];
    let months = [];
    let rivalNames = [];
    let playerLengthArray = [];
    let appliedFilters = {};
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const matchCategories = ['All', 'Rakipbul', 'Normal']
    const squadTypes = ['All', 'Main Squad', 'Squad Including Foreigners']

    Object.values(databaseData)?.forEach((x) => {
        if (!facilities.includes(x.place) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            facilities.push(x.place)
        }
    })

    Object.values(databaseData)?.forEach((x) => {
        const dateYear = x.day.substring(x.day.lastIndexOf("-") + 1)
        if (!years.includes(dateYear) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            years.push(dateYear)
        }
    })

    Object.values(databaseData)?.forEach((x) => {
        const dateMonth = x.day.split('-')[1];
        if (!months.includes(dateMonth) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            months.push(dateMonth)
        }
    })

    Object.values(databaseData)?.forEach((x) => {
        if (!rivalNames.includes(x.rival.name) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            rivalNames.push(x.rival.name)
        }
    })

    Object.values(databaseData)?.forEach(x => {
        const playerLength = Object.keys(x?.oyesfc?.squad)?.length
        if (!playerLengthArray.includes(playerLength)) playerLengthArray.push(playerLength)
    });
    playerLengthArray = playerLengthArray.sort()

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    });

    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    const resetFilters = () => {
        setMatchType('all')
        setFilteredPlayers([])
        setFilteredFacilities([])
        setFilteredYears([])
        setFilteredMonths([])
        setFilteredRivals([])
        setFilteredTemperature([])
        setFilteredJersey([])
        setFilteredSky([])
        setFilteredNumberOfPlayers([])
        setFilteredSquad('All')
    }

    const handleMatchTypeChange = (event) => {
        const {name} = event.target;
        const checked = event.target.checked;
        if (name !== matchType && checked) {
            resetFilters();
            setMatchType(name)
        }
    };

    const handlePlayerChange = (event) => {
        const {name} = event.target;
        const checked = event.target.checked;
        if (filteredPlayers?.includes(name) && !checked) {
            setFilteredPlayers(filteredPlayers?.filter(x => x !== name))
        } else if (!filteredPlayers?.includes(name) && checked) {
            setFilteredPlayers(prevFilteredPlayers => [...prevFilteredPlayers, name]);
        }
    };

    const handleFacilityChange = (event) => {
        const {name} = event.target;
        const checked = event.target.checked;
        if (filteredFacilities?.includes(name) && !checked) {
            setFilteredFacilities(filteredFacilities?.filter(x => x !== name))
        } else if (!filteredFacilities?.includes(name) && checked) {
            setFilteredFacilities(prevFilteredFacilities => [...prevFilteredFacilities, name]);
        }
    };

    const handleYearChange = (event) => {
        const {name} = event.target;
        const checked = event.target.checked;
        if (filteredYears?.includes(name) && !checked) {
            setFilteredYears(filteredYears?.filter(x => x !== name));
        } else if (!filteredYears?.includes(name) && checked) {
            setFilteredYears(prevFilteredYears => [...prevFilteredYears, name]);
        }
    };

    const handleMonthChange = (event) => {
        const {name} = event.target;
        const checked = event.target.checked;
        if (filteredMonths?.includes(name) && !checked) {
            setFilteredMonths(filteredMonths?.filter(x => x !== name));
        } else if (!filteredMonths?.includes(name) && checked) {
            setFilteredMonths(prevFilteredMonths => [...prevFilteredMonths, name]);
        }
    };

    const handleRivalChange = (event) => {
        const {name} = event.target;
        const checked = event.target.checked;
        if (filteredRivals?.includes(name) && !checked) {
            setFilteredRivals(filteredRivals?.filter(x => x !== name));
        } else if (!filteredRivals?.includes(name) && checked) {
            setFilteredRivals(prevFilteredRivals => [...prevFilteredRivals, name]);
        }
    };

    const handleSquadTypeChange = (event) => {
        const {name} = event.target;
        const checked = event.target.checked;
        if (name !== filteredSquad && checked) {
            setFilteredSquad(name)
        }
    };

    const handleJerseyChange = (event) => {
        const {name} = event.target;
        const checked = event.target.checked;
        if (filteredJersey?.includes(name) && !checked) {
            setFilteredJersey(filteredJersey?.filter(x => x !== name));
        } else if (!filteredJersey?.includes(name) && checked) {
            setFilteredJersey(prevFilteredJersey => [...prevFilteredJersey, name]);
        }
    };

    const handleSkyChange = (event) => {
        const {name} = event.target;
        const checked = event.target.checked;
        if (filteredSky?.includes(name) && !checked) {
            setFilteredSky(filteredSky?.filter(x => x !== name));
        } else if (!filteredSky?.includes(name) && checked) {
            setFilteredSky(prevFilteredSky => [...prevFilteredSky, name]);
        }
    };

    const handleTemperatureChange = (event) => {
        const {name} = event.target;
        const checked = event.target.checked;
        if (filteredTemperature?.includes(name) && !checked) {
            setFilteredTemperature(filteredTemperature?.filter(x => x !== name));
        } else if (!filteredTemperature?.includes(name) && checked) {
            setFilteredTemperature(prevFilteredTemperature => [...prevFilteredTemperature, name]);
        }
    };

    const handleNumberOfPlayersChange = (event) => {
        const {name} = event.target;
        const checked = event.target.checked;
        if (filteredNumberOfPlayers?.includes(name) && !checked) {
            setFilteredNumberOfPlayers(filteredNumberOfPlayers?.filter(x => x !== name));
        } else if (!filteredNumberOfPlayers?.includes(name) && checked) {
            setFilteredNumberOfPlayers(prevFilteredNumberOfPlayers => [...prevFilteredNumberOfPlayers, name]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (matchType !== 'all' ||
            filteredPlayers?.length > 0 ||
            filteredFacilities?.length > 0 ||
            filteredYears?.length > 0 ||
            filteredMonths?.length > 0 ||
            filteredRivals?.length > 0 ||
            filteredJersey?.length > 0 ||
            filteredSky?.length > 0 ||
            filteredTemperature?.length > 0 ||
            filteredNumberOfPlayers?.length > 0 ||
            filteredSquad !== 'All') {
            appliedFilters = {
                appliedType: matchType,
                appliedPlayers: filteredPlayers,
                appliedFacilities: filteredFacilities,
                appliedYears: filteredYears,
                appliedMonths: filteredMonths,
                appliedRivals: filteredRivals,
                appliedJersey: filteredJersey,
                appliedSky: filteredSky,
                appliedTemperature: filteredTemperature,
                appliedNumberOfPlayers: filteredNumberOfPlayers,
                appliedSquad: filteredSquad
            }
            localStorage.setItem('filters', JSON.stringify(appliedFilters))
        } else {
            localStorage.clear();
        }
        const finalData = returnFilteredData(databaseData, appliedFilters)
        setFilters(finalData)
        handleClose();
    };

    return (
        <div className={matchDetailsClasses.overlay}>
            <div className={classes.popupContainer} style={{display: "block", background: "#1f1f1f"}} ref={popupRef}>
                <div style={{display: "block", height: '100%'}}>
                    <form onSubmit={handleSubmit} style={{background: "#1f1f1f"}}>
                        <div className={classes.formAlign}>
                            <div className={classes.filterPartStyle}>
                                <h2 className={classes.title}>Match Type</h2>
                                {matchCategories.map((x, y) => (
                                    <div key={y} style={{background: "#1f1f1f"}}>
                                        <label style={{background: "#1f1f1f"}}
                                               className={classes.customCheckbox}>
                                            {x}
                                            <input
                                                type="checkbox"
                                                name={x.toLowerCase()}
                                                onChange={handleMatchTypeChange}
                                                checked={matchType === x.toLowerCase()}
                                            />
                                            <span className={classes.checkmark}></span>
                                        </label>
                                        <br/>
                                    </div>
                                ))}
                            </div>
                            <div style={{background: "#1f1f1f"}}>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Players</h2>
                                    {Object.values(TeamMembers).map((x, y) => (
                                        <div key={y} style={{background: "#1f1f1f"}}>
                                            <label style={{background: "#1f1f1f"}}
                                                   className={classes.customCheckbox}>
                                                {x.name}
                                                <input
                                                    type="checkbox"
                                                    name={x.name}
                                                    onChange={handlePlayerChange}
                                                    checked={filteredPlayers?.includes(x.name)}
                                                />
                                                <span className={classes.checkmark}></span>
                                            </label>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Facilities</h2>
                                    {facilities.sort().map((x, y) => (
                                        <div key={y} style={{background: "#1f1f1f"}}>
                                            <label style={{background: "#1f1f1f"}}
                                                   className={classes.customCheckbox}>
                                                {x}
                                                <input
                                                    type="checkbox"
                                                    name={x}
                                                    onChange={handleFacilityChange}
                                                    checked={filteredFacilities?.includes(x)}
                                                />
                                                <span className={classes.checkmark}></span>
                                            </label>
                                            <br/>
                                        </div>

                                    ))}
                                </div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Years</h2>
                                    {years.sort((a, b) => {
                                        return b - a;
                                    }).map((x, y) => (
                                        <div key={y} style={{background: "#1f1f1f"}}>
                                            <label style={{background: "#1f1f1f"}}
                                                   className={classes.customCheckbox}>
                                                {x}
                                                <input
                                                    type="checkbox"
                                                    name={x}
                                                    onChange={handleYearChange}
                                                    checked={filteredYears?.includes(x)}
                                                />
                                                <span className={classes.checkmark}></span>
                                            </label>
                                            <br/>
                                        </div>

                                    ))}
                                </div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Months</h2>
                                    {months.sort((a, b) => {
                                        return a - b;
                                    }).map((x, y) => (
                                        <div key={y} style={{background: "#1f1f1f"}}>
                                            <label style={{background: "#1f1f1f"}}
                                                   className={classes.customCheckbox}>
                                                {monthNames[Number(x) - 1]}
                                                <input
                                                    type="checkbox"
                                                    name={x}
                                                    onChange={handleMonthChange}
                                                    checked={filteredMonths?.includes(x)}
                                                />
                                                <span className={classes.checkmark}></span>
                                            </label>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Rivals</h2>
                                    {rivalNames.sort().map((x, y) => (
                                        <div key={y} style={{background: "#1f1f1f"}}>
                                            <label style={{background: "#1f1f1f"}}
                                                   className={classes.customCheckbox}>
                                                {x}
                                                <input
                                                    type="checkbox"
                                                    name={x}
                                                    onChange={handleRivalChange}
                                                    checked={filteredRivals?.includes(x)}
                                                />
                                                <span className={classes.checkmark}></span>
                                            </label>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Match Squad</h2>
                                    {squadTypes.map((x, y) => (
                                        <div key={y} style={{background: "#1f1f1f"}}>
                                            <label style={{background: "#1f1f1f"}}
                                                   className={classes.customCheckbox}>
                                                {x}
                                                <input
                                                    type="checkbox"
                                                    name={x}
                                                    onChange={handleSquadTypeChange}
                                                    checked={filteredSquad === x}
                                                />
                                                <span className={classes.checkmark}></span>
                                            </label>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Jersey</h2>
                                    {Jerseys.map((x, y) => (
                                        <div key={y} style={{background: "#1f1f1f"}}>
                                            <label style={{background: "#1f1f1f"}}
                                                   className={classes.customCheckbox}>
                                                {x}
                                                <input
                                                    type="checkbox"
                                                    name={x}
                                                    onChange={handleJerseyChange}
                                                    checked={filteredJersey?.includes(x)}
                                                />
                                                <span className={classes.checkmark}></span>
                                            </label>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Sky</h2>
                                    {WeatherSky.map((x, y) => (
                                        <div key={y} style={{background: "#1f1f1f"}}>
                                            <label style={{background: "#1f1f1f"}}
                                                   className={classes.customCheckbox}>
                                                {x}
                                                <input
                                                    type="checkbox"
                                                    name={x}
                                                    onChange={handleSkyChange}
                                                    checked={filteredSky?.includes(x)}
                                                />
                                                <span className={classes.checkmark}></span>
                                            </label>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Temperature</h2>
                                    <div style={{background: "#1f1f1f"}}>
                                        <label style={{background: "#1f1f1f"}}
                                               className={classes.customCheckbox}>
                                            Cold Weather{' (<16'}&#176;{')'}
                                            <input
                                                type="checkbox"
                                                name={'Cold Weather'}
                                                onChange={handleTemperatureChange}
                                                checked={filteredTemperature?.includes('Cold Weather')}
                                            />
                                            <span className={classes.checkmark}></span>
                                        </label>
                                        <br/>
                                    </div>
                                    <div style={{background: "#1f1f1f"}}>
                                        <label style={{background: "#1f1f1f"}}
                                               className={classes.customCheckbox}>
                                            Hot Weather{' (>15'}&#176;{')'}
                                            <input
                                                type="checkbox"
                                                name={'Hot Weather'}
                                                onChange={handleTemperatureChange}
                                                checked={filteredTemperature?.includes('Hot Weather')}
                                            />
                                            <span className={classes.checkmark}></span>
                                        </label>
                                        <br/>
                                    </div>
                                </div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Number of Players</h2>
                                    {playerLengthArray?.map((x, y) => (
                                        <div key={y} style={{background: "#1f1f1f"}}>
                                            <label style={{background: "#1f1f1f"}}
                                                   className={classes.customCheckbox}>
                                                {x + 'v' + x}
                                                <input
                                                    type="checkbox"
                                                    name={x}
                                                    onChange={handleNumberOfPlayersChange}
                                                    checked={filteredNumberOfPlayers?.includes(x.toString())}
                                                />
                                                <span className={classes.checkmark}></span>
                                            </label>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={classes.buttonDivStyle}>
                            <button className={matchDetailsClasses.mapsButtons}
                                    onClick={handleSubmit}>Apply
                            </button>
                            <div className={matchDetailsClasses.mapsButtons}
                                 onClick={resetFilters}>
                                <FilterListOffIcon style={{height: "21px", width: "21px"}}>
                                </FilterListOffIcon>
                            </div>
                            <div className={matchDetailsClasses.mapsButtons} onClick={handleClose}>Cancel</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AdvancedFilters;

export function returnFilteredData(databaseData, confirmedFilters) {
    let filteredData;
    const players = Object.values(TeamMembers).map(x => x.name)

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
        let foreignDataIndex = [];
        Object.values(filteredData).forEach((item, index) => {
            for (let i = 0; i < Object.keys(item.oyesfc.squad).length; i++) {
                if (!players.includes(Object.keys(item.oyesfc.squad)[i])) {
                    if (!foreignDataIndex.includes(index)) {
                        foreignDataIndex.push(index)
                    }
                }
            }
        });
        if (confirmedFilters?.appliedSquad === 'Main Squad') {
            filteredData = Object.values(filteredData).filter((x, y) => !foreignDataIndex.includes(y))
        } else if (confirmedFilters?.appliedSquad === 'Squad Including Foreigners') {
            filteredData = Object.values(filteredData).filter((x, y) => foreignDataIndex.includes(y))
        }
    }
    return filteredData;
}