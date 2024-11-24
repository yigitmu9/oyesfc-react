import React, {useState} from 'react';
import Box from "@mui/material/Box";
import BackButton from "../../shared/BackButton/back-button";
import {useNavigate} from "react-router-dom";
import classes from "../AccountGrid/account-grid.module.css";
import navbarClasses from "../Navbar/navbar.module.css";
import {getMessaging, getToken} from "firebase/messaging";
import {Alert} from "@mui/material";
import {dataBase, loadWebsite} from "../../firebase";
import {useSelector} from "react-redux";
import {ref, set} from "firebase/database";
import {generateRandomString} from "../../utils/utils";
import {AlertInterface} from "../../interfaces/Alert";
import {SnackbarTypes} from "../../constants/constants";

const SettingsGrid = () => {

    const {userName} = useSelector((state: any) => state.credentials);
    const navigate = useNavigate()
    const messaging = getMessaging();
    const [warning, setWarning] = useState<AlertInterface>({message: '', severity: undefined});

    const handleBack = (data?: any) => {
        if (data) {
            navigate('/oyesfc-react/account')
        }
    }

    const checkSubscription = async () => {
        /*
        try {
            const response: any = await loadWebsite('notifications');
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    registration.then((reg: any) => {
                        if (reg) {
                            getToken(messaging, {
                                vapidKey: response?.vapidKey,
                                serviceWorkerRegistration: reg
                            }).then(async (currentToken) => {
                                if (response?.[userName] && Object.values(response?.[userName])?.includes(currentToken)) {
                                    console.log(currentToken)
                                    const success = {
                                        message: 'Already subscribed!',
                                        severity: SnackbarTypes.success
                                    }
                                    setWarning(success);
                                } else if (currentToken) {
                                    const randomId: string = generateRandomString()
                                    await set(ref(dataBase, `notifications/${userName}/${randomId}`), currentToken);
                                    const success = {
                                        message: 'Successfully subscribed!',
                                        severity: SnackbarTypes.success
                                    }
                                    setWarning(success);
                                }
                            }).catch((error) => {
                                const err = {
                                    message: error?.message,
                                    severity: SnackbarTypes.error
                                }
                                setWarning(err);
                            });
                        } else {
                            const err = {
                                message: 'Registration failed!',
                                severity: SnackbarTypes.error
                            }
                            setWarning(err);
                        }
                    });
                } else {
                    const err = {
                        message: 'No permission!',
                        severity: SnackbarTypes.error
                    }
                    setWarning(err);
                }
            })
        } catch (error: any) {
            alert(error?.message)
        }
         */
    }

    return (
        <div style={{minHeight: '70vh'}}>
            <BackButton handleBackButton={handleBack} generalTitle={'Settings'}/>
            <Box sx={{display: {xs: 'flex', md: 'none'}, height: '30px'}}></Box>
            {
                warning?.severity !== SnackbarTypes.success &&
                <div className={classes.morePageBox} onClick={checkSubscription}>
                    <span className={navbarClasses.drawerRoutesSpan}>Subscription</span>
                </div>
            }
            {
                warning?.severity &&
                <>
                    {warning?.severity !== SnackbarTypes.success && <div style={{height: '20px'}}></div>}
                    <Alert sx={{padding: 1, borderRadius: '15px', bgcolor: '#1C1C1E', color: 'lightgray'}}
                           variant="outlined" severity={warning?.severity}>{warning?.message}</Alert>
                </>
            }

        </div>
    );
};

export default SettingsGrid;
