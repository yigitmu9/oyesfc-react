import classes from "./team-view.module.css";
import {TeamNames} from "../../constants/constants";
import OYesFCLogo from '../../images/oyesfc.PNG';
import UnknownLogo from '../../images/unknown.png';

const TeamView = ({teamData, rakipbul, bgColor, isDetails}) => {

    return (
        <div>
            <div className={classes.teamStyle} style={{background: bgColor}}>
                {(teamData?.name && rakipbul)
                    ?
                    <img className={isDetails ? classes.imageDetailStyle : classes.imageStyle} style={{background: bgColor }}
                         src={require(`../../images/${teamData.name}.png`)} alt={'1'}/>
                    :
                    (teamData?.name && !rakipbul)
                        ?
                        <img className={isDetails ? classes.imageDetailStyle : classes.imageStyle} style={{ background: bgColor }}
                             alt={'1'} src={UnknownLogo}/>
                        :
                        <img className={isDetails ? classes.imageDetailStyle : classes.imageStyle} style={{background: bgColor}}
                             alt={'1'} src={OYesFCLogo}/>}
                <span className={isDetails ? classes.titleDetailStyle : classes.titleStyle} style={{ background: bgColor }}>
                    {teamData?.name ? teamData?.name : TeamNames.oYesFc}
                </span>
            </div>
        </div>
    );
};

export default TeamView;