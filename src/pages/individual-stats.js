import React from 'react';
import IndividualStatsGrid from "../components/IndividualStatsGrid";
import Footer from "../components/Footer";

const IndividualStats = ({databaseData}) => {

    return (
        <div>
            <main>
                <IndividualStatsGrid databaseData={databaseData}/>
                <Footer></Footer>
            </main>
        </div>
    );
};

export default IndividualStats;