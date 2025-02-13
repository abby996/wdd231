document.addEventListener("DOMContentLoaded", () => {
    // Get all modal open buttons
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    // Open modal function
    openModalButtons.forEach(button => {
        button.addEventListener("click", event => {
            const modalId = event.target.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "flex";
                modal.setAttribute("aria-hidden", "false");
                document.body.classList.add("modal-open");
            }
        });
    });

    // Close modal function
    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            closeModal(modal);
        });
    });

    // Close modal on click outside content
    modals.forEach(modal => {
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            modals.forEach(modal => {
                if (modal.style.display === "flex") {
                    closeModal(modal);
                }
            });
        }
    });

    function closeModal(modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    // Handle form submission
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault(); // Empêcher la soumission classique du formulaire

            // Liste des champs à stocker
            const fields = ["first-name", "last-name", "email", "phone", "org-name", "membership"];

            // Stocker les données dans localStorage
            fields.forEach(field => {
                const inputElement = document.getElementById(field);
                if (inputElement) {
                    localStorage.setItem(field, inputElement.value.trim());
                }
            });

            // Ajouter un timestamp de soumission
            const timestamp = new Date().toLocaleString();
            localStorage.setItem("timestamp", timestamp);

            // Redirection vers la page de confirmation
            setTimeout(() => {
                window.location.href = "thankyou.html";
            }, 1000); // Délai de 1 seconde pour un meilleur UX
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    openModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "flex";
            }
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    window.addEventListener("click", event => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const timestampElement = document.getElementById("order-timestamp");

    if (timestampElement) {
        const timestamp = new Date().toLocaleString();
        timestampElement.textContent = `Last updated: ${timestamp}`;
    }
});
