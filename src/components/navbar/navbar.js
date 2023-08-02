import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './navbarElements';

const Navbar = () => {
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
                    <NavBtnLink to='/add-match'>Add Match</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;