import React from 'react';
import {TeamMembers} from "../../constants/constants";
import PlayerCards from "../PlayerCards";
import classes from "./player-cards-grid.module.css";

const PlayerCardsGrid = ({matchData}) => {

    return (
        <div className={classes.grid}>
            {Object.values(TeamMembers)?.map((x, y) => (
                <PlayerCards
                    key={y}
                    playerName={x.name}
                    data={matchData}/>))}
        </div>
    );
};

export default PlayerCardsGrid;