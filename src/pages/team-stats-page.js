import React from 'react';
import TeamStatsGrid from "../components/TeamStatsGrid/team-stats-grid";
import Footer from "../components/Footer/footer";

const TeamStatsPage = ({databaseData, credentials}) => {

    return (
        <div>
            <main>
                <TeamStatsGrid databaseData={databaseData} credentials={credentials}/>
                <Footer></Footer>
            </main>
        </div>
    );
};

export default TeamStatsPage;