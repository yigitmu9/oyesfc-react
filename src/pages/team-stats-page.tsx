import React from 'react';
import TeamStatsGrid from '../components/TeamStatsGrid/team-stats-grid';
import Footer from '../components/Footer/footer';
import PageGrid from '../shared/PageGrid/page-grid';
import Box from '@mui/material/Box';
import UpperNavInfo from '../shared/UpperNavInfo/upper-nav-info';
import FilterAlertComponent from '../shared/FilterAlert/filter-alert';

const TeamStatsPage = () => {
    const page = (
        <>
            <TeamStatsGrid />
            <FilterAlertComponent/>
        </>
    )
    return (
        <div>
            <UpperNavInfo title={'Team'} />
            <PageGrid page={page} />
            <Box
                sx={{
                    display: { xs: 'block', md: 'none' },
                    height: '100px',
                }}
            ></Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Footer />
            </Box>
        </div>
    );
};

export default TeamStatsPage;
