# ExonClouds Enterprise IT Services Website

Production-ready full-stack website for ExonClouds, an enterprise IT services company focused on cloud, cybersecurity, software, automation, infrastructure, managed support, and AI services.

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript ES6, jQuery, Bootstrap 5, Font Awesome
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Architecture: MVC pattern
- Security: Helmet, CORS, Express Validator, MongoDB sanitization, environment variables

## Project Structure

```text
ExonClouds/
├── frontend/
│   ├── index.html
│   └── assets/
│       ├── css/
│       │   └── style.css
│       ├── js/
│       │   └── main.js
│       ├── images/
│       │   ├── hero-cloud.svg
│       │   ├── cybersecurity.svg
│       │   ├── managed-it.svg
│       │   ├── web-development.svg
│       │   └── ai-services.svg
│       └── icons/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── contactController.js
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── middleware/
│   ├── .env
│   ├── package.json
│   └── server.js
└── README.md
```

## Getting Started

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

Update `backend/.env` if needed:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/exonclouds
CLIENT_URL=http://127.0.0.1:5500
```

For production, set `MONGO_URI` to your hosted MongoDB connection string and set `CLIENT_URL` to the deployed frontend domain.

### 3. Run MongoDB

Make sure MongoDB is running locally or use a hosted MongoDB Atlas database.

### 4. Start the backend

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

The backend also serves the frontend from:

```text
http://localhost:5000
```

## API Endpoints

### Create contact inquiry

```http
POST /api/contact
```

Required fields:

- `name`
- `email`
- `serviceNeeded`

Optional fields:

- `companyName`
- `phone`
- `projectBrief`

Example request:

```json
{
  "name": "Jane Carter",
  "companyName": "Northline Systems",
  "email": "jane@example.com",
  "phone": "+1 555 0187",
  "serviceNeeded": "Cloud & DevOps",
  "projectBrief": "We need help modernizing infrastructure and deployment workflows."
}
```

### Get all contact inquiries

```http
GET /api/contact
```

Returns all inquiries sorted by newest first.

## Frontend Features

- Sticky glassmorphism navbar
- Smooth scrolling
- Active section highlighting
- Responsive mobile navigation
- Hero illustration grid
- Counter animation
- Fade-in scroll animation
- Glossy service cards
- Delivery timeline
- Industry cards
- Lead generation form
- AJAX form submission with jQuery
- Success and error notifications

## Backend Features

- MVC structure
- Mongoose contact model
- JSON API responses
- Required field validation
- Helmet security headers
- CORS configuration
- MongoDB sanitization
- Environment-based configuration
- Static frontend hosting

## Deployment Notes

- Keep `.env` values private in production.
- Use a managed MongoDB database such as MongoDB Atlas.
- Set `NODE_ENV=production`.
- Set `CLIENT_URL` to the live website domain.
- Deploy the backend to a Node.js host such as Render, Railway, Fly.io, AWS, Azure, or DigitalOcean.
- Serve the frontend through the Express backend or from a static host with the API URL updated in `frontend/assets/js/main.js`.
