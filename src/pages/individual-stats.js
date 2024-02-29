import React from 'react';
import IndividualStatsGrid from "../components/IndividualStatsGrid";

const IndividualStats = ({databaseData}) => {

    return (
        <div>
            <main>
                <IndividualStatsGrid databaseData={databaseData}/>
                <div style={{marginTop: "50px", textAlign: "center"}}>
                    <span style={{color: "gray", textAlign: "center"}}>© 2023, O Yes FC</span>
                </div>
            </main>
        </div>
    );
};

export default IndividualStats;