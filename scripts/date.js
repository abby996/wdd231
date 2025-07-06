// Mise à jour de l'année courante et de la date de modification
document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour l'année courante
    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Mettre à jour la date de dernière modification
    const lastModifiedElement = document.getElementById('lastmodified');
    if (lastModifiedElement) {
        const lastModified = new Date(document.lastModified);
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };
        lastModifiedElement.textContent = lastModified.toLocaleDateString('en-US', options);
    }
});