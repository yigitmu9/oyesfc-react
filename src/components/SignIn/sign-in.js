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
                <div className={classes.generalStyle} ref={popupRef}>
                    <form onSubmit={handleSubmit} style={{background: "#1f1f1f"}}>
                        <div className={classes.infoAlign}>
                            <div className={classes.iconDivStyle}>
                                <AccountCircleIcon sx={{width: "200px", height: "200px"}}
                                                   className={classes.iconStyle}></AccountCircleIcon>
                            </div>
                            <h1 className={classes.titleStyle}>Log In</h1>
                            <label style={{background: "#1f1f1f"}}>
                                Email:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </label>
                            <br/>
                            <label style={{background: "#1f1f1f"}}>
                                Password:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </label>
                            {errorMessage &&
                                <Alert sx={{borderRadius: '25px', bgcolor: 'transparent', color: 'red', padding: 0}}
                                       variant="standard" severity="error">{errorMessage}</Alert>}
                        </div>
                        <div className={classes.buttonDivStyle}>
                            <button className={matchDetailsClasses.mapsButtons} type="submit">Log In
                            </button>
                            {
                                isMobile &&
                                <button className={matchDetailsClasses.mapsButtons} style={{marginLeft: "1rem"}} onClick={handleClose}>Cancel</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.overlay}>
            <div className={classes.generalStyle} ref={popupRef}>
                <div className={classes.signedInStyle}>
                    <div className={classes.iconDivStyle}>
                        {
                            credentials?.signedIn ?
                                <CardMedia
                                    component="img"
                                    sx={{height: 200, width: 200, borderRadius: '100%'}}
                                    image={require(`../../images/${Object.entries(TeamMembers).find(x => x[1].name === credentials?.userName)[0]}.jpeg`)}
                                />
                                :
                                <AccountCircleIcon sx={{width: "200px", height: "200px"}}
                                                   className={classes.iconStyle}></AccountCircleIcon>
                        }
                    </div>
                    <h1 className={classes.titleStyle}>Welcome</h1>
                    <h1 className={classes.usernameStyle}>{credentials?.userName}</h1>
                    <h1 className={classes.emailStyle}>{credentials?.email}</h1>
                    {errorMessage && <Alert sx={{borderRadius: '25px'}}
                                            variant="filled" severity="error">{errorMessage}</Alert>}
                    <div className={classes.buttonDivStyle}>
                        <button className={matchDetailsClasses.mapsButtons} onClick={logOut}>Log
                            Out
                        </button>
                        {
                            isMobile &&
                            <button className={matchDetailsClasses.mapsButtons} style={{marginLeft: "1rem"}}
                                    onClick={handleClose}>Close</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
