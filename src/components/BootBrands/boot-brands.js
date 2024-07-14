import React from 'react';
import Card from "@mui/material/Card";
import NikeLogo from "../../images/nike.png";
import AdidasLogo from "../../images/adidas.PNG";
import {TeamMembers} from "../../constants/constants";
import {BootBrandsList} from "../../constants/constants";
import classes from "../NumberOfPlayersIndividualStats/number-of-players-individual-stats.module.css";
import bootBrandsClasses from "./boot-brands.module.css"
import {Button, ButtonGroup} from "@mui/material";

const BootBrands = ({data}) => {
    let adidasPlayer = 0;
    let nikePlayer = 0;
    let adidasGoal = 0;
    let nikeGoal = 0;
    let adidasCollections = [];
    let nikeCollections = [];
    let playerTotalGoalFacilities = 0;
    const isMobile = window.innerWidth <= 768;
    const [page, setPage] = React.useState('brands');

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

    const sortedAdidasCollections = adidasCollections.sort((a, b) => {
        const aValue = Object.values(a)[0];
        const bValue = Object.values(b)[0];
        return bValue - aValue;
    });

    const sortedNikeCollections = nikeCollections.sort((a, b) => {
        const aValue = Object.values(a)[0];
        const bValue = Object.values(b)[0];
        return bValue - aValue;
    });

    const setSelectedPage = (selectedPage) => {
        if (selectedPage !== page) {
            setPage(selectedPage)
        }
    }

    return (
        <div className={classes.grid}>
            <Card sx={{ borderRadius: "25px", width: "100%", height: "auto", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center" }}>
                <div className={classes.titleStyle}>
                    <ButtonGroup orientation="vertical" sx={{color: 'lightgray'}} variant="text" aria-label="Basic button group">
                        <Button sx={{fontSize: isMobile ? 23 : 30, color: 'lightgray'}} onClick={() => setSelectedPage('brands')}>Brands</Button>
                        <Button sx={{fontSize: isMobile ? 23 : 30, color: 'lightgray'}} onClick={() => setSelectedPage('collections')}>Collections</Button>
                    </ButtonGroup>
                </div>
                {page === 'brands' && <div className={classes.selectionGrid}>
                    <div className={bootBrandsClasses.rowStyle}>
                        <div className={bootBrandsClasses.columnStyle}>
                            <img className={bootBrandsClasses.nikeImageStyle}
                                 src={NikeLogo}
                                 alt={'1'}/>
                            <h1 className={bootBrandsClasses.numbersStyle}>{nikePlayer}</h1>
                            <h1 className={bootBrandsClasses.wordsStyle}>Players</h1>
                            <h1 className={bootBrandsClasses.numbersStyle}>{nikeGoal}</h1>
                            <h1 className={bootBrandsClasses.wordsStyle}>Goals</h1>
                        </div>
                        <div className={bootBrandsClasses.columnStyle}>
                            <img className={bootBrandsClasses.adidasImageStyle}
                                 src={AdidasLogo}
                                 alt={'1'}/>
                            <h1 className={bootBrandsClasses.numbersStyle}>{adidasPlayer}</h1>
                            <h1 className={bootBrandsClasses.wordsStyle}>Players</h1>
                            <h1 className={bootBrandsClasses.numbersStyle}>{adidasGoal}</h1>
                            <h1 className={bootBrandsClasses.wordsStyle}>Goals</h1>
                        </div>
                    </div>
                </div>}
                {page === 'collections' && <div className={classes.selectionGrid}>
                    <div className={bootBrandsClasses.rowStyle}>
                        <div className={bootBrandsClasses.columnStyle}>
                            {
                                sortedNikeCollections.map((a, b) => (
                                    <div key={b} className={bootBrandsClasses.collectionSplitter}>
                                        <img className={bootBrandsClasses.nikeCollectionImageStyle}
                                             src={NikeLogo}
                                             alt={'1'}/>
                                        <h1 className={bootBrandsClasses.collectionNameStyle}>{Object.keys(a)}</h1>
                                        <h1 className={bootBrandsClasses.collectionNumbersStyle}>{Object.values(a)}</h1>
                                        <h1 className={bootBrandsClasses.collectionWordsStyle}>Goals</h1>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={bootBrandsClasses.columnStyle}>
                            {
                                sortedAdidasCollections.map((a, b) => (
                                    <div key={b} className={bootBrandsClasses.collectionSplitter}>
                                        <img className={bootBrandsClasses.adidasCollectionImageStyle}
                                             src={AdidasLogo}
                                             alt={'1'}/>
                                        <h1 className={bootBrandsClasses.collectionNameStyle}>{Object.keys(a)}</h1>
                                        <h1 className={bootBrandsClasses.collectionNumbersStyle}>{Object.values(a)}</h1>
                                        <h1 className={bootBrandsClasses.collectionWordsStyle}>Goals</h1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>}
            </Card>
        </div>
    );
};

export default BootBrands;

