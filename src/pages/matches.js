import React from 'react';
import ScoreboardsGrid from "../components/ScoreboardsGrid";

const Matches = ({databaseData}) => {
    return (
        <div>
            <main>
                <ScoreboardsGrid databaseData={databaseData}/>
                <div style={{marginTop: "50px", textAlign: "center"}}>
                    <span style={{color: "gray", textAlign: "center"}}>© 2023, O Yes FC</span>
                </div>
            </main>
        </div>
    );
};

export default Matches;