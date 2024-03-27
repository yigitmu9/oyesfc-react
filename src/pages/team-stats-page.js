import React from 'react';
import TeamStatsGrid from "../components/TeamStatsGrid/team-stats-grid";
import Footer from "../components/Footer/footer";

const TeamStatsPage = ({databaseData}) => {

    return (
        <div>
            <main>
                <TeamStatsGrid databaseData={databaseData}/>
                <Footer></Footer>
            </main>
        </div>
    );
};

export default TeamStatsPage;