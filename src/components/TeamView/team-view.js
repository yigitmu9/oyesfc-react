import classes from "./team-view.module.css";
import {OYesFcEras, TeamNames} from "../../constants/constants";
import OYesFCLogo from '../../images/oyesfc.PNG';
import GhostLogo from '../../images/ghost.png';
import FirstLogo from '../../images/firstLogo.png';
import PhoenixLogo from '../../images/phoenix.png';
import UnknownLogo from '../../images/unknown.png';

const TeamView = ({teamData, rakipbul, bgColor, isDetails, selectedEra}) => {

    const getTeamLogo = () => {
        if (selectedEra === OYesFcEras.goldenAge) return PhoenixLogo
        if (selectedEra === OYesFcEras.redAndBlack) return OYesFCLogo
        if (selectedEra === OYesFcEras.rising) return FirstLogo
        if (selectedEra === OYesFcEras.origins) return GhostLogo
        return OYesFCLogo
    }

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
                             alt={'1'} src={getTeamLogo()}/>}
                <span className={isDetails ? classes.titleDetailStyle : classes.titleStyle} style={{ background: bgColor }}>
                    {teamData?.name ? teamData?.name : TeamNames.oYesFc}
                </span>
            </div>
        </div>
    );
};

export default TeamView;