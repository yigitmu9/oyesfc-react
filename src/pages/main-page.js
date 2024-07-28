import React from 'react';
import SliderCard from "../components/SliderCard/slider-card";
import Footer from "../components/Footer/footer";

const MainPage = ({credentials, selectedEra, sendEra}) => {

    const handleEra = (data) => {
        sendEra(data)
    }

    return (
        <div>
            <SliderCard selectedEra={selectedEra} sendEra={handleEra} />
            <Footer credentials={credentials}></Footer>
        </div>

    );
};

export default MainPage;
