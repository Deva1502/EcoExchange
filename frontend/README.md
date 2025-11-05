# EcoExchange Frontend

React frontend for EcoExchange - Community Reuse Platform

## Tech Stack

- React 18
- Axios for API calls
- CSS3 for styling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Backend server running

### Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm start
```

App will run on http://localhost:3000

## Features

- **Items Board**: Browse all available items with search and filters
- **Add Item**: Submit new items with details
- **Status Toggle**: Mark items as available or exchanged
- **Responsive Design**: Works on desktop and mobile
- **Real-time Search**: Filter items as you type

## Project Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # React components
│   ├── services/    # API service layer
│   ├── styles/      # CSS files
│   └── App.jsx      # Main component
```