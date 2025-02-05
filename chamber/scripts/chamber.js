async function fetchWeather() {
    const lat = 18.9712; // Latitude for Haiti
    const lon = -72.2852; // Longitude for Haiti
    const apiKey = '0172ed01167f0d91445b4fdfa3221c0d';

    // URL for the 5 days/3 hour forecast
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data); // Display current weather
            displayForecast(data); // Display 3-day forecast
        } else {
            throw new Error("Weather data not fetched");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector('.weather-info').innerText = "Weather data unavailable.";
    }
}

function displayWeather(data) {
    // Current Weather Data
    const currentWeather = data.list[0]; // Get current weather (latest timestamp available) 
    const currentTemp = document.getElementById('current-temp');
    const weatherIcon = document.getElementById('weather-icon');
    const description = document.getElementById('description');

    description.textContent = currentWeather.weather[0].description.charAt(0).toUpperCase() + currentWeather.weather[0].description.slice(1);
    currentTemp.innerHTML = `${Math.round(currentWeather.main.temp)}&deg;C`;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`);
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear any previous forecast data

    const uniqueDates = new Set();
    let count = 0;

    // Loop through the list to get 3 distinct days' weather data
    data.list.forEach(weather => {
        const date = new Date(weather.dt * 1000).toDateString(); // Format to date string

        // Only add data for unique dates and until we reach 3 days
        if (!uniqueDates.has(date) && count < 3) {
            uniqueDates.add(date);
            count++;

            const forecastItem = document.createElement('div');
            forecastItem.innerHTML = `
                <h5>${date}</h5>
                <p>Temp: ${Math.round(weather.main.temp)}&deg;C</p>
                <p>${weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</p>
                <img src="https://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="${weather.weather[0].description}">
            `;
            forecastContainer.appendChild(forecastItem);
        }
    });
}

// Fetch weather data on page load
document.addEventListener('DOMContentLoaded', fetchWeather);

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        const spotlightMembers = members.filter(member => member.membership_level === 1 || member.membership_level === 2);
        displayMembers(spotlightMembers);
    } catch (error) {
        console.error("Error fetching members data:", error);
    }
}

function displayMembers(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = ''; // Clear previous content

    const randomMembers = members.sort(() => 0.5 - Math.random()).slice(0, 2); // Randomly select 2-3 members

    randomMembers.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('business-card');
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <div>
                <h4>${member.name}</h4>
                <p>${member.additional_info}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>URL:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
                <p><strong>Membership Level:</strong> ${member.membership_level === 1 ? 'Gold' : 'Silver'}</p>
            </div>
        `;
        spotlightContainer.appendChild(card);
    });
}

// Fetch weather and members data on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    fetchMembers();

    // Set last modification date
    document.getElementById('last-modification').innerText = document.lastModified;

    // Set the current year
    document.getElementById('current-year').innerText = new Date().getFullYear();
});