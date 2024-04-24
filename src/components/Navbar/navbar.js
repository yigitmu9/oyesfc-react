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
import SelectEditMatchModal from "../SelectEditMatchModal/select-edit-match-modal";
import {Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {TeamMembers} from "../../constants/constants";
import CardMedia from "@mui/material/CardMedia";

function Navbar({databaseData, reloadData}) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [desktopMenu, setDesktopMenu] = React.useState(null);
    const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [isAddMatchPopupOpen, setAddMatchPopupOpen] = useState(false);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [messageData, setMessageData] = useState(null);
    const [credentials, setCredentials] = useState(null)
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
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setSignInPopupOpen(true);
    };

    const openAddMatchPopup = () => {
        setAnchorElNav(null);
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setAddMatchPopupOpen(true);
    };

    const openEditMatchPopup = () => {
        setAnchorElNav(null);
        setDesktopMenu(null)
        document.body.style.overflow = 'hidden';
        setEditPopupOpen(true);
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
                        email: user?.email
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
                <CloseIcon sx={{width: 40, height: 40, color: "black", cursor: "pointer", bgcolor: "rgb(0, 0, 0, 0)", margin: '8px', marginRight: '16px'}}></CloseIcon>
            </div>
            <Divider sx={{ bgcolor: 'black', marginLeft: '20px', marginRight: '20px' }} />
            <div className={classes.drawerRoutesDiv}>
                <span className={classes.drawerRoutesSpan}>
                    Main Page
                </span>
                <span className={classes.drawerRoutesSpan}>
                    Matches
                </span>
                <span className={classes.drawerRoutesSpan}>
                    Individual Stats
                </span>
                <span className={classes.drawerRoutesSpan}>
                    Team Stats
                </span>
                {
                    credentials?.isCaptain ?
                        <>
                            <Divider sx={{bgcolor: 'black', marginTop: '20px', marginBottom: '20px'}}/>
                            <span className={classes.drawerRoutesSpan}>
                                Add Match
                            </span>
                            <span className={classes.drawerRoutesSpan}>
                                Edit Match
                            </span>
                        </>
                        :
                        null
                }
                {
                    !credentials?.signedIn ?
                        <>

                            <div style={{display: 'flex', bottom: '3%', position: 'absolute', padding: '10px'}}>
                                <div>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: 50, width: 50, borderRadius: '100%'}}
                                        image={require(`../../images/${Object.entries(TeamMembers).find(x => x[1].name === credentials?.userName)[0]}.jpeg`)}
                                    />
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '5px'}}>
                                    <span style={{fontSize: '20px'}} onClick={openSignInPopup}>
                                        {credentials?.userName}
                                    </span>
                                    <span style={{fontSize: '14px'}} onClick={openSignInPopup}>
                                        {credentials?.email}
                                    </span>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div style={{display: 'flex', bottom: '3%', position: 'absolute', padding: '10px', alignContent: 'center'}}>
                                <AccountCircleIcon sx={{height: 50, width: 50}}></AccountCircleIcon>
                                <span style={{fontSize: '20px'}} onClick={openSignInPopup}>
                                    Sign In
                                </span>
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
                        display: {xs: 'none', md: 'flex'}
                    }}>
                        <AccountCircleIcon
                            sx={{width: 59, height: 59, background: "0, 0, 0, 0", color: "black", cursor: "pointer"}}
                            onClick={handleOpenDesktopMenu} className={classes.userButtonLinkStyle}>
                        </AccountCircleIcon>
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
                                    style={{color: 'black'}}
                                    onClick={openSignInPopup}
                                >
                                    {credentials?.signedIn ? 'Profile' : 'Sign In'}
                                </span>
                                {
                                    credentials?.isCaptain ?
                                        <>
                                            <span
                                                className={classes.mobileMenuItems}
                                                style={{color: 'black'}}
                                                onClick={openAddMatchPopup}
                                            >
                                                Add Match
                                            </span>
                                            <span
                                                className={classes.mobileMenuItems}
                                                style={{color: 'black'}}
                                                onClick={openEditMatchPopup}
                                            >
                                                Edit Match
                                            </span>
                                        </>

                                        :
                                        null
                                }
                            </div>
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 0, display: {xs: 'flex', md: 'none'}, bgcolor: 'darkred'}}>
                        <MenuIcon
                            sx={{width: 40, height: 40, color: "black", cursor: "pointer", bgcolor: "rgb(0, 0, 0, 0)"}}
                            onClick={handleDrawerToggle}>
                        </MenuIcon>
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
                                    {credentials?.signedIn ? 'Profile' : 'Sign In'}
                                </span>
                                {
                                    credentials?.isCaptain ?
                                        <>
                                            <span
                                                className={classes.mobileMenuItems}
                                                style={{color: 'black'}}
                                                onClick={openAddMatchPopup}
                                            >
                                                Add Match
                                            </span>
                                            <span
                                                className={classes.mobileMenuItems}
                                                style={{color: 'black'}}
                                                onClick={openEditMatchPopup}
                                            >
                                                Edit Match
                                            </span>
                                        </>

                                        :
                                        null
                                }
                            </div>
                        </Menu>
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
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: {xs: 'block', sm: 'none'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: '100%', background: 'darkred'},
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Container>
            {isSignInPopupOpen && <SignIn openMessage={() => setMessagePopupOpen(true)}
                                          onClose={() => setSignInPopupOpen(false)}
                                          messageData={(messageData) => handleXClick(messageData)}
                                          databaseData={databaseData} reloadData={handleReload}
                                          credentials={credentials} checkAuth={checkAuth}/>}
            {isMessagePopupOpen && <Message messageData={messageData} onClose={() => setMessagePopupOpen(false)}/>}
            {isAddMatchPopupOpen && <AddMatchComponent openMessage={() => setMessagePopupOpen(true)}
                                               onClose={() => setAddMatchPopupOpen(false)}
                                               messageData={(messageData) => handleXClick(messageData)}
                                               databaseData={databaseData}/>}
            {isEditPopupOpen && <SelectEditMatchModal databaseData={databaseData} onClose={() => setEditPopupOpen(false)} reloadData={handleReload}/>}
        </AppBar>
    );
}

export default Navbar;
