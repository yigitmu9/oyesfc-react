import React from 'react';
import SliderCard from "../components/SliderCard/slider-card";
import Footer from "../components/Footer/footer";

const MainPage = ({credentials}) => {
    return (
        <div>
            <SliderCard/>
            <Footer credentials={credentials}></Footer>
        </div>

    );
};

export default MainPage;
