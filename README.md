# Express API App

Express.js Rest API application with authentication, email notifications, user management. 
The application is built with TypeScript, PostgreSQL, Sequelize ORM and Docker. 
Repository includes GitHub Actions for linting and testing the application with Postman and Chai.js.

## Features

- User authentication with email verification
- JWT authentication (with JWT tokens stored in the database for revoking on logout before expiration)
- User management (CRUD operations)
- User roles (admin, user)

## Documentation

  - [Configuration options and environment variables](./configuration.md)
  - [Postman collection](./postman) (includes tests)

## Configuration

Configuration options are set in [.env](.env) file.
The majority of essential configuration options are available through environment variables. 
All configuration options are available in [configs](app/src/configs) directory.
Configuration options are documented in [configuration.md](./configuration.md).

## Development setup

All necessary components of the application are containerized with Docker.
[docker-compose.yml](docker-compose.yml) defines services for the application 
and [docker-compose.override.yml](docker-compose.override.yml) extends the configuration for development with hot-reloading.

### Docker containers

- Express.js application
- PostgreSQL database
- MailHog (email testing tool)
- Nginx (web server for serving static files and reverse proxy)

### Prerequisites

  - [Docker](https://docs.docker.com/get-docker/)
  - [Node.js](https://nodejs.org/en/download/) (v20 or higher)

### Setup
   
1. Install dependencies

    ```bash
    npm --prefix app i
    ```
   
3. Run docker containers

    ```bash
    docker-compose up
    ```

## Scripts

Scripts must be run from `app` directory.

- `npm run dev` - run application in development mode
- `npm run build` - build application (output in `build` directory)
- `npm run start` - run application in production mode from `build` directory
- `npm run lint` - run lint and fix issues
- `npm run eslint` - run lint
- `npm run test` - run Postman tests

## Application structure

- `app` - application source code
  - `src` - source code
    - `configs` - configuration files
    - `controllers` - controllers
    - `helpers` - helper functions
    - `middlewares` - middlewares
    - `models` - models
    - `routes` - routes
    - `app.ts` - application
  - `build` - build output
  - `views` - templates
  - `app.ts` - application
  - `index.ts` - entry point

## Resources
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js](https://expressjs.com/) (Node.js web application framework)
- [Sequelize](https://sequelize.org/) (ORM)
- [Postman](https://www.postman.com/)
- [Chai.js](https://www.chaijs.com/) (assertion library for Postman tests)
