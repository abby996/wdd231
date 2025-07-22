// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Set last modified date
document.getElementById('last-modified').textContent = document.lastModified;





async function fetchSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        
        // Filter gold and silver members
        const qualifiedMembers = members.filter(member => 
            ['gold', 'silver'].includes(member.membership.toLowerCase())
        );
        
        // Shuffle and select 2-3 random members
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(3, shuffled.length));
        
        // Display spotlights
        const container = document.getElementById('spotlights');
        container.innerHTML = '';
        
        selected.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <h3>${member.name}</h3>
                ${member.image ? `<img src="${member.image}" alt="${member.name}" class="spotlight-logo">` : ''}
                <p>${member.address}</p>
                <p>📞 ${member.phone}</p>
                <p><a href="${member.url}" target="_blank">Visit Website</a></p>
                <p class="membership-badge ${member.membership.toLowerCase()}">${member.membership} Member</p>
            `;
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading spotlights:', error);
        document.getElementById('spotlights').innerHTML = '<p>Member spotlights unavailable</p>';
    }
}

// Call when page loads
document.addEventListener('DOMContentLoaded', fetchSpotlights);