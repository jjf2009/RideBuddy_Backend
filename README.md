# 🚗 RideBuddy Backend

A comprehensive backend system for a ride-sharing platform built with Node.js, Express, and Firebase. RideBuddy enables users to publish rides, request rides, and manage carpooling services efficiently. The system also includes a fuel price scraper to provide real-time petrol and diesel prices.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [API Endpoints](#api-endpoints)
- [Fuel Price Scraper](#fuel-price-scraper)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Features
- **Ride Publishing**: Drivers can publish available rides with detailed information
- **Ride Search & Discovery**: Users can search and browse available rides
- **Ride Requests**: Passengers can request to join published rides
- **Request Management**: Track and manage ride request statuses
- **Real-time Updates**: Firebase Firestore integration for real-time data sync
- **Notifications**: User notification system for ride updates
- **CORS Support**: Secure cross-origin resource sharing for frontend integration

### Fuel Price Features
- **Price Scraping**: Automated scraping of petrol and diesel prices
- **Price Storage**: Extracted prices stored in text files for easy access
- **Dual Fuel Support**: Separate scraping for both petrol and diesel prices

## 🛠 Technology Stack

### Backend Framework
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **Firebase Admin SDK**: Firebase backend integration
- **Firestore**: NoSQL cloud database

### Authentication & Security
- **bcrypt**: Password hashing
- **jsonwebtoken (JWT)**: Token-based authentication
- **CORS**: Cross-Origin Resource Sharing

### Python Components
- **Python 3.x**: For fuel price scraping
- **requests**: HTTP library for fetching web content
- **dotenv**: Environment variable management
- **regex (re)**: Pattern matching for price extraction

### Development Tools
- **nodemon**: Auto-restart during development
- **dotenv**: Environment variable management

## 📁 Project Structure

```
RideBuddy_Backend/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── ride.controller.js       # Ride management logic
│   │   └── request.controller.js    # Request management logic
│   ├── models/              # Data models
│   │   ├── ride.model.js           # Ride data operations
│   │   ├── request.model.js        # Request data operations
│   │   └── notify.model.js         # Notification operations
│   └── routes/              # API routes
│       ├── ride.route.js           # Ride endpoints
│       └── request.route.js        # Request endpoints
├── main.py                  # Main fuel price scraper
├── exPetrol.py             # Petrol price extractor
├── exDiesel.py             # Diesel price extractor
├── server.js               # Express server entry point
├── package.json            # Node.js dependencies
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (not in repo)
└── .gitignore             # Git ignore rules
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Python** (v3.7 or higher)
- **pip** (Python package manager)
- **Firebase Project** with Firestore enabled

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/jjf2009/RideBuddy_Backend.git
cd RideBuddy_Backend
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

## ⚙️ Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000

# Firebase Configuration
TYPE=service_account
PROJECT_ID=your-project-id
PRIVATE_KEY_ID=your-private-key-id
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
CLIENT_ID=your-client-id
AUTH_URL=https://accounts.google.com/o/oauth2/auth
TOKEN_URL=https://oauth2.googleapis.com/token
AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk%40your-project.iam.gserviceaccount.com
UNIVERSE_DOMAIN=googleapis.com

# Fuel Price Scraper URLs
petrol_url=https://your-petrol-price-source.com
diesel_url=https://your-diesel-price-source.com
```

### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Firestore Database
4. Go to Project Settings → Service Accounts
5. Generate a new private key
6. Copy the credentials to your `.env` file

## 🔌 API Endpoints

### Ride Management

#### Create a Ride
```http
POST /publish
Content-Type: application/json

{
  "driverName": "string",
  "department": "string",
  "year": "string",
  "age": number,
  "drivingexp": number,
  "startLocation": "string",
  "endLocation": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "vehicle": "string",
  "seatsAvailable": number,
  "phoneNumber": "string",
  "price": number,
  "DriverId": "string",
  "routeDescription": "string"
}
```

#### Get All Rides
```http
GET /search
```

#### Get Ride by ID
```http
GET /search/:id
```

#### Update a Ride
```http
PUT /update/:id
Content-Type: application/json

{
  "seatsAvailable": number,
  "price": number,
  // ... other fields to update
}
```

#### Delete a Ride
```http
DELETE /delete/:id
```

### Request Management

#### Create a Ride Request
```http
POST /requests
Content-Type: application/json

{
  // Request data
}
```

#### Get All Requests
```http
GET /requests
```

#### Get Request by ID
```http
GET /requests/:requestId
```

#### Update a Request
```http
PATCH /requests/:requestId
Content-Type: application/json

{
  "status": "accepted" | "rejected" | "pending"
}
```

#### Delete a Request
```http
DELETE /requests/:requestId
```

## ⛽ Fuel Price Scraper

The fuel price scraper is a Python-based component that fetches and extracts current petrol and diesel prices from external sources.

### How It Works

1. **main.py**: Main orchestrator
   - Loads environment variables containing fuel price URLs
   - Fetches HTML content from petrol and diesel price sources
   - Saves HTML to temporary files
   - Calls extraction modules

2. **exPetrol.py**: Petrol price extractor
   - Reads petrol HTML file
   - Uses regex to extract price (₹XX.XX format)
   - Saves to `petrol_price.txt`

3. **exDiesel.py**: Diesel price extractor
   - Reads diesel HTML file
   - Uses regex to extract price (₹XX.XX format)
   - Saves to `diesel_price.txt`

### Running the Scraper

```bash
python main.py
```

Output files:
- `petrol_price.txt` - Current petrol price
- `diesel_price.txt` - Current diesel price
- `petrol.html` - Raw petrol price page (temporary)
- `diesel.html` - Raw diesel price page (temporary)

## 💻 Usage

### Start the Server

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`)

### Test the Server
```bash
curl http://localhost:5000
```

Expected response:
```
RideBuddy Server is running!
```

## 🔧 Development

### Running in Development Mode

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   This uses nodemon to automatically restart the server when files change.

2. **Monitor logs**: Check console output for requests and errors

3. **Test endpoints**: Use tools like:
   - Postman
   - Thunder Client (VS Code extension)
   - cURL
   - Your frontend application

### Code Structure

- **Models**: Handle direct database operations (CRUD)
- **Controllers**: Process requests and call model functions
- **Routes**: Define API endpoints and link to controllers
- **Server.js**: Main application setup, middleware, and configuration

### Adding New Features

1. Create model in `src/models/`
2. Create controller in `src/controllers/`
3. Create routes in `src/routes/`
4. Import and use routes in `server.js`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Follow existing naming conventions
- Test your changes before submitting

## 📄 License

This project is licensed under the ISC License.

## 👥 Author

**Mamun**

## 🆘 Support

For issues, questions, or contributions, please:
- Open an issue on GitHub
- Contact the development team

## 🔐 Security

- Never commit `.env` file or Firebase credentials
- Keep dependencies updated
- Use environment variables for sensitive data
- Implement proper authentication before deploying to production

## 📝 Notes

- The frontend is configured to work with `https://ridebuddy-8p6s.onrender.com`
- CORS is configured for specific origins; update in `server.js` if needed
- Firestore security rules should be configured based on your requirements
- The fuel price scraper URLs need to be updated based on your data source

---

**Happy Coding! 🚗💨**
