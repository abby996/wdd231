document.addEventListener("DOMContentLoaded", async () => {
    const membersContainer = document.getElementById("members");
    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");

    // Fetch member data
    async function fetchMembers() {
        try {
            const response = await fetch("./data/members.json");
            if (!response.ok) throw new Error("Failed to fetch members.");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Render members
    function renderMembers(members) {
        membersContainer.innerHTML = members
            .map(
                (member) => `
          <div class="member-card">
            <img src="./images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Membership Level: ${["Member", "Silver", "Gold"][member.membershipLevel - 1]}</p>
          </div>
        `
            )
            .join("");
    }

    // Toggle views
    gridViewButton.addEventListener("click", () => {
        membersContainer.classList.remove("list-view");
        membersContainer.classList.add("grid-view");
    });

    listViewButton.addEventListener("click", () => {
        membersContainer.classList.remove("grid-view");
        membersContainer.classList.add("list-view");
    });

    // Fetch and display members
    const members = await fetchMembers();
    renderMembers(members);
});
