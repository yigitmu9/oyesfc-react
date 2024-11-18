import React, {useEffect, useState} from 'react';
import classes from './upper-nav-info.module.css'

interface UpperNavInfoProps {
    title?: string;
}

const UpperNavInfo: React.FC<UpperNavInfoProps> = ({ title }) => {

    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
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
