const API_KEY = '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';

export async function analyzeMatchesWithOpenRouter(allMatches: any, nextMatch: any, selectedMatchData: any) {
    const scoreMatch = (match: any) => {
        let score = 0;
        if (match?.place === nextMatch?.place) score += 2;
        if (match?.rival?.name === nextMatch?.rival) score += 3;
        if (match?.weather?.sky === nextMatch?.weather?.sky) score += 1;
        return score;
    };

    const relevantMatches = allMatches
        .map((m: any) => ({ match: m, score: scoreMatch(m) }))
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 10)
        .map((m: any) => m.match);

    const formatMatches = relevantMatches.map((match: any, index: any) => {
        const squad = Object.entries(match?.oyesfc?.squad || {})
            .map(([name, p]: any) => `    - ${name} (${p.role}): ${p.goal} goals${p?.rating ? (', Match Rating ' + p?.rating?.toFixed(1)) : '' }`)
            .join('\n');

        return `
${index + 1}. Match (${match?.day}, ${match?.place}):
  Rival: ${match?.rival?.name}, Score: ${match?.oyesfc?.goal}-${match?.rival?.goal}
  Weather: ${match?.weather?.temperature}°C, ${match?.weather?.description}
  Players:
${squad}
    `.trim();
    }).join('\n\n');

    const prompt = `
${selectedMatchData ? 'You can see similar matches data to our last match below.' : 'You can see similar matches data to our next match below.'}

${formatMatches}

${selectedMatchData ? 'Last match info:' : 'Next match info:'}
- Place: ${nextMatch?.place}
- Rival: ${nextMatch?.rival?.name}
${selectedMatchData ? 'Score: our team  ' + selectedMatchData?.oyesfc?.goal + ' ,rival ' + selectedMatchData?.rival?.goal : ''}
- Weather: ${nextMatch?.weather?.temperature}°C, ${nextMatch?.weather?.description}
- Date: ${nextMatch?.day}
- Squad: ${Object.entries(nextMatch?.oyesfc?.squad || {})
        .map(([name, p]: any) => `    - ${name} (${p.role}) ${selectedMatchData ? (p.goal + 'scored goals') : ''} ${(selectedMatchData && p?.rating) ? (', Match Rating ' + p?.rating?.toFixed(1)) : '' }`)
        .join('\n')}

${selectedMatchData ? 'Which key points can you bring out for team and individuals for our last match comparing with previous matches?' : 'What do you suggest or which key points can you bring out for team and individuals?'}
  `.trim();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'openchat/openchat-3.5-0106',
            messages: [
                { role: 'user', content: prompt }
            ]
        })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.replace(/\n/g, '__NEWLINE__') || 'No response.';
}
