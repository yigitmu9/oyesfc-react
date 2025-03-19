import React from 'react';
import classes from './selection-component.module.css';
import { FormControl } from '@mui/material';
import { useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface SelectionComponentProps {
    options?: any;
    onSelectionChange?: any;
    customStyle?: any;
    defaultSelectedValue?: any;
}

const SelectionComponent: React.FC<SelectionComponentProps> = ({
    options,
    onSelectionChange,
    customStyle,
    defaultSelectedValue,
}) => {
    const { loadingData } = useSelector((state: any) => state.databaseData);
    const handleChange = (event?: any) => {
        onSelectionChange(event.target.value);
    };

    return (
        <>
            {
                loadingData ?
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton className={classes.selectionStyle} style={customStyle}/>
                    </SkeletonTheme>
                    :
                    <div className={classes.selectionStyle} style={customStyle}>
                        <FormControl className={classes.colorStyle} fullWidth>
                            <label className={classes.colorStyle}>
                                <select className={classes.select} onChange={handleChange}>
                                    {!defaultSelectedValue && <option value={'Select'}>{'Select'}</option>}
                                    {options.map((x: any, y: number) => (
                                        <option key={y} value={x}>
                                            {x}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </FormControl>
                    </div>
            }
        </>
    );
};

export default SelectionComponent;
