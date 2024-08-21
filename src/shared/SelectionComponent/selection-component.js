import React from 'react';
import classes from './selection-component.module.css';
import {FormControl} from "@mui/material";

const SelectionComponent = ({options, onSelectionChange, customStyle, defaultSelectedValue}) => {

    const handleChange = (event) => {
        onSelectionChange(event.target.value);
    }

    return (
        <div className={classes.selectionStyle} style={customStyle}>
            <FormControl className={classes.colorStyle} fullWidth>
                <label className={classes.colorStyle}>
                    <select className={classes.select} onChange={handleChange}>
                        {!defaultSelectedValue && <option value={'Select'}>{'Select'}</option>}
                        {options.map((x, y) => (
                            <option key={y} value={x}>{x}</option>
                        ))}
                    </select>
                </label>
            </FormControl>
        </div>
    );
};

export default SelectionComponent;
