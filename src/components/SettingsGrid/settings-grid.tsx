import React, {useCallback, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import BackButton from "../../shared/BackButton/back-button";
import {useNavigate} from "react-router-dom";
import classes from "../AccountGrid/account-grid.module.css";
import navbarClasses from "../Navbar/navbar.module.css";
import {Alert} from "@mui/material";
import {dataBase, loadWebsite} from "../../firebase";
import {useSelector} from "react-redux";
import {ref, set} from "firebase/database";
import {generateRandomString} from "../../utils/utils";
import {AlertInterface} from "../../interfaces/Alert";
import {SnackbarTypes} from "../../constants/constants";
import OneSignal from "react-onesignal";

const SettingsGrid = () => {

    const {userName} = useSelector((state: any) => state.credentials);
    const navigate = useNavigate()
    const [warning, setWarning] = useState<AlertInterface>({message: '', severity: undefined});

    const saveSubscriptionIdToDatabase = useCallback(async (pushSubscriptionId: any) => {
        try {
            const randomId: string = generateRandomString()
            await set(ref(dataBase, `notifications/${userName}/${randomId}`), pushSubscriptionId);
            const success = {
                message: 'Successfully subscribed and your id has been saved!',
                severity: SnackbarTypes.success
            }
            setWarning(success);
        } catch (error: any) {
            alert(error?.message)
        }
    }, [userName])

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                if (OneSignal?.Notifications?.permission && !warning?.severity) {
                    const response: any = await loadWebsite('notifications');
                    const pushSubscriptionId = OneSignal?.User?.PushSubscription?.id;
                    if (response?.[userName] && Object.values(response?.[userName])?.includes(pushSubscriptionId)) {
                        const success = {
                            message: 'You are already subscribed and your id is already in database!',
                            severity: SnackbarTypes.success
                        }
                        setWarning(success);
                    } else if (pushSubscriptionId) {
                        await saveSubscriptionIdToDatabase(pushSubscriptionId)
                    } else if (!pushSubscriptionId) {
                        const success = {
                            message: 'Id not found!',
                            severity: SnackbarTypes.error
                        }
                        setWarning(success);
                    }
                } else if (!OneSignal.Notifications.permission && !warning?.severity) {

                }
            } catch (error: any) {
                alert(error?.message)
            }
        }
        checkSubscription().then(r => r)
    }, [saveSubscriptionIdToDatabase, userName, warning?.severity]);

    const handleBack = (data?: any) => {
        if (data) {
            navigate('/oyesfc-react/account')
        }
    }

    const checkSubscription = async () => {
        await OneSignal?.Notifications?.requestPermission()?.then(() => {
            const pushSubscriptionId = OneSignal?.User?.PushSubscription?.id;
            saveSubscriptionIdToDatabase(pushSubscriptionId)
        }).catch((err: any) => {
            const success = {
                message: err?.message,
                severity: SnackbarTypes.error
            }
            setWarning(success);
        });
    }

    return (
        <div style={{minHeight: '70vh'}}>
            <BackButton handleBackButton={handleBack} generalTitle={'Settings'}/>
            <Box sx={{display: {xs: 'flex', md: 'none'}, height: '30px'}}></Box>
            {
                warning?.severity !== SnackbarTypes.success &&
                <div className={classes.morePageBox} onClick={checkSubscription}>
                    <span className={navbarClasses.drawerRoutesSpan}>Subscribe</span>
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
