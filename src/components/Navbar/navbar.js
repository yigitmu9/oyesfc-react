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
import {useEffect, useState} from "react";
import SignIn from "../SignIn/sign-in";
import AddMatchComponent from "../AddMatch/add-match";
import {onAuthStateChanged} from "firebase/auth";
import {auth, loadWebsite} from "../../firebase";
import {Alert, BottomNavigation, BottomNavigationAction, Divider, Drawer, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {OYesFcEras, SnackbarTypes, TeamMembers} from "../../constants/constants";
import CardMedia from "@mui/material/CardMedia";
import AdvancedFilters from "../AdvancedFilters/advanced-filters";
import CalendarComponent from "../Calendar/calendar";
import PhoenixLogo from "../../images/phoenix.png";
import FirstLogo from "../../images/firstLogo.png";
import GhostLogo from "../../images/ghost.png";
import HomeIcon from "@mui/icons-material/Home";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import PageGrid from "../../shared/PageGrid/page-grid";
import BackButton from "../../shared/BackButton/back-button";

function Navbar({databaseData, reloadData, setAdvancedFilters, sendCredentials, filteredData, selectedEra}) {
    const [desktopMenu, setDesktopMenu] = React.useState(null);
    const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
    const [isAddMatchPopupOpen, setAddMatchPopupOpen] = useState(false);
    const [isCalendarPopupOpen, setCalendarPopupOpen] = useState(false);
    const [snackbarData, setSnackbarData] = useState(null);
    const [credentials, setCredentials] = useState(null);
    const [advancedFiltersModal, setAdvancedFiltersModal] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();
    const matchesPath = '/oyesfc-react/matches';
    const individualPath = '/oyesfc-react/individual-stats';
    const teamPath = '/oyesfc-react/team-stats';
    const mainPath = '/oyesfc-react/';
    const [value, setValue] = useState(0);

    const getTeamLogo = () => {
        if (selectedEra === OYesFcEras.goldenAge) return 'goldenrod'
        if (selectedEra === OYesFcEras.redAndBlack) return 'firebrick'
        if (selectedEra === OYesFcEras.rising) return 'dodgerblue'
        if (selectedEra === OYesFcEras.origins) return 'gray'
        return 'goldenrod'
    }

    const getTeam = () => {
        if (selectedEra === OYesFcEras.goldenAge) return PhoenixLogo
        if (selectedEra === OYesFcEras.redAndBlack) return OYesFCLogo
        if (selectedEra === OYesFcEras.rising) return FirstLogo
        if (selectedEra === OYesFcEras.origins) return GhostLogo
        return PhoenixLogo
    }

    const openFiltersModal = () => {
        if (mobileOpen) handleDrawerToggle()
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setAdvancedFiltersModal(true)
    };

    const setFilters = (filteredData) => {
        setAdvancedFilters(filteredData);
    };

    const handleOpenDesktopMenu = (event) => {
        if (!desktopMenu) {
            setDesktopMenu(event.currentTarget);
        } else {
            setDesktopMenu(null);
        }
    };

    const handleCloseDesktopMenu = () => {
        setDesktopMenu(null);
    };

    const navigateMatches = () => {
        navigate(matchesPath);
    };

    const navigateIndividualStats = () => {
        navigate(individualPath);
    };

    const navigateTeamStats = () => {
        navigate(teamPath);
    };

    const navigateMainPage = () => {
        navigate(mainPath);
    };

    const openCalendarPopup = () => {
        if (mobileOpen) handleDrawerToggle()
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setCalendarPopupOpen(true);
    };

    const handleXClick = (snackbarData) => {
        setSnackbarData(snackbarData);
        if (snackbarData?.status === SnackbarTypes.success) handleReload(true)
    };

    const openSignInPopup = () => {
        if (mobileOpen) handleDrawerToggle()
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setSignInPopupOpen(true);
    };

    const openAddMatchPopup = () => {
        if (mobileOpen) handleDrawerToggle()
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setAddMatchPopupOpen(true);
    };

    const handleReload = (data) => {
        reloadData(data);
    }

    const checkAuth = (data) => {
        if (data) checkAuthState().then(r => r);
    }

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarData(null);
    };

    const onBottomNavChange = (pageIndex) => {
        if (pageIndex !== 4) setValue(pageIndex)
        if (pageIndex === 0) navigateMainPage()
        if (pageIndex === 1) navigateMatches()
        if (pageIndex === 2) navigateIndividualStats()
        if (pageIndex === 3) navigateTeamStats()
        if (pageIndex === 4) handleDrawerToggle()

    }

    const checkAuthState = async () => {
        await onAuthStateChanged(auth, async user => {
            if (user && !credentials?.signedIn) {
                try {
                    const response = await loadWebsite('firebaseUID');
                    const userName = Object.entries(response?.users)?.find(x => x[1] === user?.uid)[0];
                    const isCaptain = Object.entries(response?.captain)?.some(x => x[1] === user?.uid);
                    const credentialsData = {
                        signedIn: true,
                        userName: userName,
                        isCaptain: isCaptain,
                        email: user?.email,
                        id: user?.uid
                    }
                    setCredentials(credentialsData)
                    sendCredentials(credentialsData)
                } catch (error) {
                    const errorResponse = {
                        open: true,
                        status: SnackbarTypes.error,
                        message: error?.message,
                        duration: 18000
                    }
                    setSnackbarData(errorResponse)
                }
            } else if (!user && credentials?.signedIn) {
                setCredentials(null)
                sendCredentials(null)
            }
        })
    }

    useEffect(() => {
        checkAuthState().then(r => r)
    });

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const mobileMorePage = (
        <>
            <div style={{padding: '0 20px', marginTop: '80px'}}>
                <span className={classes.miniTitle}>ACCOUNT</span>
            </div>
            <div style={{height: '5px'}}></div>
            <div className={classes.morePageBox} onClick={openSignInPopup}>
                <span
                    className={classes.drawerRoutesSpan}>{credentials?.signedIn ? credentials?.userName : 'Log In'}</span>
                {credentials?.signedIn && <span className={classes.mobileEmailSpan}>{credentials?.email}</span>}
            </div>
            <div style={{height: '30px'}}></div>
            <div className={classes.morePageBox} onClick={openFiltersModal}>
                <span className={classes.drawerRoutesSpan}>Filters</span>
            </div>
            <div style={{height: '5px'}}></div>
            <div style={{padding: '0 20px'}}>
                <span className={classes.miniTitle}>{'Personalize data according to your choices, ' +
                    'your choices apply to all pages and are remembered even if you close the site.'}</span>
            </div>
            <div style={{height: '30px'}}></div>
            <div className={classes.morePageBox} onClick={openCalendarPopup}>
                <span className={classes.drawerRoutesSpan}>Calendar</span>
            </div>
            {
                credentials?.isCaptain &&
                <>
                    <div style={{height: '20px'}}></div>
                    <div className={classes.morePageBox} onClick={openAddMatchPopup}>
                        <span className={classes.drawerRoutesSpan}>Add Match</span>
                    </div>
                </>
            }
        </>
    )

    const handleBack = (data) => {
        if (data) handleDrawerToggle()
    }

    const drawer = (
        <Box>
            <div >
                <BackButton handleBackButton={handleBack}/>
            </div>
            <PageGrid page={mobileMorePage}/>
        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <>
            <AppBar position="sticky" sx={{bgcolor: getTeamLogo(), display: {xs: 'none', md: 'flex'}, margin: 0}}>
                <Container maxWidth="lg" sx={{bgcolor: getTeamLogo()}}>
                    <Toolbar disableGutters sx={{bgcolor: getTeamLogo()}}>
                        <Box sx={{flexGrow: 1, display: 'flex', bgcolor: getTeamLogo()}}>
                            <img className={classes.imgStyle}
                                 style={{filter: getTeam() === PhoenixLogo ? 'brightness(0.5)' : ''}}
                                 onClick={navigateMainPage} src={getTeam()} alt={'1'}/>
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, bgcolor: getTeamLogo()}}>
                        <span
                            className={classes.desktopMenuItems}
                            style={{color: location.pathname === matchesPath ? 'white' : 'black'}}
                            onClick={navigateMatches}
                        >
                            MATCHES
                        </span>
                            <span
                                className={classes.desktopMenuItems}
                                style={{color: location.pathname === individualPath ? 'white' : 'black'}}
                                onClick={navigateIndividualStats}
                            >
                            INDIVIDUAL
                        </span>
                            <span
                                className={classes.desktopMenuItems}
                                style={{color: location.pathname === teamPath ? 'white' : 'black'}}
                                onClick={navigateTeamStats}
                            >
                            TEAM
                        </span>
                        </Box>
                        <Box sx={{
                            flexGrow: 0,
                            bgcolor: getTeamLogo(),
                            width: 59,
                            height: 59,
                            display: {xs: 'none', md: 'flex'},
                            alignContent: 'center',
                            alignItems: 'center'
                        }}>
                            {
                                credentials?.signedIn ?
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: '100%',
                                            background: "0, 0, 0, 0",
                                            cursor: "pointer"
                                        }}
                                        onClick={handleOpenDesktopMenu}
                                        image={require(`../../images/${Object.entries(TeamMembers).find(x => x[1].name === credentials?.userName)[0]}.jpeg`)}
                                    />
                                    :
                                    <AccountCircleIcon
                                        sx={{
                                            width: 59,
                                            height: 59,
                                            background: "0, 0, 0, 0",
                                            color: "black",
                                            cursor: "pointer"
                                        }}
                                        onClick={handleOpenDesktopMenu} className={classes.userButtonLinkStyle}>
                                    </AccountCircleIcon>
                            }
                            <Menu
                                id="menu-appbar"
                                anchorEl={desktopMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(desktopMenu)}
                                onClose={handleCloseDesktopMenu}
                                sx={{
                                    display: {xs: 'block', md: 'block'},
                                    bgcolor: 'rgb(0,0,0,0)',
                                    zIndex: 99,
                                    "& .MuiPaper-root":
                                        {backgroundColor: getTeamLogo(), borderRadius: '25px'},
                                    "& .MuiList-root":
                                        {backgroundColor: getTeamLogo(), borderRadius: '25px'},
                                }}
                            >
                                <div className={classes.mobileMenu}>
                                <span
                                    className={classes.mobileMenuItems}
                                    onClick={openSignInPopup}
                                >
                                    {credentials?.signedIn ? 'PROFILE' : 'LOG IN'}
                                </span>
                                    <span
                                        className={classes.mobileMenuItems}
                                        onClick={openFiltersModal}
                                    >
                                    FILTERS
                                </span>
                                    <span
                                        className={classes.mobileMenuItems}
                                        onClick={openCalendarPopup}
                                    >
                                    CALENDAR
                                </span>
                                    {
                                        credentials?.isCaptain &&
                                        <>
                                            <span
                                                className={classes.mobileMenuItems}
                                                onClick={openAddMatchPopup}
                                            >
                                                ADD MATCH
                                            </span>
                                        </>
                                    }
                                </div>
                            </Menu>
                        </Box>
                        <Box sx={{flexGrow: 0, display: {xs: 'flex', md: 'none'}, bgcolor: getTeamLogo()}}>
                            <MenuIcon
                                sx={{
                                    width: 40,
                                    height: 40,
                                    color: "black",
                                    cursor: "pointer",
                                    bgcolor: "rgb(0, 0, 0, 0)"
                                }}
                                onClick={handleDrawerToggle}>
                            </MenuIcon>
                        </Box>
                    </Toolbar>
                    <nav>
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor="right"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                                '& .MuiDrawer-paper': {
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    background: 'black'
                                },
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </nav>
                </Container>
            </AppBar>
            <Box sx={{position: 'fixed', left: 0, bottom: -1, width: '100%', display: {xs: 'flex', md: 'none'}, zIndex: 99999999999, bgcolor: 'rgba(28, 28, 30, 0.98)'}}>
                <BottomNavigation
                    sx={{width: '100%', paddingBottom: '35px', height: '84px', paddingTop: '10px', bgcolor: 'transparent'}}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        onBottomNavChange(newValue)
                    }}
                >
                    <BottomNavigationAction sx={{color: 'gray'}} label="Home" icon={<HomeIcon/>}/>
                    <BottomNavigationAction sx={{color: 'gray'}} label="Matches" icon={<SportsSoccerIcon/>}/>
                    <BottomNavigationAction sx={{color: 'gray'}} label="Individual" icon={<PersonIcon/>}/>
                    <BottomNavigationAction sx={{color: 'gray'}} label="Team" icon={<GroupIcon/>}/>
                    <BottomNavigationAction sx={{color: 'gray'}} label="More" icon={<MenuIcon/>}/>
                </BottomNavigation>
            </Box>
            {isSignInPopupOpen && <SignIn onClose={() => setSignInPopupOpen(false)}
                                          credentials={credentials} checkAuth={checkAuth} selectedEra={selectedEra}/>}
            {isAddMatchPopupOpen && <AddMatchComponent onClose={() => setAddMatchPopupOpen(false)}
                                                       snackbarData={(snackbarData) => handleXClick(snackbarData)}
                                                       databaseData={databaseData}/>}
            {advancedFiltersModal &&
                <AdvancedFilters databaseData={databaseData} onClose={() => setAdvancedFiltersModal(false)}
                                 setFilters={setFilters}/>}
            {isCalendarPopupOpen &&
                <CalendarComponent databaseData={databaseData} onClose={() => setCalendarPopupOpen(false)}
                                   credentials={credentials} reloadData={handleReload} allData={databaseData}
                                   filteredData={filteredData}
                                   selectedEra={selectedEra}/>}
            <Snackbar open={snackbarData?.open} autoHideDuration={snackbarData?.duration} onClose={closeSnackbar}>
                <Alert
                    onClose={closeSnackbar}
                    severity={snackbarData?.status}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {snackbarData?.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Navbar;
