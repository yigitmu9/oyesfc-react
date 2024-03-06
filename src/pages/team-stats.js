import React from 'react';
import TeamStatsGrid from "../components/TeamStatsGrid";
import Footer from "../components/Footer";

const TeamStats = ({databaseData}) => {

    return (
        <div>
            <main>
                <TeamStatsGrid databaseData={databaseData}/>
                <Footer></Footer>
            </main>
        </div>
    );
};

export default TeamStats;