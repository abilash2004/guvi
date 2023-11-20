document.getElementById('weather-form').addEventListener('submit', function (e) {
    e.preventDefault();
    fetchData();
});

async function fetchData() {
    const city = document.getElementById('city').value;
    const apiKey = 'd8369356983cfd9db17221d505d10ceb';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
            document.getElementById('error-message').textContent = '';
        } else {
            document.getElementById('weather-info').style.display = 'none';
            document.getElementById('error-message').textContent = 'City not found. Please try again.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('weather-info').style.display = 'none';
        document.getElementById('error-message').textContent = 'An error occurred. Please try again later.';
    }
}

function displayWeather(data) {
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('weather-description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    cityName.textContent = data.name;
    temperature.textContent = data.main.temp;
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;

    document.getElementById('weather-info').style.display = 'block';
}