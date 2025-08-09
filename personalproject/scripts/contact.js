document.addEventListener("DOMContentLoaded", () => {
    // Part 1: Handle "Order Now" buttons
    const orderButtons = document.querySelectorAll(".btn");

    orderButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            // Get the product name from the data-product attribute
            const productName = event.target.getAttribute("data-product");

            // Store the product name in localStorage
            localStorage.setItem("selectedProduct", productName);

            // Redirect to the order form page
            window.location.href = "service.html";
        });
    });

    // Part 2: Handle form submission and modal
    const form = document.getElementById("order-form");
    const modal = document.getElementById("order-modal");
    const modalMessage = document.getElementById("modal-message");
    const closeModalButton = document.getElementById("close-modal");
    const closeSpan = document.querySelector(".close");

    // Set current year in footer
    const currentYear = document.getElementById("current-year");
    currentYear.textContent = new Date().getFullYear();

    // Handle form submission
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get form fields
            const fullName = document.getElementById("full-name");
            const email = document.getElementById("email");
            const productName = document.getElementById("product-name");
            const message = document.getElementById("message");

            // Validate form fields
            if (!fullName.value) {
                alert("Please enter your full name.");
                fullName.focus(); // Focus on the empty field
                return;
            }

            if (!email.value) {
                alert("Please enter your email address.");
                email.focus();
                return;
            }

            if (!productName.value) {
                alert("Please enter the type of device.");
                productName.focus();
                return;
            }

            if (!message.value) {
                alert("Please describe the problem.");
                message.focus();
                return;
            }

            // If all fields are filled, display confirmation message in modal
            modalMessage.textContent = `Thank you, ${fullName.value}! We have received your request for ${productName.value}. We will contact you at ${email.value} shortly.`;

            // Show the modal
            modal.style.display = "block";

            // Set order timestamp in footer
            const orderTimestamp = document.getElementById("order-timestamp");
            const now = new Date();
            orderTimestamp.textContent = now.toLocaleString();

            // Reset the form
            form.reset();
        });
    }

    // Close modal when clicking the close button
    if (closeModalButton) {
        closeModalButton.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // Close modal when clicking the close span (×)
    if (closeSpan) {
        closeSpan.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // Close modal when clicking outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const timestampElement = document.getElementById("order-timestamp");

    if (timestampElement) {
        const timestamp = new Date().toLocaleString();
        timestampElement.textContent = `Last Order: ${timestamp}`;
    }
});
