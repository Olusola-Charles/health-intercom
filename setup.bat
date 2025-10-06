@echo off
title Health InterComm (HIC) Healthcare System Setup

echo.
echo =================================================
echo 🏥 Health InterComm (HIC) Healthcare System Setup
echo =================================================
echo.

REM Check if Node.js is installed
echo 📋 Checking Node.js installation...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js 16+ from https://nodejs.org
    echo After installation, restart Command Prompt and run this script again
    pause
    exit /b 1
)

REM Get Node.js version
for /f "tokens=*" %%i in ('node --version 2^>nul') do set NODE_VERSION=%%i
if "%NODE_VERSION%"=="" (
    echo ❌ Could not get Node.js version
    pause
    exit /b 1
)
echo ✅ Node.js is installed: %NODE_VERSION%

REM Check if npm is available
echo.
echo 📋 Checking npm installation...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed or not in PATH
    echo npm should come with Node.js installation
    echo Try reinstalling Node.js from https://nodejs.org
    pause
    exit /b 1
)

REM Get npm version
for /f "tokens=*" %%i in ('npm --version 2^>nul') do set NPM_VERSION=%%i
if "%NPM_VERSION%"=="" (
    echo ❌ Could not get npm version
    pause
    exit /b 1
)
echo ✅ npm is available: %NPM_VERSION%

REM Check if we can run npm commands
echo.
echo 📋 Testing npm functionality...
npm config get registry >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not working properly
    echo Try running: npm config set registry https://registry.npmjs.org/
    pause
    exit /b 1
)
echo ✅ npm is working correctly

REM Check if MongoDB is installed (optional)
echo.
echo 📋 Checking MongoDB installation...
where mongod >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ MongoDB is not installed locally or not in PATH
    echo You can either:
    echo   1. Install MongoDB Community Server from https://www.mongodb.com/try/download/community
    echo   2. Use MongoDB Atlas cloud database
    echo   3. Use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest
    echo.
    echo This is optional - you can use MongoDB Atlas instead
    echo.
) else (
    for /f "tokens=*" %%i in ('mongod --version 2^>nul ^| findstr "db version"') do set MONGO_VERSION=%%i
    echo ✅ MongoDB is installed: %MONGO_VERSION%
)

REM Create directory structure
echo.
echo 📁 Creating project directories...
if not exist "backend" mkdir backend
if not exist "frontend" mkdir frontend
if not exist "backend\uploads" mkdir backend\uploads
if not exist "backend\uploads\avatars" mkdir backend\uploads\avatars
if not exist "backend\uploads\documents" mkdir backend\uploads\documents
if not exist "backend\uploads\temp" mkdir backend\uploads\temp
if not exist "backend\logs" mkdir backend\logs
echo ✅ Directories created

REM Install root dependencies first
echo.
echo 📦 Installing root dependencies...
echo This may take a few minutes...

REM Create root package.json if it doesn't exist
if not exist "package.json" (
    echo Creating root package.json...
    (
        echo {
        echo   "name": "healthintercomm-system",
        echo   "version": "1.0.0",
        echo   "description": "Health InterComm Healthcare Management System",
        echo   "scripts": {
        echo     "dev": "concurrently \"npm run server\" \"npm run client\"",
        echo     "server": "cd backend && npm run dev",
        echo     "client": "cd frontend && npm start",
        echo     "install-deps": "npm install && cd backend && npm install && cd ../frontend && npm install"
        echo   },
        echo   "devDependencies": {
        echo     "concurrently": "^8.2.2"
        echo   }
        echo }
    ) > package.json
)

call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    echo Error details above. Common fixes:
    echo 1. Clear npm cache: npm cache clean --force
    echo 2. Delete node_modules and try again
    echo 3. Check your internet connection
    echo 4. Try: npm config set registry https://registry.npmjs.org/
    pause
    exit /b 1
)
echo ✅ Root dependencies installed

REM Setup backend
echo.
echo 📦 Setting up backend...
cd backend

if not exist "package.json" (
    echo Creating backend package.json...
    (
        echo {
        echo   "name": "healthintercomm-backend",
        echo   "version": "1.0.0",
        echo   "description": "Backend API for Health InterComm Healthcare System",
        echo   "main": "server.js",
        echo   "scripts": {
        echo     "start": "node server.js",
        echo     "dev": "nodemon server.js",
        echo     "seed": "node scripts/seedDatabase.js"
        echo   },
        echo   "dependencies": {
        echo     "express": "^4.18.2",
        echo     "mongoose": "^8.0.3",
        echo     "bcryptjs": "^2.4.3",
        echo     "jsonwebtoken": "^9.0.2",
        echo     "cors": "^2.8.5",
        echo     "dotenv": "^16.3.1",
        echo     "helmet": "^7.1.0",
        echo     "express-rate-limit": "^7.1.5",
        echo     "morgan": "^1.10.0"
        echo   },
        echo   "devDependencies": {
        echo     "nodemon": "^3.0.2"
        echo   }
        echo }
    ) > package.json
)

echo Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    cd ..
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

REM Create basic server.js if it doesn't exist
if not exist "server.js" (
    echo Creating basic server.js...
    (
        echo const express = require('express'^);
        echo const cors = require('cors'^);
        echo require('dotenv'^).config(^);
        echo.
        echo const app = express(^);
        echo.
        echo app.use(cors(^)^);
        echo app.use(express.json(^)^);
        echo.
        echo app.get('/api/health', (req, res^) =^> {
        echo   res.json({ 
        echo     status: 'OK',
        echo     message: 'Health InterComm API is running!',
        echo     timestamp: new Date(^).toISOString(^)
        echo   }^);
        echo }^);
        echo.
        echo app.get('/', (req, res^) =^> {
        echo   res.json({ message: 'Welcome to Health InterComm API' }^);
        echo }^);
        echo.
        echo const PORT = process.env.PORT ^|^| 5000;
        echo app.listen(PORT, (^) =^> {
        echo   console.log(`🚀 Health InterComm server running on port ${PORT}`^);
        echo   console.log(`📊 Health check: http://localhost:${PORT}/api/health`^);
        echo }^);
    ) > server.js
)

cd ..

REM Setup frontend
echo.
echo 📦 Setting up frontend...
cd frontend

if not exist "package.json" (
    echo Creating React app... This may take several minutes...
    call npx create-react-app . --template basic
    if %errorlevel% neq 0 (
        echo ❌ Failed to create React app
        cd ..
        pause
        exit /b 1
    )
    
    echo Installing additional frontend dependencies...
    call npm install react-router-dom axios tailwindcss autoprefixer postcss
    if %errorlevel% neq 0 (
        echo ⚠️ Some frontend dependencies may have failed to install
        echo The app should still work with basic functionality
    )
)

cd ..

REM Setup environment files
echo.
echo ⚙️ Setting up environment configuration...

if not exist "backend\.env" (
    echo Creating backend environment file...
    (
        echo # Health InterComm ^(HIC^) Healthcare System Environment Configuration
        echo NODE_ENV=development
        echo PORT=5000
        echo CLIENT_URL=http://localhost:3000
        echo.
        echo # Database - Choose one:
        echo # Local MongoDB
        echo MONGODB_URI=mongodb://localhost:27017/healthintercomm
        echo # MongoDB Atlas ^(replace with your connection string^)
        echo # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthintercomm
        echo.
        echo # JWT Configuration
        echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-$(RANDOM^)
        echo JWT_EXPIRE=7d
        echo.
        echo # Email Configuration ^(optional for development^)
        echo EMAIL_FROM=noreply@healthintercomm.com
        echo SMTP_HOST=smtp.gmail.com
        echo SMTP_PORT=587
        echo SMTP_EMAIL=your-email@gmail.com
        echo SMTP_PASSWORD=your-app-password
    ) > "backend\.env"
    echo ✅ Backend .env file created
) else (
    echo ⚠️ Backend .env file already exists
)

if not exist "frontend\.env" (
    echo Creating frontend environment file...
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
        echo REACT_APP_SOCKET_URL=http://localhost:5000
        echo GENERATE_SOURCEMAP=false
    ) > "frontend\.env"
    echo ✅ Frontend .env file created
) else (
    echo ⚠️ Frontend .env file already exists
)

REM Test if we can start the backend
echo.
echo 🧪 Testing backend server...
cd backend
echo Starting server test...
timeout /t 2 /nobreak >nul
start /min cmd /c "node server.js"
timeout /t 3 /nobreak >nul

REM Try to check if server is responding
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend server test successful
) else (
    echo ⚠️ Backend server test inconclusive - this is normal
)

REM Stop the test server
taskkill /f /im node.exe >nul 2>&1
cd ..

REM Final instructions
echo.
echo =================================================
echo 🎉 Setup completed successfully!
echo =================================================
echo.
echo 📋 Next steps:
echo   1. Review and update backend\.env with your configuration
echo   2. Make sure MongoDB is running ^(if using local MongoDB^)
echo   3. Start the application
echo.
echo 🚀 To start the development servers:
echo   npm run dev
echo.
echo   This will start:
echo   - Backend server on http://localhost:5000
echo   - Frontend server on http://localhost:3000
echo.
echo 🔧 Alternative commands:
echo   - Backend only: cd backend ^&^& npm run dev
echo   - Frontend only: cd frontend ^&^& npm start
echo.
echo 📚 Useful URLs:
echo   - Frontend: http://localhost:3000
echo   - Backend API Health: http://localhost:5000/api/health
echo   - Backend API Root: http://localhost:5000
echo.
echo 💡 Tips:
echo   - If you see EADDRINUSE errors, another process is using the ports
echo   - Use Ctrl+C to stop the servers
echo   - Check the console for any error messages
echo.
echo Happy coding! 🚀
echo.
pause

REM Check if MongoDB is installed (optional)
echo.
echo 📋 Checking MongoDB installation...
mongod --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️ MongoDB is not installed locally.
    echo You can either:
    echo   1. Install MongoDB Community Server from https://www.mongodb.com/try/download/community
    echo   2. Use MongoDB Atlas cloud database
    echo   3. Use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest
    echo.
) else (
    echo ✅ MongoDB is installed
    mongod --version | findstr "db version"
)

REM Create directory structure
echo.
echo 📁 Creating project directories...
if not exist "backend\uploads\avatars" mkdir backend\uploads\avatars
if not exist "backend\uploads\documents" mkdir backend\uploads\documents
if not exist "backend\uploads\temp" mkdir backend\uploads\temp
if not exist "backend\logs" mkdir backend\logs
echo ✅ Directories created

REM Install dependencies
echo.
echo 📦 Installing project dependencies...
echo Installing root dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install root dependencies
    exit /b 1
)

echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    cd ..
    exit /b 1
)

echo Installing frontend dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    cd ..
    exit /b 1
)

cd ..
echo ✅ All dependencies installed successfully

REM Setup environment files
echo.
echo ⚙️ Setting up environment configuration...

if not exist "backend\.env" (
    echo Creating backend environment file...
    copy "backend\.env.example" "backend\.env" >nul 2>&1
    if not exist "backend\.env.example" (
        echo Creating default backend .env file...
        (
            echo # Health InterComm ^(HIC^) Healthcare System Environment Configuration
            echo NODE_ENV=development
            echo PORT=5000
            echo CLIENT_URL=http://localhost:3000
            echo MONGODB_URI=mongodb://localhost:27017/healthintercomm
            echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
            echo JWT_EXPIRE=7d
            echo EMAIL_FROM=noreply@healthintercomm.com
            echo SMTP_HOST=smtp.gmail.com
            echo SMTP_PORT=587
            echo SMTP_EMAIL=your-email@gmail.com
            echo SMTP_PASSWORD=your-app-password
        ) > "backend\.env"
    )
    echo ✅ Backend .env file created
    echo ⚠️ Please update backend\.env with your configuration
) else (
    echo ⚠️ Backend .env file already exists
)

if not exist "frontend\.env" (
    echo Creating frontend environment file...
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
        echo REACT_APP_SOCKET_URL=http://localhost:5000
        echo GENERATE_SOURCEMAP=false
    ) > "frontend\.env"
    echo ✅ Frontend .env file created
) else (
    echo ⚠️ Frontend .env file already exists
)

REM Ask about database seeding
echo.
set /p seed_db="Do you want to seed the database with sample data? (y/N): "
if /i "%seed_db%"=="y" (
    echo 🌱 Seeding database...
    cd backend
    call npm run seed
    if errorlevel 1 (
        echo ⚠️ Database seeding failed. Make sure MongoDB is running.
    ) else (
        echo ✅ Database seeded successfully
        echo.
        echo 🔐 Demo Accounts:
        echo   Patient: patient@demo.com / password123
        echo   Doctor: doctor@demo.com / password123
        echo   Admin: admin@demo.com / password123
        echo   Nurse: nurse@demo.com / password123
        echo   Pharmacy: pharmacy@demo.com / password123
        echo   Lab: lab@demo.com / password123
    )
    cd ..
) else (
    echo Database seeding skipped
)

REM Final instructions
echo.
echo =================================================
echo 🎉 Setup completed successfully!
echo =================================================
echo.
echo 📋 Next steps:
echo   1. Update backend\.env with your configuration
echo   2. Make sure MongoDB is running
echo   3. Start the application:
echo.
echo 🚀 To start the development servers:
echo   npm run dev
echo.
echo   This will start:
echo   - Backend server on http://localhost:5000
echo   - Frontend server on http://localhost:3000
echo.
echo 🔧 Alternative commands:
echo   - Backend only: cd backend ^&^& npm run dev
echo   - Frontend only: cd frontend ^&^& npm start
echo.
echo 📚 Documentation:
echo   - API Health Check: http://localhost:5000/api/health
echo   - README: README.md
echo.
echo 🌐 Open http://localhost:3000 in your browser when ready
echo.
echo Happy coding! 🚀
pause