import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BackButton from '../../shared/BackButton/back-button';
import { useNavigate } from 'react-router-dom';
import RatingsGrid from '../RatingsGrid/ratings-grid';
import classes from '../AccountGrid/account-grid.module.css';
import navbarClasses from '../Navbar/navbar.module.css';
import SortingGrid from '../SortingGrid/sorting-grid';
import ComparisonGrid from '../ComparisonGrid/comparison-grid';

const RatingCompareGrid = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(0);

    const handleBack = (data?: boolean) => {
        if (data) {
            navigate('/oyesfc-react/account');
        }
    };

    const handlePrevious = (data?: boolean) => {
        if (data) {
            setPage(0);
        }
    };

    const returnStatType = (page?: number) => {
        const statTypes = ['Facilities', 'Players'];
        if (page === 1 || page === 3 || page === 5) {
            return statTypes[0];
        } else if (page === 2 || page === 4 || page === 6) {
            return statTypes[1];
        }
        return '';
    };

    if (page === 1 || page === 2) {
        const type = returnStatType(page);
        return <RatingsGrid category={type} handlePreviousPage={handlePrevious} />;
    }

    if (page === 3 || page === 4) {
        const type = returnStatType(page);
        return <SortingGrid category={type} handlePreviousPage={handlePrevious} />;
    }

    if (page === 5 || page === 6) {
        const type = returnStatType(page);
        return <ComparisonGrid category={type} handlePreviousPage={handlePrevious} />;
    }

    return (
        <div style={{ minHeight: '70vh' }}>
            <BackButton handleBackButton={handleBack} generalTitle={'Ratings'} />
            <Box sx={{ display: { xs: 'flex', md: 'none' }, height: '30px' }}></Box>
            <div className={classes.morePageBox} onClick={() => setPage(1)}>
                <span className={navbarClasses.drawerRoutesSpan}>Rate facilities</span>
            </div>
            <div style={{ height: '20px' }}></div>
            <div className={classes.morePageBox} onClick={() => setPage(2)}>
                <span className={navbarClasses.drawerRoutesSpan}>Rate players</span>
            </div>
            <div style={{ height: '20px' }}></div>
            <div className={classes.morePageBox} onClick={() => setPage(3)}>
                <span className={navbarClasses.drawerRoutesSpan}>Sort facilities</span>
            </div>
            <div style={{ height: '20px' }}></div>
            <div className={classes.morePageBox} onClick={() => setPage(4)}>
                <span className={navbarClasses.drawerRoutesSpan}>Sort players</span>
            </div>
            <div style={{ height: '20px' }}></div>
            <div className={classes.morePageBox} onClick={() => setPage(5)}>
                <span className={navbarClasses.drawerRoutesSpan}>Compare facilities</span>
            </div>
            <div style={{ height: '20px' }}></div>
            <div className={classes.morePageBox} onClick={() => setPage(6)}>
                <span className={navbarClasses.drawerRoutesSpan}>Compare players</span>
            </div>
        </div>
    );
};

export default RatingCompareGrid;
