import React from 'react';
import classes from './card-grid.module.css';

interface CardGridProps {
    title?: any;
    firstPart?: any;
    content?: any;
    customStyle?: any;
    smallCards?: any;
}

const CardGrid: React.FC<CardGridProps> = ({ title, firstPart, content, customStyle, smallCards }) => {
    const twoSmallCards = (
        <div className={classes.grid}>
            <div className={classes.insideGrid}>
                <div className={classes.smallCardDiv} style={customStyle}>
                    {firstPart}
                </div>
                <div className={classes.smallCardDiv} style={customStyle}>
                    {content}
                </div>
            </div>
        </div>
    );

    const oneBigCard = (
        <div className={classes.grid}>
            <section className={classes.sectionStyle} style={customStyle}>
                <h1 className={classes.titleStyle}>{title}</h1>
                {firstPart}
                <div className={classes.cardContentInsideStyle}>{content}</div>
            </section>
        </div>
    );

    return smallCards ? twoSmallCards : oneBigCard;
};

export default CardGrid;
