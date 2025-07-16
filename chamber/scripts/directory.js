// Directory data from members.json
let members = [];

// DOM Elements
const gridButton = document.getElementById('grid');
const listButton = document.getElementById('list');
const directoryContainer = document.getElementById('directory-container');

// Fetch members data from JSON file
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Failed to fetch member data');
        }
        members = await response.json();
        displayMembers('grid');
    } catch (error) {
        console.error('Error fetching members:', error);
        directoryContainer.innerHTML = '<p class="error">Unable to load business directory. Please try again later.</p>';
    }
}

// Display members in the directory
function displayMembers(view) {
    directoryContainer.innerHTML = '';
    directoryContainer.className = view;
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        
        if (view === 'list') {
            // List View Template
            card.innerHTML = `
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p>${member.address.replace(/\n/g, '<br>')}</p>
                    <p>${member.phone}</p>
                    <a href="${member.url}" target="_blank" class="btn">Visit Website</a>
                    <div class="member-meta">
                        <span class="membership-level ${member.membership.toLowerCase()}">${member.membership} Member</span>
                    </div>
                </div>
            `;
        } else {
            // Grid View Template
            card.innerHTML = `
                <div class="member-image">${getIconForCategory(member.category)}</div>
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.url}" target="_blank" class="btn">Visit Website</a>
                    <div class="member-meta">
                        <span class="membership-level ${member.membership.toLowerCase()}">${member.membership} Member</span>
                    </div>
                </div>
            `;
        }
        
        directoryContainer.appendChild(card);
    });
}

// Get icon based on business category
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
    return icons[category] || '🏢';
}

// Switch between views
function switchView(view) {
    // Update container class
    directoryContainer.className = view;
    
    // Update button states
    gridButton.classList.toggle('active', view === 'grid');
    listButton.classList.toggle('active', view === 'list');
    
    // Refresh the display
    displayMembers(view);
}

// Set default view
function initialize() {
    gridButton.classList.add('active');
    fetchMembers();
}

// Event listeners
gridButton.addEventListener('click', () => switchView('grid'));
listButton.addEventListener('click', () => switchView('list'));

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initialize);