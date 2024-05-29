let map;

function initMap(lat, lng) {
    map = new Microsoft.Maps.Map(document.getElementById('map'), {
        center: new Microsoft.Maps.Location(lat, lng),
        zoom: 8
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const locationForm = document.getElementById('location-form');

    locationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const locationInput = document.getElementById('location-input').value;

        // Fetch both current and hourly weather data based on the location entered in the form
        fetchWeatherData(locationInput);
        fetchHourlyWeatherData(locationInput);
    });
});

function fetchWeatherData(location) {
    const apiKey = 'c95a091d5686adf965d9961911d6c3cb'; // Replace with your API key from a weather service provider
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            const lat = data.coord.lat;
            const lng = data.coord.lon;
            initMap(lat, lng);
            fetchDailyWeatherData(lat, lng, apiKey); // Fetch 7-day forecast data
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    changeVideoSource(data.weather[0].description);
}

function fetchHourlyWeatherData(location) {
    const apiKey = 'c95a091d5686adf965d9961911d6c3cb'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currentDate = new Date();
            const next12HoursData = data.list.filter(hour => {
                const hourDate = new Date(hour.dt * 1000);
                return hourDate >= currentDate && hourDate < new Date(currentDate.getTime() + 12 * 60 * 60 * 1000); // Include only next 12 hours
            });

            displayHourlyWeatherInfo(next12HoursData);
        })
        .catch(error => {
            console.error('Error fetching hourly weather data:', error);
        });
}

function displayHourlyWeatherInfo(data) {
    const hourlyWeatherContainer = document.getElementById('hourly-weather');

    // Clear previous content
    hourlyWeatherContainer.innerHTML = '';

    // Display hourly weather data
    data.forEach(hour => {
        const temperature = (hour.main.temp - 273.15).toFixed(1); // Convert and round to one decimal place
        const description = hour.weather[0].description;
        const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const hourlyForecastElement = document.createElement('div');
        hourlyForecastElement.classList.add('hourly-forecast');
        hourlyForecastElement.innerHTML = `
            <p>${time}</p>
            <p>Temperature: ${temperature} &deg;C</p>
            <p>Description: ${description}</p>
        `;

        hourlyWeatherContainer.appendChild(hourlyForecastElement);
    });
}

function fetchDailyWeatherData(lat, lon, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayDailyWeatherInfo(data.daily);
        })
        .catch(error => {
            console.error('Error fetching daily weather data:', error);
        });
}

function displayDailyWeatherInfo(data) {
    const dailyWeatherContainer = document.getElementById('daily-weather');

    dailyWeatherContainer.innerHTML = '';

    data.forEach((day, index) => {
        if (index < 7) { // Display only next 7 days
            const temperatureDay = day.temp.day.toFixed(1);
            const temperatureNight = day.temp.night.toFixed(1);
            const description = day.weather[0].description;
            const date = new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

            const dailyForecastElement = document.createElement('div');
            dailyForecastElement.classList.add('daily-forecast');
            dailyForecastElement.innerHTML = `
                <p>${date}</p>
                <p>Day: ${temperatureDay} &deg;C</p>
                <p>Night: ${temperatureNight} &deg;C</p>
                <p>Description: ${description}</p>
            `;

            dailyWeatherContainer.appendChild(dailyForecastElement);
        }
    });
}

function changeVideoSource(description) {
    // Get the video and source elements
    const video = document.getElementById('background-video');
    const source = document.getElementById('video-source');

    // Define the new video source based on the description
    if (description.toLowerCase().includes('rain')) {
        source.src = '/videos/rainy.mp4';  // Rainy video source
    } else if (description.toLowerCase().includes('clouds')) {
        source.src = '/videos/cloudy.mp4';  // Cloudy video source
    }
    else if (description.toLowerCase().includes('thunder')) {
        source.src = '/videos/thunder.mp4';  // Cloudy video source
    }
    else if (description.toLowerCase().includes('clear')) {
        source.src = '/videos/clear.mp4';  // Cloudy video source
    } else {
        source.src = '/videos/default.mp4';  // Default video source
    }

    video.load();
}
