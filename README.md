# Dream Design Carving

This project consists of a Node.js/Express backend and a React frontend.

## Prerequisites

- Node.js installed
- MongoDB installed and running (or a cloud MongoDB URI)

## Setup and Run

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment:
   - Ensure the `.env` file exists in the `backend` directory.
   - It should contain `MONGO_URI` and optionally `PORT` (defaults to 5000).

4. Start the server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000` and proxy API requests to `http://localhost:5000`.
