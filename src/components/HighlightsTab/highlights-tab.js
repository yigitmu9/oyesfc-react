import React, {useEffect, useState} from 'react';
import classes from "../MatchDetails/match-details.module.css";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Snackbar
} from "@mui/material";
import {
    HighlightConstants, SnackbarMessages, SnackbarTypes,
    TeamNames
} from "../../constants/constants";
import highlightsClasses from './highlights-tab.module.css';
import addMatchClasses from '../AddMatch/add-match.module.css';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import matchDetailsClasses from "../MatchDetails/match-details.module.css";
import {PulseLoader} from "react-spinners";
import {ref, set} from "firebase/database";
import {dataBase, loadWebsite} from "../../firebase";
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';

const HighlightsTab = ({matchDetailsData, credentials}) => {

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
    const [videoData, setVideoData] = useState(null);
    const [snackbarData, setSnackbarData] = useState(null);

    useEffect(() => {
        if (!videoData) {
            fetchVideosData().then(r => r)
        }
    });

    const fetchVideosData = async () => {
        try {
            const response = await loadWebsite(`videos/${matchDetailsData?.day}`);
            if (response) {
                const videosArray = Object.values(response)
                setVideoData(videosArray)
            }
        } catch (error) {
            const errorResponse = {
                open: true,
                status: SnackbarTypes.error,
                message: error?.message,
                duration: 18000
            }
            setSnackbarData(errorResponse)
        }
    }

    const generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
        } catch (error) {
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

    const getVideoUrl = (data) => {
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

    const extractYoutubeVideoId = (url) => {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;
        if (hostname === 'youtu.be') {
            return urlObj.pathname.slice(1);
        }
        if (hostname === 'www.youtube.com' || hostname === 'youtube.com') {
            if (urlObj.pathname.includes('/shorts/')) {
                return urlObj.pathname.split('/shorts/')[1];
            }
            return urlObj.searchParams.get('v');
        }
        return null;
    };

    const extractGoogleDriveFileId = (url) => {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        if (pathname.includes('/file/d/')) {
            return pathname.split('/file/d/')[1].split('/')[0];
        }
        if (urlObj.searchParams.get('id')) {
            return urlObj.searchParams.get('id');
        }
        return null;
    };

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarData(null);
    };

    return (
        <>
            <div className={classes.generalTabDiv}>
                <div className={highlightsClasses.matchSubmitModalDiv}>
                    {credentials?.isCaptain &&
                        <Accordion
                            sx={{bgcolor: '#1C1C1E', color: 'lightgray', width: '100%'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{color: 'lightgray'}}/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Add Video
                        </AccordionSummary>
                        <AccordionDetails sx={{textAlign: 'left'}}>
                            <form onSubmit={handleSubmit} style={{background: "black"}}>
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
                                        <div className={addMatchClasses.matchSubmitButtonDiv}>
                                            <button className={matchDetailsClasses.mapsButtons} type="submit">
                                                {
                                                    loading ?
                                                        <PulseLoader color="red" speedMultiplier={0.7}/>
                                                        :
                                                        <span>Submit</span>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </AccordionDetails>
                    </Accordion>}
                    {
                        videoData?.length > 0 ? videoData?.map((x, y) => (
                                <Accordion key={y}
                                           sx={{
                                               bgcolor: '#1C1C1E',
                                               color: 'lightgray',
                                               width: '100%',
                                           }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{color: 'lightgray'}}/>}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        {x?.type + ' | ' + x?.player}
                                    </AccordionSummary>
                                    <AccordionDetails sx={{textAlign: 'left'}}>
                                        <iframe
                                            src={getVideoUrl(x)}
                                            width="100%"
                                            height= {isMobile ? '200' : '300'}
                                            allow="autoplay"
                                            title="Video"
                                            allowFullScreen
                                            style={{border: '0', borderRadius: '25px'}}
                                        ></iframe>
                                    </AccordionDetails>
                                </Accordion>
                            )) :
                            <section className={highlightsClasses.noVideoSection} style={{marginTop: credentials?.signedIn ? '20px' : '0'}}>
                                <BrowserNotSupportedIcon fontSize={'large'} className={classes.generalInfoIcon}>
                                </BrowserNotSupportedIcon>
                                <span className={highlightsClasses.noVideoSpan}>No video found for this match.</span>
                            </section>
                    }
                </div>
                <Snackbar open={snackbarData?.open} autoHideDuration={snackbarData?.duration} onClose={closeSnackbar}>
                    <Alert
                        onClose={closeSnackbar}
                        severity={snackbarData?.status}
                        variant="filled"
                        sx={{width: '100%'}}
                    >
                        {snackbarData?.message}
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
};

export default HighlightsTab;
