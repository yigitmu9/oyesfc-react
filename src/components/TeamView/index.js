import classes from "./team-view.module.css";
import {TeamNames} from "../../constants/constants";

const TeamView = ({teamData, rakipbul, bgColor}) => {
    return (
        <div className={classes.team} style={{background: bgColor}}>
            {(teamData?.name && rakipbul)
                ?
                <img style={{ width: 75, height: 75, background: bgColor }} src={require('../../images/rakipbul.png')}/>
                :
                (teamData?.name && !rakipbul)
                    ?
                    <img style={{ width: 75, height: 75, background: bgColor }} src={require('../../images/unknown.png')}/>
                    :
                    <img style={{ width: 75, height: 75, background: bgColor}} src={require('../../images/oyesfc.PNG')}/>}
            <span style={{ background: bgColor, color: "lightgray", textAlign: "center" }}>
                {teamData?.name ? teamData?.name : TeamNames.oYesFc}
            </span>
        </div>
    );
};

export default TeamView;