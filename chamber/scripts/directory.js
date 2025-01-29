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



