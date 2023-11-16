import React, {useEffect, useRef} from 'react';
import classes from "./match-details.module.css"
import TeamView from "../TeamView";
import Result from "../Result";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';

export const MatchDetails = ({onClose, matchDetailsData}) => {

    const buttonBgColor = '#323232'
    const matchDetails = Object.entries(matchDetailsData.oyesfc.squad).filter(x => x[1].goal > 0)
    const popupRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [popupRef, onClose]);

    return (
        <div className={classes.overlay}>
            <div className={classes.popupContainer} ref={popupRef}>
                <section className={classes.scoreboard} style={{background: buttonBgColor}}>
                    <TeamView teamData={matchDetailsData?.oyesfc} rakipbul={matchDetailsData?.rakipbul}
                              bgColor={buttonBgColor} isDetails={true}/>
                    <main className={classes.score} style={{background: buttonBgColor}}>
                        <Result homeTeamScore={matchDetailsData?.oyesfc?.goal} awayTeamScore={matchDetailsData?.rival?.goal}
                                bgColor={buttonBgColor}
                                fontSize={'3rem'}/>
                    </main>
                    <TeamView teamData={matchDetailsData?.rival} rakipbul={matchDetailsData?.rakipbul}
                              bgColor={buttonBgColor} isDetails={true}/>
                </section>
                {matchDetailsData.oyesfc.goal !== 0 ?
                    <section className={classes.goalNames} style={{background: buttonBgColor}}>
                        {matchDetails.map((item, index) => (
                            <div key={index} style={{
                                background: buttonBgColor,
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '5px',
                                marginTop: '5px'
                            }}>
                            <span style={{
                                background: buttonBgColor,
                                color: "lightgray",
                                marginRight: '10px'
                            }}>{item[0].replace(/[0-9]/g, '')}</span>
                                {Array.from({length: item[1].goal}).map((_, imgIndex) => (
                                    <img
                                        key={imgIndex}
                                        style={{width: 20, height: 20, background: buttonBgColor, marginLeft: '5px',}}
                                        src={require('../../images/football.png')}
                                        alt={`Goal ${imgIndex + 1}`}
                                    />
                                ))}
                            </div>
                        ))}
                    </section>
                    : null
                }
                <div style={{display: "flex", background: "#404040"}}>
                    <div style={{display: "block", background: "#404040", width: "30%"}}>
                        <section className={classes.location} style={{background: buttonBgColor}}>
                            <LocationOnIcon
                                style={{background: buttonBgColor, color: "white", fontSize: 43}}></LocationOnIcon>
                            <span style={{
                                background: buttonBgColor,
                                color: "lightgray",
                                fontSize: 20,
                                display: "block",
                                marginTop: "10px"}}>
                            {matchDetailsData.place}
                        </span>
                        </section>
                        <section className={classes.location} style={{background: buttonBgColor}}>
                            <CalendarMonthIcon
                                style={{background: buttonBgColor, color: "white", fontSize: 43}}></CalendarMonthIcon>
                            <span style={{
                                background: buttonBgColor,
                                color: "lightgray",
                                fontSize: 20,
                                display: "block",
                                marginTop: "10px"}}>
                            {matchDetailsData.day.replace(/-/g, '/')}
                        </span>
                        </section>
                        <section className={classes.location} style={{background: buttonBgColor}}>
                            <AccessTimeIcon
                                style={{background: buttonBgColor, color: "white", fontSize: 43}}></AccessTimeIcon>
                            <span style={{
                                background: buttonBgColor,
                                color: "lightgray",
                                fontSize: 20,
                                display: "block",
                                marginTop: "10px"}}>
                            {matchDetailsData.time}
                        </span>
                        </section>
                    </div>
                    <div style={{display: "block", background: "#404040", width: "70%"}}>

                        <section className={classes.squadMembers} style={{background: buttonBgColor}}>
                            <GroupsIcon
                                style={{background: buttonBgColor, color: "white", fontSize: 43, marginLeft: "10px"}}></GroupsIcon>
                            {Object.entries(matchDetailsData.oyesfc.squad).map((x, y) => (
                                <span style={{
                                    background: buttonBgColor,
                                    color: "lightgray",
                                    fontSize: 20,
                                    display: "block",
                                    marginTop: "10px", marginLeft: "10px"}}>
                                {x[0].replace(/[0-9]/g, '')}
                            </span>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
