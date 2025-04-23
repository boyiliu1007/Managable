# Managable

Managable is a task management application designed to help users organize and track their tasks efficiently. It features a Vue 3 frontend and an Express.js backend, providing a seamless user experience with authentication, task categorization, and due date management.

---

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Task Management**: Create, edit, delete, and view tasks.
- **Task Categorization**: Organize tasks into "To Do", "In Progress", and "Done".
- **Responsive Design**: Built with TailwindCSS for a modern and mobile-friendly UI.
- **RESTful API**: Backend provides endpoints for user and task management.

---

## Project Structure

### Frontend
The frontend is built using Vue 3 and Vite, with reusable components for task management and user authentication.

- **Path**: `frontend/`
- **Key Files**:
  - `src/pages/Home.vue`: Main task management page.
  - `src/pages/Login.vue`: Login page.
  - `src/pages/Signup.vue`: Signup page.
  - `src/components/`: Contains reusable components like `TaskCard`, `TaskEditor`, and `NewTask`.

### Backend
The backend is built using Express.js and MongoDB, providing APIs for user authentication and task management.

- **Path**: `backend/`
- **Key Files**:
  - `routes/user.js`: Handles user registration and login.
  - `routes/task.js`: Handles task CRUD operations.
  - `models/user.js`: User schema with password hashing.
  - `models/task.js`: Task schema.

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or later)
- MongoDB

### Backend Setup
1. **Install Dependencies:**
   ```bash
   cd backend
   npm install
2. **Create a .env file with the following variables:**
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```
3. **Start the bacjend service**

   ```bash
   npm start
### Frontend Setup
1. **Install Dependencies:**

   ```bash
   cd frontend
   npm install
2. **Start the development server:**

   ```bash
   npm run dev
## Usage
1. Register a new account via the signup page.
2. Log in with your credentials.
3. Create, edit, and manage tasks on the home page.
4. Drag and drop tasks between categories to update their status.

