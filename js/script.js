import { getEvents, getRoles } from "./services";
import {  setListeners } from "./form";
import { renderBooks,  updateAvailableBooksCount } from "./booksTable";
import {  navigate } from "./navigate";



// INIT APP
export async function initApp() {
  console.log("🚀 initApp executed from script.js");

  const events = await getEvents();

  renderBooks(events);
  updateAvailableBooksCount(events);
  setListeners();
}

// ✅ Función para generar un ISBN aleatorio (puedes ajustarlo según necesidad)
export function randomISBN() {
  return Math.floor(Math.random() * 9e13 + 1e13).toString();
}

// ✅ Función para verificar si el usuario está autenticado
export function isAuth() {
  const result = localStorage.getItem("Auth") || null;
  const resultBool = result === 'true'
  return resultBool;
}

// ✅ Setup del formulario de login
export async function setupLoginForm() {
  
  const roles = await getRoles();
  const form = document.getElementById("login");

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = document.getElementById("user").value;
    const pass = document.getElementById("password").value

    let userVal = false;
    roles.forEach((showRole) => {
      const userEmail = showRole.email;
      const psw = showRole.password;
      
      if (email === userEmail && pass === psw) {
          localStorage.setItem("Auth", "true");
          localStorage.setItem("UserData", JSON.stringify(showRole));
          navigate("/home");
          userVal = true;
        } 
    });
    if (!userVal){
      alert("username or password is incorrect");
    }
  });
}

// ✅ Cerrar sesión
const buttonCloseSession = document.getElementById("logout");
buttonCloseSession.addEventListener("click", () => {
  localStorage.setItem("Auth", "false");
  localStorage.removeItem("UserData");
  navigate("/login");
});

// Oculta la columna de acciones completa (cabecera + celdas)
export function hideActionColumn() {
  const th = document.getElementById("actionHide");
  if (th) th.style.display = "none";

  // Encuentra el índice de la columna de acciones
  const columnIndex = [...th.parentElement.children].indexOf(th);

  // Oculta cada <td> en esa misma posición en el <tbody>
  const rows = document.querySelectorAll("#bookTableBody tr");
  rows.forEach((row) => {
    const cells = row.children;
    if (cells[columnIndex]) {
      cells[columnIndex].style.display = "none";
    }
  });
}

// SPA router


// ✅ Navegación SPA
document.body.addEventListener("click", (e) => {
  if (e.target.closest("[data-link]")) {
    e.preventDefault();
    const path = e.target.closest("[data-link]").getAttribute("href");
    navigate(path);
  }
});

window.addEventListener("popstate", () => {
  navigate(location.pathname);
});

// navigate(location.pathname);
const initialPath = isAuth() ? location.pathname : "/login";
navigate(initialPath);