import React, { useState } from 'react';
import classes from "./filter-buttons.module.css";

function FilterButtons({ data, applyFilter }) {
    const [activeButton, setActiveButton] = useState(0);

    const handleButtonClick = (index) => {
        setActiveButton(index);
        applyFilter(data[index]);
    };

    return (
        <div className={classes.grid}>
            {data.map((item, index) => (
                <button
                    style={{marginRight: "12px"}}
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    className={index === activeButton ? classes.activeButton : classes.disabledButton}
                >
                    {item}
                </button>
            ))}
        </div>
    );
}

export default FilterButtons;
