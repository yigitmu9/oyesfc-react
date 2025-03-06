import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BackButton from '../../shared/BackButton/back-button';
import { Alert, Divider } from '@mui/material';
import { AlertInterface } from '../../interfaces/Alert';
import ButtonComponent from '../../shared/ButtonComponent/button-component';
import sharedClasses from '../../shared/Styles/shared-styles.module.css';
import classes from '../SignIn/sign-in.module.css';
import SelectionComponent from '../../shared/SelectionComponent/selection-component';
import ratingsClasses from '../RatingsGrid/ratings-grid.module.css';
import { generateRandomString } from '../../utils/utils';
import { dataBase } from '../../firebase';
import { ref, set } from 'firebase/database';
import { SnackbarTypes } from '../../constants/constants';

interface AddNewsProps {
    handlePreviousPage?: any;
}

const AddNews: React.FC<AddNewsProps> = ({ handlePreviousPage }) => {
    const [errorMessage, setErrorMessage] = useState<AlertInterface>({
        message: '',
        severity: undefined,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [selection, setSelection] = useState<any>([0]);
    const [formData, setFormData] = useState(
        Array.from({ length: selection.length }, () => ({
            title: '',
            content: '',
            logo: '',
        }))
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [index]: {
                ...prevFormData[index],
                [name]: value,
            },
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
            await set(ref(dataBase, `news/${date}`), formData);
            setFormData(
                Array.from({ length: selection.length }, () => ({
                    title: '',
                    content: '',
                    logo: '',
                }))
            );
            setLoading(false);
            const messageResponse = {
                severity: SnackbarTypes.success,
                message: 'News successfully added!',
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

    const handleSelection = (data: any) => {
        let array: any = [];
        for (let i = 0; i < data; i++) {
            array = [...array, 0];
        }
        setSelection(array);
    };

    return (
        <div style={{ minHeight: '70vh' }}>
            <BackButton handleBackButton={handleBack} generalTitle={'Add News'} />
            <Box sx={{ display: { xs: 'flex', md: 'none' }, height: '30px' }}></Box>
            {
                <>
                    <div className={sharedClasses.emptyHeightSpace}></div>
                    <section className={ratingsClasses.starSection}>
                        <span className={ratingsClasses.starSpan}>{'Select News Number'}</span>
                        <SelectionComponent
                            options={[1, 2, 3, 4, 5]}
                            onSelectionChange={(data: any) => handleSelection(data)}
                            defaultSelectedValue={true}
                        />
                    </section>
                    <div className={sharedClasses.emptyHeightSpace}></div>
                    <form className={classes.formStyle}>
                        {selection?.map((_: any, index: any) => (
                            <div key={index}>
                                <div className={sharedClasses.emptyHeightSpace}></div>
                                <Divider
                                    sx={{
                                        bgcolor: 'gray',
                                        margin: '10px',
                                    }}
                                />
                                <div className={sharedClasses.emptyHeightSpace}></div>
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="text"
                                    name="title"
                                    placeholder={'Title ' + (index + 1)}
                                    value={formData?.[index]?.title}
                                    onChange={(event) => handleInputChange(event, index)}
                                />
                                <br />
                                <div className={sharedClasses.emptyHeightSpace}></div>
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="text"
                                    name="content"
                                    placeholder={'Content ' + (index + 1)}
                                    value={formData?.[index]?.content}
                                    onChange={(event) => handleInputChange(event, index)}
                                />
                                <div className={sharedClasses.emptyHeightSpace}></div>
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="text"
                                    name="logo"
                                    placeholder={'Image URL ' + (index + 1)}
                                    value={formData?.[index]?.logo}
                                    onChange={(event) => handleInputChange(event, index)}
                                />
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
                        <div className={sharedClasses.emptyHeightSpace}></div>
                        <ButtonComponent onClick={handleSubmit} name={'Submit'} loading={loading} size={'large'} />
                    </form>
                </>
            }
        </div>
    );
};

export default AddNews;
