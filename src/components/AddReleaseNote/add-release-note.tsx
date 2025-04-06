import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BackButton from '../../shared/BackButton/back-button';
import { Alert } from '@mui/material';
import { AlertInterface } from '../../interfaces/Alert';
import ButtonComponent from '../../shared/ButtonComponent/button-component';
import sharedClasses from '../../shared/Styles/shared-styles.module.css';
import classes from '../SignIn/sign-in.module.css';
import { dataBase, loadWebsite } from '../../firebase';
import { ref, set } from 'firebase/database';
import { AddMatchMessages, SnackbarTypes } from '../../constants/constants';
import { sendNotifications } from '../../services/service';

interface AddReleaseNoteProps {
    handlePreviousPage?: any;
}

const AddReleaseNote: React.FC<AddReleaseNoteProps> = ({ handlePreviousPage }) => {
    const packageJson = require('./../../../package.json');
    const [errorMessage, setErrorMessage] = useState<AlertInterface>({
        message: '',
        severity: undefined,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState(
        {
            version: packageJson.version || '',
            note: '',
        }
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleBack = (data?: any) => {
        if (data) {
            handlePreviousPage(true);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const date = new Date().toString();
            await set(ref(dataBase, `releaseNotes/notes/${date}`), formData);
            await sendPushNotifications()
            setFormData(
                {
                    version: '',
                    note: '',
                }
            );
            setLoading(false);
            const messageResponse = {
                severity: SnackbarTypes.success,
                message: 'Release note successfully added!',
            };
            setErrorMessage(messageResponse);
        } catch (error: any) {
            setLoading(false);
            const messageResponse = {
                severity: SnackbarTypes.error,
                message: error?.message,
            };
            setErrorMessage(messageResponse);
        }
    };

    const sendPushNotifications = async () => {
        const response: any = await loadWebsite(`notifications`);
        const permission: any = await loadWebsite(`releaseNotes/permissions`);
        const title = `Yeni release notu eklendi`;
        const detail = `Not detaylarına ayarlar relase notes kısmından erişebilirsiniz.`;
        const playerIds = Object.entries(response)
            ?.filter((a: any) => permission?.[a[0]]?.['Release Notes'])
            ?.map((item) => (item?.[1] ? Object.values(item?.[1]) : null))
            ?.flat();

        await sendNotifications(title, detail, playerIds)
            .then(r => r)
            .catch(() => {
                const message = AddMatchMessages.push_notifications_fail;
                alert(message)
            });
    };

    return (
        <div style={{ minHeight: '70vh' }}>
            <BackButton handleBackButton={handleBack} generalTitle={'Add Release Notes'} />
            <Box sx={{ display: { xs: 'flex', md: 'none' }, height: '30px' }}></Box>
            {
                <>
                    <form className={classes.formStyle}>
                        <div>
                            <Alert
                                sx={{
                                    padding: '0.5 1',
                                    marginTop: '20px',
                                    borderRadius: '15px',
                                    bgcolor: '#1C1C1E',
                                    color: 'lightgray',
                                }}
                                variant="outlined"
                                severity="info"
                            >
                                {'Current version: v' + packageJson.version}
                            </Alert>
                            <div className={sharedClasses.emptyHeightSpace}></div>
                            <input
                                className={classes.inputDesign}
                                required={true}
                                type="text"
                                name="version"
                                placeholder={'Version'}
                                value={formData?.version}
                                onChange={(event) => handleInputChange(event)}
                            />
                            <br />
                            <div className={sharedClasses.emptyHeightSpace}></div>
                            <textarea
                                className={classes.inputDesign}
                                required={true}
                                name="note"
                                placeholder={'Note'}
                                value={formData?.note}
                                onChange={(event: any) => handleInputChange(event)}
                            />
                        </div>
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
                        <div className={sharedClasses.emptyHeightSpace}></div>
                        <ButtonComponent onClick={handleSubmit} name={'Submit'} loading={loading} size={'large'} />
                    </form>
                </>
            }
        </div>
    );
};

export default AddReleaseNote;
