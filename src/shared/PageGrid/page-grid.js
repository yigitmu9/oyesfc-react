import React from 'react';
import classes from './page-grid.module.css';

const PageGrid = ({page}) => {
    return (
        <div className={classes.pageStyle}>
            {page}
        </div>

    );
};

export default PageGrid;
