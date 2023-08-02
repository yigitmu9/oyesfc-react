import classes from "./game-status.module.css";

const GameStatus = ({status, bgColor}) => {
    return (
        <div className={classes.status} style={{background: bgColor}}>
            {status}
        </div>
    );
};

export default GameStatus;