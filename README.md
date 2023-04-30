

# What Tuh Eat Application Server

## Introduction

This is the server component of the What Tuh Eat application. It is built using TypeScript, Node.js, Express, and PostgreSQL. This server provides a RESTful API for the client application to interact with the database.

## Getting Started

### Prerequisites

- Node.js v14 or higher
- PostgreSQL v12 or higher

### Installation

1. Clone the GitHub repository:

   ```
   git clone https://github.com/<username>/what-tuh-eat-server.git
   ```

2. Navigate to the project directory:

   ```
   cd what-tuh-eat-server
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Configuration

1. Create a `.env` file at the root of the project directory.

2. Add the following environment variables to the `.env` file:

   ```
   DATABASE_HOST=<db host>
   DATABASE_PORT=<db port>
   DATABASE_USERNAME=<db username>
   DATABASE_PASSWORD=<db password>
   DATABASE_NAME=<db name>
   PORT=<port for application>
   SECRET_KEY=<secret key for JWT>
   EMAIL_USERNAME=<email>
   EMAIL_PASSWORD=<email password>
   ```

   Note: If your database doesn't have a password, remove the `DATABASE_PASSWORD` environment variable from the `.env` file.

## Running the Application

1. Start the server:

   ```
   npm start
   ```

2. The server will be listening on the port specified in the `.env` file.

3. Start the dev server:
  ```
  npm start:dev
  ```

## Contributing

To contribute to the What Tuh Eat application server, please follow these steps:

1. Fork this repository.

2. Create a new branch:

   ```
   git checkout -b my-feature-branch
   ```

3. Make your changes and commit them:

   ```
   git commit -m "Add new feature"
   ```

4. Push your changes to the forked repository:

   ```
   git push origin my-feature-branch
   ```

5. Create a pull request against the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
