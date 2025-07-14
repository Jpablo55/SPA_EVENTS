import { createEvent, getEvents, updateEvent } from "./services";
import { closeModal } from "./modal";
import { renderBooks } from "./booksTable";
import { navigate } from "./navigate";

// FORM LOGIC
// Lógica principal del formulario
export function setListeners() {
    // Obtenemos los elementos del DOM necesarios
    const addBtn = document.getElementById("addBookBtn");
    const closeBtn = document.querySelector(".close-btn");
    const modal = document.getElementById("bookModal");
    const form = document.getElementById("bookForm");

     // Si existe el botón de agregar libro, agregamos evento para navegar al formulario
    if (addBtn) {
        addBtn.addEventListener("click", () => navigate("/add_book"));
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    if (modal) {
        window.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Listener para enviar el formulario (crear o editar libro)
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const id = form.bookId.value;
            let enrollmentBy = []; // Inicializamos la lista de usuarios que lo han prestado
            let capacity = 0;
            // Si el libro ya existe (modo edición), recuperamos su estado de préstamo
            if (id) {
                const books = await getEvents();
                const existingBook = books.find((b_books) => b_books.id == id);
                enrollmentBy = existingBook?.enrollmentBy || []; // Mantenemos el estado original
                capacity = existingBook.capacity
            }
            
            // Creamos el objeto libro con los datos del formulario
            const book = {
                "eventName": form.nameEvent.value,
                "description": form.description.value,
                "isbn": form.isbn.value,
                "date": formatDateToSave(form.date.value),
                "enrollmentBy": enrollmentBy,
                "capacity": capacity,
            };

            // Si existe el ID, actualizamos el libro; si no, lo creamos nuevo
            // const id = form.bookId.value;
            if (id) {
                await updateEvent(id, book);
            } else {
                await createEvent(book);
            }

            const Books = await getEvents();
            renderBooks(Books);
            closeModal();
        });
    }
}

// Función que formatea la fecha para guardarla en el formato: día-mes abreviado-año
export const formatDateToSave = (inputDate) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [year, month, day] = inputDate.split("-"); // Dividimos el string de la fecha
    const monthAbbr = months[parseInt(month, 10) - 1]; // Obtenemos el nombre abreviado

    return `${day}-${monthAbbr}-${year}`;
}

// Función que valida que no se pueda seleccionar una fecha futura
export function setDateInputValidation() {
    const dateInput = document.getElementById("dateOfEntry");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0]; // Fecha de hoy en formato "yyyy-mm-dd"
        dateInput.max = today; // Establecemos el máximo valor permitido (hoy)

        // Escuchamos si se introduce una fecha futura
        dateInput.addEventListener("input", () => {
            if (dateInput.value > today) {
                alert("You cannot select a future date");
                dateInput.value = today;
            }
        });
    }
}

// Función que convierte una fecha estilo "dd-Mmm-yyyy" a formato válido para input type="date"
export function formatDateInput(dateStr) {
    setDateInputValidation();
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0]; // para que funcione en inputs type="date"
}
