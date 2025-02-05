async function fetchWeather() {
    const lat = 18.9712; // Latitude for Haiti
    const lon = -72.2852; // Longitude for Haiti
    const apiKey = '0172ed01167f0d91445b4fdfa3221c0d';

    // URL pour la météo
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather data not fetched");
        const data = await response.json();
        displayWeather(data);
        displayForecast(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector('.weather-info').innerText = "Weather data unavailable.";
    }
}

function displayWeather(data) {
    const currentWeather = data.list[0];
    const currentTemp = document.getElementById('current-temp');
    const weatherIcon = document.getElementById('weather-icon');
    const description = document.getElementById('description');

    description.textContent = currentWeather.weather[0].description.charAt(0).toUpperCase() + currentWeather.weather[0].description.slice(1);
    currentTemp.innerHTML = `${Math.round(currentWeather.main.temp)}&deg;C`;

    if (weatherIcon) {
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`);
        weatherIcon.setAttribute('alt', currentWeather.weather[0].description);
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    const uniqueDates = new Set();
    let count = 0;

    data.list.forEach(weather => {
        const date = new Date(weather.dt * 1000).toDateString();

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

async function fetchMembers() {
    try {
        const response = await fetch('data/member.json');
        if (!response.ok) throw new Error("Could not fetch members data");
        const members = await response.json();
        const spotlightMembers = members.filter(member => member.membership_level === 1 || member.membership_level === 2);
        displayMembers(spotlightMembers);
    } catch (error) {
        console.error("Error fetching members data:", error);
    }
}

function displayMembers(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = '';

    const randomMembers = [];
    while (randomMembers.length < 2 && members.length > 0) {
        const index = Math.floor(Math.random() * members.length);
        randomMembers.push(members.splice(index, 1)[0]);
    }

    randomMembers.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('business-card');
        card.innerHTML = `
            <img src="${member.image}" alt="Photo de ${member.name}, membre de notre chambre de commerce">
            <div>
                <h4>${member.name}</h4>
                <p>${member.additional_info}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>URL:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
            </div>
        `;
        spotlightContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    fetchMembers();
    document.getElementById('last-modified').innerText = document.lastModified;
    document.getElementById('current-year').innerText = new Date().getFullYear();
});


document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open'); // Ajoute ou enlève la classe 'open'

            // Change l'icône du bouton (☰ ↔ ✖)
            if (navMenu.classList.contains('open')) {
                menuToggle.innerHTML = '✖'; // Icône de fermeture
                menuToggle.setAttribute('aria-label', 'Close Navigation');
            } else {
                menuToggle.innerHTML = '☰'; // Icône de menu
                menuToggle.setAttribute('aria-label', 'Open Navigation');
            }
        });
    }
});

