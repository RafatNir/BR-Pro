# BR Pro (Books & Records Professional)

BR Pro is a web application designed to help small and medium-sized enterprises (SMEs) manage business registration records, maintain essential business information, and stay compliant with regulatory requirements.

The platform aims to simplify administrative processes for both new entrepreneurs and existing businesses by providing a centralized system for tracking registrations, business records, and compliance-related information.

## Version 1 Features
- User Registration
- User Login
- JWT Authentication
- Authorization Middleware
- Protected API Routes
- Business Registration CRUD Operations
- MongoDB Atlas Integration
- RESTful API Architecture
- API Testing using Thunder Client

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Security
- JSON Web Tokens (JWT)
- bcryptjs Password Hashing

### Development Tools
- Visual Studio Code
- Thunder Client
- GitHub

## Project Structure

backend
 ├── config
 ├── controllers
 ├── middleware
 ├── models
 ├── routes
 ├── .env
 ├── server.js
 └── package.json

## API Endpoints
### Authentication
Method	Endpoint
POST	/api/users/register
POST	/api/users/login

Protected routes require:

Authorization: Bearer <JWT_TOKEN>

### Business Registrations
Method	Endpoint
POST	/api/registrations
GET	/api/registrations
GET	/api/registrations/:id
PUT	/api/registrations/:id
DELETE	/api/registrations/:id


Current Status

-  MongoDB Atlas Connected

- MVC Architecture Implemented

- JWT Authentication

- Authorization Middleware

- CRUD Operations

- API Testing Completed

## Future Enhancements

Future versions of BR Pro will include:

- Accounting and bookkeeping functionality
- Financial record management
- Business document management
- AI-powered compliance reminders
- Business deadline tracking
- Tax and payroll support
- Dashboard and reporting tools

## Author

Rafat Islam (Student ID: 301536762)

COMP229 – Web Application Development
Centennial College
