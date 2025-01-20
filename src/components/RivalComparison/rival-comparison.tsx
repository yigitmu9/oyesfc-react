import React from 'react';
import { TeamNames } from '../../constants/constants';
import { calculateRateInfo, calculateTeamStats } from '../../utils/utils';
import TubeGraph from '../../shared/TubeGraph/tube-graph';

interface RivalComparisonProps {
    data?: any;
    selectedRival?: any;
}

const RivalComparison: React.FC<RivalComparisonProps> = ({ data, selectedRival }) => {
    const rivalData = Object.values(data).filter((x: any) => x.rival.name === selectedRival);
    const calculatedData = calculateTeamStats(rivalData);
    const winRateStat =
        calculatedData.win !== 0 ? ((calculatedData.win / calculatedData.matches) * 100)?.toFixed(0) : '0';
    const loseRateStat =
        calculatedData.lose !== 0 ? ((calculatedData.lose / calculatedData.matches) * 100)?.toFixed(0) : '0';

    const readyData = [
        [
            winRateStat,
            'Win Rate (%)',
            loseRateStat,
            calculateRateInfo(winRateStat, loseRateStat),
            100 - Number(calculateRateInfo(winRateStat, loseRateStat)),
        ],

        [
            calculatedData.matches,
            'Matches',
            calculatedData.matches,
            calculateRateInfo(calculatedData.matches, calculatedData.matches),
            100 - Number(calculateRateInfo(calculatedData.matches, calculatedData.matches)),
        ],

        [
            calculatedData.win,
            'Wins',
            calculatedData.lose,
            calculateRateInfo(calculatedData.win, calculatedData.lose),
            100 - Number(calculateRateInfo(calculatedData.win, calculatedData.lose)),
        ],

        [
            calculatedData.draw,
            'Draws',
            calculatedData.draw,
            calculateRateInfo(calculatedData.draw, calculatedData.draw),
            100 - Number(calculateRateInfo(calculatedData.draw, calculatedData.draw)),
        ],

        [
            calculatedData.lose,
            'Losses',
            calculatedData.win,
            calculateRateInfo(calculatedData.lose, calculatedData.win),
            100 - Number(calculateRateInfo(calculatedData.lose, calculatedData.win)),
        ],

        [
            calculatedData.scoredGoal,
            'Goals Scored',
            calculatedData.concededGoal,
            calculateRateInfo(calculatedData.scoredGoal, calculatedData.concededGoal),
            100 - Number(calculateRateInfo(calculatedData.scoredGoal, calculatedData.concededGoal)),
        ],

        [
            calculatedData.concededGoal,
            'Goals Conceded',
            calculatedData.scoredGoal,
            calculateRateInfo(calculatedData.concededGoal, calculatedData.scoredGoal),
            100 - Number(calculateRateInfo(calculatedData.concededGoal, calculatedData.scoredGoal)),
        ],

        [
            calculatedData.goalDifference,
            'Goal Difference',
            -Number(calculatedData.goalDifference),
            calculatedData.goalDifference > 0 ? 100 : 0,
            100 - (calculatedData.goalDifference > 0 ? 100 : 0),
        ],

        [
            calculatedData.scoredGoalsPerGame,
            'Scored per Match',
            calculatedData.concededGoalsPerGame,
            calculateRateInfo(calculatedData.scoredGoalsPerGame, calculatedData.concededGoalsPerGame),
            100 - Number(calculateRateInfo(calculatedData.scoredGoalsPerGame, calculatedData.concededGoalsPerGame)),
        ],

        [
            calculatedData.concededGoalsPerGame,
            'Conceded per Match',
            calculatedData.scoredGoalsPerGame,
            calculateRateInfo(calculatedData.concededGoalsPerGame, calculatedData.scoredGoalsPerGame),
            100 - Number(calculateRateInfo(calculatedData.concededGoalsPerGame, calculatedData.scoredGoalsPerGame)),
        ],

        [
            calculatedData.goalDifferencePerGame,
            'Goal Difference per Match',
            -Number(calculatedData.goalDifferencePerGame),
            Number(calculatedData.goalDifferencePerGame) > 0 ? 100 : 0,
            100 - (Number(calculatedData.goalDifferencePerGame) > 0 ? 100 : 0),
        ],
    ];

    return (
        <div style={{ padding: '20px' }}>
            <TubeGraph
                data={readyData}
                rightColor={'purple'}
                rightName={selectedRival}
                leftName={TeamNames.oYesFc}
                leftColor={'yellow'}
            />
        </div>
    );
};

export default RivalComparison;
