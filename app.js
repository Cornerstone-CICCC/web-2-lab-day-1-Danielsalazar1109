async function getWeather() {
    const citytolook = document.getElementById('city').value;
    const city = `https://geocoding-api.open-meteo.com/v1/search?name=${citytolook}&count=1&language=en&format=json`;

    try {
        const response = await fetch(city);
        const data = await response.json();
        const population = data.results[0].population;
        const country = data.results[0].country;
        const latitude = data.results[0].latitude; 
        const longitude = data.results[0].longitude;
        const cityName = data.results[0].name;

        document.getElementById('cityName').textContent = cityName;
        document.getElementById('population').textContent = `${population}`;
        document.getElementById('country').textContent = `${country}`;

        const weather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,showers,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`;

        try {
            const response2 = await fetch(weather);
            const data2 = await response2.json();
            const timezone = data2.timezone;
            const minTemperature = data2.daily.temperature_2m_min[0];
            const maxTemperature = data2.daily.temperature_2m_max[0];
            const isDay = data2.current.is_day;
            const cityTemp = data2.current.temperature_2m;

            document.getElementById('timezone').textContent = `${timezone}`;
            document.getElementById('cityTemp').textContent = `${cityTemp} °C`;
            document.getElementById('temperature').textContent = `Low: ${minTemperature}°C Max: ${maxTemperature}°C`;

            const timeDiv = document.getElementById('time');
            if (isDay) {
                timeDiv.style.backgroundImage = 'url(./images/day.jpg)';
                timeDiv.style.color = 'black';
            } else {
                timeDiv.style.backgroundImage = 'url(./images/night.jpg)';
                timeDiv.style.color = 'white'; 
            }
            const oldImg = timeDiv.querySelector('img');
            if (oldImg) oldImg.remove();
            const img = document.createElement('img');
            timeDiv.appendChild(img);

            console.log(data2);

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }

    } catch (error) {
        console.error('Error fetching city data:', error);
    }
}
