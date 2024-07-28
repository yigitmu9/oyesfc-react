import React from 'react';
import {BarLoader, PuffLoader} from "react-spinners";
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
        return OYesFCLogo
    }

    const getColor = () => {
        if (selectedEra === OYesFcEras.goldenAge) return 'goldenrod'
        if (selectedEra === OYesFcEras.redAndBlack) return 'firebrick'
        if (selectedEra === OYesFcEras.rising) return 'dodgerblue'
        if (selectedEra === OYesFcEras.origins) return 'gray'
        return 'firebrick'
    }

    if (selectedEra === OYesFcEras.goldenAge) return (
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
            <BarLoader color="goldenrod" speedMultiplier={0.7}/>
        </div>
    )

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            position: 'relative'
        }}>
            <img style={{
                width: "200px",
                height: "200px",
                background: "transparent",
                borderRadius: '50%'
            }}
                 src={getTeamLogo()}
                 alt={'1'}/>
            <div style={{position: 'absolute'}}>
                <PuffLoader color={getColor()} speedMultiplier={0.7} size={350}/>
            </div>
        </div>
    )
}