document.addEventListener("DOMContentLoaded", () => {
    // Set current year in the footer
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Handle order buttons
    const orderButtons = document.querySelectorAll(".order-btn");
    orderButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productName = button.getAttribute("data-product"); // Get product name from data attribute

            // Store selected product in local storage
            localStorage.setItem("selectedProduct", productName);

            // Redirect to order form
            window.location.href = "form.html";
        });
    });

    // Set product name in the order form (on form.html)
    const productNameField = document.getElementById("product-name");
    if (productNameField) {
        const selectedProduct = localStorage.getItem("selectedProduct");

        // Populate the product name field if a product is selected
        if (selectedProduct) {
            productNameField.value = selectedProduct;
        }

        // Clear the selected product from localStorage after populating the field
        localStorage.removeItem("selectedProduct");
    }

    // Display timestamp when order is placed (on form.html)
   
});


document.addEventListener("DOMContentLoaded", () => {
    const timestampElement = document.getElementById("order-timestamp");

    if (timestampElement) {
        const timestamp = new Date().toLocaleString();
        timestampElement.textContent = `Last Order: ${timestamp}`;
    }
});
