# SPA - EVENTS

This project is a single page application (SPA) built with pure JavaScript and Vite as the development environment. It is an event management system, both for the administrator (when creating, editing, and deleting events) and for the user (when booking and canceling reservations).

##  First Steps

### 1. Clone the repository

```bash
git clone https://github.com/Jpablo55/SPA_EVENTS.git
cd SPA_EVENTS
```

### 2. Install dependencies

```bash
npm install
```

### 3. Starting the development server

```bash
npm run dev
```

This will launch a development server using **Vite**. You can open the app in your browser at:

```
http://localhost:5173
```

## Features
Authentication: Login, registration, logout, persistent session with localStorage.

Roles:

Administrator: CRUD for users and courses, access to the dashboard.

User: View events, enroll/unenroll, and view "My Enrollments."
Path Protection: Only authorized users can access each page.

Tables and Forms: Manage users and courses from the dashboard (admin).

Enrollments: Users can enroll/unenroll in courses.

Validations: Validated forms (required fields, email, password).


##  Technologies used

- **JavaScript**: Core SPA logic
- **Vite**: Rapid packager for modern development
- **HTML and CSS**: Interface structure and styles

## Available Scripts

- `npm run dev`: Starts the development server with Vite


