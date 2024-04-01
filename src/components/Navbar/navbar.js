import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import OYesFCLogo from "../../images/oyesfc.PNG";
import classes from './navbar.module.css'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import SignIn from "../SignIn/sign-in";
import Message from "../Message/message";

function Navbar({databaseData}) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [messageData, setMessageData] = useState(null);
    const navigate = useNavigate()
    const location = useLocation();
    const matchesPath = '/oyesfc-react/matches';
    const individualPath = '/oyesfc-react/individual-stats';
    const teamPath = '/oyesfc-react/team-stats';
    const mainPath = '/oyesfc-react/';

    const handleOpenNavMenu = (event) => {
        if (!anchorElNav) {
            setAnchorElNav(event.currentTarget);
        } else {
            setAnchorElNav(null);
        }
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const navigateMatches = () => {
        navigate(matchesPath);
        setAnchorElNav(null);
    };

    const navigateIndividualStats = () => {
        navigate(individualPath);
        setAnchorElNav(null);
    };

    const navigateTeamStats = () => {
        navigate(teamPath);
        setAnchorElNav(null);
    };

    const navigateMainPage = () => {
        navigate(mainPath);
        setAnchorElNav(null);
    };

    const handleXClick = (messageData) => {
        setMessageData(messageData);
    };

    const openSignInPopup = () => {
        setAnchorElNav(null);
        document.body.style.overflow = 'hidden';
        setSignInPopupOpen(true);
    };

    return (
        <AppBar position="sticky" sx={{bgcolor: 'darkred'}}>
            <Container maxWidth="lg" sx={{bgcolor: 'darkred'}}>
                <Toolbar disableGutters sx={{bgcolor: 'darkred'}}>
                    <Box sx={{flexGrow: 1, display: 'flex', bgcolor: 'darkred'}}>
                        <img className={classes.imgStyle} onClick={navigateMainPage} src={OYesFCLogo} alt={'1'}/>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, bgcolor: 'darkred'}}>
                        <span
                            className={classes.desktopMenuItems}
                            style={{color: location.pathname === matchesPath ? 'white' : 'black'}}
                            onClick={navigateMatches}
                        >
                            Matches
                        </span>
                        <span
                            className={classes.desktopMenuItems}
                            style={{color: location.pathname === individualPath ? 'white' : 'black'}}
                            onClick={navigateIndividualStats}
                        >
                            Individual Stats
                        </span>
                        <span
                            className={classes.desktopMenuItems}
                            style={{color: location.pathname === teamPath ? 'white' : 'black'}}
                            onClick={navigateTeamStats}
                        >
                            Team Stats
                        </span>
                    </Box>
                    <Box sx={{
                        flexGrow: 0,
                        bgcolor: 'darkred',
                        width: 59,
                        height: 59,
                        display: {xs: 'none', md: 'flex'}
                    }}>
                        <AccountCircleIcon
                            sx={{width: 59, height: 59, background: "0, 0, 0, 0", color: "black", cursor: "pointer"}}
                            onClick={openSignInPopup} className={classes.userButtonLinkStyle}>
                        </AccountCircleIcon>
                    </Box>
                    <Box sx={{flexGrow: 0, display: {xs: 'flex', md: 'none'}, bgcolor: 'darkred'}}>
                        <MenuIcon
                            sx={{width: 40, height: 40, color: "black", cursor: "pointer", bgcolor: "rgb(0, 0, 0, 0)"}}
                            onClick={handleOpenNavMenu}></MenuIcon>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                                bgcolor: 'rgb(0,0,0,0.5)',
                                zIndex: 99,
                                "& .MuiPaper-root":
                                    {backgroundColor: 'darkred', borderRadius: '25px'},
                                "& .MuiList-root":
                                    {backgroundColor: 'darkred', borderRadius: '25px'},
                            }}
                        >
                            <div className={classes.mobileMenu}>
                                <span
                                    className={classes.mobileMenuItems}
                                    style={{color: location.pathname === matchesPath ? 'white' : 'black'}}
                                    onClick={navigateMatches}
                                >
                                    Matches
                                </span>
                                <span
                                    className={classes.mobileMenuItems}
                                    style={{color: location.pathname === individualPath ? 'white' : 'black'}}
                                    onClick={navigateIndividualStats}
                                >
                                    Individual Stats
                                </span>
                                <span
                                    className={classes.mobileMenuItems}
                                    style={{color: location.pathname === teamPath ? 'white' : 'black'}}
                                    onClick={navigateTeamStats}
                                >
                                    Team Stats
                                </span>
                                <span
                                    className={classes.mobileMenuItems}
                                    onClick={openSignInPopup}
                                >
                                    Profile
                                </span>
                            </div>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            {isSignInPopupOpen && <SignIn openMessage={() => setMessagePopupOpen(true)}
                                          onClose={() => setSignInPopupOpen(false)}
                                          messageData={(messageData) => handleXClick(messageData)}
                                          databaseData={databaseData}/>}
            {isMessagePopupOpen && <Message messageData={messageData} onClose={() => setMessagePopupOpen(false)}/>}
        </AppBar>
    );
}

export default Navbar;
