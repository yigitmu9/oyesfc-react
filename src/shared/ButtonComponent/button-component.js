import React from 'react';
import classes from './button-component.module.css';
import {PulseLoader} from "react-spinners";

const ButtonComponent = ({onClick, name, backgroundColor, textColor, size, loading}) => {

    const handleOnClick = () => {
        onClick(true)
    }

    return (
        <div className={classes.div}>
            <div className={classes.box}
                 onClick={handleOnClick}
                 style={{backgroundColor: backgroundColor ? backgroundColor : '#007AFF',
                     width: size === 'large' ? '100%' : size === 'medium' ? '400px' : null}}>
                {
                    loading ?
                        <PulseLoader color="lightgray" speedMultiplier={0.7}/>
                        :
                        <span className={classes.spanStyle}
                              style={{color: textColor ? textColor : 'lightgray'}}>
                            {name}
                        </span>
                }
            </div>
        </div>
    );
};

export default ButtonComponent;
