import React from 'react';
import ScoreboardsGrid from "../components/ScoreboardsGrid/scoreboards-grid";
import Footer from "../components/Footer/footer";

const MatchesPage = ({databaseData, reloadData, credentials, allData}) => {

    const handleReload = (data) => {
        reloadData(data)
    }

    return (
        <div>
            <main>
                <ScoreboardsGrid databaseData={databaseData} reloadData={handleReload} credentials={credentials} allData={allData} />
                <Footer credentials={credentials}></Footer>
            </main>
        </div>
    );
};

export default MatchesPage;