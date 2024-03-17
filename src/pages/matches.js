import React from 'react';
import ScoreboardsGrid from "../components/ScoreboardsGrid";
import Footer from "../components/Footer";

const Matches = ({databaseData}) => {
    return (
        <div>
            <main>
                <ScoreboardsGrid databaseData={databaseData}/>
                <Footer></Footer>
            </main>
        </div>
    );
};

export default Matches;