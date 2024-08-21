import React from 'react';
import IndividualStatsGrid from "../components/IndividualStatsGrid/individual-stats-grid";
import Footer from "../components/Footer/footer";
import PageGrid from "../shared/PageGrid/page-grid";
import Box from "@mui/material/Box";
import UpperNavInfo from "../shared/UpperNavInfo/upper-nav-info";

const IndividualStatsPage = ({databaseData, credentials, allData, reloadData, selectedEra}) => {

    const handleReload = (data) => {
        reloadData(data)
    }

    const page = (
        <IndividualStatsGrid databaseData={databaseData} credentials={credentials} allData={allData} reloadData={handleReload} selectedEra={selectedEra}/>
    )

    return (
        <div>
            <UpperNavInfo title={'Individual'}/>
            <PageGrid page={page}/>
            <Box sx={{display: {xs: 'block', md: 'none'}, height: '110px'}}></Box>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <Footer credentials={credentials}></Footer>
            </Box>
        </div>
    );
};

export default IndividualStatsPage;
