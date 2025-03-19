import React, { useCallback, useEffect, useState } from 'react';
import { TeamMembers } from '../../constants/constants';
import { BootBrandsList } from '../../constants/constants';
import classes from './boot-brands.module.css';
import CardGrid from '../../shared/CardGrid/card-grid';
import ListComponent from '../../shared/ListComponent/list-component';
import { useSelector } from 'react-redux';
import SelectionComponent from '../../shared/SelectionComponent/selection-component';

const BootBrands = () => {
    const { filteredData } = useSelector((state: any) => state.databaseData);
    const defaultBrand = BootBrandsList.adidas
    const [selectedBrandData, setSelectedBrandData] = useState<any>({data: null, brand: defaultBrand});

    const handleChange = useCallback((brand: string) => {

        const brandPlayers = Object.values(TeamMembers).filter(x => x.bootBrand === brand)
        const brandPlayerLength = brandPlayers.length
        const bootStats: any = {};

        Object.values(TeamMembers).forEach((player: any) => {
            if (player.bootBrand === brand || player?.oldBootData?.[0]?.bootBrand === brand) {
                const { name, bootBrand, bootCollection, bootModel } = player;
                const oldBootData = player?.oldBootData ? player?.oldBootData : [];
                const bootHistory = [{ changeDate: '9999-99-99', bootBrand, bootCollection, bootModel }, ...oldBootData];

                Object.values(filteredData).forEach((match: any) => {
                    const matchDate = match.day.split('-').reverse().join('-');
                    if (!match.oyesfc || !match.oyesfc.squad[name]) return;
                    const goals = match.oyesfc.squad[name].goal;

                    let currentBoot = bootHistory[0];
                    if (bootHistory.length > 1 && matchDate < bootHistory[1].changeDate.split('-').reverse().join('-')) currentBoot = bootHistory[1];

                    const { bootBrand, bootCollection, bootModel } = currentBoot;
                    if (!bootStats[bootBrand]) bootStats[bootBrand] = { totalGoals: 0, collections: {} };
                    if (!bootStats[bootBrand].collections[bootCollection]) {
                        bootStats[bootBrand].collections[bootCollection] = { totalGoals: 0, models: {} };
                    }
                    if (!bootStats[bootBrand].collections[bootCollection].models[bootModel]) {
                        bootStats[bootBrand].collections[bootCollection].models[bootModel] = 0;
                    }

                    bootStats[bootBrand].totalGoals += goals;
                    bootStats[bootBrand].collections[bootCollection].totalGoals += goals;
                    bootStats[bootBrand].collections[bootCollection].models[bootModel] += goals;
                });
            }
        });

        const collectionGoals = Object.entries(bootStats?.[brand]?.collections)?.map((x: any) => {
            return [`${x[0]} Goals`, x[1].totalGoals]
        })

        const brandData = [
            [`${brand} Players`, brandPlayerLength],
            [`Total ${brand} Goals`, bootStats?.[brand]?.totalGoals || 0],
            ...collectionGoals
        ];

        const finalData = {
            data: brandData,
            brand: brand
        }

        setSelectedBrandData(finalData)
    }, [filteredData]);

    useEffect(() => {
        if (!selectedBrandData?.data && filteredData) {
            handleChange(defaultBrand)
        }
    }, [defaultBrand, filteredData, handleChange, selectedBrandData]);

    const cardContent = (
        <>
            <div className={classes.collectionSplitter}>
                <img className={classes.imageStyle} src={require(`../../images/${selectedBrandData?.brand?.toLowerCase()}.png`)} alt={'1'} />
                <ListComponent data={selectedBrandData?.data} />
            </div>
        </>
    );

    const firstPart = (
        <>
            <SelectionComponent
                options={Object.values(BootBrandsList)}
                onSelectionChange={handleChange}
                defaultSelectedValue={true}
            />
        </>
    );

    return <CardGrid title={'Boot Brand Statistics'} content={cardContent} firstPart={firstPart} />;
};

export default BootBrands;
