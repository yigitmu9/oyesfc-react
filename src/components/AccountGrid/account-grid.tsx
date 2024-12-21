import React, {useState} from 'react';
import navbarClasses from "../Navbar/navbar.module.css";
import MainTitle from "../../shared/MainTitle/main-title";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RedditIcon from "@mui/icons-material/Reddit";
import {DirectionList, TeamMembers, TeamNames} from "../../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signOutUser} from "../../services/service";
import {logout} from "../../redux/credentialsSlice";
import Box from "@mui/material/Box";
import classes from './account-grid.module.css'
import SignIn from "../SignIn/sign-in";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Alert} from "@mui/material";
import {redirect} from "../../utils/utils";

const AccountGrid = () => {

    const {userName, isCaptain, email, signedIn} = useSelector((state: any) => state.credentials);
    const [errorData, setErrorData] = useState(null);
    const navigate = useNavigate()
    const filtersPath = '/oyesfc-react/filters';
    const calendarPath = '/oyesfc-react/calendar';
    const addMatchPath = '/oyesfc-react/add-match';
    const ratingsPath = '/oyesfc-react/ratings';
    const settingsPath = '/oyesfc-react/settings';
    const dispatch = useDispatch();
    const packageJson = require('./../../../package.json');
    const date = new Date();
    const year = date.getFullYear();

    const openFiltersPage = () => {
        navigate(filtersPath);
    };

    const openCalendarPage = () => {
        navigate(calendarPath);
    };

    const openRatingsPage = () => {
        navigate(ratingsPath);
    };

    const openAddMatchPage = () => {
        navigate(addMatchPath);
    };

    const openNotificationSettingsPage = () => {
        navigate(settingsPath);
    };

    const startLogOut = async () => {
        signOutUser()
            .then((result: any) => {
                if (result.success) {
                    dispatch(logout())
                } else {
                    setErrorData(result?.error?.message)
                }
            })
            .catch(error => {
                setErrorData(error?.message)
            });
    }

    return (
        <div style={{minHeight: '70vh'}}>
            <MainTitle title={'Account'}/>
            <div style={{height: '5px'}}></div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{display: {xs: 'none', md: 'flex'}, flexDirection: 'column', width: 'auto', height: '452px'}}>
                    {signedIn ? <img
                        src={require(`../../images/${Object.entries(TeamMembers).find(x => x[1].name === userName)?.[0]}.jpeg`)}
                        alt={'1'}
                        style={{display: 'flex', width: 'auto', height: '100%', borderRadius: '15px'}}/> :
                    <AccountBoxIcon sx={{display: 'flex', width: 'auto', height: '110%', color: 'lightgrey', marginTop: '-60px'}}>
                    </AccountBoxIcon>}
                </Box>
                <Box sx={{display: {xs: 'none', md: 'flex'}, flexDirection: 'column', width: '5%'}}></Box>

                <Box sx={{display: 'flex', flexDirection: 'column', width: {xs: '100%', md: 'auto'}}}>
                    {
                        signedIn &&
                        <>
                            <div className={classes.morePageBox} style={{cursor: 'auto'}}>
                                <span
                                    className={navbarClasses.drawerRoutesSpan}>{userName}</span>
                                <span className={navbarClasses.mobileEmailSpan}>{email}</span>
                            </div>
                            <div style={{height: '20px'}}></div>
                            <div className={classes.morePageBox} onClick={() => startLogOut()}>
                                <span className={navbarClasses.drawerRoutesSpan} style={{color: 'red'}}>Sign Out</span>
                            </div>
                            <div style={{height: '5px'}}></div>
                            <div style={{padding: '0 20px'}}>
                <span className={navbarClasses.miniTitle}>{'Click the button to log out of your account.'}</span>
                            </div>
                            {errorData &&
                                <Alert sx={{ padding: '0.5 1', marginTop: '20px', borderRadius: '15px', bgcolor: '#1C1C1E', color: 'lightgray'}}
                                       variant="outlined" severity='error'>{errorData}</Alert>}
                            <div style={{height: '30px'}}></div>
                        </>
                    }
                    {!signedIn && <SignIn/>}
                    <div className={classes.morePageBox} onClick={openFiltersPage}>
                        <span className={navbarClasses.drawerRoutesSpan}>Filters</span>
                    </div>
                    <div style={{height: '5px'}}></div>
                    <div style={{padding: '0 20px'}}>
                <span className={navbarClasses.miniTitle}>{'Personalize data according to your choices, ' +
                    'your choices apply to all pages and are remembered even if you close the site.'}</span>
                    </div>
                    <div style={{height: '30px'}}></div>
                    <div className={classes.morePageBox} onClick={openCalendarPage}>
                        <span className={navbarClasses.drawerRoutesSpan}>Calendar</span>
                    </div>
                    {
                        signedIn &&
                        <>
                            <div style={{height: '20px'}}></div>
                            <div className={classes.morePageBox} onClick={openRatingsPage}>
                                <span className={navbarClasses.drawerRoutesSpan}>Ratings</span>
                            </div>
                        </>
                    }
                    {
                        isCaptain &&
                        <>
                            <div style={{height: '20px'}}></div>
                            <div className={classes.morePageBox} onClick={openAddMatchPage}>
                                <span className={navbarClasses.drawerRoutesSpan}>Add Match</span>
                            </div>
                        </>
                    }
                    <Box sx={{display: {xs: 'flex', md: 'none'}, flexDirection: 'column'}}>
                        <div style={{height: '20px'}}></div>
                        <div className={classes.morePageBoxLinks}>
                <span className={navbarClasses.drawerRoutesSpanLinks}>
                    <InstagramIcon className={navbarClasses.iconStyle} style={{fontSize: "50px"}}
                                   onClick={() => redirect(DirectionList.instagram)}></InstagramIcon>
                    <XIcon className={navbarClasses.iconStyle} style={{fontSize: "50px"}}
                           onClick={() => redirect(DirectionList.twitter)}></XIcon>
                    <EmailIcon className={navbarClasses.iconStyle} style={{fontSize: "50px"}}
                               onClick={() => redirect(DirectionList.email)}></EmailIcon>
                    <YouTubeIcon className={navbarClasses.iconStyle} style={{fontSize: "50px"}}
                                 onClick={() => redirect(DirectionList.youtube)}></YouTubeIcon>
                    {signedIn &&
                        <RedditIcon className={navbarClasses.iconStyle} style={{fontSize: "50px"}}
                                    onClick={() => redirect(DirectionList.reddit)}></RedditIcon>}
                </span>
                        </div>
                        <div style={{height: '5px'}}></div>
                        <div style={{padding: '0 20px'}}>
                <span
                    className={navbarClasses.miniTitle}>{'© ' + year + ' ' + TeamNames.oYesFc + '™ | v' + packageJson.version}</span>
                        </div>
                    </Box>
                    {
                        signedIn &&
                        <>
                            <div style={{height: '20px'}}></div>
                            <div className={classes.morePageBox} onClick={openNotificationSettingsPage}>
                                <span className={navbarClasses.drawerRoutesSpan}>Notifications</span>
                            </div>
                        </>
                    }
                </Box>
            </div>

        </div>
    );
};

export default AccountGrid;
