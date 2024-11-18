import React from 'react';
import classes from "./ultimate-team.module.css";
import Fifa from "../../images/fifa.jpeg";
import yigitCard from '../../images/YİĞİT.png';
import canCard from '../../images/CAN.png';
import atakanCard from '../../images/ATAKAN.png';
import berkCard from '../../images/BERK.png';
import oguzhanCard from '../../images/OĞUZHAN.png';
import ogulcanCard from '../../images/OĞULCAN.png';
import mertCard from '../../images/MERT.png';
import berentCard from '../../images/BERENT.png';
import mehmetCard from '../../images/MEHMET.png';
import utkuCard from '../../images/UTKU.png';
import gokhanCard from '../../images/GÖKHAN.png';
import {TeamMembers} from "../../constants/constants";

interface  UltimateTeamProps {
    onClickCard?: any;
}

const UltimateTeam: React.FC<UltimateTeamProps> = ({onClickCard}) => {

    const handleOnClick = (player?: any) => {
        onClickCard(player)
    }

    return (
        <div className={classes.ultimateDiv} style={{backgroundImage: `url(${Fifa})`}}>
            <div className={classes.forwardsDiv}>
                <div className={classes.cardStyle} style={{backgroundImage: `url(${mertCard})`}} onClick={() => handleOnClick(TeamMembers.mert.name)}></div>
                <div className={classes.cardStyle} style={{backgroundImage: `url(${yigitCard})`}} onClick={() => handleOnClick(TeamMembers.yigit.name)}></div>
                <div className={classes.cardStyle} style={{backgroundImage: `url(${berentCard})`}} onClick={() => handleOnClick(TeamMembers.berent.name)}></div>
            </div>
            <div className={classes.midfieldersDiv}>
                <div className={classes.cardStyle} style={{backgroundImage: `url(${berkCard})`}} onClick={() => handleOnClick(TeamMembers.berk.name)}></div>
                <div className={classes.cardStyle} style={{backgroundImage: `url(${gokhanCard})`}} onClick={() => handleOnClick(TeamMembers.gokhan.name)}></div>
                <div className={classes.cardStyle} style={{backgroundImage: `url(${ogulcanCard})`}} onClick={() => handleOnClick(TeamMembers.ogulcan.name)}></div>
                <div className={classes.cardStyle} style={{backgroundImage: `url(${utkuCard})`}} onClick={() => handleOnClick(TeamMembers.utku.name)}></div>
            </div>
            <div className={classes.defendersDiv}>
                <div className={classes.cardStyle} style={{backgroundImage: `url(${atakanCard})`}} onClick={() => handleOnClick(TeamMembers.atakan.name)}></div>
                <div className={classes.cardStyle} style={{backgroundImage: `url(${mehmetCard})`}} onClick={() => handleOnClick(TeamMembers.mehmet.name)}></div>
                <div className={classes.cardStyle} style={{backgroundImage: `url(${oguzhanCard})`}} onClick={() => handleOnClick(TeamMembers.oguzhan.name)}></div>
            </div>
            <div className={classes.goalkeeperDiv}>
                <div className={classes.cardStyle} style={{backgroundImage: `url(${canCard})`}} onClick={() => handleOnClick(TeamMembers.can.name)}></div>
            </div>
        </div>
    );
};

export default UltimateTeam;
