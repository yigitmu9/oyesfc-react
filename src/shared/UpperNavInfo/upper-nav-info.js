import React, {useEffect, useState} from 'react';
import classes from "./upper-nav-info.module.css";

const UpperNavInfo = ({title}) => {

    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className={classes.nav} style={{transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)'}}>
                {title}
            </nav>
        </div>
    );
};

export default UpperNavInfo;
