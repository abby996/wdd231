// scripts/spotlights.js
async function displaySpotlights() {
    try {
        const response = await fetch('data/members1.json');
        const members = await response.json();
        
        // Filter gold and silver members
        const qualifiedMembers = members.filter(member => 
            ['gold', 'silver', 'Bronze'].includes(member.membership.toLowerCase())
        );
        
        // Randomly select 2-3 members
        const shuffled = [...qualifiedMembers].sort(() => 0.5 - Math.random());
        const spotlights = shuffled.slice(0, 3 + Math.floor(Math.random()));
        
        // Display spotlights
        const container = document.getElementById('spotlights');
        container.innerHTML = '';
        
        spotlights.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <div class="spotlight-header">
                    <h3>${member.name}</h3>
                    <span class="membership-badge ${member.membership.toLowerCase()}">
                        ${member.membership} Member
                    </span>
                </div>
                ${member.image ? `<img src="images/members/${member.image}" alt="${member.name}" class="spotlight-logo">` : 
                `<div class="spotlight-icon">${getIconForCategory(member.category)}</div>`}
                <div class="spotlight-info">
                    <p><i class="fas fa-map-marker-alt"></i> ${member.address.split('\n')[0]}</p>
                    <p><i class="fas fa-phone"></i> ${member.phone}</p>
                    <a href="${member.url}" target="_blank" class="spotlight-link">
                        <i class="fas fa-globe"></i> Visit Website
                    </a>
                </div>
            `;
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading spotlights:', error);
        document.getElementById('spotlights').innerHTML = 
            '<p class="error">Member spotlights currently unavailable</p>';
    }
}

// Helper function for category icons
function getIconForCategory(category) {
    const icons = {
       'Finance': '🏦',
        'Retail': '🛍️',
        'Technology': '💻',
        'Restaurant': '🍔',
        'Beverage': '🍾',
        'Fitness': '💪',
        'Automotive': '🚗',
        'Education': '🎓',
        'Healthcare': '⚕️',
        'Media': '📺',
        'Water Treatment': '💧',
        'Hospitality': '🏨',
        'Telecommunications': '📶'
    };
    return icons[category.toLowerCase()] || '🏢';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', displaySpotlights);





const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const city = 'Port-au-Prince';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        // Current Weather
        const currentResponse = await fetch(weatherUrl);
        const currentData = await currentResponse.json();
        
        document.getElementById('current-temp').textContent = `${Math.round(currentData.main.temp)}°C`;
        document.getElementById('weather-desc').textContent = currentData.weather[0].description;
        
        // Weather Icon
        const iconCode = currentData.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="${currentData.weather[0].main}">`;
        
        // 3-Day Forecast
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = '';
        
        // Get unique days (3 days)
        const dailyForecasts = [];
        const dates = new Set();
        
        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            if (!dates.has(date) && dates.size < 3) {
                dates.add(date);
                dailyForecasts.push({
                    date,
                    temp: Math.round(item.main.temp),
                    icon: item.weather[0].icon
                });
            }
        });
        
        dailyForecasts.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'forecast-day';
            dayElement.innerHTML = `
                <p><strong>${day.date}</strong></p>
                <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="">
                <p>${day.temp}°C</p>
            `;
            forecastContainer.appendChild(dayElement);
        });
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather').innerHTML = '<p>Weather data unavailable</p>';
    }
}

// Call when page loads
document.addEventListener('DOMContentLoaded', fetchWeather);



document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('nav ul');
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        hamburger.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
    });
    
    // Close menu when clicking on a link (mobile only)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
                hamburger.textContent = '☰';
            }
        });
    });
    
    // Close menu when clicking outside (mobile only)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !e.target.closest('nav') && 
            navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            hamburger.textContent = '☰';
        }
    });
    
    // Update menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('show');
            hamburger.textContent = '☰';
        }
    });
});