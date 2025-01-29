document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members-container");
    const gridButton = document.getElementById("grid");
    const listButton = document.getElementById("list");

    // Function to apply grid view
    const applyGridView = () => {
        membersContainer.classList.add("grid");
        membersContainer.classList.remove("list");
    };

    // Function to apply list view
    const applyListView = () => {
        membersContainer.classList.add("list");
        membersContainer.classList.remove("grid");
    };

    // Event listeners for buttons
    gridButton.addEventListener("click", applyGridView);
    listButton.addEventListener("click", applyListView);

    // Set default view to grid
    applyGridView();
});



fetch("/chamber/data/members.json")
    .then(res => res.json())
    .then(data => {
        const members = data.members.filter(m => m.membership === "Gold" || m.membership === "Silver");
        const selected = members.sort(() => 0.5 - Math.random()).slice(0, 3);
        document.getElementById("spotlight-container").innerHTML = selected.map(m => `
            <div class="spotlight-card">
                <img src="${m.logo}" alt="${m.name} Logo">
                <h3>${m.name}</h3>
                <p><strong>Phone:</strong> ${m.phone}</p>
                <p><strong>Address:</strong> ${m.address}</p>
                <a href="${m.website}" target="_blank">Visit Website</a>
            </div>
        `).join("");
    });
