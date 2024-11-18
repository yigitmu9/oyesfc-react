import classes from "./team-view.module.css";
import {OYesFcEras, TeamNames} from "../../constants/constants";
import OYesFCLogo from '../../images/oyesfc.PNG';
import GhostLogo from '../../images/ghost.png';
import FirstLogo from '../../images/firstLogo.png';
import PhoenixLogo from '../../images/phoenix.png';
import UnknownLogo from '../../images/unknown.png';
import {useSelector} from "react-redux";
import React from "react";

interface  TeamViewProps {
    teamData?: any;
    rakipbul?: any;
    isDetails?: any;
}

const TeamView: React.FC<TeamViewProps> = ({teamData, rakipbul, isDetails}) => {
    const { selectedEra } = useSelector((state: any) => state.era);

    const getTeamLogo = () => {
        if (selectedEra === OYesFcEras.goldenAge) return PhoenixLogo
        if (selectedEra === OYesFcEras.redAndBlack) return OYesFCLogo
        if (selectedEra === OYesFcEras.rising) return FirstLogo
        if (selectedEra === OYesFcEras.origins) return GhostLogo
        return PhoenixLogo
    }

    return (
        <div>
            <div className={classes.teamStyle}>
                {(teamData?.name && rakipbul)
                    ?
                    <img className={isDetails ? classes.imageDetailStyle : classes.imageStyle}
                         src={require(`../../images/${teamData.name}.png`)} alt={'1'}/>
                    :
                    (teamData?.name && !rakipbul)
                        ?
                        <img className={isDetails ? classes.imageDetailStyle : classes.imageStyle}
                             alt={'1'} src={UnknownLogo}/>
                        :
                        <img className={isDetails ? classes.imageDetailStyle : classes.imageStyle}
                             alt={'1'} src={getTeamLogo()}/>}
                <span className={isDetails ? classes.titleDetailStyle : classes.titleStyle} >
                    {teamData?.name ? teamData?.name : TeamNames.oYesFc}
                </span>
            </div>
        </div>
    );
};

export default TeamView;
