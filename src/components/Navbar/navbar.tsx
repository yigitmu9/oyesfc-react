import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import OYesFCLogo from "../../images/oyesfc.PNG";
import classes from './navbar.module.css'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import {OYesFcEras, TeamMembers} from "../../constants/constants";
import CardMedia from "@mui/material/CardMedia";
import PhoenixLogo from "../../images/phoenix.png";
import FirstLogo from "../../images/firstLogo.png";
import GhostLogo from "../../images/ghost.png";
import HomeIcon from "@mui/icons-material/Home";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../../redux/credentialsSlice";
import {checkAuthState} from "../../services/service";

function Navbar() {
    const { selectedEra } = useSelector((state: any) => state.era);
    const { userName, signedIn } = useSelector((state: any) => state.credentials);
    const navigate = useNavigate()
    const location = useLocation();
    const matchesPath = '/oyesfc-react/matches';
    const individualPath = '/oyesfc-react/individual-stats';
    const teamPath = '/oyesfc-react/team-stats';
    const mainPath = '/oyesfc-react/';
    const accountPath = '/oyesfc-react/account';
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

    const navigateAccountPage = () => {
        navigate(accountPath);
    };

    const onBottomNavChange = (pageIndex?: any) => {
        if (value !== pageIndex) {
            setValue(pageIndex)
            if (pageIndex === 0) navigateMainPage()
            if (pageIndex === 1) navigateMatches()
            if (pageIndex === 2) navigateIndividualStats()
            if (pageIndex === 3) navigateTeamStats()
            if (pageIndex === 4) navigateAccountPage()
        }
    }

    const checkStateAuth = useCallback(async () => {
        const authResponse: any = await checkAuthState();
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
            alert(authResponse?.error);
        }
    }, [dispatch])

    useEffect(() => {
        checkStateAuth().then(r => r)
    }, [checkStateAuth]);

    return (
        <>
            <AppBar position="sticky" sx={{bgcolor: getTeamLogo(), display: {xs: 'none', md: 'flex'}, margin: 0}}>
                <Container maxWidth="lg" sx={{bgcolor: getTeamLogo()}}>
                    <Toolbar disableGutters sx={{bgcolor: getTeamLogo()}}>
                        <Box sx={{flexGrow: 1, display: 'flex', bgcolor: getTeamLogo()}}>
                            {getTeam() === PhoenixLogo ?
                                <div className={classes.phoenixDivStyle}>
                                    <img className={classes.phoenixImgStyle}
                                         onClick={navigateMainPage} src={PhoenixLogo} alt={'1'}/>
                                </div>
                                :
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
                                        onClick={navigateAccountPage}
                                        image={require(`../../images/${Object.entries(TeamMembers).find(x => x[1].name === userName)?.[0]}.jpeg`)}
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
                                        onClick={navigateAccountPage} className={classes.userButtonLinkStyle}>
                                    </AccountCircleIcon>
                            }
                        </Box>
                    </Toolbar>
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
        </>
    );
}

export default Navbar;
