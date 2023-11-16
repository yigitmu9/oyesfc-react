import React, { useState } from 'react';
import classes from "./slider-card.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { keyframes, styled } from '@mui/system';

const SliderCard = () => {
    const cards = [
        { number: 0, title: 'Red & Black', content: 'The colors of O Yes FC are red and black. The red represents enthusiasm and ' +
                'fieriness, and the black represents the fear of opponents to face O Yes FC. The logo and colors took their ' +
                'final form in April 29, 2019 and were used on the jersey produced in the same year. Red jersey, designed on May 13.', logo: 'oyesfc.PNG'},
        { number: 1, title: 'Golden Age', content: 'A special logo for the 10th anniversary of the establishment of O Yes FC. ' +
                'It took its color from gold, which symbolizes special, and its symbol from the phoenix, the official ' +
                'animal of the team. The gold color and logo were used on the jersey produced in July 14, 2023.', logo: 'phoenix.png' },
        { number: 2, title: 'Rising', content: 'The first O Yes FC logo appeared on May 13, 2014, as a result of gradual' +
                ' growth and branding. As in the first 2 jerseys, a blue tone is used in this logo and represents self-confidence.' +
                ' It was used in the Chelsea jersey released on August 28, 2014 and the Wavy' +
                ' jersey released on August 22, 2015.', logo: 'firstLogo.png' },
        { number: 3, title: 'Origin', content: 'O Yes FC was founded on November 17, 2013 and its first jersey was introduced ' +
                '5 days later, on November 22. The ghost logo used on the first jersey is symbol of  opponents fear, the harbinger of victory. ' +
                'The white next to blue on the jersey represents stability, ' +
                'while the orange used on the collar represents enthusiasm and energy.', logo: 'ghost.png' },
    ];

    const [currentCard, setCurrentCard] = useState(0);

    const nextCard = () => {
        setCurrentCard((prev) => (prev + 1) % cards.length);
    };

    const prevCard = () => {
        setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const selectedCard = cards.filter(x => x.number === currentCard)

    const fadeIn = keyframes` 
      from {
        opacity: 0;
      } 
      to {
        opacity: 1;
      }`;

    const StyledCardDesign = styled('div')(({ theme }) => ({
        textAlign: 'center',
        animation: `${fadeIn} 0.9s ease-in-out`,
        width: '100%',
        height: '100%',
        backgroundColor: '#242424',
        color: 'lightgray'
    }));

    return (
        <div className={classes.grid}>
            <Card sx={{ borderRadius: "25px", width: "100%", height: "auto", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                <CardContent style={{backgroundColor: "#242424", width: "100%", height: "100%"}}>
                    <div className={classes.slider}>
                        <button className={classes.buttonAlign} onClick={prevCard}>&lt;</button>
                        <StyledCardDesign>
                            <img style={{ width: "400px", height: "400px", background: "#242424", transition: 'opacity 1.3s ease-in-out'}} src={require(`../../images/${selectedCard[0].logo}`)}/>
                            <h1 style={{ background: "#242424", marginTop: "50px", transition: 'opacity 1.3s ease-in-out'}}>{selectedCard[0].title}</h1>
                            <h3 style={{ background: "#242424", marginTop: "50px", transition: 'opacity 1.3s ease-in-out'}}>{selectedCard[0].content}</h3>
                        </StyledCardDesign>
                        <button onClick={nextCard}>&gt;</button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SliderCard;
