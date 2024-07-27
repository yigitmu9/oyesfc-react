import React from 'react';
import classes from "./footer.module.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RedditIcon from '@mui/icons-material/Reddit';

const Footer = ({credentials}) => {

    const redirectToEmail = () => {
        window.location.href = "mailto:oyesfc@gmail.com";
    };

    const redirectToTwitter = () => {
        window.open("https://x.com/oyesfc?s=21", "_blank");
    };

    const redirectToInstagram = () => {
        window.open("https://www.instagram.com/oyesfc?igsh=MXRrbmp1a3lvdW4wNg==", "_blank");
    };

    const redirectToYoutube = () => {
        window.open("https://youtube.com/@oyesfc?si=ER9YlrYaittkOeRu", "_blank");
    };

    const redirectToReddit = () => {
        window.open("https://www.reddit.com/r/a:t5_4r4dfa/", "_blank");
    };

    const packageJson = require('./../../../package.json');

    return (
        <footer className={classes.grid}>
            <div className={classes.content}>
                <div className={classes.infoGrid}>
                    <span className={classes.spanStyle}>{'© 2023 O Yes FC™ | v' + packageJson.version}</span>
                </div>

                <div className={classes.iconsGrid}>
                    <InstagramIcon className={classes.iconStyle} style={{fontSize: "50px"}} onClick={redirectToInstagram}></InstagramIcon>
                    <XIcon className={classes.iconStyle} style={{fontSize: "50px"}} onClick={redirectToTwitter}></XIcon>
                    <EmailIcon className={classes.iconStyle} style={{fontSize: "50px"}} onClick={redirectToEmail}></EmailIcon>
                    <YouTubeIcon className={classes.iconStyle} style={{fontSize: "50px"}} onClick={redirectToYoutube}></YouTubeIcon>
                    {credentials?.signedIn &&
                    <RedditIcon className={classes.iconStyle} style={{fontSize: "50px"}} onClick={redirectToReddit}></RedditIcon>}
                </div>
            </div>
        </footer>
    );
};

export default Footer;