# BR-Pro

A Node.js Express + MongoDB (Atlas-ready) backend starter for SME business registration, compliance tracking, document management, and user authentication.

## Tech Stack
- Express.js
- MongoDB + Mongoose
- JWT authentication
- dotenv

## Project Structure

```text
.
├── server.js
├── src
│   ├── app.js
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── businessRegistrationController.js
│   │   ├── documentController.js
│   │   └── taskController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── BusinessRegistration.js
│   │   ├── Document.js
│   │   ├── Task.js
│   │   └── User.js
│   └── routes
│       ├── authRoutes.js
│       ├── businessRegistrationRoutes.js
│       ├── documentRoutes.js
│       └── taskRoutes.js
└── .env.example
```

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

## API Endpoints
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Business Registrations (protected):
  - `GET /api/business-registrations`
  - `POST /api/business-registrations`
  - `GET /api/business-registrations/:id`
  - `PUT /api/business-registrations/:id`
  - `DELETE /api/business-registrations/:id`
- Tasks (protected):
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `GET /api/tasks/:id`
  - `PUT /api/tasks/:id`
  - `DELETE /api/tasks/:id`
- Documents (protected):
  - `GET /api/documents`
  - `POST /api/documents`
  - `GET /api/documents/:id`
  - `PUT /api/documents/:id`
  - `DELETE /api/documents/:id`
