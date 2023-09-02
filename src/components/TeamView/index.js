import classes from "./team-view.module.css";
import {TeamNames} from "../../constants/constants";

const TeamView = ({teamData, rakipbul, bgColor, isDetails}) => {

    let imageSize;
    let fontSize;

    if (isDetails) {
        imageSize = 100
        fontSize = 20
    } else {
        imageSize = 75
        fontSize = 16
    }
    return (
        <div>
            <div className={classes.team} style={{background: bgColor}}>
                {(teamData?.name && rakipbul)
                    ?
                    <img style={{ width: imageSize, height: imageSize, background: bgColor }} src={require('../../images/rakipbul.png')}/>
                    :
                    (teamData?.name && !rakipbul)
                        ?
                        <img style={{ width: imageSize, height: imageSize, background: bgColor }} src={require('../../images/unknown.png')}/>
                        :
                        <img style={{ width: imageSize, height: imageSize, background: bgColor}} src={require('../../images/oyesfc.PNG')}/>}
                <span style={{ background: bgColor, color: "lightgray", textAlign: "center" , fontSize: fontSize}}>
                    {teamData?.name ? teamData?.name : TeamNames.oYesFc}
                </span>
            </div>
        </div>
    );
};

export default TeamView;