import React from 'react';
import IndividualStatsGrid from "../components/IndividualStatsGrid/individual-stats-grid";
import Footer from "../components/Footer/footer";

const IndividualStatsPage = ({databaseData, credentials, allData, reloadData}) => {

    const handleReload = (data) => {
        reloadData(data)
    }

    return (
        <div>
            <main>
                <IndividualStatsGrid databaseData={databaseData} credentials={credentials} allData={allData} reloadData={handleReload}/>
                <Footer></Footer>
            </main>
        </div>
    );
};

export default IndividualStatsPage;