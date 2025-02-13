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
    const orderForm = document.getElementById("order-form"); // Assuming your form has the ID "order-form"
    if (orderForm) {
        orderForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent the form from submitting immediately

            const timestamp = new Date().toLocaleString();
            document.getElementById("order-timestamp").textContent = timestamp;

            // Optionally, you can submit the form programmatically after setting the timestamp
            // orderForm.submit();
        });
    }
});