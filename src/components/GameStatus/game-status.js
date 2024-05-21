import classes from "./game-status.module.css";
import {matchType} from "../../constants/constants";

const GameStatus = ({status, bgColor, fixture ,isDetails}) => {
    const date = new Date();
    const minutes = date.getMinutes();
    const matchStatus = fixture === matchType.live ? (minutes + '"') : status;
    return (
        <div className={isDetails ? classes.isDetailsStatus : classes.status}
             style={{background: bgColor, color: fixture === matchType.live ? 'green' : 'dimgray'}}>
            {matchStatus}
        </div>
    );
};

export default GameStatus;