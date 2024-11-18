import React from 'react';
import PlayerCards from "../components/PlayerCards/player-cards";
import PageGrid from "../shared/PageGrid/page-grid";
import Box from "@mui/material/Box";
import Footer from "../components/Footer/footer";
import {useLocation} from "react-router-dom";

const PlayerDetailsPage = () => {

    const { state } = useLocation();

    const page = (
        <PlayerCards playerName={state}/>
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

export default PlayerDetailsPage;
