# chat-app

A comprehensive chat application built with the MERN (MongoDB, Express.js, React, Node.js) stack. This project showcases real-time messaging, user authentication, and a responsive front-end powered by Tailwind CSS.

---

## Features

- **User Authentication**: Secure user login and registration.
- **Real-Time Messaging**: Chat functionality enabled by Socket.IO.
- **Media Uploads**: Cloudinary integration for image and file uploads.
- **Responsive Design**: Front-end styled with Tailwind CSS for optimal user experience on all devices.
- **Theme Management**: Light and dark mode toggle.
- **Scalable Architecture**: Backend designed with TypeScript for maintainability and scalability.

---

## Directory Structure

### Backend
- **Tech Stack**: Node.js, Express.js, MongoDB, Socket.IO, TypeScript
- Key Folders:
  - **Routes**: API routes for authentication and messaging.
  - **Controllers**: Business logic for managing API requests.
  - **Middlewares**: Authentication and file upload handling using Multer.
  - **Models**: MongoDB schemas for users and messages.
  - **Lib**: Utility services like database connection and Socket.IO setup.
  - **Utils**: Helpers for token generation, hashing, and API responses.

### Frontend
- **Tech Stack**: React.js, Tailwind CSS, Vite
- Key Folders:
  - **Components**: Reusable UI elements, including navbar, sidebar, and message components.
  - **Pages**: Main pages for authentication, home, profile, and settings.
  - **Store**: State management using custom hooks.
  - **Utils**: Axios instance for API calls.

---

## Prerequisites

- Node.js (>=16.x)
- MongoDB (local or hosted)
- Cloudinary account for media uploads

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/naimdotcom-chat-app.git
   cd naimdotcom-chat-app
   ```
2. **Backend NPM install**
   ```bash
   cd backend
   npm install
   ```
3. **frontend NPM install**

   ```bash
   cd ../frontend
   npm install
   ```
4. **Environment Variables**
   ```.env
   PORT=5000
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   passSalt=salt_number
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
5. **Start the Application**
   ```bash for backend
   npm run dev
   ```
   ```bash for frontend
   npm run dev
   ```
   
  
