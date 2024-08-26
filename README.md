# stockImage_Platform

### Image Management Application

[**Live Application Link**](https://stockimage-platform.onrender.com/)

This application allows users to register, log in, and manage images by uploading, editing, deleting, and rearranging them. Users can add titles to their images, perform bulk uploads, and rearrange images using drag-and-drop functionality.

## Table of Contents

- [Overview](#overview)
- [Features and Functionalities](#features-and-functionalities)
  - [User Authentication](#1-user-authentication)
  - [Image Management](#2-image-management)
  - [Image Rearrangement](#3-image-rearrangement)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Clone the Repository](#1-clone-the-repository)
  - [Install Dependencies](#2-install-dependencies)
  - [Set Up Environment Variables](#3-set-up-environment-variables)
  - [Run the Application](#4-run-the-application)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [Image Management](#image-management)
  - [Reset Password](#reset-password)
- [Usage](#usage)
- [Live Link](#live-link)
- [Contact](#contact)

## Overview

The **stockImage_Platform** is a user-friendly image management application that allows users to easily manage their images through features like uploading, editing, deleting, and rearranging. Users can assign titles to their images, perform bulk uploads, and organize their images with drag-and-drop functionality.

## Features and Functionalities

### 1. User Authentication

- **Register**: Users can sign up using their email ID, phone number, and password.
- **Login**: Registered users can log in with their credentials to access the application.
- **Password Reset**: Users can reset their password if they forget it.

### 2. Image Management

- **Add Image with Title**:
  - Users can upload images along with a specific title.
  - The bulk upload feature allows users to upload multiple images simultaneously, each with a unique title.
  - Uploaded images can be viewed along with their titles.
  
- **Edit and Delete**:
  - Users can edit the title of an uploaded image.
  - Users can delete any of their uploaded images.

### 3. Image Rearrangement

- **Drag and Drop**:
  - Users can rearrange the order of their selected images using drag-and-drop functionality.
  - The new order can be saved to maintain the custom arrangement.

## Technologies Used

- **Frontend**: ReactJS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token) for user sessions
- **File Storage**: Firebase Storage for image handling
- **Drag and Drop**: react-beautiful-dnd for drag-and-drop functionality

## Installation

Follow these steps to set up the application locally.

### 1. Clone the Repository

```bash

# Clone the repository
git clone https://github.com/ald2211/stockImage_Platform.git
cd stockImage_Platform-main

```

### 2. Install dependencies

## Backend
npm install

## Frontend
cd frontEnd
npm install

### 3. Set up environment variables

Create a `.env` file in the root folder with the following content:

- **MONGO_URI**: Your MongoDB Atlas URI
- **PORT**: 3000
- **JWT_SECRET**: Your JWT Secret
- **VITE_FIREBASE_API_KEY**: Your Firebase API Key
- **VITE_FIREBASE_APP_ID**: Your Firebase App ID
- **VITE_FIREBASE_AUTH_DOMAIN**: Your Firebase Auth Domain
- **VITE_FIREBASE_PROJECT_ID**: Your Firebase Project ID
- **VITE_FIREBASE_STORAGE_BUCKET**: Your Firebase Storage Bucket
- **VITE_FIREBASE_MESSAGINGSENDER_ID**: Your Firebase Messaging Sender ID

### 4. Run the application

>root folder
npm start

## API Endpoints

### User Authentication
- **Register**: `POST /api/v1/auth/register`
- **Login**: `POST /api/v1/auth/login`

### Image Management
- **Fetch Images**: `GET /api/v1/image/getImages`
- **Upload Images**: `POST /api/v1/image/upload`
- **Rearrange Images**: `PUT /api/v1/image/rearrange`
- **Edit Image**: `PUT /api/v1/image/edit/:id`
- **Delete Image**: `DELETE /api/v1/image/delete/:id`

### Reset Password
- **Reset Password**: `POST /api/user/resetPassword`
  
## Usage

1. **Register**: Create a new account using your email, phone number, and password.
2. **Login**: Log in with your credentials to access the image management features.
3. **Upload Images**: 
   - Add images with titles individually.
   - Use the bulk upload feature to upload multiple images at once, each with a unique title.
4. **Rearrange Images**:
   - Drag and drop images to reorder them as desired.
   - Save the new order to preserve the arrangement.
5. **Edit Images**: Modify the title of any uploaded image after it has been uploaded.
6. **Delete Images**: Remove unwanted images from your collection easily.


## Live Link

You can access the live version of the application at [Live Application Link](https://stockimage-platform.onrender.com/)


## Contact

For any inquiries or support, feel free to reach out via email:

**Email**: [afnadca2@gmail.com](mailto:afnadca2@gmail.com)

