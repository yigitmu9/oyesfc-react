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
import {useCallback, useEffect, useState} from "react";
import SignIn from "../SignIn/sign-in";
import AddMatchComponent from "../AddMatch/add-match";
import {Alert, BottomNavigation, BottomNavigationAction, Drawer, Snackbar} from "@mui/material";
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
import MainTitle from "../../shared/MainTitle/main-title";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../../redux/credentialsSlice";
import {checkAuthState, signOutUser} from "../../services/service";

function Navbar() {
    const { selectedEra } = useSelector((state) => state.era);
    const { userName, isCaptain, email, signedIn } = useSelector((state) => state.credentials);
    const [desktopMenu, setDesktopMenu] = React.useState(null);
    const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
    const [isAddMatchPopupOpen, setAddMatchPopupOpen] = useState(false);
    const [isCalendarPopupOpen, setCalendarPopupOpen] = useState(false);
    const [snackbarData, setSnackbarData] = useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [advancedFiltersModal, setAdvancedFiltersModal] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();
    const matchesPath = '/oyesfc-react/matches';
    const individualPath = '/oyesfc-react/individual-stats';
    const teamPath = '/oyesfc-react/team-stats';
    const mainPath = '/oyesfc-react/';
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

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
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setAdvancedFiltersModal(true)
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
        if (mobileOpen) handleDrawerToggle()
        navigate(matchesPath);
    };

    const navigateIndividualStats = () => {
        if (mobileOpen) handleDrawerToggle()
        navigate(individualPath);
    };

    const navigateTeamStats = () => {
        if (mobileOpen) handleDrawerToggle()
        navigate(teamPath);
    };

    const navigateMainPage = () => {
        if (mobileOpen) handleDrawerToggle()
        navigate(mainPath);
    };

    const openCalendarPopup = () => {
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setCalendarPopupOpen(true);
    };

    const handleXClick = (snackbarData) => {
        setSnackbarData(snackbarData);
    };

    const handleCloseSignIn = (snackbarData) => {
        setSnackbarData(snackbarData)
        setSignInPopupOpen(false)
    }

    const openSignInPopup = (device) => {
        if (device === 'desktop' || (!signedIn && device === 'mobile')) {
            setDesktopMenu(null)
            document.body.style.overflow = 'hidden';
            setSignInPopupOpen(true);
        }
    };

    const openAddMatchPopup = () => {
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setAddMatchPopupOpen(true);
    };

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarData(null);
    };

    const onBottomNavChange = (pageIndex) => {
        if (value !== pageIndex) {
            setValue(pageIndex)
            if (pageIndex === 0) navigateMainPage()
            if (pageIndex === 1) navigateMatches()
            if (pageIndex === 2) navigateIndividualStats()
            if (pageIndex === 3) navigateTeamStats()
            if (pageIndex === 4 && !mobileOpen) openDrawerToggle()
        }
    }

    const checkStateAuth = useCallback(async () => {
        const authResponse = await checkAuthState();
        if (authResponse?.signedIn && authResponse?.success) {
            dispatch(login({
                userName: authResponse?.userName,
                isCaptain: authResponse?.isCaptain,
                email: authResponse?.email,
                id: authResponse?.id,
            }))
        } else if (!authResponse?.signedIn && authResponse?.success) {
            dispatch(logout())
        } else if (!authResponse?.success) {
            setSnackbarData(authResponse?.error)
        }
    }, [dispatch])

    useEffect(() => {
        checkStateAuth().then(r => r)
    }, [checkStateAuth]);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const openDrawerToggle = () => {
        setMobileOpen(true);
    };

    const startLogOut = async (device) => {
        if (device === 'desktop') setDesktopMenu(false)
        signOutUser()
            .then(result => {
                if (result.success) {
                    dispatch(logout())
                    const message = {
                        open: true,
                        status: SnackbarTypes.success,
                        message: 'Successfully signed out!',
                        duration: 6000
                    };
                    setSnackbarData(message)
                } else {
                    const errorResponse = {
                        open: true,
                        status: SnackbarTypes.error,
                        message: result?.error?.message,
                        duration: 18000
                    };
                    setSnackbarData(errorResponse)
                }
            })
            .catch(error => {
                // Handle unexpected errors
                console.error(error);
            });
    }

    const mobileMorePage = (
        <>
            <MainTitle title={'Account'}/>
            <div style={{height: '5px'}}></div>
            <div className={classes.morePageBox} onClick={() => openSignInPopup('mobile')}>
                <span
                    className={classes.drawerRoutesSpan}>{signedIn ? userName : 'Sign In'}</span>
                {signedIn && <span className={classes.mobileEmailSpan}>{email}</span>}
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
                isCaptain &&
                <>
                    <div style={{height: '20px'}}></div>
                    <div className={classes.morePageBox} onClick={openAddMatchPopup}>
                        <span className={classes.drawerRoutesSpan}>Add Match</span>
                    </div>
                </>
            }
            {
                signedIn &&
                <>
                    <div style={{height: '20px'}}></div>
                    <div className={classes.morePageBox} onClick={() => startLogOut('mobile')}>
                        <span className={classes.drawerRoutesSpan} style={{color: 'red'}}>Sign Out</span>
                    </div>
                </>
            }
        </>
    )

    const container = window !== undefined ? () => window.document.body : undefined;

    const phoenixLogoElement = (
        <div className={classes.phoenixDivStyle}>
            <img className={classes.phoenixImgStyle}
                 onClick={navigateMainPage} src={PhoenixLogo} alt={'1'}/>
        </div>
    )

    return (
        <>
            <AppBar position="sticky" sx={{bgcolor: getTeamLogo(), display: {xs: 'none', md: 'flex'}, margin: 0}}>
                <Container maxWidth="lg" sx={{bgcolor: getTeamLogo()}}>
                    <Toolbar disableGutters sx={{bgcolor: getTeamLogo()}}>
                        <Box sx={{flexGrow: 1, display: 'flex', bgcolor: getTeamLogo()}}>
                            {getTeam() === PhoenixLogo ? phoenixLogoElement :
                                <img className={classes.imgStyle}
                                     onClick={navigateMainPage} src={getTeam()} alt={'1'}/>
                            }
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
                                signedIn ?
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
                                        image={require(`../../images/${Object.entries(TeamMembers).find(x => x[1].name === userName)[0]}.jpeg`)}
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
                                        {backgroundColor: getTeamLogo(), borderRadius: '12px'},
                                    "& .MuiList-root":
                                        {backgroundColor: getTeamLogo(), borderRadius: '12px'},
                                }}
                            >
                                <div className={classes.mobileMenu}>
                                    {
                                        signedIn ?
                                            <>
                                                <span className={classes.mobileMenuItems} style={{cursor: 'auto'}}>
                                                    {userName?.toUpperCase()}
                                                </span>
                                                <span className={classes.mobileMenuEmailItem}>{email}</span>
                                            </>
                                            :
                                            <>
                                                <span className={classes.mobileMenuItems}
                                                      onClick={() => openSignInPopup('desktop')}>
                                                    SIGN IN
                                                </span>
                                            </>

                                    }
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
                                        isCaptain &&
                                        <>
                                            <span
                                                className={classes.mobileMenuItems}
                                                onClick={openAddMatchPopup}
                                            >
                                                ADD MATCH
                                            </span>
                                        </>
                                    }
                                    {
                                        signedIn &&
                                        <>
                                            <span
                                                className={classes.mobileMenuItems}
                                                onClick={() => startLogOut('desktop')}
                                            >
                                                SIGN OUT
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
                            transitionDuration={0}
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
                            <PageGrid page={mobileMorePage}/>
                        </Drawer>
                    </nav>
                </Container>
            </AppBar>
            <Box sx={{position: 'fixed', left: 0, bottom: -2, width: '100%', display: {xs: 'flex', md: 'none'},
                zIndex: 99999999999, bgcolor: 'rgba(0, 0, 0)', borderTop: '0.00001em solid #252525'}}>
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
                    <BottomNavigationAction sx={{color: 'gray'}} label="Account" icon={<AccountCircleIcon/>}/>
                </BottomNavigation>
            </Box>
            {isSignInPopupOpen && <SignIn onClose={(data) => handleCloseSignIn(data)}/>}
            {isAddMatchPopupOpen && <AddMatchComponent onClose={() => setAddMatchPopupOpen(false)}
                                                       snackbarData={(snackbarData) => handleXClick(snackbarData)}/>}
            {advancedFiltersModal &&
                <AdvancedFilters onClose={() => setAdvancedFiltersModal(false)}/>}
            {isCalendarPopupOpen &&
                <CalendarComponent onClose={() => setCalendarPopupOpen(false)}/>}
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
