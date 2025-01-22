import React, { useCallback, useEffect, useState } from 'react';
import BackButton from '../../shared/BackButton/back-button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import classes from '../MatchDetails/match-details.module.css';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import sharedClasses from '../../shared/Styles/shared-styles.module.css';
import { loadWebsite } from '../../firebase';

interface ReleaseNotesGridProps {
    handlePreviousPage?: any;
}

const ReleaseNotesGrid: React.FC<ReleaseNotesGridProps> = () => {
    const navigate = useNavigate();
    const [releaseNotes, setReleaseNotes] = useState<any>(null);
    const isMobile = window.innerWidth <= 768;

    const fetchReleaseNotes = useCallback(
        async () => {
            try {
            const response: any = await loadWebsite('releaseNotes/notes');
            if (response && Object.entries(response)?.length > 0) {
                const data: any = Object.entries(response)
                setReleaseNotes(data);
            }
            } catch (error: any) {
                alert(error?.message);
            }
        },
        []
    );

    useEffect(() => {
        if (!releaseNotes) {
            fetchReleaseNotes().then(r => r);
        }
    }, [fetchReleaseNotes, releaseNotes]);

    const handleBack = (data?: any) => {
        if (data) {
            navigate('/oyesfc-react/account');
        }
    };

    const formatDate = (data?: any) => {
        const date = new Date(data);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <div style={{ minHeight: '70vh' }}>
            <BackButton handleBackButton={handleBack} generalTitle={`Release Notes`} />
            <Box sx={{ display: { xs: 'flex', md: 'none' }, height: '30px' }}></Box>
            <div>
                {
                    releaseNotes?.length > 0 &&
                    releaseNotes?.sort((a: any, b: any) => new Date(b?.[0])?.getTime() - new Date(a?.[0])?.getTime())
                        ?.map((item: any, index: number) => (
                        <section className={classes.generalTabSection} key={index} style={{marginBottom: '20px'}}>
                            <Accordion
                                sx={{
                                    bgcolor: '#1C1C1E',
                                    color: 'lightgray',
                                    width: '100%',
                                    border: 0,
                                    boxShadow: 0,
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: 'lightgray' }} />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                    sx={{ padding: '0 10px' }}
                                >
                                    <div className={classes.generalInfoDivAccordion}>
                                        <PermDeviceInformationIcon
                                            fontSize={isMobile ? 'medium' : 'large'}
                                            className={classes.generalInfoIcon}
                                        ></PermDeviceInformationIcon>
                                        <span className={classes.generalInfoSpanCursor}>
                                            {item?.[1]?.version}
                                        </span>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span className={classes.generalInfoSpan}>
                                            {formatDate(item?.[0])}
                                        </span>
                                        <div className={sharedClasses.emptyHeightSpace}></div>
                                        <span className={classes.generalInfoSpan}>
                                            {item?.[1]?.note}
                                        </span>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </section>
                    ))
                }
            </div>
        </div>
    );
};

export default ReleaseNotesGrid;
