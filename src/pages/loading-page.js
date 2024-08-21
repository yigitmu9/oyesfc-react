import React from 'react';
import {BarLoader} from "react-spinners";
import OYesFCLogo from '../images/oyesfc.PNG'
import {OYesFcEras} from "../constants/constants";
import PhoenixLogo from "../images/phoenix.png";
import FirstLogo from "../images/firstLogo.png";
import GhostLogo from "../images/ghost.png";

const LoadingPage = ({selectedEra}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                color: 'lightgray'
            }}
        >
            {Loading(selectedEra)}
        </div>
    );
};

export default LoadingPage;

export function Loading(selectedEra) {

    const getTeamLogo = () => {
        if (selectedEra === OYesFcEras.goldenAge) return PhoenixLogo
        if (selectedEra === OYesFcEras.redAndBlack) return OYesFCLogo
        if (selectedEra === OYesFcEras.rising) return FirstLogo
        if (selectedEra === OYesFcEras.origins) return GhostLogo
        return PhoenixLogo
    }

    const getColor = () => {
        if (selectedEra === OYesFcEras.goldenAge) return 'goldenrod'
        if (selectedEra === OYesFcEras.redAndBlack) return 'firebrick'
        if (selectedEra === OYesFcEras.rising) return 'dodgerblue'
        if (selectedEra === OYesFcEras.origins) return 'gray'
        return 'goldenrod'
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                color: 'lightgray'
            }}
        >
            <img style={{width: "200px", height: "200px", background: "transparent", marginBottom: "20px"}}
                 src={getTeamLogo()} alt={'1'}/>
            <BarLoader color={getColor()} speedMultiplier={0.7}/>
        </div>
    )
}
