import React from 'react';
import classes from './tube-graph.module.css';
import { List, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface MainSquadStatsProps {
    data?: any;
    leftName?: any;
    rightName?: any;
    leftColor?: any;
    rightColor?: any;
    loadingLineNumber?: number;
}

const MainSquadStats: React.FC<MainSquadStatsProps> = ({ data, leftName, rightName, leftColor, rightColor, loadingLineNumber }) => {
    const { loadingData } = useSelector((state: any) => state.databaseData);
    const setBarColor = (main: any, foreign: any) => {
        if (Number(main) === 0 && Number(foreign) === 0) {
            return 'black';
        }
        return rightColor;
    };

    return (
        <>
            {
                loadingData ?
                    Array.from({ length: loadingLineNumber || 5 }, (_: any, i: number) => (
                        <SkeletonTheme baseColor="#202020" highlightColor="#444" key={i}>
                            <Skeleton className={classes.tableDiv}/>
                        </SkeletonTheme>
                    ))
                    :
                    <div className={classes.tableDiv}>
                        <List
                            component="nav"
                            aria-label="mailbox folders"
                            style={{ backgroundColor: 'transparent', width: '100%' }}
                        >
                            <ListItem
                                style={{
                                    backgroundColor: 'transparent',
                                    justifyContent: 'space-between',
                                    display: 'flex',
                                    textAlign: 'end',
                                    marginBottom: '20px',
                                }}
                            >
                                <div className={classes.subtitle}>
                                    <div className={classes.colorTitleDiv}>
                                        <div className={classes.colorTitle} style={{ backgroundColor: leftColor }}></div>
                                    </div>
                                    <p className={classes.listItemSpanStyle}>{leftName}</p>
                                </div>
                                <div className={classes.subtitle}>
                                    <p className={classes.listItemSpanStyle2}>{rightName}</p>
                                    <div className={classes.colorTitleDiv}>
                                        <div className={classes.colorTitle2} style={{ backgroundColor: rightColor }}></div>
                                    </div>
                                </div>
                            </ListItem>
                            {data?.map((x: any, y: number) => (
                                <div key={y}>
                                    <ListItem
                                        style={{
                                            backgroundColor: 'transparent',
                                            justifyContent: 'space-between',
                                            display: 'flex',
                                            textAlign: 'end',
                                        }}
                                    >
                                        <p className={classes.listItemSpanStyle}>{x[0]}</p>
                                        <p className={classes.listItemSpanStyle}>{x[1]}</p>
                                        <p className={classes.listItemSpanStyle}>{x[2]}</p>
                                    </ListItem>
                                    <div className={classes.graph}>
                                        <div
                                            className={classes.line1}
                                            style={{
                                                width: x[3] + '%',
                                                borderRadius: x[3] === '100' || x[3] === 100 ? '25px' : '25px 0 0 25px',
                                                backgroundColor: leftColor,
                                            }}
                                        ></div>
                                        <div
                                            className={classes.line2}
                                            style={{
                                                width: x[4] + '%',
                                                borderRadius: x[4] === '100' || x[4] === 100 ? '25px' : '0 25px 25px 0',
                                                backgroundColor: setBarColor(x[0], x[2]),
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </List>
                    </div>
            }
        </>
    );
};

export default MainSquadStats;
