import React from 'react';
import classes from './ultimate-team.module.css';
import Fifa from '../../images/fifa.jpeg';
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
import { TeamMembers } from '../../constants/constants';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

interface UltimateTeamProps {
    onClickCard?: any;
}

const UltimateTeam: React.FC<UltimateTeamProps> = ({ onClickCard }) => {

    const { loadingData } = useSelector((state: any) => state.databaseData);
    const handleOnClick = (player?: any) => {
        onClickCard(player);
    };

    return (
        <div className={classes.ultimateDiv} style={{ backgroundImage: `url(${Fifa})` }}>
            <div className={classes.forwardsDiv}>
                {loadingData && Array.from({ length: 3 }, (_: any, i: number) => (
                    <SkeletonTheme baseColor="#202020" highlightColor="#444" key={i}>
                        <Skeleton className={classes.cardStyle} />
                    </SkeletonTheme>
                ))}
                {!loadingData &&
                    (
                        <>
                            <div
                                className={classes.cardStyle}
                                style={{ backgroundImage: `url(${mertCard})` }}
                                onClick={() => handleOnClick(TeamMembers.mert.name)}
                            ></div>
                            <div
                                className={classes.cardStyle}
                                style={{ backgroundImage: `url(${yigitCard})` }}
                                onClick={() => handleOnClick(TeamMembers.yigit.name)}
                            ></div>
                            <div
                                className={classes.cardStyle}
                                style={{ backgroundImage: `url(${berentCard})` }}
                                onClick={() => handleOnClick(TeamMembers.berent.name)}
                            ></div>
                        </>
                    )
                }
            </div>
            <div className={classes.midfieldersDiv}>
                {loadingData && Array.from({ length: 4 }, (_: any, i: number) => (
                    <SkeletonTheme baseColor="#202020" highlightColor="#444" key={i}>
                        <Skeleton className={classes.cardStyle} />
                    </SkeletonTheme>
                ))}
                {!loadingData &&
                    (
                        <>
                            <div
                                className={classes.cardStyle}
                                style={{ backgroundImage: `url(${berkCard})` }}
                                onClick={() => handleOnClick(TeamMembers.berk.name)}
                            ></div>
                            <div
                                className={classes.cardStyle}
                                style={{ backgroundImage: `url(${gokhanCard})` }}
                                onClick={() => handleOnClick(TeamMembers.gokhan.name)}
                            ></div>
                            <div
                                className={classes.cardStyle}
                                style={{ backgroundImage: `url(${ogulcanCard})` }}
                                onClick={() => handleOnClick(TeamMembers.ogulcan.name)}
                            ></div>
                            <div
                                className={classes.cardStyle}
                                style={{ backgroundImage: `url(${utkuCard})` }}
                                onClick={() => handleOnClick(TeamMembers.utku.name)}
                            ></div>
                        </>
                    )
                }
            </div>
            <div className={classes.defendersDiv}>
                {loadingData && Array.from({ length: 3 }, (_: any, i: number) => (
                    <SkeletonTheme baseColor="#202020" highlightColor="#444" key={i}>
                        <Skeleton className={classes.cardStyle} />
                    </SkeletonTheme>
                ))}
                {!loadingData &&
                    (
                        <>
                            <div
                                className={classes.cardStyle}
                                style={{ backgroundImage: `url(${atakanCard})` }}
                                onClick={() => handleOnClick(TeamMembers.atakan.name)}
                            ></div>
                            <div
                                className={classes.cardStyle}
                                style={{ backgroundImage: `url(${mehmetCard})` }}
                                onClick={() => handleOnClick(TeamMembers.mehmet.name)}
                            ></div>
                            <div
                                className={classes.cardStyle}
                                style={{ backgroundImage: `url(${oguzhanCard})` }}
                                onClick={() => handleOnClick(TeamMembers.oguzhan.name)}
                            ></div>
                        </>
                    )
                }
            </div>
            <div className={classes.goalkeeperDiv}>
                {loadingData && Array.from({ length: 1 }, (_: any, i: number) => (
                    <SkeletonTheme baseColor="#202020" highlightColor="#444" key={i}>
                        <Skeleton className={classes.cardStyle} />
                    </SkeletonTheme>
                ))}
                {!loadingData &&
                    (
                        <>
                            <div
                                className={classes.cardStyle}
                                style={{ backgroundImage: `url(${canCard})` }}
                                onClick={() => handleOnClick(TeamMembers.can.name)}
                            ></div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default UltimateTeam;
