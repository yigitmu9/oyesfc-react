import React from 'react';
import ScoreboardsGrid from "../components/ScoreboardsGrid";

const Matches = ({databaseData}) => {
    return (
        <div>
            <main>
                <ScoreboardsGrid databaseData={databaseData}/>
            </main>
        </div>
    );
};

export default Matches;