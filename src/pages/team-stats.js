import React from 'react';
import TeamStatsGrid from "../components/TeamStatsGrid";

const TeamStats = ({databaseData}) => {

    return (
        <div>
            <main>
                <TeamStatsGrid databaseData={databaseData}/>
                <div style={{marginTop: "50px", textAlign: "center"}}>
                    <span style={{color: "gray", textAlign: "center"}}>© 2023, O Yes FC</span>
                </div>
            </main>
        </div>
    );
};

export default TeamStats;