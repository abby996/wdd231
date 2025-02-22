document.addEventListener("DOMContentLoaded", () => {
    // Set current year in the footer
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Set last modified date
    const lastModifiedElement = document.getElementById("last-modified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
});
