import React, { useState } from 'react';
import classes from "./filter-buttons.module.css";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import Filter6Icon from "@mui/icons-material/Filter6";
import Filter7Icon from '@mui/icons-material/Filter7';
import FilterListIcon from "@mui/icons-material/FilterList";
import AdvancedFilters from "../AdvancedFilters";

function FilterButtons({ databaseData, setAdvancedFilters }) {
    const [countFilter, setCountFilter] = useState(0);
    const [advancedFiltersModal, setAdvancedFiltersModal] = useState(false);
    const [applyFilters, setApplyFilters] = useState(null);

    const openFiltersModal = () => {
        document.body.style.overflow = 'hidden';
        setAdvancedFiltersModal(true)
    };

    const setFilters = (filteredData) => {
        setAdvancedFilters(filteredData);
    };

    const sendAppliedFilters = (appliedFilters) => {
        let count = 0;
        if (appliedFilters?.appliedFacilities?.length > 0) count = count + 1
        if (appliedFilters?.appliedMonths?.length > 0) count = count + 1
        if (appliedFilters?.appliedPlayers?.length > 0) count = count + 1
        if (appliedFilters?.appliedRivals?.length > 0) count = count + 1
        if (appliedFilters?.appliedYears?.length > 0) count = count + 1
        if (appliedFilters?.appliedType === 'rakipbul' || appliedFilters?.appliedType === 'normal') count = count + 1
        if (appliedFilters?.appliedSquad === 'Main Squad' || appliedFilters?.appliedSquad === 'Squad Including Foreigners') count = count + 1
        setCountFilter(count)
        setApplyFilters(appliedFilters)
    };

    return (
        <div className={classes.buttonDivStyle}>
            {
                countFilter === 1 ?
                    <Filter1Icon className={classes.filteredIconStyle} style={{height: "70px", width: "70px"}}
                                 onClick={openFiltersModal}></Filter1Icon>
                    : countFilter === 2 ?
                        <Filter2Icon className={classes.filteredIconStyle} style={{height: "70px", width: "70px"}}
                                     onClick={openFiltersModal}></Filter2Icon>
                        : countFilter === 3 ?
                            <Filter3Icon className={classes.filteredIconStyle} style={{height: "70px", width: "70px"}}
                                         onClick={openFiltersModal}></Filter3Icon>
                            : countFilter === 4 ?
                                <Filter4Icon className={classes.filteredIconStyle} style={{height: "70px", width: "70px"}}
                                             onClick={openFiltersModal}></Filter4Icon>
                                : countFilter === 5 ? <Filter5Icon className={classes.filteredIconStyle}
                                                                   style={{height: "70px", width: "70px"}}
                                                                   onClick={openFiltersModal}></Filter5Icon>
                                    : countFilter === 6 ? <Filter6Icon className={classes.filteredIconStyle}
                                                                       style={{height: "70px", width: "70px"}}
                                                                       onClick={openFiltersModal}></Filter6Icon>
                                        : countFilter === 7 ? <Filter7Icon className={classes.filteredIconStyle}
                                                                          style={{height: "70px", width: "70px"}}
                                                                          onClick={openFiltersModal}></Filter7Icon>
                                            : <FilterListIcon className={classes.iconStyle}
                                                          style={{height: "70px", width: "70px"}}
                                                          onClick={openFiltersModal}></FilterListIcon>
            }
            {advancedFiltersModal && <AdvancedFilters databaseData={databaseData} onClose={() => setAdvancedFiltersModal(false)}
                                                      setFilters={setFilters} sendAppliedFilters={sendAppliedFilters}
                                                      applyFilters={applyFilters}/>}
        </div>
    );
}

export default FilterButtons;
