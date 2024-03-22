import React, {useEffect, useRef} from 'react';
import classes from "./match-details.module.css"
import TeamView from "../TeamView";
import Result from "../Result";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import FootballLogo from '../../images/football.png';

export const MatchDetails = ({onClose, matchDetailsData}) => {

    const isMobile = window.innerWidth <= 768;
    const buttonBgColor = '#323232'
    const matchDetails = Object.entries(matchDetailsData.oyesfc.squad).filter(x => x[1].goal > 0)
    const popupRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    });

    return (
        <div className={classes.overlay}>
            <div className={classes.popupContainer} ref={popupRef}>
                <section className={classes.scoreboard} style={{background: buttonBgColor}}>
                    <TeamView teamData={matchDetailsData?.oyesfc} rakipbul={matchDetailsData?.rakipbul}
                              bgColor={buttonBgColor} isDetails={true}/>
                    <main className={classes.score} style={{background: buttonBgColor}}>
                        <Result homeTeamScore={matchDetailsData?.oyesfc?.goal} awayTeamScore={matchDetailsData?.rival?.goal}
                                bgColor={buttonBgColor}
                                isDetails={true}/>
                    </main>
                    <TeamView teamData={matchDetailsData?.rival} rakipbul={matchDetailsData?.rakipbul}
                              bgColor={buttonBgColor} isDetails={true}/>
                </section>
                {matchDetailsData.oyesfc.goal !== 0 ?
                    <section className={classes.goalNames} style={{background: buttonBgColor}}>
                        {matchDetails.map((item, index) => (
                            <div key={index} style={{
                                background: buttonBgColor,
                            }}
                                 className={classes.goalScorerGrid}>
                            <span style={{
                                background: buttonBgColor,
                            }}
                            className={classes.goalScorerName}>{item[0].replace(/[0-9]/g, '')}</span>
                                {Array.from({length: item[1].goal}).map((_, imgIndex) => (
                                    <img
                                        key={imgIndex}
                                        className={classes.goalImage}
                                        style={{background: buttonBgColor}}
                                        src={FootballLogo}
                                        alt={`Goal ${imgIndex + 1}`}
                                    />
                                ))}
                            </div>
                        ))}
                    </section>
                    : null
                }
                <div style={{display: "flex", background: "#404040"}}>
                    <div className={classes.timeSectionStyle}>
                        <section className={classes.location} style={{background: buttonBgColor}}>
                            <LocationOnIcon
                                className={classes.iconStyle}
                                style={{background: buttonBgColor}}></LocationOnIcon>
                            <span className={classes.dataStyle}
                                style={{
                                background: buttonBgColor}}>
                            {matchDetailsData.place}
                        </span>
                        </section>
                        <section className={classes.location} style={{background: buttonBgColor}}>
                            <CalendarMonthIcon
                                className={classes.iconStyle}
                                style={{background: buttonBgColor}}></CalendarMonthIcon>
                            <span className={classes.dataStyle}
                                style={{
                                background: buttonBgColor}}>
                            {matchDetailsData.day.replace(/-/g, '/')}
                        </span>
                        </section>
                        <section className={classes.location} style={{background: buttonBgColor}}>
                            <AccessTimeIcon
                                className={classes.iconStyle}
                                style={{background: buttonBgColor}}></AccessTimeIcon>
                            <span className={classes.dataStyle}
                                  style={{
                                background: buttonBgColor}}>
                            {matchDetailsData.time}
                        </span>
                        </section>
                    </div>
                    <div className={classes.squadSectionStyle}>
                        <section className={classes.squadMembers} style={{background: buttonBgColor}}>
                            <GroupsIcon
                                className={classes.iconStyle}
                                style={{background: buttonBgColor, marginLeft: "10px"}}></GroupsIcon>
                            {Object.entries(matchDetailsData.oyesfc.squad).map((x, y) => (
                                <span key={y} className={classes.dataStyle}
                                    style={{
                                    background: buttonBgColor,
                                        marginLeft: "10px"}}>
                                {x[0].replace(/[0-9]/g, '')}
                            </span>
                            ))}
                        </section>
                    </div>
                </div>
                {isMobile && <div className={classes.buttonBorderStyle}>
                    <button className={classes.buttonStyle} onClick={handleClose}>Close</button>
                </div>}
            </div>
        </div>
    );
};
