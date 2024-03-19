import classes from "./advanced-filters.module.css";
import React, {useEffect, useRef, useState} from "react";
import {TeamMembers} from "../../constants/constants";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdvancedFilters = ({onClose, databaseData, setFilters, sendAppliedFilters, applyFilters}) => {

    const checkMoreFilterButton = () => {
        return applyFilters?.appliedPlayers?.length > 0 ||
            applyFilters?.appliedFacilities?.length > 0 ||
            applyFilters?.appliedYears?.length > 0 ||
            applyFilters?.appliedMonths?.length > 0 ||
            applyFilters?.appliedRivals?.length > 0 ||
            applyFilters?.appliedSquad === 'Main Squad' ||
            applyFilters?.appliedSquad === 'Squad Including Foreigners';
    };

    document.body.style.overflow = 'hidden';
    const [matchType, setMatchType] = useState(applyFilters?.appliedType ? applyFilters?.appliedType : 'all');
    const [moreFilters, setMoreFilters] = useState(checkMoreFilterButton());
    const popupRef = useRef(null);
    const [filteredPlayers, setFilteredPlayers] = useState(applyFilters?.appliedPlayers === undefined ? [] : applyFilters?.appliedPlayers)
    const [filteredFacilities, setFilteredFacilities] = useState(applyFilters?.appliedFacilities  === undefined ? [] : applyFilters?.appliedFacilities)
    const [filteredYears, setFilteredYears] = useState(applyFilters?.appliedYears  === undefined ? [] : applyFilters?.appliedYears);
    const [filteredMonths, setFilteredMonths] = useState(applyFilters?.appliedMonths  === undefined ? [] : applyFilters?.appliedMonths);
    const [filteredRivals, setFilteredRivals] = useState(applyFilters?.appliedRivals  === undefined ? [] : applyFilters?.appliedRivals);
    const [filteredSquad, setFilteredSquad] = useState(applyFilters?.appliedSquad ? applyFilters?.appliedSquad : 'All');
    let facilities = [];
    let years = [];
    let months = [];
    let filteredData = [];
    let rivalNames = [];
    let appliedFilters = {};
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const matchCategories = ['All', 'Rakipbul', 'Normal']
    const squadTypes = ['All', 'Main Squad', 'Squad Including Foreigners']
    const players = Object.values(TeamMembers).map(x => x.name)

    Object.values(databaseData)?.forEach((x) => {
        if (!facilities.includes(x.place) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            facilities.push(x.place)
        }
    } )

    Object.values(databaseData)?.forEach((x) => {
        const dateYear = x.day.substring(x.day.lastIndexOf("-")+1)
        if (!years.includes(dateYear) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            years.push(dateYear)
        }
    } )

    Object.values(databaseData)?.forEach((x) => {
        const dateMonth = x.day.split('-')[1];
        if (!months.includes(dateMonth) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            months.push(dateMonth)
        }
    } )

    Object.values(databaseData)?.forEach((x) => {
        if (!rivalNames.includes(x.rival.name) && (matchType === 'all' || x.rakipbul === (matchType === 'rakipbul'))) {
            rivalNames.push(x.rival.name)
        }
    } )

    const showMoreFilters = () => {
        setMoreFilters(true)
    }

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [popupRef, onClose]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (matchType === 'rakipbul') {
            filteredData = Object.values(databaseData).filter(x => x.rakipbul === true)
        } else if (matchType === 'normal') {
            filteredData = Object.values(databaseData).filter(x => x.rakipbul === false)
        } else {
            filteredData = Object.values(databaseData);
        }

        if (filteredData?.length > 0 && filteredPlayers?.length > 0) {
            filteredData = filteredData?.filter(x => filteredPlayers?.every(v => Object.keys(x?.oyesfc?.squad)?.includes(v)))
        }

        if (filteredData?.length > 0 && filteredFacilities?.length > 0) {
            filteredData = filteredData?.filter(x => filteredFacilities?.includes(x?.place))
        }

        if (filteredData?.length > 0 && filteredYears?.length > 0) {
            filteredData = filteredData?.filter(x => filteredYears?.includes(x.day.substring(x.day.lastIndexOf("-")+1)))
        }

        if (filteredData?.length > 0 && filteredMonths?.length > 0) {
            filteredData = filteredData?.filter(x => filteredMonths?.includes(x.day.split('-')[1]))
        }

        if (filteredData?.length > 0 && filteredRivals?.length > 0) {
            filteredData = filteredData?.filter(x => filteredRivals?.includes(x?.rival.name))
        }

        if (filteredData?.length > 0 && filteredSquad !== 'All') {
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
            if (filteredSquad === 'Main Squad') {
                filteredData = Object.values(filteredData).filter((x, y) => !foreignDataIndex.includes(y))
            } else if (filteredSquad === 'Squad Including Foreigners') {
                filteredData = Object.values(filteredData).filter((x, y) => foreignDataIndex.includes(y))
            }
        }

        if (matchType !== 'all' ||
            filteredPlayers?.length > 0 ||
            filteredFacilities?.length > 0 ||
            filteredYears?.length > 0 ||
            filteredMonths?.length > 0 ||
            filteredRivals?.length > 0 ||
            filteredSquad !== 'All') {
            appliedFilters = {
                appliedType: matchType,
                appliedPlayers: filteredPlayers,
                appliedFacilities: filteredFacilities,
                appliedYears: filteredYears,
                appliedMonths: filteredMonths,
                appliedRivals: filteredRivals,
                appliedSquad: filteredSquad
            }
        }
        sendAppliedFilters(appliedFilters)
        setFilters(filteredData)
        handleClose();
    };

    return (
        <div className={classes.overlay}>
            <div className={classes.popupContainer} style={{display: "block", background: "#1f1f1f"}} ref={popupRef}>
                <div style={{background: "#1f1f1f", display: "block"}}>
                    <form onSubmit={handleSubmit} style={{background: "#1f1f1f"}}>
                        <div className={classes.formAlign}>
                            <div className={classes.filterPartStyle}>
                                <h2 className={classes.title}>Match Type</h2>
                                {matchCategories.map(x => (
                                    <div style={{background: "#1f1f1f"}}>
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
                            {moreFilters ?
                                <div style={{background: "#1f1f1f"}}>
                                    <div className={classes.filterPartStyle}>
                                        <h2 className={classes.title}>Players</h2>
                                        {Object.values(TeamMembers).map(x => (
                                            <div style={{background: "#1f1f1f"}}>
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
                                        {facilities.sort().map(x => (
                                            <div style={{background: "#1f1f1f"}}>
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
                                        }).map(x => (
                                            <div style={{background: "#1f1f1f"}}>
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
                                        }).map(x => (
                                            <div style={{background: "#1f1f1f"}}>
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
                                        {rivalNames.sort().map(x => (
                                            <div style={{background: "#1f1f1f"}}>
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
                                        {squadTypes.map(x => (
                                            <div style={{background: "#1f1f1f"}}>
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
                                </div>
                                : null
                            }
                        </div>
                        {!moreFilters ?
                            <div className={classes.buttonDivStyle}>
                                <ExpandMoreIcon className={classes.expandIconStyle}
                                                style={{height: "60px", width: "80px"}}
                                                onClick={showMoreFilters}>
                                </ExpandMoreIcon>
                            </div>
                            : null
                        }
                        <div className={classes.buttonDivStyle}>
                            <button className={classes.buttonStyle} style={{marginRight: "1rem"}} type="submit">Apply
                            </button>
                            <FilterListOffIcon className={classes.iconStyle}
                                               style={{height: "40px", width: "40px", marginRight: "1rem"}}
                                               onClick={resetFilters}>
                            </FilterListOffIcon>
                            <button className={classes.buttonStyle} onClick={handleClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AdvancedFilters;