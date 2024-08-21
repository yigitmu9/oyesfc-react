import React from 'react';
import NikeLogo from "../../images/nike.png";
import AdidasLogo from "../../images/adidas.PNG";
import {TeamMembers} from "../../constants/constants";
import {BootBrandsList} from "../../constants/constants";
import classes from "./boot-brands.module.css"
import MainTitle from "../../shared/MainTitle/main-title";
import CardGrid from "../../shared/CardGrid/card-grid";
import ListComponent from "../../shared/ListComponent/list-component";

const BootBrands = ({data}) => {
    let adidasPlayer = 0;
    let nikePlayer = 0;
    let adidasGoal = 0;
    let nikeGoal = 0;
    let adidasCollections = [];
    let nikeCollections = [];
    let playerTotalGoalFacilities = 0;

    Object.values(TeamMembers).forEach(x => {
        playerTotalGoalFacilities = 0;
        Object.values(data).forEach(item => {
            if (item?.oyesfc?.squad[x.name] && x.name !== TeamMembers.can.name) {
                playerTotalGoalFacilities += item.oyesfc.squad[x.name].goal;
            }
        });
        if (x.bootBrand === BootBrandsList.nike) {
            nikePlayer += 1
            nikeGoal += playerTotalGoalFacilities
            const bootItem = nikeCollections?.find(item => item.hasOwnProperty(x.bootCollection));
            if (bootItem) {
                bootItem[x.bootCollection] += playerTotalGoalFacilities;
            } else {
                nikeCollections.push({ [x.bootCollection]: playerTotalGoalFacilities });
            }
        }
        if (x.bootBrand === BootBrandsList.adidas) {
            adidasPlayer += 1
            adidasGoal += playerTotalGoalFacilities
            const bootItem = adidasCollections?.find(item => item?.hasOwnProperty(x.bootCollection));
            if (bootItem) {
                bootItem[x.bootCollection] += playerTotalGoalFacilities;
            } else {
                adidasCollections.push({ [x.bootCollection]: playerTotalGoalFacilities });
            }
        }
    })

    const dataForNike = [
        ['Nike Players', nikePlayer],
        ['Total Nike Goals', nikeGoal],
        [Object.entries(nikeCollections[0])[0][0] + ' Goals', Object.entries(nikeCollections[0])[0][1]],
        [Object.entries(nikeCollections[1])[0][0] + ' Goals', Object.entries(nikeCollections[1])[0][1]],
        [Object.entries(nikeCollections[2])[0][0] + ' Goals', Object.entries(nikeCollections[2])[0][1]]
    ]

    const dataForAdidas = [
        ['Adidas Players', adidasPlayer],
        ['Total Adidas Goals', adidasGoal],
        [Object.entries(adidasCollections[0])[0][0] + ' Goals', Object.entries(adidasCollections[0])[0][1]],
        [Object.entries(adidasCollections[1])[0][0] + ' Goals', Object.entries(adidasCollections[1])[0][1]],
        [Object.entries(adidasCollections[2])[0][0] + ' Goals', Object.entries(adidasCollections[2])[0][1]]
    ]

    const nikeCard = (
        <>
            <MainTitle title={'Nike'} size={'mid'}/>
            <div className={classes.collectionSplitter}>
                <img className={classes.nikeImageStyle}
                     src={NikeLogo}
                     alt={'1'}/>
                <ListComponent data={dataForNike}/>
            </div>
        </>
    )

    const adidasCard = (
        <>
            <MainTitle title={'Adidas'} size={'mid'}/>
            <div className={classes.collectionSplitter}>
                <img className={classes.adidasImageStyle}
                     src={AdidasLogo}
                     alt={'1'}/>
                <ListComponent data={dataForAdidas}/>
            </div>
        </>
    )

    return (
        <>
            <CardGrid smallCards={true}
                      firstPart={nikeCard}
                      content={adidasCard}
                      customStyle={{justifyContent: 'center', display: 'block', textAlign: 'center', height: 'auto'}}/>
        </>
    );
};

export default BootBrands;

