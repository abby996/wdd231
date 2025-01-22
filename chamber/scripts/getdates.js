document.addEventListener("DOMContentLoaded", () => {
    // Update copyright year
    const currentYear = new Date().getFullYear();
    document.querySelector("footer p:first-of-type").textContent = `© ${currentYear} InnoTech Chamber of Commerce`;

    // Update last modified date
    const lastModified = document.lastModified;
    document.querySelector("footer p:last-of-type").textContent = `Last Modification: ${lastModified}`;
});