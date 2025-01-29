document.addEventListener("DOMContentLoaded", () => {
    fetchWeather();
    loadSpotlights();
});

// OpenWeatherMap API Configuration
const apiKey = "VOTRE_CLE_API";  // Remplacez par votre clé API
const city = "Port-au-Prince";
const countryCode = "HT";
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${apiKey}`;

function fetchWeather() {
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Weather Data:", data);
            displayWeather(data);
        })
        .catch(error => console.error("Erreur de récupération météo:", error));
}

function displayWeather(data) {
    const weatherContainer = document.getElementById("weather");
    if (!weatherContainer) return;

    const currentWeather = data.list[0];
    const temp = Math.round(currentWeather.main.temp);
    const description = capitalizeWords(currentWeather.weather[0].description);

    let forecastHtml = `<h3>Weather in ${city}</h3>`;
    forecastHtml += `<p><strong>Current:</strong> ${temp}°C, ${description}</p>`;

    // Prévisions des 3 prochains jours (toutes les 24h ≈ 8 intervalles de 3h)
    for (let i = 8; i <= 24; i += 8) {
        const forecast = data.list[i];
        const forecastTemp = Math.round(forecast.main.temp);
        const forecastDesc = capitalizeWords(forecast.weather[0].description);
        const date = new Date(forecast.dt_txt).toLocaleDateString("en-US", { weekday: "long" });

        forecastHtml += `<p><strong>${date}:</strong> ${forecastTemp}°C, ${forecastDesc}</p>`;
    }

    weatherContainer.innerHTML = forecastHtml;
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// === Gestion des Spotlights ===
const jsonUrl = "/chamber/data/members.json"; // Chemin vers votre fichier JSON

function loadSpotlights() {
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Membres récupérés:", data);
            displaySpotlights(data.members);
        })
        .catch(error => console.error("Erreur chargement des membres:", error));
}

function displaySpotlights(members) {
    const spotlightContainer = document.getElementById("spotlights");
    if (!spotlightContainer) return;

    // Filtrer les membres Gold et Silver
    const spotlightMembers = members.filter(member =>
        member.membership === "Gold" || member.membership === "Silver"
    );

    // Sélectionner aléatoirement 2 ou 3 membres
    const selectedMembers = getRandomMembers(spotlightMembers, 3);

    // Afficher les membres sélectionnés
    spotlightContainer.innerHTML = selectedMembers.map(member => `
        <div class="spotlight-card">
            <img src="${member.logo}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Membership:</strong> ${member.membership}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
    `).join("");
}

function getRandomMembers(array, num) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}


fetch("/chamber/data/members.json")
    .then(res => res.json())
    .then(data => {
        const members = data.members.filter(m => m.membership === "Gold" || m.membership === "Silver");
        const selected = members.sort(() => 0.5 - Math.random()).slice(0, 3);
        document.getElementById("spotlight-container").innerHTML = selected.map(m => `
            <div class="spotlight-card">
                <img src="${m.logo}" alt="${m.name} Logo">
                <h3>${m.name}</h3>
                <p><strong>Phone:</strong> ${m.phone}</p>
                <p><strong>Address:</strong> ${m.address}</p>
                <a href="${m.website}" target="_blank">Visit Website</a>
            </div>
        `).join("");
    });
