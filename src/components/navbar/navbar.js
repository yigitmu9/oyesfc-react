import React, {useState} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './navbarElements';
import AddMatchComponent from "../AddMatch";
import Message from "../Message";
import classes from "../navbar/navbar.module.css"

const Navbar = () => {

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isNavOpen, setNavOpen] = useState(false);
    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [messageData, setmessageData] = useState(null);
    const isMobile = window.innerWidth <= 768;

    const openPopup = () => {
        if (isMobile) changeMobileNavbar()
        document.body.style.overflow = 'hidden';
        setPopupOpen(true);
    };

    const handleXClick = (messageData) => {
        setmessageData(messageData);
    };

    const changeMobileNavbar = () => {
        if (isMobile) {
            console.log('yes')
            isNavOpen ? setNavOpen(false) : setNavOpen(true);
        }
    };

    const closeMobileNavbar = () => {
        if (isMobile && isNavOpen) {
            setNavOpen(false);
        }
    };

    return (
        <>
            <Nav>
                <NavLink onClick={closeMobileNavbar} to='oyesfc-react/' style={{background:"darkred"}}>
                    <img style={{ width: 60, height: 60, background:"darkred" }} src={require('../../images/oyesfc.PNG')}/>
                </NavLink>
                <Bars onClick={changeMobileNavbar}/>
                <NavMenu className={isNavOpen ? classes.navOpenMenuStyle : classes.navCloseMenuStyle}>
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
                <NavBtn className={isNavOpen ? classes.navOpenButtonStyle : classes.navCloseButtonStyle} style={{background:"darkred"}}>
                    <NavBtnLink className={isNavOpen ? classes.navOpenButtonLinkStyle : classes.navCloseButtonLinkStyle} onClick={openPopup}>Add Match</NavBtnLink>
                    {isPopupOpen && <AddMatchComponent openMessage={() => setMessagePopupOpen(true)}
                                                       onClose={() => setPopupOpen(false)}
                                                       messageData={(messageData) => handleXClick(messageData)}/>}
                    {isMessagePopupOpen && <Message messageData={messageData} onClose={() => setMessagePopupOpen(false)} />}
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;