# Books on Redis - Full Stack App

A modern full-stack application for managing books, built with **Next.js 13**, **Laravel**, and **Redis**.  
This project demonstrates CRUD operations, server-side rendering, and seamless integration between a React frontend and a Laravel backend using Redis as the database.

---

## Features

- List all books
- View book details
- Add a new book
- Edit an existing book
- Delete a book
- Modern, responsive design with Tailwind CSS
- Fully API-driven: Next.js frontend communicates with Laravel backend

---

## Tech Stack

**Frontend**  
- Next.js 13 (App Router)  
- React  
- Tailwind CSS  

**Backend**  
- Laravel 10  
- Redis (fast key-value storage)  
- REST API endpoints for CRUD operations  

---

## Project Structure

/my-project
│
├── /frontend # Next.js app
│ ├── /app # Next.js pages and components
│ ├── /components
│ ├── /lib # helpers like API client or Redis client
│
├── /backend # Laravel app
│ ├── /app
│ ├── /routes/api.php # API routes
│ ├── /config
│ └── /database

---

### API Endpoints

| Method | Endpoint         | Description            |
|--------|-----------------|------------------------|
| GET    | /api/books       | Get all books          |
| GET    | /api/books/{id}  | Get a single book      |
| POST   | /api/books       | Create a new book      |
| PUT    | /api/books/{id}  | Update a book          |
| DELETE | /api/books/{id}  | Delete a book          |
