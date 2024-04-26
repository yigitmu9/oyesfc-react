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
import Message from "../Message/message";
import AddMatchComponent from "../AddMatch/add-match";
import {onAuthStateChanged} from "firebase/auth";
import {auth, loadWebsite} from "../../firebase";
import {Divider, Drawer} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {TeamMembers} from "../../constants/constants";
import CardMedia from "@mui/material/CardMedia";
import AdvancedFilters from "../AdvancedFilters/advanced-filters";

function Navbar({databaseData, reloadData, setAdvancedFilters}) {
    const [desktopMenu, setDesktopMenu] = React.useState(null);
    const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [isAddMatchPopupOpen, setAddMatchPopupOpen] = useState(false);
    const [messageData, setMessageData] = useState(null);
    const [credentials, setCredentials] = useState(null);
    const [countFilter, setCountFilter] = useState(0);
    const [advancedFiltersModal, setAdvancedFiltersModal] = useState(false);
    const [applyFilters, setApplyFilters] = useState(null);
    const navigate = useNavigate()
    const location = useLocation();
    const matchesPath = '/oyesfc-react/matches';
    const individualPath = '/oyesfc-react/individual-stats';
    const teamPath = '/oyesfc-react/team-stats';
    const mainPath = '/oyesfc-react/';

    const openFiltersModal = () => {
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setAdvancedFiltersModal(true)
    };

    const setFilters = (filteredData) => {
        setAdvancedFilters(filteredData);
    };

    const sendAppliedFilters = (appliedFilters) => {
        let count = 0;
        if (appliedFilters?.appliedFacilities?.length > 0) count = count + 1
        if (appliedFilters?.appliedMonths?.length > 0) count = count + 1
        if (appliedFilters?.appliedPlayers?.length > 0) count = count + 1
        if (appliedFilters?.appliedRivals?.length > 0) count = count + 1
        if (appliedFilters?.appliedYears?.length > 0) count = count + 1
        if (appliedFilters?.appliedType === 'rakipbul' || appliedFilters?.appliedType === 'normal') count = count + 1
        if (appliedFilters?.appliedSquad === 'Main Squad' || appliedFilters?.appliedSquad === 'Squad Including Foreigners') count = count + 1
        setCountFilter(count)
        setApplyFilters(appliedFilters)
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

    const handleXClick = (messageData) => {
        setMessageData(messageData);
    };

    const openSignInPopup = () => {
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setSignInPopupOpen(true);
    };

    const openAddMatchPopup = () => {
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
                } catch (error) {
                    console.log(error)
                }
            } else if (!user && credentials?.signedIn) {
                setCredentials(null)
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

    const drawer = (
        <Box onClick={handleDrawerToggle}>
            <div className={classes.closeIconDiv}>
                <CloseIcon sx={{
                    width: 40,
                    height: 40,
                    color: "black",
                    cursor: "pointer",
                    bgcolor: "rgb(0, 0, 0, 0)",
                    margin: '8px',
                    marginRight: '16px'
                }}></CloseIcon>
            </div>
            <Divider sx={{bgcolor: 'black', marginLeft: '20px', marginRight: '20px'}}/>
            <div className={classes.drawerRoutesDiv}>
                <span className={classes.drawerRoutesSpan} onClick={navigateMainPage}>
                    Main Page
                </span>
                <span className={classes.drawerRoutesSpan} onClick={navigateMatches}>
                    Matches
                </span>
                <span className={classes.drawerRoutesSpan} onClick={navigateIndividualStats}>
                    Individual Stats
                </span>
                <span className={classes.drawerRoutesSpan} onClick={navigateTeamStats}>
                    Team Stats
                </span>
                <Divider sx={{bgcolor: 'black', marginTop: '20px', marginBottom: '20px'}}/>
                <span className={classes.drawerRoutesSpan} onClick={openFiltersModal}>
                    Filters
                </span>
                {
                    credentials?.isCaptain &&
                        <>
                            <Divider sx={{bgcolor: 'black', marginTop: '20px', marginBottom: '20px'}}/>
                            <span className={classes.drawerRoutesSpan} onClick={openAddMatchPopup}>
                                Add Match
                            </span>
                        </>
                }
                {
                    credentials?.signedIn ?
                        <>
                            <div className={classes.mobileUserDiv}>
                                <section className={classes.mobileUserSection} onClick={openSignInPopup}>
                                    <div>
                                        <CardMedia
                                            component="img"
                                            sx={{height: 50, width: 50, borderRadius: '100%'}}
                                            image={require(`../../images/${Object.entries(TeamMembers).find(x => x[1].name === credentials?.userName)[0]}.jpeg`)}
                                        />
                                    </div>
                                    <div className={classes.mobileUserDetailsDiv}>
                                        <span className={classes.mobileUserNameSpan}>
                                            {credentials?.userName}
                                        </span>
                                        <span className={classes.mobileEmailSpan}>
                                            {credentials?.email}
                                        </span>
                                    </div>
                                </section>
                            </div>
                        </>
                        :
                        <>
                            <div className={classes.mobileUserDiv}>
                                <section className={classes.mobileUserSection} onClick={openSignInPopup}>
                                    <AccountCircleIcon sx={{height: 50, width: 50, color: 'lightgray'}}></AccountCircleIcon>
                                    <span className={classes.mobileUserNameSpan}>
                                    Sign In
                                </span>
                                </section>

                            </div>
                        </>
                }
            </div>
        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

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
                        display: {xs: 'none', md: 'flex'},
                        alignContent: 'center',
                        alignItems: 'center'
                    }}>
                        {
                            credentials?.signedIn ?
                                <CardMedia
                                    component="img"
                                    sx={{height: 50, width: 50, borderRadius: '100%', background: "0, 0, 0, 0", cursor: "pointer"}}
                                    onClick={handleOpenDesktopMenu}
                                    image={require(`../../images/${Object.entries(TeamMembers).find(x => x[1].name === credentials?.userName)[0]}.jpeg`)}
                                />
                                :
                                <AccountCircleIcon
                                    sx={{width: 59, height: 59, background: "0, 0, 0, 0", color: "black", cursor: "pointer"}}
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
                                    {backgroundColor: 'darkred', borderRadius: '25px'},
                                "& .MuiList-root":
                                    {backgroundColor: 'darkred', borderRadius: '25px'},
                            }}
                        >
                            <div className={classes.mobileMenu}>
                                <span
                                    className={classes.mobileMenuItems}
                                    onClick={openSignInPopup}
                                >
                                    {credentials?.signedIn ? 'Profile' : 'Sign In'}
                                </span>
                                <span
                                    className={classes.mobileMenuItems}
                                    onClick={openFiltersModal}
                                >
                                    Filters
                                </span>
                                {
                                    credentials?.isCaptain &&
                                        <>
                                            <span
                                                className={classes.mobileMenuItems}
                                                onClick={openAddMatchPopup}
                                            >
                                                Add Match
                                            </span>
                                        </>
                                }
                            </div>
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 0, display: {xs: 'flex', md: 'none'}, bgcolor: 'darkred'}}>
                        <MenuIcon
                            sx={{width: 40, height: 40, color: "black", cursor: "pointer", bgcolor: "rgb(0, 0, 0, 0)"}}
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
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: '100%', background: 'darkred'},
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Container>
            {isSignInPopupOpen && <SignIn openMessage={() => setMessagePopupOpen(true)}
                                          onClose={() => setSignInPopupOpen(false)}
                                          credentials={credentials} checkAuth={checkAuth}/>}
            {isMessagePopupOpen && <Message messageData={messageData} onClose={() => setMessagePopupOpen(false)}
                                            reloadData={handleReload}/>}
            {isAddMatchPopupOpen && <AddMatchComponent openMessage={() => setMessagePopupOpen(true)}
                                               onClose={() => setAddMatchPopupOpen(false)}
                                               messageData={(messageData) => handleXClick(messageData)}
                                               databaseData={databaseData}/>}
            {advancedFiltersModal && <AdvancedFilters databaseData={databaseData} onClose={() => setAdvancedFiltersModal(false)}
                                                      setFilters={setFilters} sendAppliedFilters={sendAppliedFilters}
                                                      applyFilters={applyFilters}/>}
        </AppBar>
    );
}

export default Navbar;
