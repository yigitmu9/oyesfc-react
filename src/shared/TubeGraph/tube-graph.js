import React from 'react';
import classes from "./tube-graph.module.css";
import {List, ListItem} from "@mui/material";

const MainSquadStats = ({data, leftName, rightName, leftColor, rightColor}) => {

    const setBarColor = (main, foreign) => {
        if (Number(main) === 0 && Number(foreign) === 0) {
            return 'black';
        }
        return rightColor;
    }

    return (
        <div className={classes.tableDiv}>
            <List component="nav" aria-label="mailbox folders"
                  style={{backgroundColor: "transparent", width: "100%"}}>
                <ListItem style={{
                    backgroundColor: "transparent",
                    justifyContent: "space-between",
                    display: "flex",
                    textAlign: "end",
                    marginBottom: "20px"
                }}>
                    <div className={classes.subtitle}>
                        <div className={classes.colorTitleDiv}>
                            <div className={classes.colorTitle} style={{backgroundColor: leftColor}}></div>
                        </div>
                        <p className={classes.listItemSpanStyle}>{leftName}</p>
                    </div>
                    <div className={classes.subtitle}>
                        <p className={classes.listItemSpanStyle2}>{rightName}</p>
                        <div className={classes.colorTitleDiv}>
                            <div className={classes.colorTitle2} style={{backgroundColor: rightColor}}></div>
                        </div>
                    </div>
                </ListItem>
                {data?.map((x, y) => (
                    <>
                        <ListItem key={y} style={{
                            backgroundColor: "transparent",
                            justifyContent: "space-between",
                            display: "flex",
                            textAlign: "end"
                        }}>
                            <p className={classes.listItemSpanStyle}>{x[0]}</p>
                            <p className={classes.listItemSpanStyle}>{x[1]}</p>
                            <p className={classes.listItemSpanStyle}>{x[2]}</p>
                        </ListItem>
                        <div className={classes.graph}>
                            <div className={classes.line1} style={{
                                width: x[3] + '%',
                                borderRadius: x[3] === '100' || x[3] === 100 ? '25px' : '25px 0 0 25px',
                                backgroundColor: leftColor
                            }}></div>
                            <div className={classes.line2} style={{
                                width: x[4] + '%',
                                borderRadius: x[4] === '100' || x[4] === 100 ? '25px' : '0 25px 25px 0',
                                backgroundColor: setBarColor(x[0], x[2])
                            }}></div>
                        </div>
                    </>
                ))}
            </List>
        </div>
    );
};

export default MainSquadStats;
