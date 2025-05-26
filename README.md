Book Review Platform
Overview
This is a full-stack web application designed for users to discover, review, and manage books. It features a robust MERN (MongoDB, Express.js, React, Node.js) stack with a modern Vite-powered React frontend and plain CSS/CSS Modules for styling. Users can browse books, read reviews, submit their own ratings and comments, and manage their profiles. Administrators have additional capabilities, such as adding new books to the platform.


Features
User Authentication: Secure user registration, login, and profile management.
Book Listings: Browse a comprehensive list of books with pagination and search functionality.
Book Details: View detailed information about each book, including descriptions, authors, genres, and publication years.
Review System: Read existing user reviews and submit your own ratings and comments for books.
User Profiles: Users can view and update their personal information.
Admin Panel: Dedicated routes for administrators to add new books to the database.
Responsive Design: Styled with plain CSS and CSS Modules for a clean, maintainable, and responsive user interface across various devices.
Vite Frontend: Fast development server and optimized build process for the React application.
Technologies Used
Frontend (Client)
React.js: A JavaScript library for building user interfaces.
Vite: A fast build tool that provides an instant server start and lightning-fast HMR (Hot Module Replacement) for React development.
React Router DOM: For declarative routing within the single-page application.
Axios: A promise-based HTTP client for making API requests to the backend.
CSS / CSS Modules: For styling components, providing both global styles and component-scoped styles.
React Icons: A library for popular SVG icons.
React Spinners: For loading animations.
Backend (Server)
Node.js: A JavaScript runtime environment.
Express.js: A fast, unopinionated, minimalist web framework for Node.js.
MongoDB: A NoSQL database for storing book, user, and review data.
Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
JSON Web Tokens (JWT): For secure authentication and authorization.
Bcrypt.js: For password hashing.
Express Async Handler: Simple wrapper for handling exceptions in async express routes.
Dotenv: To load environment variables from a .env file.
CORS: Middleware to enable Cross-Origin Resource Sharing.
Getting Started
Follow these steps to set up and run the project locally on your machine.

Prerequisites
Node.js (v18 or higher recommended)
npm (Node Package Manager)
MongoDB (Community Edition or MongoDB Atlas account)
Git
