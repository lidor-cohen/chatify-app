# Chatify

A real-time chat application built with React, Node.js, Express, MongoDB, and Socket.io. Users can sign up, log in, send messages, share images, and see online status in real-time.

## Features

- **User Authentication**: Sign up and login with email/password (JWT-based)
- **Real-time Messaging**: Send and receive messages instantly using Socket.io
- **Image Sharing**: Upload and share images in conversations
- **Online Status**: See which users are currently online
- **Profile Management**: Update profile picture and user details
- **Responsive Design**: Works on desktop and mobile devices (Tailwind CSS)
- **Email Verification**: Account activation via email (Resend API)
- **Security**: Input validation, CORS protection, rate limiting (Arcjet)

## Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Zustand** - State management
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Backend

- **Node.js / Express** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - WebSocket communication
- **JWT** - Authentication
- **Cloudinary** - Image hosting
- **Resend** - Email service
- **Arcjet** - Rate limiting & security
- **Bcryptjs** - Password hashing

## Getting Started

### Prerequisites

- Node.js >= 22.12.0
- npm or yarn
- MongoDB instance (local or Atlas)
- Cloudinary account (for image uploads)
- Resend API key (for emails)
- Arcjet API key (for rate limiting)

### Installation

1. **Clone the repository**

```bash
git clone <repo-url>
cd chatify-app
```

2. **Install backend dependencies**

```bash
npm install --prefix backend
```

3. **Install frontend dependencies**

```bash
npm install --prefix frontend
```

4. **Set up environment variables**

Create .env:

```
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/chatify
# Or use MongoDB Atlas: mongodb+srv://user:password@cluster.mongodb.net/chatify

# Auth
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Resend)
RESEND_API_KEY=your_resend_key
EMAIL_FROM=noreply@yourdomain.com

# Rate limiting (Arcjet)
ARCJET_KEY=your_arcjet_key

# Frontend (CORS)
CLIENT_URI=http://localhost:5173
```

Create `frontend/.env.local`:

```
VITE_API_URL=http://localhost:3000
```

### Running Locally

**Terminal 1 - Backend:**

```bash
npm run dev --prefix backend
# Server runs on http://localhost:3000
```

**Terminal 2 - Frontend:**

```bash
npm run dev --prefix frontend
# App runs on http://localhost:5173
```

### Build & Deploy

**Build frontend:**

```bash
npm run build --prefix frontend
# Output: frontend/dist
```

**Build backend:**

```bash
npm run build --prefix backend
# (if using TypeScript or bundler)
```

**Production start:**

```bash
npm run start --prefix backend
```

The backend serves the built frontend at `/`.

## API Routes

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Log in user
- `POST /api/auth/logout` - Log out user
- `GET /api/auth/check` - Check auth status
- `PUT /api/auth/update-profile` - Update profile picture

### Users

- `GET /api/users` - Get all users
- `GET /api/users/online` - Get online users

### Messages

- `GET /api/messages/:userId` - Get messages with a user
- `POST /api/messages/send/:userId` - Send a message

## Socket.io Events

**Emitted by client:**

- `message:new` - Send a new message
- `typing` - User is typing
- `user:online` - User comes online

**Listened by client:**

- `message:receive` - New message received
- `user:typing` - User typing notification
- `getOnlineUsers` - List of online users

## Common Issues & Fixes

### CORS Error

Ensure `CLIENT_URI` in backend `.env` matches your frontend origin (with scheme and port).

```
# ✅ Correct
CLIENT_URI=http://localhost:5173

# ❌ Wrong
CLIENT_URI=localhost:5173
```

### File Upload Too Large

Increase Express body limits in server.js:

```javascript
app.use(express.json({ limit: "10mb" }));
app.use(multer({ limits: { fileSize: 5 * 1024 * 1024 } }));
```

### MongoDB Connection Failed

- Ensure MongoDB is running: `brew services start mongodb-community` (macOS)
- Check `MONGO_URI` is correct
- Verify network access if using MongoDB Atlas

### Frontend Build Case-Sensitivity Error

On Linux/CI, ensure filenames match imports exactly:

```bash
# Fix case-sensitivity in git
git mv frontend/src/components/messagesLoadingSkeleton.jsx frontend/src/components/MessagesLoadingSkeleton.jsx
git commit -m "fix: normalize filename casing"
```

## Deployment

### Docker

A `Dockerfile` is included. Deploy to Railway, Render, or any Docker-compatible host:

```bash
docker build -t chatify .
docker run -p 3000:3000 chatify
```

### Environment Variables (Production)

Set these on your hosting provider:

- `MONGO_URI` (production database)
- `JWT_SECRET` (strong, random string)
- `CLOUDINARY_*` (credentials)
- `RESEND_API_KEY`
- `ARCJET_KEY`
- `CLIENT_URI` (production frontend URL)
- `NODE_ENV=production`
