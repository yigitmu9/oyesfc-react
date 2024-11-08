import classes from "./advanced-filters.module.css";
import React, {useState} from "react";
import {Jerseys, TeamMembers, WeatherSky} from "../../constants/constants";
import BackButton from "../../shared/BackButton/back-button";
import Box from "@mui/material/Box";
import {returnFilteredData} from "../../utils/utils";
import {loadWebsite} from "../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {updateData} from "../../redux/databaseDataSlice";
import navbarClasses from "../Navbar/navbar.module.css";
import accountClasses from "../AccountGrid/account-grid.module.css";
import {useNavigate} from "react-router-dom";

const AdvancedFilters = () => {

    const dispatch = useDispatch();
    const {allData} = useSelector((state) => state.databaseData);
    const filtersInStorage = JSON.parse(localStorage.getItem('filters'));
    const [matchType, setMatchType] = useState(!filtersInStorage?.appliedType ? 'all' : filtersInStorage?.appliedType);
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
    const [filteredMatchVideos, setFilteredMatchVideos] = useState(!filtersInStorage?.appliedMatchVideos ? false : filtersInStorage?.appliedMatchVideos);
    const [filteredRatingMatches, setFilteredRatingMatches] = useState(!filtersInStorage?.appliedRatingMatches ? false : filtersInStorage?.appliedRatingMatches);
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
    const navigate = useNavigate()

    Object.values(allData)?.forEach((x) => {
        if (!facilities.includes(x.place) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            facilities.push(x.place)
        }
    })

    Object.values(allData)?.forEach((x) => {
        const dateYear = x.day.substring(x.day.lastIndexOf("-") + 1)
        if (!years.includes(dateYear) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            years.push(dateYear)
        }
    })

    Object.values(allData)?.forEach((x) => {
        const dateMonth = x.day.split('-')[1];
        if (!months.includes(dateMonth) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            months.push(dateMonth)
        }
    })

    Object.values(allData)?.forEach((x) => {
        if (!rivalNames.includes(x.rival.name) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            rivalNames.push(x.rival.name)
        }
    })

    Object.values(allData)?.forEach(x => {
        const playerLength = Object.keys(x?.oyesfc?.squad)?.length
        if (!playerLengthArray.includes(playerLength)) playerLengthArray.push(playerLength)
    });
    playerLengthArray = playerLengthArray.sort()

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
        setFilteredRatingMatches(false)
        setFilteredMatchVideos(false)
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

    const handleMatchVideosChange = (event) => {
        const checked = event.target.checked;
        if (filteredMatchVideos && !checked) {
            setFilteredMatchVideos(false)
        } else if (!filteredMatchVideos && checked) {
            setFilteredMatchVideos(true)
        }
    }

    const handleRatingMatchesChange = (event) => {
        const checked = event.target.checked;
        if (filteredRatingMatches && !checked) {
            setFilteredRatingMatches(false)
        } else if (!filteredRatingMatches && checked) {
            setFilteredRatingMatches(true)
        }
    }

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
            filteredRatingMatches ||
            filteredMatchVideos ||
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
                appliedMatchVideos: filteredMatchVideos,
                appliedRatingMatches: filteredRatingMatches,
                appliedSquad: filteredSquad
            }
            localStorage.setItem('filters', JSON.stringify(appliedFilters))
        } else {
            localStorage.removeItem('filters');
        }
        const videosResponse = await loadWebsite(`videos`);
        const ratingsResponse = await loadWebsite(`rates`);
        const finalData = returnFilteredData(allData, appliedFilters, videosResponse, ratingsResponse)
        dispatch(updateData({allData: allData, filteredData: finalData}))
        handleBack(true);
    };

    const handleBack = (data) => {
        if (data) {
            navigate('/oyesfc-react/account')
        }
    }

    return (
        <div>
            <div style={{display: "block", minHeight: '70vh'}}>
                <BackButton handleBackButton={handleBack} generalTitle={'Filters'}/>
                <div style={{display: "block", height: '100%'}}>
                    <form className={classes.formStyle} onSubmit={handleSubmit}>
                        <div className={classes.formAlign}>
                            <div className={classes.boxStyles}>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Match Type</h2>
                                    {matchCategories.map((x, y) => (
                                        <div key={y}>
                                            <label
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
                                <div className={classes.emptySpace}></div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Match Squad</h2>
                                    {squadTypes.map((x, y) => (
                                        <div key={y}>
                                            <label
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
                            </div>

                            <div className={classes.filterPartStyle}>
                                <h2 className={classes.title}>Players</h2>
                                {Object.values(TeamMembers).map((x, y) => (
                                    <div key={y}>
                                        <label
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

                            <div className={classes.boxStyles}>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Facilities</h2>
                                    {facilities.sort().map((x, y) => (
                                        <div key={y}>
                                            <label
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
                                <div className={classes.emptySpace}></div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Rivals</h2>
                                    {rivalNames.sort().map((x, y) => (
                                        <div key={y}>
                                            <label
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
                            </div>

                            <div className={classes.boxStyles}>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Months</h2>
                                    {months.sort((a, b) => {
                                        return a - b;
                                    }).map((x, y) => (
                                        <div key={y}>
                                            <label
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
                                <div className={classes.emptySpace}></div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Years</h2>
                                    {years.sort((a, b) => {
                                        return b - a;
                                    }).map((x, y) => (
                                        <div key={y}>
                                            <label
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
                            </div>

                            <div className={classes.boxStyles}>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Jersey</h2>
                                    {Jerseys.map((x, y) => (
                                        <div key={y}>
                                            <label
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
                                <div className={classes.emptySpace}></div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Number of Players</h2>
                                    {playerLengthArray?.map((x, y) => (
                                        <div key={y}>
                                            <label
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

                            <div className={classes.boxStyles}>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Sky</h2>
                                    {WeatherSky.map((x, y) => (
                                        <div key={y}>
                                            <label
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
                                <div className={classes.emptySpace}></div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Temperature</h2>
                                    <div>
                                        <label
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
                                    <div>
                                        <label
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
                            </div>


                            <div className={classes.boxStyles}>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Videos</h2>
                                    <div>
                                        <label
                                            className={classes.customCheckbox}>
                                            Match Videos
                                            <input
                                                type="checkbox"
                                                name={'Match Videos'}
                                                onChange={handleMatchVideosChange}
                                                checked={filteredMatchVideos}
                                            />
                                            <span className={classes.checkmark}></span>
                                        </label>
                                        <br/>
                                    </div>
                                </div>
                                <div className={classes.emptySpace}></div>
                                <div className={classes.filterPartStyle}>
                                    <h2 className={classes.title}>Ratings</h2>
                                    <div>
                                        <label
                                            className={classes.customCheckbox}>
                                            Match Ratings
                                            <input
                                                type="checkbox"
                                                name={'Match Ratings'}
                                                onChange={handleRatingMatchesChange}
                                                checked={filteredRatingMatches}
                                            />
                                            <span className={classes.checkmark}></span>
                                        </label>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.boxStyles}>
                                <div className={accountClasses.morePageBox} onClick={resetFilters}>
                                    <span className={navbarClasses.drawerRoutesSpan}>Reset Filters</span>
                                </div>
                                <div className={classes.emptySpaceButton}></div>
                                <div className={accountClasses.morePageBox} onClick={resetFilters}>
                                    <span className={navbarClasses.drawerRoutesSpan}>Apply Filters</span>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    );
};

export default AdvancedFilters;
