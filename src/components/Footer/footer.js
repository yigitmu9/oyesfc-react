import React from 'react';
import classes from "./footer.module.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RedditIcon from '@mui/icons-material/Reddit';
import {useSelector} from "react-redux";
import {DirectionList, TeamNames} from "../../constants/constants";
import {redirect} from "../../utils/utils";

const Footer = () => {

    const { signedIn } = useSelector((state) => state.credentials);
    const date = new Date();
    const year = date.getFullYear();
    const packageJson = require('./../../../package.json');

    return (
        <footer className={classes.grid}>
            <div className={classes.content}>
                <div className={classes.infoGrid}>
                    <span className={classes.spanStyle}>{'© ' + year + ' ' + TeamNames.oYesFc + '™ | v' + packageJson.version}</span>
                </div>
                <div className={classes.iconsGrid}>
                    <InstagramIcon className={classes.iconStyle} style={{fontSize: "50px"}} onClick={() => redirect(DirectionList.instagram)}></InstagramIcon>
                    <XIcon className={classes.iconStyle} style={{fontSize: "50px"}} onClick={() => redirect(DirectionList.twitter)}></XIcon>
                    <EmailIcon className={classes.iconStyle} style={{fontSize: "50px"}} onClick={() => redirect(DirectionList.email)}></EmailIcon>
                    <YouTubeIcon className={classes.iconStyle} style={{fontSize: "50px"}} onClick={() => redirect(DirectionList.youtube)}></YouTubeIcon>
                    {signedIn &&
                    <RedditIcon className={classes.iconStyle} style={{fontSize: "50px"}} onClick={() => redirect(DirectionList.reddit)}></RedditIcon>}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
