import React, {useState} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './navbarElements';
import Message from "../Message";
import classes from "../navbar/navbar.module.css"
import SignInComponent from "../SignIn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OYesFCLogo from '../../images/oyesfc.PNG';

const Navbar = ({databaseData}) => {

    const innerWidth = () => {
        return window.innerWidth;
    }

    const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
    const [isNavOpen, setNavOpen] = useState(false);
    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [messageData, setMessageData] = useState(null);

    const handleXClick = (messageData) => {
        setMessageData(messageData);
    };

    const changeMobileNavbar = () => {
        if (innerWidth() <= 768) {
            isNavOpen ? setNavOpen(false) : setNavOpen(true);
        }
    };

    const closeMobileNavbar = () => {
        if (isNavOpen) {
            setNavOpen(false);
        }
    };

    const openSignInPopup = () => {
        if (innerWidth() <= 768) changeMobileNavbar()
        document.body.style.overflow = 'hidden';
        setSignInPopupOpen(true);
    };

    return (
        <>
            <Nav>
                <NavLink onClick={closeMobileNavbar} to='oyesfc-react/' style={{background:"darkred"}}>
                    <img style={{ width: 60, height: 60, background:"darkred" }} src={OYesFCLogo}/>
                </NavLink>
                <Bars onClick={changeMobileNavbar}/>
                <NavMenu className={ classes.navCloseMenuStyle}>
                    <NavLink onClick={changeMobileNavbar} to='oyesfc-react/matches' activestyle="true" style={{background:"darkred"}}>
                        Matches
                    </NavLink>
                    <NavLink onClick={changeMobileNavbar} to='oyesfc-react/individual-stats' activestyle="true" style={{background:"darkred"}}>
                        Individual Stats
                    </NavLink>
                    <NavLink onClick={changeMobileNavbar} to='oyesfc-react/team-stats' activestyle="true" style={{background:"darkred"}}>
                        Team Stats
                    </NavLink>
                </NavMenu>
                {isNavOpen ?
                    <NavMenu className={classes.navbarOpen}>
                        <NavLink onClick={changeMobileNavbar} to='oyesfc-react/matches' activestyle="true" style={{background:"darkred"}}>
                            Matches
                        </NavLink>
                        <NavLink onClick={changeMobileNavbar} to='oyesfc-react/individual-stats' activestyle="true" style={{background:"darkred"}}>
                            Individual Stats
                        </NavLink>
                        <NavLink onClick={changeMobileNavbar} to='oyesfc-react/team-stats' activestyle="true" style={{background:"darkred"}}>
                            Team Stats
                        </NavLink>
                    </NavMenu>
                    : null
                }
                <NavBtn className={isNavOpen ? classes.navOpenButtonStyle : classes.navCloseButtonStyle} style={{background:"darkred"}}>
                    <NavBtnLink className={isNavOpen ? classes.navOpenButtonLinkStyle : classes.navCloseButtonLinkStyle} onClick={openSignInPopup}>
                        <AccountCircleIcon sx={{width: "65px", height: "65px", background: "darkred", color: "black"}}
                                           className={classes.userButtonLinkStyle}></AccountCircleIcon>
                    </NavBtnLink>
                </NavBtn>
                {isSignInPopupOpen && <SignInComponent openMessage={() => setMessagePopupOpen(true)}
                                                       onClose={() => setSignInPopupOpen(false)}
                                                       messageData={(messageData) => handleXClick(messageData)}
                                                       databaseData={databaseData}/>}
                {isMessagePopupOpen && <Message messageData={messageData} onClose={() => setMessagePopupOpen(false)} />}
            </Nav>
        </>
    );
};

export default Navbar;