document.addEventListener("DOMContentLoaded", function () {
    // Liste des champs à récupérer
    const fields = {
        "first-name": "First Name",
        "last-name": "Last Name",
        "email": "Email",
        "phone": "Mobile Phone",
        "org-name": "Business Name",
        "membership": "Membership Level",
        "timestamp": "Submitted At"
    };

    // Afficher les valeurs stockées
    Object.keys(fields).forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            const value = localStorage.getItem(field) || "N/A";
            element.textContent = value;
        }
    });

    // Animation d'apparition en fondu
    const container = document.querySelector(".container");
    if (container) {
        container.style.opacity = 0;
        setTimeout(() => {
            container.style.transition = "opacity 1.5s ease-in-out";
            container.style.opacity = 1;
        }, 300);
    }

    // Mise au focus automatique pour l'accessibilité
    document.querySelector(".container").focus();
});
