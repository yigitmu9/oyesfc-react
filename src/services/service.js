export async function getWeather(openWeatherType, latitude, longitude) {
    const apiKey = '92168351d1aaa4db88e8f39e9216e249';
    const url = `https://api.openweathermap.org/data/2.5/${openWeatherType}?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}
