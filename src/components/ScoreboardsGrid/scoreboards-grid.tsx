import classes from './scoreboards-grid.module.css';
import Scoreboard from '../Scoreboard/scoreboard';
import React from 'react';
import MainTitle from '../../shared/MainTitle/main-title';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { sortData } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import scoreboardClasses from '../Scoreboard/scoreboard.module.css'


interface ScoreboardsGridProps {
    playerDetails?: any;
    filteredWithPlayerData?: any;
}

const ScoreboardsGrid: React.FC<ScoreboardsGridProps> = ({ playerDetails, filteredWithPlayerData }) => {
    const { filteredData, loadingData } = useSelector((state: any) => state.databaseData);
    const navigate = useNavigate();
    const windowHeight = window.innerWidth > 768 ? window.innerHeight - 200 + 'px' : window.innerHeight - 230 + 'px';

    const openMatchDetails = (matchDay?: any) => {
        if (!playerDetails) {
            navigate('/oyesfc-react/match-details', {
                state: { day: matchDay?.day, cameFrom: 'matches' },
            });
        }
    };

    return (
        <>
            {!playerDetails && <MainTitle title={'Matches'} />}
            {loadingData &&
                <div className={classes.grid}>
                    {Array.from({ length: 10 }, (_: any, i: number) => (
                        <Box sx={{ width: { xs: '100%', md: '47%' } }}>
                            <SkeletonTheme baseColor="#202020" highlightColor="#444" key={i}>
                                <Skeleton className={scoreboardClasses.scoreboard} style={{borderRadius: '16px', height: '126px', minWidth: '100%'}}/>
                            </SkeletonTheme>
                        </Box>

                    ))}
                </div>
            }
            {!loadingData && (Object.values(filteredData)?.length > 0 ? (
                <div
                    style={{
                        minHeight: playerDetails ? '' : windowHeight,
                    }}
                >
                    <div className={classes.grid}>
                        {sortData(playerDetails ? filteredWithPlayerData : filteredData)?.map((x, y) => (
                            <Scoreboard
                                key={y}
                                value={x}
                                openPopup={() => openMatchDetails(x)}
                                playerDetails={playerDetails}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ minHeight: windowHeight }} className={classes.titleDiv}>
                    <h1 className={classes.title}>No Match found</h1>
                </div>
            ))}
        </>
    );
};

export default ScoreboardsGrid;
