import React from 'react';
import classes from './page-grid.module.css';

interface  PageGridProps {
    page?: any;
}

const PageGrid: React.FC<PageGridProps> = ({page}) => {
    return (
        <div className={classes.pageStyle}>
            {page}
        </div>

    );
};

export default PageGrid;
