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

const Navbar = () => {

    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        document.body.style.overflow = 'hidden';
        setPopupOpen(true);
    };

    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [messageData, setmessageData] = useState(null);

    const handleXClick = (messageData) => {
        setmessageData(messageData);
    };

    return (
        <>
            <Nav>
                <NavLink to='/' style={{background:"darkred"}}>
                    <img style={{ width: 60, height: 60, background:"darkred" }} src={require('../../images/oyesfc.PNG')}/>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to='/matches' activestyle="true" style={{background:"darkred"}}>
                        Matches
                    </NavLink>
                    <NavLink to='/individual-stats' activestyle="true" style={{background:"darkred"}}>
                        Individual Stats
                    </NavLink>
                    <NavLink to='/team-stats' activestyle="true" style={{background:"darkred"}}>
                        Team Stats
                    </NavLink>
                </NavMenu>
                <NavBtn style={{background:"darkred"}}>
                    <NavBtnLink onClick={openPopup}>Add Match</NavBtnLink>
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