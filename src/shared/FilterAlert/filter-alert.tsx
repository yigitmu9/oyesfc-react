import React from 'react';
import { Alert } from '@mui/material';
import sharedClasses from '../Styles/shared-styles.module.css';

const FilterAlertComponent = () => {
    const storage: any = localStorage.getItem('filters');
    if (!storage) return (<></>)
    return (
        <>
            <div className={sharedClasses.emptyHeightSpace}></div>
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
                {'Filters are being applied to this page.'}
            </Alert>
        </>

    );
};

export default FilterAlertComponent;
