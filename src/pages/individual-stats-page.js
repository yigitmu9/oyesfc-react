import React from 'react';
import IndividualStatsGrid from "../components/IndividualStatsGrid/individual-stats-grid";
import Footer from "../components/Footer/footer";

const IndividualStatsPage = ({databaseData}) => {

    return (
        <div>
            <main>
                <IndividualStatsGrid databaseData={databaseData}/>
                <Footer></Footer>
            </main>
        </div>
    );
};

export default IndividualStatsPage;