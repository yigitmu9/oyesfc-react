import React from 'react';
import IndividualStatsGrid from "../components/IndividualStatsGrid/individual-stats-grid";
import Footer from "../components/Footer/footer";
import PageGrid from "../shared/PageGrid/page-grid";
import Box from "@mui/material/Box";
import UpperNavInfo from "../shared/UpperNavInfo/upper-nav-info";

const IndividualStatsPage = () => {

    const page = (
        <IndividualStatsGrid/>
    )

    return (
        <div>
            <UpperNavInfo title={'Individual'}/>
            <PageGrid page={page}/>
            <Box sx={{display: {xs: 'block', md: 'none'}, height: '100px'}}></Box>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <Footer/>
            </Box>
        </div>
    );
};

export default IndividualStatsPage;
