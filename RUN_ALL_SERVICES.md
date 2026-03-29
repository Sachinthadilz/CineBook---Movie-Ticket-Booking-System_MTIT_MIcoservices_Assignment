# CineBook - Run All Services

This directory contains scripts to run all 5 microservices with a single command.

## Scripts Available

### 1. **Windows Batch (.bat)** - RECOMMENDED FOR WINDOWS

```bash
run-all-services.bat
```

- **Best for:** Windows users
- **How it works:** Opens each service in a separate Command Prompt window
- **Usage:** Double-click the file or run from Command Prompt:
  ```cmd
  run-all-services.bat
  ```

### 2. **PowerShell (.ps1)**

```bash
run-all-services.ps1
```

- **Best for:** Advanced Windows users with PowerShell
- **How it works:** Runs services as background jobs in PowerShell
- **Usage:**

  ```powershell
  .\run-all-services.ps1
  ```

  If you get an execution policy error, run:

  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

### 3. **Bash Shell (.sh)**

```bash
run-all-services.sh
```

- **Best for:** Linux, macOS, or WSL (Windows Subsystem for Linux)
- **How it works:** Runs services in parallel in the same terminal
- **Usage:**
  ```bash
  chmod +x run-all-services.sh
  ./run-all-services.sh
  ```

## Services Started

| Service         | Port | URL                   |
| --------------- | ---- | --------------------- |
| API Gateway     | 3000 | http://localhost:3000 |
| User Service    | 3004 | http://localhost:3004 |
| Movie Service   | 3001 | http://localhost:3001 |
| Cinema Service  | 3002 | http://localhost:3002 |
| Booking Service | 3003 | http://localhost:3003 |

## Swagger Documentation

Access the API gateway Swagger UI at: **http://localhost:3000/api-docs**

## Stopping Services

### For .bat script:

- Close each terminal window individually, or close all at once

### For PowerShell script:

```powershell
Get-Job | Stop-Job
Get-Job | Remove-Job
```

### For Bash script:

- Press `Ctrl+C` to stop all services

## Prerequisites

Before running any script, ensure:

1. **Node.js and npm installed** - Check with `node -v` and `npm -v`
2. **Dependencies installed** - Run `npm install` in each service directory (or let the script handle it)
3. **MongoDB running** - All services need MongoDB connection
4. **.env files configured** - Copy `.env.example` to `.env` in each service directory

### Quick Setup:

```bash
# Create .env files from examples
copy api-gateway\.env.example api-gateway\.env
copy user-service\.env.example user-service\.env
copy movie-service\.env.example movie-service\.env
copy cinema-service\.env.example cinema-service\.env
copy booking-service\.env.example booking-service\.env
```

## Troubleshooting

### Port Already in Use

If you see "EADDRINUSE" error, another process is using that port. Either:

- Kill the process on that port
- Change the PORT in the service's `.env` file
- Stop other running instances

### MongoDB Connection Error

Ensure MongoDB is running:

```bash
# Windows
mongod

# Or if using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### npm install hangs

Try clearing npm cache:

```bash
npm cache clean --force
```

## Running Services Individually

If you prefer to run services separately:

```bash
# Terminal 1 - API Gateway
cd api-gateway && npm run dev

# Terminal 2 - User Service
cd user-service && npm run dev

# Terminal 3 - Movie Service
cd movie-service && npm run dev

# Terminal 4 - Cinema Service
cd cinema-service && npm run dev

# Terminal 5 - Booking Service
cd booking-service && npm run dev
```

## Environment Variables

All services use `.env` files for configuration. Key variables:

- `PORT` - Service port (different for each service)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret (must be same across all services)
- `JWT_EXPIRES_IN` - Token expiry time (default: 1d)

For details, see `.env.example` files in each service directory.
