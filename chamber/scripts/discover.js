import { places } from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Render cards dynamically
    const container = document.getElementById("cardContainer");
    if (container && places.length > 0) {
        places.forEach(place => {
            const card = document.createElement("article");
            card.className = "card";

            card.innerHTML = `
                <figure>
                    <img src="${place.image}" alt="${place.name}" loading="lazy">
                </figure>
                <h2>${place.name}</h2>
                <p>${place.description}</p>
                <address>${place.address}</address>
                <button class="order-btn" data-product="${place.name}">Order Now</button>
            `;

            container.appendChild(card);
        });
    }

    // 2. Set current year in the footer
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 3. Handle order buttons (delegated after rendering)
    document.addEventListener("click", (event) => {
        const button = event.target.closest(".order-btn");
        if (button) {
            const productName = button.getAttribute("data-product");
            localStorage.setItem("selectedProduct", productName);
            window.location.href = "form.html";
        }
    });

    // 4. Populate product name on form.html
    const productNameField = document.getElementById("product-name");
    if (productNameField) {
        const selectedProduct = localStorage.getItem("selectedProduct");
        if (selectedProduct) {
            productNameField.value = selectedProduct;
            localStorage.removeItem("selectedProduct");
        }
    }

    // 5. Display timestamp when order is placed
    const orderForm = document.getElementById("order-form");
    if (orderForm) {
        orderForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent actual submit
            const timestamp = new Date().toLocaleString();
            document.getElementById("order-timestamp").textContent = timestamp;
            // Optionally submit: orderForm.submit();
        });
    }
});




document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("visit-message");
    if (!sidebar) return;

    const now = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    let message = "";

    if (!lastVisit) {
        // First time visit
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const daysPassed = Math.floor((now - Number(lastVisit)) / millisecondsPerDay);

        if (daysPassed < 1) {
            message = "Back so soon! Awesome!";
        } else if (daysPassed === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysPassed} days ago.`;
        }
    }

    // Display the message
    sidebar.textContent = message;

    // Update localStorage with the current visit time
    localStorage.setItem("lastVisit", now);
});
