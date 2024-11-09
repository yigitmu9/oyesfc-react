import React from 'react';
import Footer from "../components/Footer/footer";
import PageGrid from "../shared/PageGrid/page-grid";
import Box from "@mui/material/Box";
import AdvancedFilters from "../components/AdvancedFilters/advanced-filters";
const FiltersPage = () => {

    const page = (
        <AdvancedFilters/>
    )

    return (
        <div>
            <PageGrid page={page}/>
            <Box sx={{display: {xs: 'block', md: 'none'}, height: '100px'}}></Box>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <Footer/>
            </Box>
        </div>
    );
};

export default FiltersPage;
