import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import BackButton from '../../shared/BackButton/back-button';
import { Alert } from '@mui/material';
import { dataBase, loadWebsite } from '../../firebase';
import { useSelector } from 'react-redux';
import { ref, set } from 'firebase/database';
import { generateRandomString, OYesFCPlayersArray } from '../../utils/utils';
import { AlertInterface } from '../../interfaces/Alert';
import { AddMatchMessages, SnackbarTypes } from '../../constants/constants';
import OneSignal from 'react-onesignal';
import ButtonComponent from '../../shared/ButtonComponent/button-component';
import sharedClasses from '../../shared/Styles/shared-styles.module.css';
import classes from '../SignIn/sign-in.module.css';
import addMatchClasses from '../AddMatch/add-match.module.css';
import { sendNotifications } from '../../services/service';

interface NotificationSettingsGridProps {
    handlePreviousPage?: any;
}

const NotificationSettingsGrid: React.FC<NotificationSettingsGridProps> = ({ handlePreviousPage }) => {
    const { userName, isCaptain } = useSelector((state: any) => state.credentials);
    const [warning, setWarning] = useState<AlertInterface>({
        message: '',
        severity: undefined,
    });
    const [errorMessage, setErrorMessage] = useState<AlertInterface>({
        message: '',
        severity: undefined,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [formLoading, setFormLoading] = useState<boolean>(false);
    const [notificationsData, setNotificationsData] = useState<any>(null);
    const initialFormData: any = {
        title: '',
        detail: '',
    };
    const subscriptions = ['Release Notes', 'Match Videos']
    const permissionButtons = ['Subscribe to ', 'Unsubscribe from ']
    const [permissions, setPermissions] = useState<any>(null);

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (event?: any) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: inputValue,
        }));
    };

    const checkReleaseNoteSubscription= useCallback(
        async () => {
            try {
                const permission: any = await loadWebsite(`releaseNotes/permissions/${userName}`);
                setPermissions(permission)
            } catch (error: any) {
                alert(error?.message);
            }
        }, [userName]
    );

    const saveSubscriptionIdToDatabase = useCallback(
        async (pushSubscriptionId: any) => {
            try {
                const randomId: string = generateRandomString();
                await set(ref(dataBase, `notifications/${userName}/${randomId}`), pushSubscriptionId);
                const success = {
                    message: 'Successfully subscribed and your id has been saved!',
                    severity: SnackbarTypes.success,
                };
                setWarning(success);
                checkReleaseNoteSubscription().then(r => r)
                if (loading) setLoading(false);
            } catch (error: any) {
                alert(error?.message);
                if (loading) setLoading(false);
            }
        },
        [checkReleaseNoteSubscription, loading, userName]
    );

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const response: any = await loadWebsite('notifications');
                if (isCaptain) setNotificationsData(response);
                if (OneSignal?.Notifications?.permission && !warning?.severity) {
                    const pushSubscriptionId = OneSignal?.User?.PushSubscription?.id;
                    if (response?.[userName] && Object.values(response?.[userName])?.includes(pushSubscriptionId)) {
                        const success = {
                            message:
                                'You are already subscribed and your id is already in database!\n ' +
                                'ID: ' +
                                pushSubscriptionId,
                            severity: SnackbarTypes.success,
                        };
                        setWarning(success);
                        checkReleaseNoteSubscription().then(r => r)
                        if (loading) setLoading(false);
                    } else if (pushSubscriptionId) {
                        await saveSubscriptionIdToDatabase(pushSubscriptionId);
                    } else if (!pushSubscriptionId) {
                        const success = {
                            message: 'Id not found!',
                            severity: SnackbarTypes.error,
                        };
                        setWarning(success);
                        if (loading) setLoading(false);
                    }
                } else if (!OneSignal.Notifications.permission && !warning?.severity) {
                    if (loading) setLoading(false);
                }
            } catch (error: any) {
                alert(error?.message);
                if (loading) setLoading(false);
            }
        };
        checkSubscription().then((r) => r);
    }, [checkReleaseNoteSubscription, isCaptain, loading, saveSubscriptionIdToDatabase, userName, warning?.severity]);

    const handleBack = (data?: any) => {
        if (data) {
            handlePreviousPage(true);
        }
    };

    const checkSubscription = async () => {
        setLoading(true);
        await OneSignal?.Notifications?.requestPermission()
            ?.then(() => {
                const pushSubscriptionId = OneSignal?.User?.PushSubscription?.id;
                saveSubscriptionIdToDatabase(pushSubscriptionId);
            })
            .catch((err: any) => {
                const error = {
                    message: err,
                    severity: SnackbarTypes.error,
                };
                setWarning(error);
                if (loading) setLoading(false);
            });
    };

    const handleSubmit = async () => {
        setFormLoading(true);
        const playerIds = Object.entries(notificationsData)
            ?.filter((a: any) => formData?.[a[0]] === true)
            ?.map((item) => (item?.[1] ? Object.values(item?.[1]) : null))
            ?.flat();
        await sendNotifications(formData?.title, formData?.detail, playerIds)
            .then(() => {
                const result = {
                    message: AddMatchMessages.push_notifications_success,
                    severity: SnackbarTypes.success,
                };
                setErrorMessage(result);
                setFormLoading(false);
            })
            .catch(() => {
                const result = {
                    message: AddMatchMessages.push_notifications_fail,
                    severity: SnackbarTypes.error,
                };
                setErrorMessage(result);
                setFormLoading(false);
            });
    };

    const handleChangePermission = async (title: any) => {
        try {
            setLoading(true);
            await set(ref(dataBase, `releaseNotes/permissions/${userName}/${title}`), !permissions?.[title]);
            setPermissions((prevData: any) => ({
                ...prevData,
                [title]: !permissions?.[title],
            }));
            setLoading(false);
        } catch (error: any) {
            alert(error?.message);
            setLoading(false);
        }
    }

    return (
        <div style={{ minHeight: '70vh' }}>
            <BackButton handleBackButton={handleBack} generalTitle={'Notifications'} />
            <Box sx={{ display: { xs: 'flex', md: 'none' }, height: '30px' }}></Box>
            {warning?.severity !== SnackbarTypes.success && (
                <ButtonComponent
                    onClick={checkSubscription}
                    name={'Subscribe'}
                    loading={loading}
                    size={'large'}
                    textColor={'#007AFF'}
                    backgroundColor={'#1C1C1E'}
                />
            )}
            {warning?.severity && (
                <>
                    {warning?.severity !== SnackbarTypes.success && (
                        <div className={sharedClasses.emptyHeightSpace}></div>
                    )}
                    <Alert
                        sx={{
                            padding: 1,
                            borderRadius: '15px',
                            bgcolor: '#1C1C1E',
                            color: 'lightgray',
                        }}
                        variant="outlined"
                        severity={warning?.severity}
                    >
                        {warning?.message}
                    </Alert>
                </>
            )}
            {
                warning?.severity === SnackbarTypes.success && subscriptions?.map((x: any, y: any) => (
                    <div key={y}>
                        <div className={sharedClasses.emptyHeightSpace}></div>
                        <ButtonComponent
                            onClick={() => handleChangePermission(x)}
                            name={permissions?.[x] ? (permissionButtons[1] + x) : (permissionButtons[0] + x)}
                            loading={formLoading}
                            size={'large'}
                            textColor={permissions?.[x] ? 'red' : '#007AFF'}
                            backgroundColor={'#1C1C1E'}
                        />
                    </div>
                ))
            }
            {isCaptain && (
                <>
                    <div className={sharedClasses.emptyHeightSpace}></div>
                    <form className={classes.formStyle}>
                        <div>
                            <input
                                className={classes.inputDesign}
                                required={true}
                                type="title"
                                name="title"
                                placeholder="Title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                            <br />
                            <div style={{ height: '20px' }}></div>
                            <input
                                className={classes.inputDesign}
                                required={true}
                                type="detail"
                                name="detail"
                                placeholder="Detail"
                                value={formData.detail}
                                onChange={handleInputChange}
                            />
                            <div style={{ height: '20px' }}></div>
                            {isCaptain &&
                                notificationsData &&
                                Object.keys(notificationsData)
                                    ?.filter((a) => OYesFCPlayersArray.includes(a))
                                    ?.map((x, y) => (
                                        <div key={y}>
                                            <div className={classes.inputDesign}>
                                                <label className={addMatchClasses.customCheckbox}>
                                                    {x}
                                                    <input
                                                        type="checkbox"
                                                        name={x}
                                                        checked={formData?.[x] || false}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span className={addMatchClasses.checkmark}></span>
                                                </label>
                                            </div>
                                            <div
                                                style={{
                                                    height: '20px',
                                                }}
                                            ></div>
                                        </div>
                                    ))}
                            {errorMessage?.severity && (
                                <Alert
                                    sx={{
                                        padding: '0.5 1',
                                        marginTop: '20px',
                                        borderRadius: '15px',
                                        bgcolor: '#1C1C1E',
                                        color: 'lightgray',
                                    }}
                                    variant="outlined"
                                    severity={errorMessage?.severity}
                                >
                                    {errorMessage?.message}
                                </Alert>
                            )}
                        </div>
                        {errorMessage?.severity && <div style={{ height: '20px' }}></div>}
                        <ButtonComponent
                            onClick={handleSubmit}
                            name={'Send'}
                            loading={formLoading}
                            size={'large'}
                            textColor={'#007AFF'}
                            backgroundColor={'#1C1C1E'}
                        />
                    </form>
                </>
            )}
        </div>
    );
};

export default NotificationSettingsGrid;
