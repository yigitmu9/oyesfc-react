import React from 'react';
import Footer from '../components/Footer/footer';
import PageGrid from '../shared/PageGrid/page-grid';
import Box from '@mui/material/Box';
import UpperNavInfo from '../shared/UpperNavInfo/upper-nav-info';
import AccountGrid from '../components/AccountGrid/account-grid';

const AccountPage = () => {
    const page = <AccountGrid />;

    return (
        <div>
            <UpperNavInfo title={'Account'} />
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

export default AccountPage;
