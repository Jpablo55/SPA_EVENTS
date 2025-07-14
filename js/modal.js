import { getEvents } from "./services";
import { formatDateInput } from "./form";

// Función que abre el modal de edición y carga los datos del libro
export async function openModalEdit(id) {
    const books = await getEvents();
    const book = books.find((u) => u.id == id); // Buscamos el libro con el ID especificado
    if (!book) return;

    // Cargamos los valores del libro en el formulario
    document.getElementById("bookId").value = book.id;
    document.getElementById("nameEvent").value = book.eventName;
    document.getElementById("description").value = book.description;
    document.getElementById("isbn").value = book.isbn;
    document.getElementById("date").value=formatDateInput(book.date);

    // Cambiamos el título del modal a "Edit book"
    document.getElementById("modalTitle").textContent = "Edit book";
    document.getElementById("bookModal").style.display = "flex";
}

// Función que cierra el modal y limpia el formulario
export function closeModal() {
    const modal = document.getElementById("bookModal");
    modal.style.display = "none";

    // Limpia el formulario cuando se cierra
    const form = document.getElementById("bookForm");
    if (form) {
        form.reset();
        document.getElementById("bookId").value = ""; // Vaciamos el campo de ID
        document.getElementById("isbn").value = ""; // ⚠ si tienes un campo oculto de isbn
    }
}