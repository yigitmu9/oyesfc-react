import React from 'react';
import ScoreboardsGrid from "../components/ScoreboardsGrid/scoreboards-grid";
import Footer from "../components/Footer/footer";

const MatchesPage = ({databaseData}) => {
    return (
        <div>
            <main>
                <ScoreboardsGrid databaseData={databaseData}/>
                <Footer></Footer>
            </main>
        </div>
    );
};

export default MatchesPage;