import React, {useState} from 'react';
import classes from "./slider-card.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const SliderCard = () => {
    const cards = [
        { number: 0, title: 'Red & Black', content: 'The colors of O Yes FC are red and black. The red represents enthusiasm and ' +
                'fieriness, and the black represents the fear of opponents to face O Yes FC. The logo and colors took their ' +
                'final form in April 29, 2019 and were used on the jersey produced in the same year. Red jersey, designed on May 13.', logo: 'red3.jpeg'},
        { number: 1, title: 'Golden Age', content: 'A special logo for the 10th anniversary of the establishment of O Yes FC. ' +
                'It took its color from gold, which symbolizes special, and its symbol from the phoenix, the official ' +
                'animal of the team. The gold color and logo were used on the jersey produced in July 14, 2023.', logo: 'gold2.jpeg' },
        { number: 2, title: 'Rising', content: 'The first O Yes FC logo appeared on May 13, 2014, as a result of gradual' +
                ' growth and branding. As in the first 2 jerseys, a blue tone is used in this logo and represents self-confidence.' +
                ' It was used in the Chelsea jersey released on August 28, 2014 and the Wavy' +
                ' jersey released on August 22, 2015.', logo: 'blue2.jpeg' },
        { number: 3, title: 'Origin', content: 'O Yes FC was founded on November 17, 2013 and its first jersey was introduced ' +
                '5 days later, on November 22. The ghost logo used on the first jersey is symbol of  opponents fear, the harbinger of victory. ' +
                'The white next to blue on the jersey represents stability, ' +
                'while the orange used on the collar represents enthusiasm and energy.', logo: 'ghost1.jpeg' },
    ];

    const [currentCard, setCurrentCard] = useState(0);
    const windowHeight = window.innerWidth > 768 ? (window.innerHeight - 240) + 'px' : (window.innerHeight - 370) + 'px';

    const styles = {
        card: {
            position: 'relative',
            backgroundColor: 'transparent',
            borderRadius: '25px',
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
        content: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px',
        },
    };

    const smallStyles = {
        card: {
            position: 'relative',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            '&:hover': {
                transform: 'scale(1.05)',
            },
            borderRadius: '25px',
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            color: 'lightgray',
            padding: '10px',
            transition: 'opacity 0.3s ease',
            opacity: 0,
            pointerEvents: 'none',
            width: '200%',
        },
        smallMedia: {
            transition: 'filter 0.3s ease',
            '&:hover': {
                filter: 'blur(10px)',
                transform: 'scale(1.05)',
            },
            height: '100%',
            width: '100%'
        }
    };

    const clickCard = (index) => {
        setCurrentCard(index);
    }

    const [hovered, setHovered] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    const hoverTrue = (index) => {
        setHoveredCard(index)
        setHovered(true)
    }

    const hoverFalse = () => {
        setHovered(false)
    }

    return (
        <>
            <div className={classes.grid} style={{minHeight: windowHeight}}>
                <div className={classes.insideGrid}>
                    <Card sx={styles.card} className={classes.cardStyle}>
                        <CardMedia
                            component="img"
                            sx={{height: 700, width: '100%'}}
                            image={require(`../../images/${cards[currentCard].logo}`)}
                        />
                        <CardContent sx={styles.content}>
                            <h1 className={classes.title}>{cards[currentCard].title}</h1>
                            <span className={classes.content}>{cards[currentCard].content}</span>
                        </CardContent>
                    </Card>
                    <div style={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
                        {cards.map((x, index) =>
                            <Card key={index} sx={smallStyles.card} className={classes.smallCardStyle}
                                  onClick={() => clickCard(index)}>
                                <CardMedia
                                    onMouseEnter={() => hoverTrue(index)}
                                    onMouseLeave={() => hoverFalse()}
                                    component="img"
                                    sx={smallStyles.smallMedia}
                                    image={require(`../../images/${x.logo}`)}
                                    className={classes.smallCardPhoto}
                                />
                                <CardContent
                                    style={{paddingBottom: '10px'}}
                                    sx={{...smallStyles.content, opacity: hovered && hoveredCard === index ? 1 : 0}}>
                                    <h1 className={classes.smallCardTitle}>{x.title}</h1>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SliderCard;
