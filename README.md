# URL Shortener and Tracker API

![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)
![Express](https://img.shields.io/badge/express-5.x-black)
![MongoDB](https://img.shields.io/badge/mongodb-database-green)
![Docker](https://img.shields.io/badge/docker-containerized-blue)
![JWT](https://img.shields.io/badge/auth-JWT-orange)
![Swagger](https://img.shields.io/badge/docs-Swagger-85EA2D)

## Description

REST API for URL shortening and tracking, developed as a portfolio project focused on applying Back-end development best practices using Node.js.

The application allows authenticated users to create shortened URLs, manage their URLs, monitor access statistics, renew URL expiration dates, and redirect users to the original URLs.

The project was built using a layered architecture, complete Swagger/OpenAPI documentation, JWT authentication, centralized error handling, rate limiting, and full Docker containerization.

---

## Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org/) | >= 18 | JavaScript runtime environment |
| [Express](https://expressjs.com/) | ^5.x | Framework for building the API |
| [MongoDB](https://www.mongodb.com/) | — | NoSQL database |
| [Mongoose](https://mongoosejs.com/) | ^9.x | ODM for MongoDB |
| [JWT](https://jwt.io/) | — | Token-based authentication |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | — | Password hashing |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | — | Request rate limiting |
| [Swagger UI](https://swagger.io/tools/swagger-ui/) | — | Interactive API documentation |
| [OpenAPI 3.0](https://spec.openapis.org/oas/latest.html) | — | API documentation specification |
| [Docker](https://www.docker.com/) | — | Application containerization |
| [Docker Compose](https://docs.docker.com/compose/) | — | Container orchestration |
| [Mongo Express](https://github.com/mongo-express/mongo-express) | — | Web-based MongoDB administration interface |

The application uses **JavaScript with ES Modules** (`import`/`export`) natively.

---

## Project Structure

```text
url-shortening/
├── src/
│   ├── config/                    # Application configuration
│   ├── controllers/               # Handles HTTP requests
│   ├── services/                  # Business logic and database communication
│   ├── routes/                    # Route definitions
│   ├── middlewares/               # Global middlewares
│   ├── models/                    # MongoDB models
│   ├── errors/                    # Custom error classes
│   └── app.js                     # Express configuration
│   ├── swagger.json               # OpenAPI specification
│
├── docker-compose.yml             # Container orchestration
├── .dockerignore
├── .gitignore
├── Dockerfile                     # API container
├── server.js                      # Application entry point
├── package.json
└── README.md
```

---

## Features

### Authentication

| Method | Route | Description |
|---|---|---|
| `POST` | `auth/register` | Creates a new account |
| `POST` | `auth/login` | Authenticates a user and returns a JWT |

After logging in, users receive an **Access Token** that must be sent with protected routes using:

```http
Authorization: Bearer <token>
```

---

### URLs

| Method | Route | Description |
|---|---|---|
| `POST` | `/shortUrls` | Creates a shortened URL |
| `GET` | `/shortUrls` | Lists all URLs belonging to the authenticated user |
| `GET` | `/shortUrls/:shortUrl/redirect` | Redirects to the original URL |
| `GET` | `/shortUrls/:shortUrl/stats` | Returns URL statistics |
| `PUT` | `/shortUrls/:shortUrl/renew` | Renews the URL expiration time |
| `DELETE` | `/shortUrls/:shortUrl` | Deletes a URL |

### URL Fields

```json
{
  "originalUrl": "string",
  "shortUrl": "string",
  "accessCount": 0,
  "expiresInMs": 86400000,
  "userId": "<user_id>",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### User Fields

```json
{
  "name": "string",
  "email": "string",
  "hashPassword": "string"
}
```

---

## Features and Highlights

### Architecture

- **Layered Architecture** — Clear separation between Routes, Controllers, and Services.
- **Separation of Responsibilities** — Each layer has a single responsibility. Since this is a relatively small project, the Services layer is responsible for both business logic and database communication, eliminating the need for a dedicated Repository layer.
- **ES Modules** — Native use of `import` and `export`.
- **Modular Codebase** — Organized structure that improves maintainability and scalability.

### Security

- **JWT Authentication** — Token-based authentication using Access Tokens.
- **Authorization** — Users can only access and manage their own URLs.
- **Password Hashing** — Secure password storage using bcrypt.
- **Rate Limiting** — Route-specific request limiting with `express-rate-limit`.
- **Input Validation** — Validation of required fields, formats, and data consistency.

### Database

- **MongoDB + Mongoose** — Data persistence using a NoSQL database.
- **User-URL Relationship** — Each user can own multiple shortened URLs.
- **Persistent Storage** — Docker Volumes ensure database persistence.

### Error Handling

- **Centralized Error Handling** — Global middleware for exception handling.
- **Custom Error Classes** — Implementation of `BaseError`, `BadRequestError`, `UnauthorizedError`, `ConflictError`, and `NotFoundError`.
- **Standardized Responses** — All errors return consistent HTTP status codes and messages.

### Documentation

- **Swagger UI** — Interactive interface for testing API endpoints.
- **OpenAPI 3.0** — Documentation following the OpenAPI specification.
- **Reusable Schemas** — Shared components across multiple endpoints.
- **Comprehensive Examples** — Includes request, response, parameter, and status code examples.

### Infrastructure

- **Docker** — Fully containerized API.
- **Docker Compose** — Application orchestration.
- **MongoDB Container** — Dedicated MongoDB container.
- **Mongo Express** — Graphical interface for database management.
- **Docker Network** — Secure communication between containers.

---

## Running the Project

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Step-by-step

**1. Clone the repository and navigate to the project folder:**

```bash
git clone <repository-url>

cd url-shortening
```

**2. Configure the environment variables:**

Create a `.env` file in the project root containing the required application settings.

Since this is a portfolio project, the database connection variables are intentionally hardcoded in the `docker-compose.yml` file to simplify setup and testing.

Therefore, in the example below, you may choose any values for `PORT` and `JWT_SECRET`, while the `DATABASE_CONNECTION_STRING` should remain exactly as shown.

Example:

```env
PORT=<server_port>
JWT_SECRET=<your_secret_key>
DATABASE_CONNECTION_STRING=mongodb://admin:admin123@mongodb:27017/url-shortener?authSource=admin
```

**3. Build and start the containers:**

```bash
docker compose up -d --build
```

The following services will be started automatically:

- Node.js API
- MongoDB
- Mongo Express

**4. Access the application**

| Service | URL |
|---|---|
| API | http://localhost:8000 |
| Swagger UI | http://localhost:8000/api-docs |
| Mongo Express | http://localhost:8081 |

**5. Stop the containers**

```bash
docker compose down
```

To remove the persistent volumes as well:

```bash
docker compose down -v
```

---

## Notes

- This project was developed with a focus on best practices commonly used in production-grade applications.
- Authentication is fully implemented using JWT.
- Passwords are securely stored using bcrypt hashing.
- MongoDB runs in a dedicated container with persistent storage through Docker Volumes.
- The API documentation is available via Swagger UI.
- The application includes centralized error handling and comprehensive input validation.
- The codebase uses JavaScript with ES Modules and follows a layered architecture.

---

*Developed by **Ygor Santos** — [LinkedIn](https://www.linkedin.com/in/ygor-santos-869152325/) | [GitHub](https://github.com/ygorzz)*
