import React, { useRef, useState } from 'react';
import { BarLoader } from 'react-spinners';
import OYesFCLogo from '../images/oyesfc.PNG';
import { FamousQuotes, OYesFcEras } from '../constants/constants';
import PhoenixLogo from '../images/phoenix.png';
import FirstLogo from '../images/firstLogo.png';
import GhostLogo from '../images/ghost.png';
import { useSelector } from 'react-redux';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import loadingAnimation1 from "../assets/animation1.json";
import loadingAnimation2 from "../assets/animation2.json";
import loadingAnimation3 from "../assets/animation3.json";
import loadingAnimation4 from "../assets/animation4.json";
import loadingAnimation5 from "../assets/animation5.json";
import loadingAnimation6 from "../assets/animation6.json";

const LoadingPage = () => {
    /*
    const { selectedEra } = useSelector((state: any) => state.era);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                color: 'lightgray',
            }}
        >
            {Loading(selectedEra)}
        </div>
    );

     */
    // const randomNumber = Math.floor(Math.random() * 50);
    const [randomNumber, setRandomNumber] = useState( Math.floor(Math.random() * 49));
    const [randomNumberForAnimation, setRandomNumberForAnimation] = useState( Math.floor(Math.random() * 5));
    const animations: any = [loadingAnimation1, loadingAnimation2, loadingAnimation3, loadingAnimation4, loadingAnimation5, loadingAnimation6]

    return (
        <div style={styles.container}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxHeight: '100px',
                    color: 'lightgray',
                }}
            >

                {

                    <Lottie style={{
                        width: '200px',
                        height: '200px',
                        background: 'transparent',
                        marginBottom: '20px',
                    }} animationData={animations[randomNumberForAnimation]} loop={true} />


                }

                <span style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0 10%'
                }}>
                    " {FamousQuotes?.[randomNumber]?.quote + ' " - ' + FamousQuotes?.[randomNumber]?.author}
                </span>
            </div>

        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        backgroundColor: "transparent",
    },
};

export default LoadingPage;

export function Loading(selectedEra?: any, heightSize?: any) {
    const getTeamLogo = () => {
        if (selectedEra === OYesFcEras.goldenAge) return PhoenixLogo;
        if (selectedEra === OYesFcEras.redAndBlack) return OYesFCLogo;
        if (selectedEra === OYesFcEras.rising) return FirstLogo;
        if (selectedEra === OYesFcEras.origins) return GhostLogo;
        return PhoenixLogo;
    };

    const getColor = () => {
        if (selectedEra === OYesFcEras.goldenAge) return 'goldenrod';
        if (selectedEra === OYesFcEras.redAndBlack) return 'firebrick';
        if (selectedEra === OYesFcEras.rising) return 'dodgerblue';
        if (selectedEra === OYesFcEras.origins) return 'gray';
        return 'goldenrod';
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: heightSize ? heightSize : '90vh',
                color: 'lightgray',
            }}
        >
            <img
                style={{
                    width: '200px',
                    height: '200px',
                    background: 'transparent',
                    marginBottom: '20px',
                }}
                src={getTeamLogo()}
                alt={'1'}
            />

        </div>
    );
}
