import React, {useEffect, useRef, useState} from 'react';
import classes from "./sign-in.module.css";
import matchDetailsClasses from "../MatchDetails/match-details.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {signInWithEmailAndPassword, signOut} from "firebase/auth"
import {auth} from "../../firebase"
import {Loading} from "../../pages/loading-page";
import CardMedia from "@mui/material/CardMedia";
import {SnackbarMessages, TeamMembers} from "../../constants/constants";
import {Alert} from "@mui/material";
import Box from "@mui/material/Box";
import BackButton from "../../shared/BackButton/back-button";
import MainTitle from "../../shared/MainTitle/main-title";

const SignIn = ({onClose, credentials, checkAuth, selectedEra}) => {

    const popupRef = useRef(null);
    const isMobile = window.innerWidth <= 768;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signedIn, setSignedIn] = useState(credentials?.signedIn)
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                checkAuth(true)
                setSignedIn(true)
                if (errorMessage) setErrorMessage(null)
            })
            .catch((error) => {
                if (error?.message === SnackbarMessages.invalid_credentials) {
                    setErrorMessage(SnackbarMessages.invalid_email_password)
                } else {
                    setErrorMessage(error?.message)
                }
            })
        setLoading(false);
    };

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    }

    const handleBack = (data) => {
        if (data) handleClose()
    }

    const logOut = async () => {
        setLoading(true)
        await signOut(auth)
            .then(() => {
                if (signedIn) {
                    checkAuth(true)
                    setSignedIn(false)
                    if (errorMessage) setErrorMessage(null)
                }
            })
            .catch((error) => {
                setErrorMessage(error?.message)
            })
        setLoading(false)
    }

    if (loading || (signedIn && !credentials)) {
        return (
            <div className={classes.overlay}>
                <div className={classes.generalStyle} ref={popupRef}>
                    <div className={classes.loadingDiv}>
                        {Loading(selectedEra)}
                    </div>
                </div>
            </div>
        )
    }

    if (!signedIn) {
        return (
            <div className={classes.overlay}>
                <Box sx={{display: {xs: 'flex', md: 'none'}, bgcolor: 'black'}}>
                    <BackButton handleBackButton={handleBack}/>
                </Box>
                <div className={classes.generalStyle} ref={popupRef}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.infoAlign}>
                            <MainTitle title={'Account'}/>
                            <div style={{padding: '0 20px', marginTop: '20px'}}>
                                <span className={classes.miniTitle}>Email</span>
                            </div>
                            <input
                                className={classes.inputDesign}
                                required={true}
                                type="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <br/>
                            <div style={{padding: '0 20px', marginTop: '20px'}}>
                                <span className={classes.miniTitle}>Password</span>
                            </div>
                            <input
                                className={classes.inputDesign}
                                required={true}
                                type="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            {errorMessage &&
                                <Alert sx={{borderRadius: '25px', bgcolor: 'transparent', color: 'red', padding: 0}}
                                       variant="standard" severity="error">{errorMessage}</Alert>}
                        </div>
                        <div className={classes.buttonDivStyle}>
                            <button className={matchDetailsClasses.mapsButtons} type="submit">Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.overlay}>
            <Box sx={{display: {xs: 'flex', md: 'none'}, bgcolor: 'black'}}>
                <BackButton handleBackButton={handleBack}/>
            </Box>
            <div className={classes.generalStyle} ref={popupRef}>
                <div className={classes.signedInStyle}>
                    <div className={classes.iconDivStyle}>
                        {
                            credentials?.signedIn ?
                                <CardMedia
                                    component="img"
                                    sx={{height: {xs: '400px', md: '300px'}, width: '100%', marginTop: {xs: '50px', md: 0}}}
                                    image={require(`../../images/${Object.entries(TeamMembers).find(x => x[1].name === credentials?.userName)[0]}.jpeg`)}
                                />
                                :
                                <AccountCircleIcon sx={{width: "200px", height: "200px"}}
                                                   className={classes.iconStyle}></AccountCircleIcon>
                        }
                    </div>
                    <div style={{padding: '20px'}}>
                        <MainTitle title={'Account'}/>
                        <div style={{height: '5px'}}></div>
                        <div className={classes.morePageBox}>
                            <span
                                className={classes.drawerRoutesSpan}>{credentials?.signedIn ? credentials?.userName : 'Log In'}</span>
                            <span className={classes.mobileEmailSpan}>{credentials?.email}</span>
                        </div>
                        <div style={{height: '5px'}}></div>
                        <div style={{padding: '0 20px'}}>
                            <span className={classes.miniTitle}>{'Welcome ' + credentials?.userName + '.'}</span>
                        </div>
                    </div>
                    {errorMessage && <Alert sx={{borderRadius: '25px'}}
                                            variant="filled" severity="error">{errorMessage}</Alert>}
                    <div className={classes.buttonDivStyle}>
                        <button className={matchDetailsClasses.mapsButtons} onClick={logOut}>Log
                            Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
