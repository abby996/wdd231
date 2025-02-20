



document.addEventListener("DOMContentLoaded", () => {
    // Set current year in the footer
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Set order timestamp
    const orderTimestamp = document.getElementById("order-timestamp");
    if (orderTimestamp) {
        orderTimestamp.textContent = new Date().toLocaleString();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", (event) => {
            const targetId = event.target.getAttribute("href");
            if (targetId.startsWith("#")) {
                event.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Add event listeners to buttons
    document.querySelectorAll(".card button").forEach(button => {
        button.addEventListener("click", () => {
            alert("More information will be available soon!");
        });



        fetch("chamber/data/discover.json")
            .then(response => response.json())
            .then(data => {
                const gridContainer = document.querySelector(".grid-container");

                data.images.forEach(item => {
                    const article = document.createElement("article");
                    article.classList.add("card");

                    article.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}">
        </figure>
        <address>${item.location}</address>
        <button>Learn More</button>
      `;

                    gridContainer.appendChild(article);
                });
            })
            .catch(error => console.error("Error loading JSON:", error));

    });
});




// Update the current year in the footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Update the order timestamp in the footer
const orderTimestamp = localStorage.getItem('orderTimestamp');
if (orderTimestamp) {
    document.getElementById('order-timestamp').textContent = new Date(orderTimestamp).toLocaleString();
} else {
    document.getElementById('order-timestamp').textContent = "No orders yet.";
}


// Function to calculate the difference in days between two dates
function getDaysBetweenDates(date1, date2) {
    const timeDifference = date2 - date1;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

// Function to update the visit message
function updateVisitMessage() {
    const sidebarMessage = document.createElement('p');
    sidebarMessage.id = 'visit-message';
    document.querySelector('main').prepend(sidebarMessage);

    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();

    if (!lastVisit) {
        sidebarMessage.textContent = "Welcome! This is your first visit.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const daysSinceLastVisit = getDaysBetweenDates(lastVisitDate, currentDate);

        if (daysSinceLastVisit === 0) {
            sidebarMessage.textContent = "You visited today. Welcome back!";
        } else if (daysSinceLastVisit === 1) {
            sidebarMessage.textContent = "You visited yesterday. Welcome back!";
        } else {
            sidebarMessage.textContent = `It's been ${daysSinceLastVisit} days since your last visit. Welcome back!`;
        }
    }

    // Update the last visit date in localStorage
    localStorage.setItem('lastVisit', currentDate.toISOString());
}

// Call the function when the page loads
window.onload = updateVisitMessage;