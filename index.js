const button = document.querySelector(`#checkWeather`);
const alertInfo = document.querySelector(`#alertInfo`);
const weatherIcon = document.querySelector(`#weatherIcon`);
const apiKey = `286f566e0e84ea2a496104ff40ce72d1`;

button.addEventListener("click", async () => {
    const city = document.querySelector('#usersCity').value.trim(); // Dodaj .trim() aby usunąć białe znaki z początku i końca
    const cityRegex = /^[a-zA-Z\s]+$/;

    if (city === '') {
        alertInfo.innerHTML = 'Insert city!';
        return;
    }

    if (!cityRegex.test(city)) {
        alertInfo.innerHTML = 'Invalid city name';
        return;
    }

    const apiKey = `286f566e0e84ea2a496104ff40ce72d1`;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        console.log(data);
        if (data.cod === 200) {
            const temperature = data.main.temp;
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            alertInfo.innerHTML = `Temperature for ${city} is ${Math.floor(temperature)}°`;
            weatherIcon.src = iconUrl;
        } else {
            alertInfo.innerHTML = `City not found`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alertInfo.innerHTML = 'An error occurred while fetching weather data';
    }
});
