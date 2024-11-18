import React from 'react';
import classes from './selection-component.module.css';
import {FormControl} from "@mui/material";

interface  SelectionComponentProps {
    options?: any;
    onSelectionChange?: any;
    customStyle?: any;
    defaultSelectedValue?: any;
}

const SelectionComponent: React.FC<SelectionComponentProps> = ({options, onSelectionChange, customStyle, defaultSelectedValue}) => {

    const handleChange = (event?: any) => {
        onSelectionChange(event.target.value);
    }

    return (
        <div className={classes.selectionStyle} style={customStyle}>
            <FormControl className={classes.colorStyle} fullWidth>
                <label className={classes.colorStyle}>
                    <select className={classes.select} onChange={handleChange}>
                        {!defaultSelectedValue && <option value={'Select'}>{'Select'}</option>}
                        {options.map((x: any, y: number) => (
                            <option key={y} value={x}>{x}</option>
                        ))}
                    </select>
                </label>
            </FormControl>
        </div>
    );
};

export default SelectionComponent;
