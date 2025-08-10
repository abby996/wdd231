// DOM Elements
const servicesGrid = document.getElementById('services-grid');
const filterAllBtn = document.getElementById('filter-all');
const filterPopularBtn = document.getElementById('filter-popular');
const serviceModal = document.getElementById('service-modal');
const modalDetails = document.getElementById('modal-details');
const closeModalBtn = document.getElementById('close-modal');
const bookNowBtn = document.getElementById('book-now');
const closeModalX = document.querySelector('.close-modal');

// State
let allServices = [];
let filteredServices = [];
let selectedService = null;

// Local Storage Keys
const LS_FAVORITES = 'abbytech_favorites';
const LS_FILTER = 'abbytech_last_filter';

// Initialize the page
async function init() {
    try {
        // Load services from JSON
        const response = await fetch('data/services.json');
        if (!response.ok) {
            throw new Error('Failed to load services');
        }
        allServices = await response.json();
        
        // Check local storage for last filter preference
        const lastFilter = localStorage.getItem(LS_FILTER) || 'all';
        
        // Apply filter
        if (lastFilter === 'popular') {
            filterPopularBtn.click();
        } else {
            filterAllBtn.click();
        }
        
        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
    } catch (error) {
        console.error('Error loading services:', error);
        servicesGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load services. Please try again later.</p>
            </div>
        `;
    }
}

// Render services to the grid with images
function renderServices(services) {
    servicesGrid.innerHTML = '';
    
    if (services.length === 0) {
        servicesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No services found matching your criteria.</p>
            </div>
        `;
        return;
    }
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        if (service.popular) {
            serviceCard.classList.add('popular');
        }
        
        serviceCard.innerHTML = `
            <div class="service-card-header">
                ${service.popular ? '<span class="popular-badge">Popular</span>' : ''}
                <div class="service-image" style="background-image: url('${service.image}')">
                    <i class="${service.icon}"></i>
                </div>
                <h3>${service.name}</h3>
            </div>
            <div class="service-card-body">
                <p class="price">$${service.price.toFixed(2)}</p>
                <p class="time"><i class="fas fa-clock"></i> ${service.time}</p>
                <p class="warranty"><i class="fas fa-shield-alt"></i> ${service.warranty} warranty</p>
            </div>
            <div class="service-card-footer">
                <button class="btn-details" data-id="${service.id}">Details</button>
            </div>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
    
    // Add event listeners to detail buttons
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', () => showServiceDetails(btn.dataset.id));
    });
}

// Filter services
function filterServices(filterType) {
    if (filterType === 'popular') {
        filteredServices = allServices.filter(service => service.popular);
        filterPopularBtn.classList.add('active');
        filterAllBtn.classList.remove('active');
    } else {
        filteredServices = [...allServices];
        filterAllBtn.classList.add('active');
        filterPopularBtn.classList.remove('active');
    }
    
    // Save filter preference to local storage
    localStorage.setItem(LS_FILTER, filterType);
    
    renderServices(filteredServices);
}

// Show service details in modal with image// array find method
function showServiceDetails(serviceId) {
    selectedService = allServices.find(service => service.id === parseInt(serviceId));
    
    if (!selectedService) return;
    
    modalDetails.innerHTML = `
        <h2>${selectedService.name}</h2>
        <div class="modal-service-image" style="background-image: url('${selectedService.image}')">
            <i class="${selectedService.icon}"></i>
        </div>
        <div class="modal-service-details">
            <div class="detail-row">
                <span class="detail-label">Price:</span>
                <span class="detail-value">$${selectedService.price.toFixed(2)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Repair Time:</span>
                <span class="detail-value">${selectedService.time}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Warranty:</span>
                <span class="detail-value">${selectedService.warranty}</span>
            </div>
            <div class="detail-row full-width">
                <span class="detail-label">Description:</span>
                <p>${selectedService.description}</p>
            </div>
        </div>
    `;
    
    serviceModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    serviceModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Book service
function bookService() {
    if (!selectedService) return;
    
    // In a real app, this would redirect to a booking page or show a form
    alert(`Booking request for ${selectedService.name} has been initiated. Our team will contact you shortly.`);
    closeModal();
}

// Event Listeners
filterAllBtn.addEventListener('click', () => filterServices('all'));
filterPopularBtn.addEventListener('click', () => filterServices('popular'));
closeModalBtn.addEventListener('click', closeModal);
closeModalX.addEventListener('click', closeModal);
bookNowBtn.addEventListener('click', bookService);

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
        closeModal();
    }
});

// Initialize the page
init();