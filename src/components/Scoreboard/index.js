import classes from "./scoreboard.module.css";
import TeamView from "../TeamView";
import Result from "../Result";
import GameStatus from "../GameStatus";
import {useState} from "react";

const Scoreboard = ({value, openPopup, matchDetailsData}) => {

    const [buttonBgColor, setButtonBgColor] = useState('#242424');

    const handleButtonHover = () => {
        setButtonBgColor('#323232');
    };

    const handleButtonLeave = () => {
        setButtonBgColor('#242424');
    };

    const handleXClick = () => {
        openPopup(true);
        matchDetailsData(value)
    };

    return (
        <section className={classes.scoreboard} onClick={handleXClick} onMouseEnter={handleButtonHover}
                 onMouseLeave={handleButtonLeave} style={{background: buttonBgColor}}>
            <TeamView teamData={value?.oyesfc} rakipbul={value?.rakipbul} bgColor={buttonBgColor}/>
            <main className={classes.score} style={{background: buttonBgColor}}>
                <Result homeTeamScore={value?.oyesfc?.goal} awayTeamScore={value?.rival?.goal} bgColor={buttonBgColor}/>
                <GameStatus status={value?.day?.replace(/-/g, '/')} bgColor={buttonBgColor}/>
            </main>
            <TeamView teamData={value?.rival} rakipbul={value?.rakipbul} bgColor={buttonBgColor}/>
        </section>
    );
};

export default Scoreboard;