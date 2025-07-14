const BASE_URL = "http://localhost:3000/books";
const BASE_URL_ROLE = "http://localhost:3000/roles"

// Get all books
export async function getEvents() {
    const res = await fetch(BASE_URL);
    return res.json();
}

// Get all roles
export async function getRoles() {
    const res = await fetch(BASE_URL_ROLE);
    return res.json();
}

// Create a new book
export async function createEvent(book) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });
    return res.json();
}

// Create a new user
export async function createUser(user) {
    const res = await fetch(BASE_URL_ROLE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    return res.json();
}

// Update book
export async function updateEvent(id, book) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });
    return res.json();
}

// Delete book
export async function deleteEvent(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    return res.ok;
}