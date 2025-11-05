# EcoExchange Backend

Backend API for EcoExchange - Community Reuse Platform

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecoexchange
NODE_ENV=development
```

4. Start MongoDB locally (if using local MongoDB):
```bash
mongod
```

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will run on http://localhost:5000

## API Endpoints

### Items

- **GET** `/api/items` - Get all items (with optional filters)
  - Query params: `search`, `condition`, `status`, `page`, `limit`

- **GET** `/api/items/:id` - Get single item

- **POST** `/api/items` - Create new item
  - Body: `{ name, image, condition, location, description }`

- **PUT** `/api/items/:id` - Update item
  - Body: `{ status, ... }`

- **DELETE** `/api/items/:id` - Delete item

## Project Structure

```
backend/
├── config/          # Database configuration
├── models/          # Mongoose schemas
├── routes/          # API routes
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
└── server.js        # Entry point
```

## Deployment

Deploy to Render, Railway, or Heroku:
1. Push code to GitHub
2. Connect repository to hosting service
3. Add environment variables
4. Deploy!