# E-Gaming Hub Setup Guide

## Prerequisites

- **Node.js** 16+ and npm/yarn
- **MongoDB** (local or MongoDB Atlas)
- **Firebase Project** (for authentication & storage)
- **Expo CLI** (for mobile development)
- **Git**

---

## Backend Setup

### 1. Clone Repository
```bash
git clone https://github.com/Rohitj1021/E-Gaming-Hub.git
cd E-Gaming-Hub/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/e-gaming-hub
JWT_SECRET=your-secret-key
FIREBASE_PROJECT_ID=your-project-id
# Add other credentials
```

### 4. Start MongoDB (if using local)
```bash
# macOS
mongod

# or use MongoDB Atlas (cloud)
```

### 5. Start Backend Server
```bash
npm run dev
```

Server will run on `http://localhost:3000`

---

## Mobile Setup

### 1. Navigate to Mobile Directory
```bash
cd E-Gaming-Hub/mobile
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Expo
```bash
npx expo start
```

### 4. Run on Device/Emulator

**Android Emulator:**
```bash
npx expo start --android
```

**iOS Simulator (macOS):**
```bash
npx expo start --ios
```

**Web Browser:**
```bash
npx expo start --web
```

---

## Firebase Setup

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Click "Create Project"
- Enable Authentication, Storage, and Messaging

### 2. Add Service Account
- Go to Project Settings → Service Accounts
- Generate New Private Key
- Copy credentials to backend `.env`

### 3. Initialize in Mobile
Add Firebase config to mobile app (in `src/services/firebase.js`)

---

## Database Setup

### MongoDB Local
```bash
# Install MongoDB
# macOS: brew install mongodb-community

# Start MongoDB
mongod
```

### MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create Cluster
3. Get Connection String
4. Add to `.env` as `MONGODB_URI`

---

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Code Linting
```bash
npm run lint
npm run lint:fix
```

---

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify firewall settings for MongoDB Atlas

### Expo Build Error
- Clear cache: `expo start --clear`
- Delete `node_modules` and reinstall
- Update Expo CLI: `npm install -g expo-cli@latest`

### Firebase Authentication Error
- Verify service account credentials
- Check Firebase project settings
- Ensure APIs are enabled in Firebase

---

## Next Steps

1. Review API Documentation (`docs/API_DOCUMENTATION.md`)
2. Check Contributing Guidelines (`.github/CONTRIBUTING.md`)
3. Start implementing features from the roadmap
4. Join the development!
