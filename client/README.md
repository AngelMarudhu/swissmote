# Project Overview

This project is a simple web application that allows users to create and manage a events It provides a user-friendly interface for adding, editing, and deleting tasks.

# Tech Stack

1. React + Vite
2. React Router
3. Redux Toolkit for state management
4. Axios for making API requests
5. Socket-io-client for real-time communication
6. React Toastify for displaying notifications
7. No libraries only custom CSS for styling

# Setup Installation

1. Clone the repository to your local machine using command or zip file
2. Navigate to the project directory
3. Install the dependencies using command npm install
4. Start the development server using command npm run dev if want production build use npm run build
5. Open your web browser and visit http://localhost:5000 to access the application
6. One small thing you need to do when you run this project one local machine that is in the axios baseURL (all the axios files are placed on client - src - features) you need to change the baseURL to your local machine which is http://localhost:9000 don't forget replace i just forget to addup env files for a frontend and one more thing change the socket.io baseURL to your local machine which is http://localhost:9000

# Usage

1. Create an account or log in if you already have an account so easy peasy you can create your own account and login
2. As you mentioned on the pdf i'll provide the credentials for login "admin@gmail.com" and "admin123"
3. Create your custom events and hit the create event button
4. On the right side of the page you will see the events that you have created
5. You can edit and delete the events as well
6. Last 3 events only visible on the right side because of the easy to remember if you want to see all the events go to the dashboard you will see all the events with join button and you will see the real time participants
7. You will see also filter features on dashboard based on categories and from and to date filters
8. Don't worry if suddenly the page is not working or shutdown our JWT token is always has on local storage so you can refresh the page and you will see the same page where you're logged in
