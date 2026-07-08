# 🚀 Talkatify - Real-Time Chat Application

Talkatify is a real-time chat application built to explore how modern communication systems work under the hood. 
I have used WebSockets, Socket.IO, MongoDB, Node.js, ExpressJS for scalable backend architecture, Docker and DigitalOcean for Deployment.

The project is a cloud-deployed application having multiple features.
## ✨ Features

### Real-Time Communication
- Real-time messaging using Socket.IO
- Room-based chat architecture
- Instant message delivery
- User join notifications

### User Experience
- Typing indicator
- Online users count
- Shareable room links
- Dynamic room creation

### Data Persistence
- MongoDB Atlas integration
- Persistent message storage
- Room management system

### Automation
- Automatic cleanup of inactive rooms
- Scheduled background jobs using Node-Cron
- Automatic deletion of associated messages

### Deployment & DevOps
- Dockerized application
- Docker Compose setup
- Production deployment on DigitalOcean
- Environment-based configuration

## 🛠️ Tech Stack
### Backend
- Node.js
- Express.js
- Socket.IO

### Database
- MongoDB Atlas
- Mongoose

### DevOps & Deployment
- Docker
- Docker Compose
- DigitalOcean

### Scheduling
- Node-Cron

## 🏗️ System Architecture

User Browser
↓
Socket.IO
↓
Node.js + Express Server
↓
MongoDB Atlas

Background Jobs
↓
Node-Cron
↓
Inactive Room Cleanup

## 📌 Key Learning Outcomes
This project helped me understand:

- WebSockets and real-time communication
- Socket.IO event-driven architecture
- Room-based messaging systems
- Production deployment workflows
- Docker containerization
- Environment configuration management
- Background job scheduling
- Cloud hosting with DigitalOcean

## 🚀 Deployment
The application is deployed on a DigitalOcean Droplet using Docker and Docker Compose.


## 📸 Screenshots
### Home Page
<img width="943" height="776" alt="HomePage" src="https://github.com/user-attachments/assets/d7b81c4c-7d46-4d6d-a8a7-430dd6ff5c8f" />

### Chat Room

<img width="1596" height="1036" alt="ChatRoom" src="https://github.com/user-attachments/assets/fa4297f8-8707-467a-8e45-5a6a1d75cc2f" />

## 🔮 Future Improvements

- Authentication & Authorization
- User Profiles
- Read Receipts
- Unread Message Counters
- Private Messaging
- Media/File Sharing
- Nginx Reverse Proxy
- HTTPS with SSL Certificates
- Redis-based Caching Layer

**Mudassir Khushik**

Software Engineer | MERN Stack Developer

LinkedIn: https://www.linkedin.com/in/mudassir-khushik-453239308/

GitHub: https://github.com/MudassirKhushik
