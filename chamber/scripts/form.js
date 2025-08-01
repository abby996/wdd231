document.addEventListener("DOMContentLoaded", () => {
    // Sélectionne tous les boutons "Order Now"
    const orderButtons = document.querySelectorAll(".order-btn");

    orderButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            // Récupère le nom du produit depuis l'attribut data-product
            const productName = event.target.getAttribute("data-product");

            // Stocke le nom du produit dans localStorage
            localStorage.setItem("selectedProduct", productName);

            // Redirige vers le formulaire de commandea
            window.location.href = "form.html";
        });
    });

    // Récupère le champ du nom du produit
    const productNameField = document.getElementById("product-name");
    const selectedProduct = localStorage.getItem("selectedProduct");

    if (productNameField && selectedProduct) {
        productNameField.value = selectedProduct;
    }

    // Formulaire de commande
    const orderForm = document.getElementById("order-form");
    const modal = document.getElementById("order-modal");
    const modalMessage = document.getElementById("modal-message");
    const closeModal = document.getElementById("close-modal");

    if (orderForm) {
        orderForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Empêche l'envoi immédiat du formulaire

            const fullName = document.getElementById("full-name").value;
            const email = document.getElementById("email").value;
            const quantity = document.getElementById("quantity").value;

            // Validation du formulaire
            if (!fullName || !email || quantity < 1) {
                alert(" Fill the fields correctely .");
                return;
            }

            // Affiche la modal de confirmation
            modal.style.display = "block";
            modalMessage.innerHTML = `Thank you, <strong>${fullName}</strong> !<br>
                                      Your order <strong>${quantity}x ${selectedProduct}</strong> has been save.`;

            // Réinitialise le formulaire et nettoie localStorage
            orderForm.reset();
            localStorage.removeItem("selectedProduct");
        });

        // Gestion de la fermeture de la modal
        closeModal.addEventListener("click", () => {
            modal.style.display = "none"; // Ferme la modal SANS redirection
        });

        // Ferme la modal si l'utilisateur clique en dehors
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Affichage de l'année actuelle dans le footer
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Affichage du timestamp lors de la commande
    
});



document.addEventListener("DOMContentLoaded", () => {
    const timestampElement = document.getElementById("order-timestamp");

    if (timestampElement) {
        const timestamp = new Date().toLocaleString();
        timestampElement.textContent = `Last updated: ${timestamp}`;
    }
});
