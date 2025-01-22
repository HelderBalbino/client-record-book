// An array to store all the contacts
let contacts = [];

// Grab the form and the contact list container
const form = document.getElementById("client-form");
const contactList = document.getElementById("contact-list");

/**
 * Adds a new contact to the contacts array.
 */
function addContact(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const note = document.getElementById("notes").value;

    const contact = {
        name,
        phone,
        email,
        note,
    };

    // Add the new contact to the array
    contacts.push(contact);

    // Reset the form fields
    form.reset();

    // Refresh the displayed contacts
    showContacts();
}

/**
 * Displays the list of contacts in a table.
 */
function showContacts() {
    // Clear the current content
    contactList.innerHTML = "";

    // If no contacts, show a simple message
    if (contacts.length === 0) {
        contactList.innerHTML = "<p>No contacts found</p>";
        return;
    }

    // Otherwise, build a table
    const table = document.createElement("table");
    table.classList.add("contacts-table");

    table.innerHTML = `
    <thead>
        <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Notes</th>
        <th>Actions</th>
        </tr>  
    </thead>
    <tbody></tbody>
    `;

    // Get the <tbody> so we can insert rows
    const tbody = table.querySelector("tbody");

    // Create a row for each contact
    contacts.forEach((contact, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>${contact.email}</td>
        <td>${contact.note}</td>
        <!-- Example: a delete button -->
        <button class="delete-btn" data-index="${index}">Delete</button>
        </td>
    `;
        tbody.appendChild(row);
    });

    // Attach the table to the page
    contactList.appendChild(table);

    // (Optional) Add functionality for action buttons, e.g., Delete
    const deleteButtons = table.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Which contact does this button correspond to?
            const index = btn.getAttribute("data-index");
            // Remove that contact from the array
            contacts.splice(index, 1);
            // Re-render
            showContacts();
        });
    });
}

// Attach the submit event listener (only once!)
form.addEventListener("submit", addContact);
