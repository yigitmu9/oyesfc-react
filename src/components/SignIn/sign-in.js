import React, {useEffect, useRef, useState} from 'react';
import classes from "./sign-in.module.css";
import matchDetailsClasses from "../MatchDetails/match-details.module.css";
import {Loading} from "../../pages/loading-page";
import {OYesFcEras, SnackbarMessages, SnackbarTypes} from "../../constants/constants";
import {Alert} from "@mui/material";
import Box from "@mui/material/Box";
import BackButton from "../../shared/BackButton/back-button";
import MainTitle from "../../shared/MainTitle/main-title";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthState, signInUser} from "../../services/service";
import {login, logout} from "../../redux/credentialsSlice";
import GhostLogo from "../../images/ghost.png";
import PhoenixLogo from "../../images/phoenix.png";
import OYesFCLogo from "../../images/oyesfc.PNG";
import FirstLogo from "../../images/firstLogo.png";

const SignIn = ({onClose}) => {

    const dispatch = useDispatch();
    const { selectedEra } = useSelector((state) => state.era);
    const popupRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false);
    const initialFormData = {
        email: '',
        password: ''
    };

    const [formData, setFormData] = useState(initialFormData);

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

    const getTeam = () => {
        if (selectedEra === OYesFcEras.goldenAge) return PhoenixLogo
        if (selectedEra === OYesFcEras.redAndBlack) return OYesFCLogo
        if (selectedEra === OYesFcEras.rising) return FirstLogo
        if (selectedEra === OYesFcEras.origins) return GhostLogo
        return PhoenixLogo
    }

    const handleClose = (snackbarMessage) => {
        document.body.style.overflow = 'visible';
        onClose(snackbarMessage);
    }

    const handleBack = (data) => {
        if (data) handleClose()
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const response = await signInUser(formData.email, formData.password);
        if (response?.success) {
            const authResponse = await checkAuthState();
            if (authResponse?.signedIn && authResponse?.success) {
                dispatch(login({
                    userName: authResponse?.userName,
                    isCaptain: authResponse?.isCaptain,
                    email: authResponse?.email,
                    id: authResponse?.id,
                }))
                const message = {
                    open: true,
                    status: SnackbarTypes.success,
                    message: 'Welcome ' + authResponse?.userName + '!',
                    duration: 6000
                };
                handleClose(message)
            } else if (!authResponse?.signedIn && authResponse?.success) {
                dispatch(logout())
            } else if (!authResponse?.success) {
                setErrorMessage(authResponse?.error)
            }
        } else {
            if (response?.error?.message === SnackbarMessages.invalid_credentials) {
                setErrorMessage(SnackbarMessages.invalid_email_password)
            } else {
                setErrorMessage(response?.error?.message)
            }
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <div className={classes.overlay}>
                <div className={classes.generalStyle} ref={popupRef}>
                    <div className={classes.loadingDiv}>
                        {Loading(selectedEra, '500px')}
                    </div>
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
                <form>
                    <div className={classes.infoAlign}>
                        <Box sx={{display: {xs: 'none', md: 'block'}}}>
                            <MainTitle title={'Account'} size={'large'}/>
                        </Box>
                        <Box sx={{display: {xs: 'flex', md: 'none'}, justifyContent: 'center'}}>
                            <img style={{
                                width: "150px",
                                height: "150px",
                                background: "transparent",
                                marginBottom: "20px"
                            }}
                                 src={getTeam()} alt={'1'}/>
                        </Box>
                        <div style={{padding: '0 20px', marginTop: '20px'}}>
                            <span className={classes.miniTitle}>Email</span>
                        </div>
                        <input
                            className={classes.inputDesign}
                            required={true}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
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
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errorMessage &&
                            <Alert sx={{borderRadius: '25px', bgcolor: 'transparent', color: 'red', padding: 0}}
                                   variant="standard" severity="error">{errorMessage}</Alert>}
                    </div>
                    <div className={classes.buttonDivStyle}>
                        <button className={matchDetailsClasses.mapsButtons}
                                onClick={(event) => handleSubmit(event)}>
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
