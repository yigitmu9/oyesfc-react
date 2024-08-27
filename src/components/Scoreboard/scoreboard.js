import classes from "./scoreboard.module.css";
import TeamView from "../TeamView/team-view";
import Result from "../Result/result";
import GameStatus from "../GameStatus/game-status";
import {useState} from "react";
import {findMatchType} from "../../utils/utils";

const Scoreboard = ({value, openPopup, playerDetails}) => {

    const [buttonBgColor, setButtonBgColor] = useState('#1C1C1E');
    const fixture = findMatchType(value)

    const handleButtonHover = () => {
        if (!playerDetails) setButtonBgColor('#323232');
    };

    const handleButtonLeave = () => {
        if (!playerDetails) setButtonBgColor('#1C1C1E');
    };

    const handleXClick = () => {
        openPopup(value?.day);
    };

    return (
        <section className={playerDetails ? classes.scoreboardPlayerDetails : classes.scoreboard} onClick={handleXClick} onMouseEnter={handleButtonHover}
                 onMouseLeave={handleButtonLeave} style={{background: buttonBgColor}}>
            <TeamView teamData={value?.oyesfc} rakipbul={value?.rakipbul}/>
            <main className={classes.score} style={{background: buttonBgColor}}>
                <Result homeTeamScore={value?.oyesfc?.goal} awayTeamScore={value?.rival?.goal} fixture={fixture} time={value?.time}/>
                <GameStatus status={value?.day?.replace(/-/g, '/')} bgColor={buttonBgColor} fixture={fixture}/>
            </main>
            <TeamView teamData={value?.rival} rakipbul={value?.rakipbul}/>
        </section>
    );
};

export default Scoreboard;
