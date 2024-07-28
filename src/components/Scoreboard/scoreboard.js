import classes from "./scoreboard.module.css";
import TeamView from "../TeamView/team-view";
import Result from "../Result/result";
import GameStatus from "../GameStatus/game-status";
import {useState} from "react";

const Scoreboard = ({value, openPopup, matchDetailsData, fixture, playerDetails, selectedEra}) => {

    const [buttonBgColor, setButtonBgColor] = useState(playerDetails ? '#323232' : '#242424');

    const handleButtonHover = () => {
        if (!playerDetails) setButtonBgColor('#323232');
    };

    const handleButtonLeave = () => {
        if (!playerDetails) setButtonBgColor('#242424');
    };

    const handleXClick = () => {
        openPopup(true);
        matchDetailsData(value)
    };

    return (
        <section className={playerDetails ? classes.scoreboardPlayerDetails : classes.scoreboard} onClick={handleXClick} onMouseEnter={handleButtonHover}
                 onMouseLeave={handleButtonLeave} style={{background: buttonBgColor}}>
            <TeamView teamData={value?.oyesfc} rakipbul={value?.rakipbul} bgColor={buttonBgColor} selectedEra={selectedEra}/>
            <main className={classes.score} style={{background: buttonBgColor}}>
                <Result homeTeamScore={value?.oyesfc?.goal} awayTeamScore={value?.rival?.goal} bgColor={buttonBgColor} fixture={fixture} time={value?.time}/>
                <GameStatus status={value?.day?.replace(/-/g, '/')} bgColor={buttonBgColor} fixture={fixture}/>
            </main>
            <TeamView teamData={value?.rival} rakipbul={value?.rakipbul} bgColor={buttonBgColor}/>
        </section>
    );
};

export default Scoreboard;