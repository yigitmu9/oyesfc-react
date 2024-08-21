import React from 'react';
import ScoreboardsGrid from "../components/ScoreboardsGrid/scoreboards-grid";
import Footer from "../components/Footer/footer";
import PageGrid from "../shared/PageGrid/page-grid";
import Box from "@mui/material/Box";
import UpperNavInfo from "../shared/UpperNavInfo/upper-nav-info";

const MatchesPage = ({databaseData, reloadData, credentials, allData, selectedEra}) => {

    const handleReload = (data) => {
        reloadData(data)
    }

    const page = (
        <ScoreboardsGrid databaseData={databaseData}
                         reloadData={handleReload}
                         credentials={credentials}
                         allData={allData}
                         selectedEra={selectedEra}/>
    )

    return (
        <div>
            <main>
                <UpperNavInfo title={'Matches'}/>
                <PageGrid page={page}/>
                <Box sx={{display: {xs: 'block', md: 'none'}, height: '110px'}}></Box>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <Footer credentials={credentials}></Footer>
                </Box>
            </main>
        </div>
    );
};

export default MatchesPage;
