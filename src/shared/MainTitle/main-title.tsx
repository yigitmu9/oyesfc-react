import React from 'react';
import classes from './main-title.module.css';

interface  MainTitleProps {
    title?: any;
    size?: any;
}

const MainTitle: React.FC<MainTitleProps> = ({title, size}) => {

    const titleStyle = size === 'small' ? classes.smallTitleStyle :
        size === 'mid' ? classes.midTitleStyle : classes.bigTitleStyle

    return (
        <div className={titleStyle}>
            <span className={classes.spanStyle}>{title}</span>
        </div>
    );
};

export default MainTitle;
