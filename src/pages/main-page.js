import React from 'react';
import SliderCard from "../components/SliderCard/slider-card";
import Footer from "../components/Footer/footer";
import Box from "@mui/material/Box";
import PageGrid from "../shared/PageGrid/page-grid";
import UpperNavInfo from "../shared/UpperNavInfo/upper-nav-info";

const MainPage = ({credentials, selectedEra, sendEra}) => {

    const handleEra = (data) => {
        sendEra(data)
    }

    const page = (
        <SliderCard selectedEra={selectedEra} sendEra={handleEra} />
    )

    return (
        <div>
            <UpperNavInfo title={'Home'}/>
            <PageGrid page={page}/>
            <Box sx={{display: {xs: 'block', md: 'none'}, height: '100px'}}></Box>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <Footer credentials={credentials}></Footer>
            </Box>
        </div>

    );
};

export default MainPage;
