# Project Name

This project consists of a server and client setup. To run the server and client, you need Node.js version 20 or higher.

## Prerequisites

- Node.js version 20 or higher
- npm (Node Package Manager)

## Server Setup

1. **Navigate to the server directory**:
    ```bash
    cd server
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` file**:
    Create a `.env` file in the root of the `server` directory with the following content:
    ```env
    PORT = 4000
    ACCESS_EXP_TIME = 1h
    REFRESH_EXP_TIME = 1d
    MONGO_URI = mongodb+srv://noor:n00rs@test.lasahoe.mongodb.net/?retryWrites=true&w=majority&appName=test
    DB_NAME = test
    ```

4. **Start the server**:
    ```bash
    npm start
    ```

   The server will start and listen on the port specified in the `.env` file (default: 4000).

## Client Setup

1. **Navigate to the client directory**:
    ```bash
    cd client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the client**:
    ```bash
    npm start
    ```

   The client will start and run on `http://localhost:3000`.

## Summary

- **Server**:
  - Directory: `server`
  - Commands:
    - `cd server`
    - `npm install`
    - `npm start`
  - Environment variables:
    ```env
    PORT = 4000
    ACCESS_EXP_TIME = 1h
    REFRESH_EXP_TIME = 1d
    MONGO_URI = mongodb+srv://noor:n00rs@test.lasahoe.mongodb.net/?retryWrites=true&w=majority&appName=test
    DB_NAME = test
    ```

- **Client**:
  - Directory: `client`
  - Commands:
    - `cd client`
    - `npm install`
    - `npm start`

By following the above steps, you will have both the server and client running on your local machine.
