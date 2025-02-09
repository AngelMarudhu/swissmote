# Project Overview

This project is a simple web application that allows users to create and manage a events It provides a user-friendly interface for adding, editing, and deleting tasks.

# Tech Stack

1. Node.JS
2. Express.js
3. MongoDB
4. Mongoose
5. Socket.io
6. Dotenv
7. Bcrypt
8. JWT
9. CORS
10. Nodemon

# Setup Installation

1. Clone the repository to your local machine using command or zip file
2. Navigate to the project directory
3. Install the dependencies using command npm install
4. Start the development server using command npm run dev
5. Check with postman or any other API testing tool the url is localhost:9000
6. Create .env file in the root directory and add the following variables:
   PORT=9000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
7. Start the development server using command npm run dev

# API Endpoints

1. POST /api/user/register → Register a new user
2. POST /api/user/login → Log in and get JWT
3. POST /api/event/create → Create a new event
4. GET /api/event/get-all-events → Get all events
5. GET /api/event/filter?category=<category>&fromDate=<date>&toDate=<date> → Get filtered events
6. PUT /api/event/update/:id → Update event
7. DELETE /api/event/delete/:id → Delete event

# Socket io

1. connect → Establish socket connection
2. event:join_event → Join event in real time
3. emit:event_joined → Update event in real time
