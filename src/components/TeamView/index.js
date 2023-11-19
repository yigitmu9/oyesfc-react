import classes from "./team-view.module.css";
import {TeamNames} from "../../constants/constants";

const TeamView = ({teamData, rakipbul, bgColor, isDetails}) => {

    return (
        <div>
            <div className={classes.team} style={{background: bgColor}}>
                {(teamData?.name && rakipbul)
                    ?
                    <img className={isDetails ? classes.imageDetailStyle : classes.imageStyle} style={{background: bgColor }}
                         src={require(`../../images/${teamData.name}.png`)}/>
                    :
                    (teamData?.name && !rakipbul)
                        ?
                        <img className={isDetails ? classes.imageDetailStyle : classes.imageStyle} style={{ background: bgColor }} src={require('../../images/unknown.png')}/>
                        :
                        <img className={isDetails ? classes.imageDetailStyle : classes.imageStyle} style={{background: bgColor}} src={require('../../images/oyesfc.PNG')}/>}
                <span className={isDetails ? classes.titleDetailStyle : classes.titleStyle} style={{ background: bgColor }}>
                    {teamData?.name ? teamData?.name : TeamNames.oYesFc}
                </span>
            </div>
        </div>
    );
};

export default TeamView;