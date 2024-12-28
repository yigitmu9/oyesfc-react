import React, {useEffect, useState} from 'react';
import classes from "../MatchDetails/match-details.module.css";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
} from "@mui/material";
import {
    HighlightConstants, SnackbarMessages, SnackbarTypes,
    TeamNames
} from "../../constants/constants";
import highlightsClasses from './highlights-tab.module.css';
import addMatchClasses from '../AddMatch/add-match.module.css';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ref, set} from "firebase/database";
import {dataBase, loadWebsite} from "../../firebase";
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import {useSelector} from "react-redux";
import sharedClasses from "../../shared/Styles/shared-styles.module.css";
import ButtonComponent from "../../shared/ButtonComponent/button-component";
import {extractGoogleDriveFileId, extractYoutubeVideoId, generateRandomString} from "../../utils/utils";

interface  HighlightsTabProps {
    matchDetailsData?: any;
}

const HighlightsTab: React.FC<HighlightsTabProps> = ({matchDetailsData}) => {

    const { isCaptain, signedIn } = useSelector((state: any) => state.credentials);
    const initialFormData = {
        type: HighlightConstants.type.goal,
        source: HighlightConstants.source.youtube,
        player: TeamNames.oYesFc,
        minute: 'Unknown',
        url: ''
    };
    const isMobile = window.innerWidth <= 768;
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [videoData, setVideoData] = useState<any>(null);
    const [snackbarData, setSnackbarData] = useState<any>(null);

    useEffect(() => {
        if (!videoData) {
            fetchVideosData().then(r => r)
        }
    });

    const fetchVideosData = async () => {
        try {
            const response = await loadWebsite(`videos/${matchDetailsData?.day}`);
            if (response) {
                const videosArray: any = Object.values(response)
                setVideoData(videosArray)
            }
        } catch (error: any) {
            const errorResponse = {
                open: true,
                status: SnackbarTypes.error,
                message: error?.message,
                duration: 18000
            }
            setSnackbarData(errorResponse)
        }
    }

    const handleInputChange = (event?: any) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const videoId = generateRandomString()
            await set(ref(dataBase, `videos/${matchDetailsData.day}/${videoId}`), formData);
            setFormData(initialFormData);
            setLoading(false)
            const messageResponse = {
                open: true,
                status: SnackbarTypes.success,
                message: SnackbarMessages.video_successfully_added,
                duration: 6000
            }
            setSnackbarData(messageResponse)
            await fetchVideosData();
        } catch (error: any) {
            setLoading(false)
            const messageResponse = {
                open: true,
                status: SnackbarTypes.error,
                message: error?.message,
                duration: 18000
            }
            setSnackbarData(messageResponse)
        }
    };

    const getVideoUrl = (data?: any) => {
        if (data?.source === HighlightConstants.source.youtube) {
            const videoId = extractYoutubeVideoId(data?.url);
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (data?.source === HighlightConstants.source.drive) {
            const fileId = extractGoogleDriveFileId(data?.url);
            return `https://drive.google.com/file/d/${fileId}/preview`;
        } else {
            return '';
        }
    }

    return (
        <>
            <div className={classes.generalTabDiv}>
                <>
                    <section className={classes.generalTabSection}>
                        {isCaptain &&
                            <Accordion
                                sx={{bgcolor: '#1C1C1E', color: 'lightgray', width: '100%',border: 0, boxShadow: 0, fontSize: {xs: '14px', md: '18px'}}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{color: 'lightgray'}}/>}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Add Video
                                </AccordionSummary>
                                <AccordionDetails sx={{textAlign: 'left'}}>
                                    <form>
                                        <div className={addMatchClasses.formAlign}>
                                            <div className={addMatchClasses.infoAlign}>
                                                <label style={{background: "transparent"}}>
                                                    Video Type:
                                                    <select className={addMatchClasses.select}
                                                            onChange={handleInputChange}
                                                            required={true}
                                                            name="type"
                                                            value={formData.type}>
                                                        {Object.values(HighlightConstants.type).map((x, y) => (
                                                            <option key={y} value={x}>{x}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                                <br/>
                                                <label style={{background: "transparent"}}>
                                                    Video Source:
                                                    <select className={addMatchClasses.select}
                                                            onChange={handleInputChange}
                                                            required={true}
                                                            name="source"
                                                            value={formData.source}>
                                                        {Object.values(HighlightConstants.source).map((x, y) => (
                                                            <option key={y} value={x}>{x}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                                <br/>
                                                <label style={{background: "transparent"}}>
                                                    Player:
                                                    <select className={addMatchClasses.select}
                                                            onChange={handleInputChange}
                                                            required={true}
                                                            name="player"
                                                            value={formData.player}>
                                                        <option value={TeamNames.oYesFc}>{TeamNames.oYesFc}</option>
                                                        <option
                                                            value={matchDetailsData?.rival?.name}>{matchDetailsData?.rival?.name}</option>
                                                        {Object.keys(matchDetailsData?.oyesfc?.squad)?.map((x, y) => (
                                                            <option key={y} value={x}>{x}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                                <br/>
                                                <label style={{background: "transparent"}}>
                                                    Video URL:
                                                    <input
                                                        className={addMatchClasses.inputDesign}
                                                        required={true}
                                                        type="text"
                                                        name="url"
                                                        value={formData.url}
                                                        onChange={handleInputChange}
                                                    />
                                                </label>
                                                <br/>
                                                <label style={{background: "transparent"}}>
                                                    Minute:
                                                    <input
                                                        className={addMatchClasses.inputDesign}
                                                        required={true}
                                                        type="text"
                                                        name="minute"
                                                        value={formData.minute}
                                                        onChange={handleInputChange}
                                                    />
                                                </label>
                                                <br/>
                                                {
                                                    snackbarData &&
                                                    <>
                                                        <div style={{height: '20px'}}></div>
                                                        <Alert sx={{
                                                            padding: 1,
                                                            borderRadius: '15px',
                                                            bgcolor: '#1C1C1E',
                                                            color: 'lightgray'
                                                        }}
                                                               variant="outlined"
                                                               severity={snackbarData?.status}>{snackbarData?.message}</Alert>
                                                    </>
                                                }
                                                <div className={sharedClasses.emptyHeightSpace}></div>
                                                <ButtonComponent
                                                    onClick={() => handleSubmit()}
                                                    name={`Submit`}
                                                    loading={loading}/>
                                            </div>
                                        </div>
                                    </form>
                                </AccordionDetails>
                            </Accordion>}
                        {
                            videoData?.length > 0 ? videoData?.map((x: any, y: number) => (
                                    <Accordion key={y}
                                               sx={{bgcolor: '#1C1C1E', color: 'lightgray', width: '100%',border: 0, boxShadow: 0, fontSize: {xs: '14px', md: '18px'}}}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{color: 'lightgray'}}/>}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            {x?.type + ' | ' + x?.player}{x?.minute !== 'Unknown' ? ' ' + x?.minute + '"' : ''}
                                        </AccordionSummary>
                                        <AccordionDetails sx={{textAlign: 'left'}}>
                                            <iframe
                                                src={getVideoUrl(x)}
                                                width="100%"
                                                height={isMobile ? '200' : '300'}
                                                allow="autoplay"
                                                title="Video"
                                                allowFullScreen
                                                style={{border: '0', borderRadius: '25px'}}
                                            ></iframe>
                                        </AccordionDetails>
                                    </Accordion>
                                )) :
                                <section className={highlightsClasses.noVideoSection}
                                         style={{marginTop: signedIn ? '20px' : '0'}}>
                                    <BrowserNotSupportedIcon fontSize={'large'} className={classes.generalInfoIcon}>
                                    </BrowserNotSupportedIcon>
                                    <span
                                        className={highlightsClasses.noVideoSpan}>No video found for this match.</span>
                                </section>
                        }
                    </section>

                </>
            </div>
        </>
    );
};

export default HighlightsTab;
