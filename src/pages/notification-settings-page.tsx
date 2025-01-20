import React from 'react';
import Footer from '../components/Footer/footer';
import PageGrid from '../shared/PageGrid/page-grid';
import Box from '@mui/material/Box';
import SettingsGrid from '../components/SettingsGrid/settings-grid';

const NotificationSettingsPage = () => {
    const page = <SettingsGrid />;

    return (
        <div>
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

export default NotificationSettingsPage;
