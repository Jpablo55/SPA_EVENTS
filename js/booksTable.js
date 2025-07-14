import { getEvents, deleteEvent, updateEvent } from "./services";
import { openModalEdit } from "./modal";

// Render users
export function renderBooks(books) {
    const tbody = document.getElementById("bookTableBody");
    if (!tbody) return; // Si no existe el tbody, salimos de la función

    tbody.innerHTML = "";

    // ✅ Obtenemos el rol actual
    const userData = JSON.parse(localStorage.getItem("UserData"));
    const isAdmin = userData && userData.role === "Admin";

    // Recorremos la lista de libros
    books.forEach((book) => {
        const row = document.createElement("tr");
        let capacity = Number(book.capacity)
        row.innerHTML = `
  
            <td>${book.eventName}</td>
            <td>${book.description}</td>
            <td>${book.isbn}</td>
            <td>${book.date}</td>
            <td class ='capacity'>
                ${
                    isAdmin
                        ? (capacity === 0
                            ? `<span style="color:red;">Borrowed</span>`
                            :`<span style="color:green;">Available</span>`)
                        : (( book.enrollmentBy?.length === capacity) 
                            ?  "SOLD OUT"
                            :`<span>${book.capacity}</span>
                            <button class="borrow-btn style-borrow" data-id="${book.id}">Enroll</button>`
                            )
                }
                
            </td>
            ${isAdmin ? `
                <td>
                    <button class="edit-btn" data-id="${book.id}">
                        <img src="./assets/icons/pencil.png" alt="Edit" class="edit-icon"/>
                    </button>
                    <button class="delete-btn" data-id="${book.id}">
                        <img src="./assets/icons/trash.png" alt="Delete" class="delete-icon"/>
                    </button>
                </td>
            ` : ""}
            `;
        tbody.appendChild(row); // Agregamos la fila al cuerpo de la tabla
    });
    addRowListeners(); // Activamos los listeners para los botones
}

// Función que añade los listeners a los botones de cada fila
export function addRowListeners() {
    // Listener para botón de editar
    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            openModalEdit(id);
        });
    });

    // Listener para botón de eliminar
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.id;
            if (confirm("Are you sure you want to delete this book?")) {
                await deleteEvent(id);
                const books = await getEvents();
                renderBooks(books);
            }
        });
    });

    // Listener para botón de prestar libro
    document.querySelectorAll(".borrow-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {

            const id = btn.dataset.id;
            const userData = JSON.parse(localStorage.getItem("UserData")); // Obtenemos los datos del usuario

            if (!userData) return alert("You must be logged in");
            const books = await getEvents();
            const book = books.find((b) => b.id == id);
            if (!book) return;

            if (book.enrollmentBy && book.enrollmentBy.length > Number(book.capacity)) {
                alert("Event already sold out!");
                return;
            }
            book.enrollmentBy.push(userData.name)
            const updatedBook = {
                ...book 
            };

            await updateEvent(book.id, updatedBook); // ✅ este debe hacer un PUT o PATCH

            const updatedBooks = await getEvents();
            renderBooks(updatedBooks);
            updateAvailableBooksCount(updatedBooks);
        });
    });
}

// Función que actualiza el contador de libros disponibles
export function updateAvailableBooksCount(books) {
    const available = books.filter(book => !book.enrollmentBy || book.enrollmentBy.length === 0).length;
    const countSpan = document.getElementById("availableCount");
    if (countSpan) countSpan.textContent = available;
}

// Función para configurar la barra de búsqueda
// Search bar logic
export function setupSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("input", async () => {
        const searchTerm = searchInput.value.toLowerCase();
        const allBooks = await getEvents(); // Obtenemos todos los libros

        // Filtramos los libros cuyo título coincida con lo buscado
        const filtered = allBooks.filter((book) =>
            book.title.toLowerCase().includes(searchTerm)
        );

        renderBooks(filtered);
    });
}